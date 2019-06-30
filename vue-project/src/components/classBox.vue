<template>
  <div>
    <router-link v-for="(p,i) of pdata" :key="i" :to="'/details/'+p.pid" class="proBox">
      <img :src="'http://127.0.0.1:3000/'+p.pic">
      <div class="msg">
        <span class="title">{{p.pname}}</span>
        <span class="price">¥{{p.price}}</span>
      </div>
    </router-link>
    <mt-button @click="more(ptype)">查看更多</mt-button>
    <div style="height:50px"></div>
  </div>
</template>
<script>
export default {
  props: { pdata: { default: [] }, more: { dafault: Function } ,ptype:""},
};
</script>
<style scoped>
/* 商品盒子 */
a.proBox {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 5px 0;
}
a.proBox img {
  width: 150px;
  height: 200px;
  margin: 10px;
}
a.proBox .msg {
  margin: 10px;
}
a.proBox span {
  margin: 10px;
}
</style>