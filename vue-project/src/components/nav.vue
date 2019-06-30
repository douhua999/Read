<template>
  <div class="cjnav">
    <a href="#" @click="change" data-id="青春文学" style="margin-top:15px;">
      <i class="iconfont icon-shucai"></i>
      <span>青春文学</span>
    </a>
    <a href="#" @click="change" data-id="哲学宗教" style="margin-top:15px;">
      <i class="iconfont icon-shuiguo"></i>
      <span>哲学宗教</span>
    </a>
    <a href="#" @click="change" data-id="投资理财" style="margin-top:15px;">
      <i class="iconfont icon-haixian"></i>
      <span>投资理财</span>
    </a>
    <a href="#" @click="change" data-id="情感都市" style="margin-top:15px;">
      <i class="iconfont icon-mi"></i>
      <span>情感都市</span>
    </a>
    <a href="#" @click="change" data-id="两性关系" style="margin-top:5px;"> 
      <i class="iconfont icon-shipindian-"></i>
      <span>两性关系</span>
    </a>
    <a href="#" @click="change" data-id="人际交往" style="margin-top:5px;">
      <i class="iconfont icon-jiu"></i>
      <span>人际交往</span>
    </a>
    <a href="#dazhe" style="margin-top:5px;">
      <i class="iconfont icon-dazhe"></i>
      <span>情绪管理</span>
    </a>
    <a href="#tese" style="margin-top:5px;">
      <i class="iconfont icon-tese"></i>
      <span>儿童读物</span>
    </a>
  </div>
</template>
<script>
export default {
  props: {
    pClassSel: { default: "" },
    change:{type:Function}
  },
  methods: {
  }
};
</script>
<style>
.cjnav {
  display: flex;
  flex-wrap: wrap;
}
.cjnav a {
  display: block;
  width: 25%;
  height: 60px;
  display: flex;
  flex-direction: column;
}
.cjnav a i {
  font-size: 30px;
  color:#ff2832;
}
.cjnav a span {
  color: #323232;
  font: 14px/32px "Microsoft Yahei";
  font-size:14px;
}
</style>
