<template>
  <div>
    <!-- 底部导航栏 -->
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="product"></mt-tab-item>
      <mt-tab-item id="pclass"></mt-tab-item>
      <mt-tab-item id="cart"></mt-tab-item>
      <mt-tab-item id="me"></mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  props: {
    selected: ""
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
div.mint-tabbar {
  height: 50px;
  display: flex;
  align-items: center;
}
div.mint-tabbar .mint-tab-item .mint-tab-item-label {
  font-size: 16px;
}
.mint-tab-item {
  color: #000;
  font-size: 30px;
  background: #fff;
}
.mint-tab-item.is-selected {
  background: #fff;
}
</style>