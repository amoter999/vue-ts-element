<template>
  <div class="Login">
    <div class="leftbox">
      <!-- <img :src="getIcon(assetImgs.leftImg)" alt /> -->
    </div>
    <div class="rightbox">
      <div class="innerbox">
        <div class="logoimg">
          <img :src="getIcon(assetImgs.logoimg)" alt />
        </div>
        <div class="loginText">登录</div>
        <el-form :model="person" :rules="rules" ref="person" class="demo-person">
          <el-row>
            <el-col>
              <el-form-item prop="username">
                <el-input
                  size="medium"
                  placeholder="请输入用户名"
                  suffix-icon="el-icon-user"
                  v-model="person.username"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item prop="password">
                <el-input
                  size="medium"
                  placeholder="请输入密码"
                  suffix-icon="el-icon-key"
                  v-model="person.password"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-button type="primary" class="btnItem" size="medium" @click="submitForm('person')">立即登录</el-button>
          <br />
          <el-button @click="resetForm('person')" class="btnItem" size="medium">重置</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import axios from "axios";
@Component({
  name: "Login",
  components: {}
})
export default class Login extends Vue {
  assetImgs: object = {
    leftImg: "leftimg.png",
    logoimg: "login-logoimg.jpg"
  };
  person: object = {
    username: "",
    password: ""
  };
  rules: object = {
    username: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
    ],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };
  async submitForm(formName: any) {
    try {
      console.log(formName);
      let personFrom: any = this.$refs[formName];
      personFrom.validate();
      // 只要验证成功（ 异步操作完成 ），这句代码才会执行
      // 如果验证失败（ 异步操作失败 ），这句代码就不会执行了
      // console.log('验证成功：', res)
      //   // 验证成功：登录的代码逻辑
      const res = await axios.post(
        "http://localhost:8888/api/private/v1/login",
        this.person
      );

      let myThis: any = this;
      if (res.data.meta.status === 200) {
        // 登陆成功：
        // 3 将登录标识 token 存储到 localStorage 中
        // 注意：先保存 token ，再跳转路由，因为 跳转路由的时候，导航守卫中获取了 token。如果在获取token前，没有存储 token ，就出问题了
        localStorage.setItem("token", res.data.data.token);
        // 1 跳转到首页
        this.$router.push({ name: "Home" });
        // 2 登录成功的消息提示：
        myThis.$message({
          message: res.data.meta.msg,
          type: "success",
          duration: 800
        });
      } else {
        // 登录失败
        // this.$message.error(res.data.meta.msg)
        myThis.$message({
          type: "error",
          message: res.data.meta.msg,
          duration: 1000
        });
      }
    } catch (err) {
      // console.log('验证失败：', err)
    }
  }
  //图片路径拼接
  getIcon(icon: string) {
    try {
      return require(`@/assets/images/${icon}`);
    } catch (e) {
      return "";
    }
  }
  resetForm(formName: any) {
    let personFrom: any = this.$refs[formName];
    personFrom.resetFields();
  }
}
</script>
<style lang="scss" scoped>
.Login {
  max-width: 100vw;
  min-width: 1200px;
  min-height: 100vh;
  display: flex;
  .leftbox {
    flex: 1;
    min-width: 600px;
    background-image: url(~@/assets/images/leftimg.png);
    background-size: cover;
    background-position: center center;
  }
  .rightbox {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .innerbox {
      .logoimg {
        width: 100%;
        margin: 0 auto 50px;
        img {
          display: block;
          width: 314px;
          height: 172px;
        }
      }
      .loginText {
        text-align: center;
        font-size: 30px;
        font-weight: 400;
        margin-bottom: 30px;
        color: rgba(51, 51, 51, 1);
      }
      ::v-deep .btnItem {
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
