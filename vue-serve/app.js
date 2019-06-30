//app.js node.js 服务器
//1:第三方模块 
//  express          web服务器
//  cors             跨域
//  express-session  session
//  body-parser      处理post数据
//  multer           上传文件
//  fs               文件操作(内置)
//  mysql            mysql驱动模块 
//下载指令:联网 
//npm i express-session body-parser //multer mysql express cors
//1:引入二个模块  express mysql
const express = require("express");
const mysql = require("mysql");
//2:创建连接池
var pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  port: 3306,
  database: "ds",
  connectionLimit: 15
})
//3:创建express对象
var server = express();
console.log("部署成功");
//4.指定静态目录
server.use(express.static("public"))
//5:处理跨域请求
const cors = require("cors");
server.use(cors({
  origin: ["http://127.0.0.1:8080",
    "http://localhost:8080"
  ],
  credentials: true
}));
//6:添加session功能
const session = require("express-session");
server.use(session({
  secret: "128位字符串",
  resave: true, //每次请求更新数据
  saveUninitialized: true //保存初始化数据
}));
//9:绑定监听端口
server.listen(3000);
//登录
server.get("/login", (req, res) => {
  //1:接收脚手架参数 uname upwd
  var uname = req.query.uname;
  var upwd = req.query.upwd;
  console.log(uname)
  console.log(upwd)
  //2:sql
  //  SELECT id FROM t_login WHERE //uname = ? AND upass = md5(?)
  var sql = " SELECT uid FROM ds_user";
  sql += " WHERE uname = ?";
  sql += " AND upwd = md5(?)";
  //3:返回结果 
  pool.query(sql, [uname, upwd], (err, result) => {
    if (err) throw err;
    console.log(result)
    if (result.length == 0) {
      res.send({
        code: -1,
        msg: "用户名或密码有误"
      });
    } else {
      //result=[{id:1}]
      req.session.uid = result[0].uid
      res.send({
        code: 1,
        msg: "登录成功"
      });
    }
  });
});

// 注册
server.get('/reg', (req, res) => {
  var obj = req.query;
  obj.upwd = `md5(${obj.upwd})`
  console.log(obj);
  var sql = 'INSERT INTO ds_user SET ?';
  pool.query(sql, [obj], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      console.log("新用户注册")
      console.log(obj)
      res.send({
        code: 1,
        msg: '注册成功'
      });
      return;
    } else {
      res.send({
        code: -1,
        msg: '注册失败'
      });
    }
  })
})
//商品列表

server.get("/product", (req, res) => {
  //1:参数 pno pageSize
  console.log(req.query)
  var pno = req.query.pno;
  var ps = req.query.pageSize;
  var ptype = req.query.ptype;
  //2:默认值 
  if (!pno) {
    pno = 1
  }
  if (!ps) {
    ps = 4
  }
  var offset = (pno - 1) * ps;
  ps = parseInt(ps);
  console.log(offset, ps, ptype)
  //2:sql
  var sql = " SELECT pid,pname,price WHERE ptype = ?";
  sql += " FROM ds_product";
  sql += " LIMIT ?,?";
  var sql = " SELECT pid,pname,price,pic FROM ds_product WHERE ptype = ?  LIMIT ?,?";
  //3:json
  pool.query(sql, [ptype, offset, ps], (err, result) => {
    if (err) throw err;
    res.send({
      code: 1,
      msg: "查询成功",
      data: result
    });
  })
});

//商品详情
server.get("/details", (req, res) => {
  var pid = req.query.pid;
  var sql = "SELECT pname,price,pic,details FROM ds_product WHERE pid = ?"
  pool.query(sql, [pid], (err, result) => {
    if (err) throw err;
    res.send({
      code: 1,
      msg: "查询成功",
      data: result
    });
  })
})
// 加入购物车
server.get("/addCart", (req, res) => {
  console.log(req.session.uid)
  if (!req.session.uid) {
    res.send({
      code: -2,
      msg: '请先登录'
    });
  } else {
    var obj = {
      uid: req.session.uid,
      pid: req.query.pid,
      price: req.query.price,
      count: req.query.count,
      img: req.query.img
    }
    console.log(obj)
    var sql = "INSERT INTO ds_cart SET ?"
    pool.query(sql, [obj], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.send({
          code: 1,
          msg: '添加成功'
        });
        return;
      } else {
        res.send({
          code: -1,
          msg: '添加失败'
        });
      }
    })
  }
})
//功能三:查询指定用户购物车信息
server.get("/cart", (req, res) => {
  //参数
  var uid = req.session.uid;
  console.log(uid)
  //sql
  var sql = "SELECT cid,img,uid,price,count,pid FROM ds_cart WHERE uid = ?";
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    res.send({
      code: 1,
      msg: "查询成功",
      data: result
    })
  });
  //json
})


//功能四:-删除指定购物车中一个商品
server.get("/del", (req, res) => {
  //参数:id
  var cid = req.query.cid;
  //sql:
  var sql = "DELETE FROM ds_cart WHERE cid = ?";
  //json
  pool.query(sql, [cid], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      code: 1,
      msg: "删除成功"
    })
  })
})
// 清空购物车
server.get("/delAll", (req, res) => {
  let cids = req.query.cids;
  console.log(cids)
  let sql = `DElETE FROM ds_cart WHERE cid IN(${cids})`
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send({
        code: 1,
        msg: "删除成功"
      })
    } else {
      res.send({
        code: -1,
        msg: "删除失败"
      })
    }
  })
})
