<template>
  <div>
    <div class="permsg" v-if="isLogin">
      <div class="touxiang">
        <img src="../assets/toux.jpg" alt>
      </div>
      <div class="person">
        <p>{{uname}}</p>
      </div>
    </div>
    <div class="permsg" v-else>
      <div class="touxiang">
        <img src="../assets/toux1.png" alt>
      </div>
      <div class="person">
        <router-link to="/login">立即登录</router-link>
      </div>
    </div>
    <!-- 常用 -->
    <div class="myUse">
      <h2>常用工具</h2>
      <router-link to="#" style="margin-top:10px;">
        <i class="iconfont icon-dizhi"></i>
        <span>我的地址</span>
      </router-link>
      <router-link to="#" style="margin-top:10px;">
        <i class="iconfont icon-shoucang"></i>
        <span>我的收藏</span>
      </router-link>
      <router-link to="#" style="margin-top:10px;">
        <i class="iconfont icon-qiabao"></i>
        <span>我的卡包</span>
      </router-link>
      <router-link to="#" style="margin-top:10px;">
        <i class="iconfont icon-zhangdan"></i>
        <span>我的账单</span>
      </router-link>
    </div>
    <!-- 订单 -->
    <div class="order">
      <div class="myOrder">
        <h2>我的订单</h2>
        <router-link to="#" style="font-size: 14px">查看全部订单&gt;</router-link>
      </div>
      <div class="orderList">
        <router-link to="#">
          <i class="iconfont icon-kuajingzhifuiconfukuan"></i>
          <span>待付款</span>
        </router-link>
        <router-link to="#">
          <i class="iconfont icon-fahuo"></i>
          <span>待发货</span>
        </router-link>
        <router-link to="#">
          <i class="iconfont icon-shouhuo"></i>
          <span>待收货</span>
        </router-link>
        <router-link to="#">
          <i class="iconfont icon-evaluate"></i>
          <span>评价</span>
        </router-link>
        <router-link to="#">
          <i class="iconfont icon-shouhou"></i>
          <span>退货/售后</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isLogin: {
      type: Boolean
    },
    uname: {
      type: String
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.permsg {
  padding: 10px 30px;
  display: flex;
  background: #f5f6fa;
  border-radius: 20px;
  margin: 10px;
}
.touxiang {
  width: 100px;
  height: 100px;
  margin-right: 30px;
}
.touxiang img {
  width: 100%;
  border-radius: 50%;
  border-bottom: 1px solid #faa9ad;
}
.person {
  display: flex;
  align-items: center;
}
/* 常用功能 */
.myUse {
  background: #f5f6fa;
  border-radius: 20px;
  margin: 10px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.myUse h2{
  width: 100%;
  text-align:left;
  margin-left: 10px;
  color: #323232;
  font: 16px/32px "Microsoft Yahei";
}
h2 {
  color: #323232;
  font: 16px/32px "Microsoft Yahei";
}
.myUse a {
  display: flex;
  flex-direction: column;
}
.myUse a i {
  color: #ff2832;
  font: 24px/32px "Microsoft Yahei";
}
.myUse a span{
  color: #323232;
  font: 14px/32px "Microsoft Yahei";
}
/* 订单 */
.order {
  margin: 10px;
  background: #f5f6fa;
  border-radius: 20px;
}
.order .myOrder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
}
.orderList {
  display: flex;
  justify-content: space-around;
}
.orderList a {
  display: flex;
  flex-direction: column;
  width: 20%;
}
.orderList a i {
  color: #ff2832;
  font: 24px/32px "Microsoft Yahei";
}
.orderList a span {
  color: #323232;
  font: 14px/32px "Microsoft Yahei";
}
</style>
