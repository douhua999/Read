<template>
  <div>
    <div class="page-tabber">
      <div class="page-warp">
        <!-- 自定义标题子组件 -->
        <titlebar :isLogin="isLogin" :uname="uname"></titlebar>
        <!--50像素占位符 -->
        <div style="height:50px"></div>
        <!-- 切换面板 -->
        <mt-tab-container class="page-tab-container" v-model="selected">
          <mt-tab-container-item id="product">
            <banner></banner>
            <cjnav :pClassSel="pClassSel" :change="change"></cjnav>
            <!-- 打折 -->
            <div class="discount indexBox">
              <div class="dazhe_con">
                <h3 class="dazhe">限时优惠</h3>
              </div>
              <div class="item">
                <router-link to="/details/9" class="itemBox">
                  <img src="../assets/cover1.jpg">
                  <div class="msg">
                    <span class="title">掌控：焦虑的人生</span>
                    <span class="price">¥22.90</span>
                  </div>
                </router-link>
                <router-link to="/details/10" class="itemBox">
                  <img src="../assets/cover2.jpg">
                  <div class="msg">
                    <span class="title">我离婚了</span>
                    <span class="price">¥18.88</span>
                  </div>
                </router-link>
              </div>
            </div>
            <!-- 特色 -->
            <div class="spe indexBox">
              <h3 id="tese">特色专区</h3>
              <div class="item">
                <router-link to="/details/1" class="itemBox">
                  <img src="../assets/cover3.jpg">
                  <div class="msg">
                    <span class="title">漫画唐诗</span>
                    <span class="price">¥28.99</span>
                  </div>
                </router-link>
                <router-link to="/details/2" class="itemBox">
                  <img src="../assets/cover4.jpg">
                  <div class="msg">
                    <span class="title">用数据说话</span>
                    <span class="price">¥22.80</span>
                  </div>
                </router-link>
              </div>
            </div>
            <!-- 限时抢购 -->
            <div class="limit indexBox">
              <h3 id="tese">限时抢购</h3>
              <div class="item">
                <router-link to="/details/17" class="itemBox">
                  <img src="../assets/cover5.jpg">
                  <div class="msg">
                    <span class="title">性格的陷阱</span>
                    <span class="price">¥28.50</span>
                  </div>
                </router-link>
                <router-link to="/details/20" class="itemBox">
                  <img src="../assets/cover6.jpg">
                  <div class="msg">
                    <span class="title">新情商</span>
                    <span class="price">¥35.60</span>
                  </div>
                </router-link>
              </div>
            </div>
            <!-- 猜你喜欢 -->
            <div class="guess indexBox">
              <h3 id="tese">猜你喜欢</h3>
              <div class="item">
                <router-link to="/details/4" class="itemBox">
                  <img src="../assets/cover7.jpg">
                  <div class="msg">
                    <span class="title">教你打乒乓球</span>
                    <span class="price">¥44.50</span>
                  </div>
                </router-link>
                <router-link to="/details/12" class="itemBox">
                  <img src="../assets/cover8.jpg">
                  <div class="msg">
                    <span class="title">超级人脉</span>
                    <span class="price">¥38.50</span>
                  </div>
                </router-link>
              </div>
            </div>
            <div class="footer">
              <span>©2016 浙A3-20120202</span>
            </div>
            <!-- 占位 -->
            <div style="height:50px"></div>
          </mt-tab-container-item>
          <mt-tab-container-item id="pclass">
            <pclass :pClassSel="pClassSel" :change="change"></pclass>
          </mt-tab-container-item>
          <mt-tab-container-item id="cart">
            <cart :isLogin="isLogin" :uname="uname"></cart>
          </mt-tab-container-item>
          <mt-tab-container-item id="me">
            <me :isLogin="isLogin" :uname="uname"></me>
          </mt-tab-container-item>
        </mt-tab-container>
        <mt-tabbar v-model="selected" fixed>
          <mt-tab-item id="product">
            <span class="my_tabber">首页</span>
          </mt-tab-item>
          <mt-tab-item id="pclass">
            <span class="my_tabber">分类</span>
          </mt-tab-item>
          <mt-tab-item id="cart">
            <span class="my_tabber">购物车</span>
          </mt-tab-item>
          <mt-tab-item id="me">
            <span class="my_tabber">中心</span>
          </mt-tab-item>
        </mt-tabbar>
      </div>
    </div>
  </div>
</template>
<script>
import titlebar from "./titlebar.vue";
import cart from "./cart.vue";
import banner from "./banner.vue";
import cjnav from "./nav.vue";
import pclass from "./pclass.vue";
import me from "./me.vue";
export default {
  data() {
    return {
      selected: "product",
      pClassSel: "生鲜蔬菜",
      isLogin: false,
      uname: ""
    };
  },
  created() {
    this.isLoginCheck();
    this.selected = sessionStorage.getItem("selected");
    this.pClassSel = sessionStorage.getItem("pClassSel");
    if (!this.selected) {
      this.selected = "product";
      this.pClassSel = "生鲜蔬菜";
    }
  },
  destroyed() {
    sessionStorage.setItem("selected", this.selected);
    sessionStorage.setItem("pClassSel", this.pClassSel);
  },
  methods: {
    // 是否登录
    isLoginCheck() {
      this.uname = sessionStorage.getItem("uname");
      // console.log(this.uname);
      if (this.uname) {
        this.isLogin = true;
      }
    },
    change(e) {
      e.preventDefault();
      // console.log(e.target.parentNode.getAttribute("data-id"));
      this.selected = "pclass";
      this.pClassSel = e.target.parentNode.getAttribute("data-id");
    }
  },
  components: {
    titlebar,
    cart,
    banner,
    cjnav,
    pclass,
    me
  }
};
</script>
<style scoped>
div.mint-tabbar {
  height: 50px;
  display: flex;
  align-items: center;
}
div.mint-tabbar {
  height: 50px;
  font-size: 16px;
  background:#ff2832;
}
.my_tabber {
  font-size: 18px;
}
.mint-tab-item {
  height: 100%;
  color: #fff;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mint-tab-item.is-selected {
  background: #ff2832;
  color: #ff2832;
  padding: 0;
}
.mint-tab-item.is-selected .mint-tab-item-label span {
  padding: 5px 10px;
  width: 100px;
  background: #fff;
  border-radius: 20px;
  box-sizing: border-box;
}
/* 主页盒子 */
.indexBox {
  margin: 5px 0;
}
.indexBox h3 {
  text-align: center;
  padding: 10px 0;
}
.dazhe_con{
  border-bottom: 2px solid #ee554a;
  margin: 0 12px 5px 12px;
}
.dazhe{
  background: #ee554a;
  color: #fff;
  width: 85px;
  text-align: center;
  font-size: 14px; 
}
#tese{   
  color:  #ee554a;
  font: 18px/32px "Microsoft Yahei";
  font-weight:bold;
  }
.indexBox .item {
  display: flex;
  margin-top:10px;
}
.indexBox .item a {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.indexBox .item a img {
  width: 150px;
  height: 200px;
  margin: 5px; 
}
.indexBox .item a span {
  font: 14px/32px "Microsoft Yahei";font-weight: bold;
}
.msg .title{color:#000;}
.msg .price{
  display:block;
  color:#ee554a;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #535c68;
  font: 14px/32px "Microsoft Yahei"; 
}
</style>