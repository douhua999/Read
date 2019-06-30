<template>
  <div class="top">
    <div class="left">
      <router-link class="my_a" to="home" @click="returnlast">欣阅网</router-link>
    </div>
    <div class="search">
      <input type="text" placeholder="人生哲学">
      <i class="iconfont1 icon-sousuo"></i>
    </div>
    <div class="right">
      <div>
        <router-link v-if="!isLogin" class="my_a" to="login">登录</router-link>
        <router-link v-else class="my_a" to="#">{{uname}}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isLogin: { default: Boolean },
    uname: { default: "" }
  },
  data() {
    return {};
  },
  methods: {
    returnlast(e) {
      e.preventDefault();
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.top {
  width: 100%;
  height: 50px;
  padding: 0 8px;
  box-sizing: border-box;
  background: #ff2832;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.my_a {
  color: #fff;
  font-size: 16px;
}
.search {
  width: 250px;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
}
.search input {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  outline: none;
  padding-left: 20px;
  box-sizing: border-box;
}
.search i {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: #000;
}
.right {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.right div {
  margin: 0 2px;
}
</style>