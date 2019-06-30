<template>
  <div class="banner">
    <div
      class="bannerBox"
      :style="bannerMove"
      @touchstart="bTouch"
      @touchmove="bMove"
      @touchend="bEnd"
    >
      <div class="bannerItem">
        <img src="../assets/banner1.jpg" alt>
      </div>
      <div class="bannerItem">
        <img src="../assets/banner2.jpg" alt>
      </div>
      <div class="bannerItem">
        <img src="../assets/banner3.jpg" alt>
      </div>
      <div class="bannerItem">
        <img src="../assets/banner4.jpg" alt>
      </div>
      <div class="bannerItem">
        <img src="../assets/banner1.jpg" alt>
      </div>
    </div>
    <div class="copy" v-show="isShow">
      <img src="../assets/banner1.jpg" alt>
    </div>
    <div class="bannerPoint">
      <ul>
        <li :class="{active:(bIndex==1)||(bIndex==5)}" @click="change" :data-id="1"></li>
        <li :class="{active:bIndex==2}" @click="change" :data-id="2"></li>
        <li :class="{active:bIndex==3}" @click="change" :data-id="3"></li>
        <li :class="{active:bIndex==4}" @click="change" :data-id="4"></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bIndex: 1,
      timer: null,
      isShow: false,
      touchStart: 0,
      touchEnd: 0
    };
  },
  created() {
    this.bannerAuto();
  },
  methods: {
    bannerAuto() {
      this.timer = setInterval(() => {
        this.bIndex++;
      }, 3000);
    },
    change(e) {
      // console.log(e.target.dataset.id)
      clearInterval(this.timer);
      this.bIndex = e.target.dataset.id;
      setTimeout(() => {
        this.bannerAuto();
      }, 300);
    },
    bTouch(e) {
      // console.log(e.changedTouches[0].pageX);
      this.touchStart = e.changedTouches[0].pageX;
      clearInterval(this.timer);
    },
    bMove(e) {
      // console.log(e.changedTouches[0].pageX);
      let move = e.changedTouches[0].pageX - this.touchStart;
      let bannerBox = document.querySelector(".bannerBox");
      // console.log(move);
      bannerBox.style.transition = "none";
      bannerBox.style.marginLeft = move + "px";
    },
    bEnd(e) {
      let bannerBox = document.querySelector(".bannerBox");
      bannerBox.style.transition = "0.3s";
      bannerBox.style.marginLeft = "0px";
      if (this.touchStart - e.changedTouches[0].pageX > 10) {
        this.bIndex++;
      } else if (this.touchStart - e.changedTouches[0].pageX < 10) {
        if (this.bIndex != 1) {
          this.bIndex--;
        } else {
          this.bIndex = 1;
        }
      }
      setTimeout(() => {
        this.bannerAuto();
      }, 300);
    }
  },
  computed: {
    bannerMove() {
      if (this.bIndex == 1) {
        setTimeout(() => {
          this.isShow = false;
        }, 300);
      }
      let bM = (this.bIndex - 1) * -20 + "%";
      // console.log(bM);
      return { transform: `translateX(${bM})` };
    }
  },
  watch: {
    bIndex() {
      // console.log(this.bIndex);
      if (this.bIndex == 5) {
        setTimeout(() => {
          this.isShow = true;
          this.bIndex = 1;
        }, 300);
      } else {
      }
    }
  }
};
</script>
<style scoped>
.banner {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.banner .bannerBox {
  width: 500%;
  display: flex;
  transition: transform 0.3s;
}
.banner .bannerBox div.bannerItem {
  width: 20%;
}
.banner div.copy {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.banner > div img {
  width: 100%;
}
.bannerPoint {
  position: absolute;
  bottom: 5%;
  width: 100%;
  display: flex;
  justify-content: center;
}
.bannerPoint ul {
  display: flex;
  justify-content: space-around;
}
.bannerPoint ul li {
  width: 10px;
  height: 5px;
  background: #fff;
  margin: 5px;
  border-radius: 5px;
}
.bannerPoint ul li.active {
  background: #ffd405;
  width: 20px;
}
</style>