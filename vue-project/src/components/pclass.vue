<template>
  <div class="classPage">
    <div class="classSel">
      <!-- <mt-tabbar v-model="pClassSel">
        <mt-tab-item id="生鲜蔬菜">生鲜蔬菜</mt-tab-item>
        <mt-tab-item id="当季水果">当季水果</mt-tab-item>
        <mt-tab-item id="水产海鲜">水产海鲜</mt-tab-item>
        <mt-tab-item id="米面粮油">米面粮油</mt-tab-item>
        <mt-tab-item id="禽肉蛋">禽肉蛋</mt-tab-item>
        <mt-tab-item id="酒水饮料">酒水饮料</mt-tab-item>
      </mt-tabbar>-->
      <div @click="change" data-id="青春文学" :class="{isSelect:pClassSel=='青春文学'}">
        <div class="fontsty">青春文学</div>
      </div>
      <div @click="change" data-id="哲学宗教" :class="{isSelect:pClassSel=='哲学宗教'}">
        <div class="fontsty">哲学宗教</div>
      </div>
      <div @click="change" data-id="投资理财" :class="{isSelect:pClassSel=='投资理财'}">
        <div class="fontsty">投资理财</div>
      </div>
      <div @click="change" data-id="情感都市" :class="{isSelect:pClassSel=='情感都市'}">
        <div class="fontsty">情感都市</div>
      </div>
      <div @click="change" data-id="两性关系" :class="{isSelect:pClassSel=='两性关系'}">
        <div class="fontsty">两性关系</div>
      </div>
      <div @click="change" data-id="人际交往" :class="{isSelect:pClassSel=='人际交往'}">
        <div class="fontsty">人际交往</div>
      </div>
    </div>
    <div class="pcl">
      <mt-tab-container class="page-tab-container" v-model="pClassSel">
        <mt-tab-container-item id="青春文学">
          <classBox :pdata="shucaiData" :more="loadMore" :ptype="'青春'"></classBox>
        </mt-tab-container-item>
        <mt-tab-container-item id="哲学宗教">
          <classBox :pdata="shuiguoData" :more="loadMore" :ptype="'哲学'"></classBox>
        </mt-tab-container-item>
        <mt-tab-container-item id="投资理财">
          <classBox :pdata="qrdData" :more="loadMore" :ptype="'投资'"></classBox>
        </mt-tab-container-item>
        <mt-tab-container-item id="情感都市">
          <classBox :pdata="shuiguoData" :more="loadMore" :ptype="'哲学'"></classBox>
        </mt-tab-container-item>
        <mt-tab-container-item id="两性关系">
          <classBox :pdata="qrdData" :more="loadMore" :ptype="'投资'"></classBox>
        </mt-tab-container-item>
        <mt-tab-container-item id="人际交往">
          <classBox :pdata="shucaiData" :more="loadMore" :ptype="'青春'"></classBox>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
import classBox from "./classBox";
export default {
  props: {
    pClassSel: {
      type: String
    },
    change: {
      type: Function
    }
  },
  created() {
    this.loadMore("青春");
    this.loadMore("哲学");
    this.loadMore("投资");
  },
  data() {
    return {
      shucaiData: [],
      shucaiPno: 0,
      shuiguoData: [],
      shuiguoPno: 0,
      qrdData: [],
      qrdPno: 0,
      pageSize: 3
    };
  },
  methods: {
    // 加载商品
    loadMore(ptype) {
      // console.log(ptype);
      var pno;
      switch (ptype) {
        case "青春":
          pno = this.shucaiPno += 1;
          break;
        case "哲学":
          pno = this.shuiguoPno += 1;
          break;
        case "投资":
          pno = this.qrdPno += 1;
          break;
        default:
          break;
      }
      let url = "/product";
      let obj = {
        ptype,
        pno,
        pageSize: this.pageSize
      };
      // console.log(obj);
      this.axios.get(url, { params: obj }).then(res => {
        // console.log(res);
        if (res.data.data.length == 0) {
          this.$toast("这是底部了");
        } else {
          switch (ptype) {
            case "青春":
              this.shucaiData = this.shucaiData.concat(res.data.data);
              break;
            case "哲学":
              this.shuiguoData = this.shuiguoData.concat(res.data.data);
              break;
            case "投资":
              this.qrdData = this.qrdData.concat(res.data.data);
              break;
            default:
              break;
          }
        }
      });
    }
  },
  components: {
    classBox
  }
};
</script>
<style scoped>
.fontsty{
  color: #323232;
  font: 16px/32px "Microsoft Yahei";
}

.classPage {
  display: flex;
}
.classSel {
  width: 25%;
  height: 700px;
  border: 1px solid #bdc3c7;
  flex-wrap: wrap;
  flex-direction: column;
  position: fixed;
  top: 50px;
  left: 0px;
}
.classSel>div {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid #bdc3c7;
}
.classSel div div {
  width: 100%;
  height: 100%;
  line-height: 60px;;
}
.classSel div.isSelect{
  background: #06cdcc;
  color:#fff;
}
.classSel .mint-tabbar {
  width: 100%;
  height: 700px;
  display: block;
  position: absolute;
  top: 0px;
  left: 0;
}
.classSel .mint-tabbar .mint-tab-item {
  width: 100%;
  height: 50px !important;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
}
.pcl {
  width: 75%;
  margin-left: 25%;
  padding: 5px 10px;
  box-sizing: border-box;
  background: #fff;
}
</style>