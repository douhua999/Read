<template>
  <div>
    <div class="top">
      <router-link to="/home" class="icon-fanhui iconfont"></router-link>
      <span>{{data.pname}}</span>
    </div>
    <div style="height:50px"></div>
    <img v-if="data.pic!=''" class="detailsImg" :src="'http://127.0.0.1:3000/'+data.pic" alt>
    <div class="detailsBox">
      <h1>{{data.pname}}</h1>
      <p class="detailsText">{{data.details}}</p>
      <p class="detailsPrice">¥{{parseInt(data.price).toFixed(2)}}</p>
    </div>
    <button class="cart" @click="toadd">
      <span>加入购物车</span>
    </button>
    <div class="addcartdiv" :class="{active:isAdd}">
      <div class="bg" @click="returnd"></div>
      <div class="cartBox">
        <div class="count">
          <img v-if="data.pic!=''" :src="'http://127.0.0.1:3000/'+data.pic">
          <div class="countBox">
            <mt-button @click="sub" size="small" type="primary">-</mt-button>
            <span>{{count}}</span>
            <mt-button @click="add" size="small" type="primary">+</mt-button>
          </div>
        </div>
        <div class="addBox">
          <div class="total">
            <span>合计:{{total}}</span>
          </div>
          <div class="addBtn">
            <button @click="addCart">加入购物车</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["pid"],
  data() {
    return {
      isAdd: false,
      count: 1,
      data: {
        pname: "",
        price: "",
        details: "",
        pic: ""
      }
    };
  },
  created() {
    let url = "/details";
    let obj = {
      pid: this.pid
    };
    this.axios.get(url, { params: obj }).then(res => {
      this.data = res.data.data[0];
      // console.log(this.data);
    });
  },
  methods: {
    toadd() {
      this.isAdd = true;
    },
    add() {
      this.count++;
    },
    sub() {
      if (this.count > 0) {
        this.count--;
      }
    },
    returnd() {
      this.isAdd = false;
    },
    addCart() {
      let url = "/addCart";
      let obj = {
        pid: this.pid,
        price: this.data.price,
        count: this.count,
        img: this.data.pic
      };
      this.axios.get(url, { params: obj }).then(res => {
        // console.log(res.data.code);
        if (res.data.code == 1) {
          this.$toast("添加成功");
          this.isAdd = false;
        } else if (res.data.code == -2) {
          this.$messagebox({
            title: "消息",
            message: "请先登录",
            showConfirmButton: true,
            showCancelButton: true
          }).then(res => {
            if (res == "cancel") {
              return;
            } else {
              this.$router.push({ path:"/login"});
            }
          });
        } else {
          this.$toast("添加失败");
        }
      });
    }
  },
  computed: {
    total() {
      return (this.count * this.data.price).toFixed(2);
    }
  }
};
</script>
<style scoped>
div.top {
  height: 50px;
  width: 100%;
  background: #00a8ff;
  position: fixed;
  top: 0;
  left: 0;
}
.icon-fanhui {
  color: #fff;
  font-size: 30px;
  line-height: 50px;
  position: absolute;
  top: 0px;
  left: 5px;
}
/* 标题 */
div.top span {
  font-size: 26px;
  line-height: 50px;
  color: #fff;
}
.detailsImg {
  width: 100%;
  margin: 10px 0;
}
.detailsBox {
  padding: 15px;
}
.detailsBox h1 {
  text-align: left;
  font-size: 32px;
}
.detailsBox .detailsText {
  text-align: left;
  font-size: 16px;
  margin: 10px 0;
}
.detailsBox .detailsPrice {
  text-align: right;
  font-size: 18px;
  margin: 10px 0;
  color: #d63031;
}
/* 购物车 */
.cart {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 50px;
  width: 100%;
  background: #00a8ff;
  border: none;
  outline: none;
}
.cart span {
  font-size: 26px;
  line-height: 50px;
  color: #fff;
}
/* 购买栏 */
.addcartdiv {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 0%;
  transition: 0.3s;
  background: #00000080;
  overflow: hidden;
}
.addcartdiv.active {
  height: 100%;
  top: 0;
}
.addcartdiv .bg {
  height: 100%;
}
.cartBox {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0px;
  background: #fff;
}
.addcartdiv .count {
  width: 100%;
  margin: 10px 0;
  padding: 0 30px;
  box-sizing: border-box;
  display: flex;

  justify-content: space-between;
}
.addcartdiv .count img {
  width: 50px;
  height: 50px;
}
.addcartdiv .count .countBox {
  display: flex;
  align-items: center;
  width: 100px;
  height: 50px;
}
.addcartdiv .count .countBox span {
  margin: 0 10px;
}
.addBox {
  height: 50px;
  display: flex;
}
.addBox div {
  width: 50%;
}
.addBox div.total span {
  color: #e67e22;
  font-size: 24px;
  line-height: 50px;
}
.addBox div.addBtn button {
  height: 100%;
  width: 100%;
  background: #e67e22;
  color: #fff;
  outline: none;
  border: none;
}
</style>

