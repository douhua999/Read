<template>
  <div class="login_box">
    <h3>
      <router-link to="home">欣阅网</router-link>
    </h3>
    <div class="to_box">
      <router-link to="reg">快速注册</router-link>
    </div>
    <mt-field type="text" v-show="isuname" label="用户名" placeholder="用户名/邮箱/手机" v-model="uname"></mt-field>
    <mt-field v-show="!isuname" label="手机号" placeholder="请输入手机号" v-model="uname"></mt-field>
    <mt-field type="password" v-show="isuname" label="密码" placeholder="请输入密吗" v-model="upwd"></mt-field>
    <mt-field v-show="!isuname" label="验证码" placeholder="请输入短信验证码" v-model="upwd">
      <mt-button size="small" class="yzbtn">获取验证码</mt-button>
    </mt-field>
    <mt-button @click="change" v-show="isuname" class="login_btn" parmary size="large">手机登录</mt-button>
    <mt-button @click="change" v-show="!isuname" class="login_btn" parmary size="large">账号登录</mt-button>
    <mt-button @click="login" class="login_btn" size="large">点击登录</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uname: "",
      upwd: "",
      isuname: true
    };
  },
  methods: {
    change() {
      this.isuname = !this.isuname;
    },
    login() {
      if (!this.uname) {
        this.$messagebox("提示", "用户不能为空");
        return;
      }
      if (!this.upwd) {
        this.$messagebox("提示", "密码不能为空");
        return;
      }
      this.axios
        .get("/login", {
          params: {
            uname: this.uname,
            upwd: this.upwd
          }
        })
        .then(res => {
          // console.log(res);
          if (res.data.code == 1) {
            this.$messagebox("恭喜", "登录成功").then(res => {
              sessionStorage.setItem("uname", this.uname)
              if (res == "confirm") {
                this.$router.go(-1);
              }
            });
          } else {
            this.$messagebox("消息", res.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.login_box {
  height: 100vh;
}
h3 {
  width: 100%;
  height: 100px;
  line-height: 100px;
}
h3 a {
  color: #ff2832;
  font-size: 36px;
  font-weight: 800;
}
.to_box {
  text-align: right;
  padding: 0 40px;
}
.mint-cell.mint-field {
  height: 50px;
  margin: 15px 0;
  padding: 15 20px;
}
.mint-cell-wrapper {
  background: #fff;
  border-bottom: 1px solid #333;
  /* border-radius: 25px; */
}
.yzbtn {
  background: #f79f1f !important;
  width: 100% !important;
}
.mint-button {
  margin: 20px 10%;
  width: 80%;
  border-radius: 20px;
  background:  #ff2832;
  color: #fff;
  font: 18px/32px "Microsoft Yahei";
}
</style>