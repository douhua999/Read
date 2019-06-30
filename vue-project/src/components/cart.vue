<template>
  <div calss="cartBox">
    <!-- 商品信息 -->
    <div class="cartItem" v-for="(c,i) of cartList" :key="i">
      <div class="leftImgTxt">
        <label class="checkItem">
          <input type="checkbox" v-model="c.cb">
          <span class="checkBtn">
            <i class="icon-gou iconfont"></i>
          </span>
        </label>
        <router-link :to="'/details/'+c.pid">
          <img class="img" :src="'http://127.0.0.1:3000/'+c.img">
        </router-link>
        <div class="price_num">
          <span class="price">单价:{{c.price.toFixed(2)}}</span>
          <span class="total">合计:{{c.total.toFixed(2)}}</span>
        </div>
      </div>
      <div class="my_btn">
        <mt-button @click="sub(i)" size="small">-</mt-button>
        <span>{{c.count}}</span>
        <mt-button @click="add(i)" size="small">+</mt-button>
        <mt-button type="danger" :data-cid="c.cid" @click="delItem">删除</mt-button>
      </div>
    </div>
    <!-- 删除选中商品按钮 -->
    <div class="delbtn" v-show="cartList.length != 0">
      <mt-button type="danger" @click="delSelect">删除选中商品</mt-button>
      <mt-button type="danger" @click="delAll">删除所有商品</mt-button>
    </div>
    <!-- 登录提示 -->
    <div class="loginTips" v-if="!isLogin">
      <router-link to="/login" style="color:#fff;background-color: #ff2832">请先登录</router-link>
    </div>
    <!-- 购物车空提示 -->
    <div class="cartEmptyTips" v-else-if="cartList.length == 0">
      <p>购物车是空的</p>
    </div>
    <div style="height:120px"></div>
    <!-- 结算 -->
    <div class="accounts">
      <label class="checkall">
        <input type="checkbox" @change="allCheck" :checked="isAllCheck">
        <span class="checkBtn">
          <i class="icon-gou iconfont"></i>
        </span>
        <span>全选</span>
      </label>
      <div class="acctext">
        合计:
        <span>¥{{totalAll}}</span>
      </div>
      <mt-button class="accbtn" @click="accounts">结算</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isLogin: Boolean,
    uname: ""
  },
  data() {
    return {
      cartList: []
    };
  },
  created() {
    this.loadCart();
  },
  methods: {
    // 加载内容
    loadCart() {
      let url = "/cart";
      this.axios.get(url).then(res => {
        let arr = res.data.data;
        for (let a of arr) {
          a.total = a.price * a.count;
          a.cb = false;
        }
        this.cartList = arr;
        // console.log(this.cartList);
      });
    },
    // 数量+
    add(i) {
      let item = this.cartList[i];
      item.count++;
      item.total = item.count * item.price;
    },
    // 数量-
    sub(i) {
      let item = this.cartList[i];
      if (item.count != 1) {
        item.count--;
        item.total = item.count * item.price;
      }
    },
    // 全选
    allCheck(e) {
      var res = e.target.checked;
      for (let c of this.cartList) {
        c.cb = res;
      }
    },
    // 删除单个
    delItem(e) {
      this.$messagebox({
        title: "消息",
        message: "是否删除指定商品",
        showConfirmButton: true,
        showCancelButton: true
      }).then(res => {
        if (res == "cancel") {
          return;
        } else {
          let cid = e.target.dataset.cid;
          var url = "/del";
          this.axios
            .get(url, {
              params: {
                cid
              }
            })
            .then(res => {
              this.loadCart();
            });
        }
      });
    },
    // 删除指定
    delfn() {
      let cids = "";
      for (let c of this.cartList) {
        if (c.cb) {
          cids += c.cid + ",";
        }
      }
      if (cids.length == 0) {
        this.$toast("请选中要删除的商品");
        return;
      }
      cids = cids.substring(0, cids.length - 1);
      let url = "/delAll";
      let obj = { cids };
      this.axios.get(url, { params: obj }).then(res => {
        this.loadCart();
      });
    },
    // 删除多个
    delSelect(e) {
      this.$messagebox({
        title: "消息",
        message: "是否删除指定商品",
        showConfirmButton: true,
        showCancelButton: true
      }).then(res => {
        if (res == "cancel") {
          return;
        } else {
          this.delfn();
        }
      });
    },
    // 删除全部
    delAll() {
      this.$messagebox({
        title: "消息",
        message: "是否删除全部商品",
        showConfirmButton: true,
        showCancelButton: true
      }).then(res => {
        if (res == "cancel") {
          return;
        } else {
          for (let c of this.cartList) {
            c.cb = true;
          }
          this.delfn();
        }
      });
    },
    // 结算
    accounts() {
      let canacc = false;
      for (let c of this.cartList) {
        if (c.cb) {
          canacc = true;
        }
      }
      if (canacc) {
        this.$messagebox({
          title: "提示",
          message: `确认购买 共¥${this.totalAll}`,
          showCancelButton: true,
          showCancelButton: true
        }).then(res => {
          if ((res == "confirm")) {
            this.delfn();
            this.$toast({
              message: "购买成功",
              position: "mid",
              duration: 3000
            });
          } else {
            return;
          }
        });
      } else {
        this.$toast({
          message: "请选择商品",
          position: "mid",
          duration: 3000
        });
      }
    }
  },
  computed: {
    // 是否全选
    isAllCheck() {
      let isAllCheck = true;
      for (let c of this.cartList) {
        if (!c.cb) {
          isAllCheck = false;
        }
      }
      return isAllCheck;
    },
    // 合计金额
    totalAll() {
      var totalAll = 0;
      for (let c of this.cartList) {
        if (c.cb) {
          totalAll += c.total;
        }
      }
      return totalAll.toFixed(2);
    }
  }
};
</script>
<style scoped>
.cartBox {
  overflow: hidden;
}
.cartItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
}
.cartItem input {
  width: 14px;
  height: 14px;
}
.leftImgTxt {
  display: flex;
  align-items: center;
}
.leftImgTxt img {
  width: 60px;
  height: 60px;
  margin: 0 5px;
}
.price_num {
  width: 100px;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
}
.price_num span {
  display: block;
  margin: 5px;
  text-align: center;
}
.my_btn {
  font-size: 14px;
}
/* 删除按钮 */
.delbtn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
}
/* 登录提示 */
.loginTips {
  margin: 200px 0;
}
.loginTips a {
  font-size: 18px;
  font-weight: 600;
  color: #10ac84;
  width: 50%;
  border-radius: 25px;
  margin: 0 auto;
  display: block;
  background: #ffeaa7;
  height: 50px;
  line-height: 50px;
}
/* 空购物车提示 */
.cartEmptyTips {
  margin: 200px auto;
  font-size: 18px;
  font-weight: 600;
  color: #10ac84;
  width: 50%;
  border-radius: 25px;
  background: #ffeaa7;
  height: 50px;
  line-height: 50px;
}
/* 结算 */
.accounts {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 0;
  bottom: 50px;
  background: #fff;
}
.accounts .checkall {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.accounts .checkall input {
  width: 20px;
  height: 20px;
}
.acctext {
  height: 100%;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-weight: 600;
}
.acctext span {
  color:  #ff2832;
  font-weight: 900;
}
.accbtn {
  background:  #ff2832;
  color: #fff;
  width: 100px;
  height: 50px;
}
input[type="checkbox"] {
  display: none;
}
label {
  display: flex;
  align-items: center;
  justify-content: center;
}
span.checkBtn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #00a8ff;
}
span.checkBtn i {
  font-size: 16px;
  display: none;
  color: #00a8ff;
}
input[type="checkbox"]:checked ~ span i {
  display: block;
}
.checkItem span.checkBtn{
  width: 16px;
  height: 16px;
}
 .checkItemspan.checkBtn i {
   width: 12px;
   height: 12px;
 }
</style>