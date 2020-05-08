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
              <el-form-item prop="name">
                <el-input
                  size="medium"
                  placeholder="请输入用户名"
                  suffix-icon="el-icon-user"
                  v-model="person.name"
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
    name: "",
    password: ""
  };
  rules: object = {
    name: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
    ],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };
  submitForm(formName: any) {
    console.log(formName);
    let personFrom: any = this.$refs[formName];
    personFrom.validate((valid: any) => {
      if (valid) {
        alert("submit!");
      } else {
        console.log("error submit!!");
        return false;
      }
    });
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
