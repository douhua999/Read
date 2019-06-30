<template>
  <div class="reg_box">
    <h3>
      <router-link to="home">欣阅网</router-link>
    </h3>
    <div class="to_box">
      <router-link class="my_login" to="login">已有账号</router-link>
    </div>
    <div class="form_box">
      <mt-field
        @blur.native.capture="check(0)"
        v-model="form[0][0]"
        label="用户名"
        type="text"
        placeholder="6到12位字母数字组合"
      >
        <!-- <span>通过</span> -->
      </mt-field>
      <mt-field
        @blur.native.capture="check(1)"
        v-model="form[1][0]"
        label="密码"
        type="password"
        placeholder="8到16位字母数字组合"
      ></mt-field>
      <mt-field
        @blur.native.capture="reupwdcheck()"
        v-model="form[2][0]"
        label="密码"
        type="password"
        placeholder="请输入相同密码"
      ></mt-field>
      <mt-field
        @blur.native.capture="check(3)"
        v-model="form[3][0]"
        label="手机号码"
        type="text"
        placeholder="请输入你的手机号码"
      ></mt-field>
      <mt-field
        @blur.native.capture="check(4)"
        v-model="form[4][0]"
        label="电子邮箱"
        type="text"
        placeholder="请输入电子邮箱"
      ></mt-field>
    </div>
    <mt-button @click="reg" size="large" class="register">注册</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: [
        //    value ispass      reg          表单       pass_text
        ["", false, /^[\w_-]{3,12}$/, "用户名", "6到12位字母数字组合"],
        ["", false, /^[\w_-]{3,16}$/, "密码", "8到16位字母数字组合"],
        ["", false, /^[\w]{1000}$/, "密码", "输入密码不一致"],
        ["", false, /^1[34578]\d{9}$/, "手机号码", "手机号码不合法"],
        [
          "",
          false,
          /^[\w]+([-_.][\w\d]+)*@([\w]+[-_.])+[\w]{2,4}$/,
          "邮箱",
          "邮箱不合法"
        ]
      ]
    };
  },
  methods: {
    reg() {
      if (!this.form[0][1]) {
        this.check(0);
        return;
      }
      if (!this.form[1][1]) {
        this.check(1);
        return;
      }
      if (!this.form[2][1]) {
        this.reupwdcheck();
        return;
      }
      if (!this.form[3][1]) {
        this.check(3);
        return;
      }
      if (!this.form[4][1]) {
        this.check(4);
        return;
      }
      let obj = {
        uname: this.form[0][0],
        upwd: this.form[1][0],
        phone: this.form[3][0],
        email: this.form[4][0]
      };
      // console.log(obj);
      let url = "/reg";
      this.axios.get(url, { params: obj }).then(res => {
        if (res.data.code == 1) {
          this.$messagebox("恭喜", "注册成功").then(res => {
            // console.log(res)
            if (res == "confirm") {
              this.$router.push("/login");
            }
          });
        }
      });
    },
    check(i) {
      // console.log(this.form[i - 1][3]);
      if (this.form[i][0] == "") {
        this.$messagebox("", this.form[i][3] + "不能为空");
        return;
      } else if (this.form[i][2].test(this.form[i][0])) {
        this.form[i][1] = true;
      } else {
        this.$messagebox("", this.form[i][4]);
      }
    },
    reupwdcheck() {
      if (this.form[2][0] == "") {
        this.$messagebox("", "重复密码不能为空");
      } else if (this.form[1][0] == this.form[2][0]) {
        this.form[2][1] = true;
      } else {
        this.$messagebox("", this.form[2][4]);
      }
    }
  }
};
</script>
<style>
.register{
  width:90%;
  margin-left:5%;
  margin-top:15px;
  text-align: center;
  background-color:#ff2832;
  color:#fff;
}
.reg_box {
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
.ispass .mint-cell-wrapper {
  border-bottom: 1px solid #ff4757 !important;
}
.warn .mint-cell-wrapper {
  border-bottom: 1px solid #ff4757 !important;
}
</style>