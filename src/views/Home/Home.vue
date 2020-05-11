<template>
  <div class="Home">
    <el-container class="home-container">
      <el-header class="home-header">
        <div class="left-header">
          <img :src="getIcon(assetImgs.logoImg)" class="logoImg" alt />
        </div>
        <div class="right-header">
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#fff"
            text-color="#999"
            active-text-color="#333"
          >
            <el-submenu index="1">
              <template slot="title">
                <div class="avatar">
                  <img :src="getIcon(assetImgs.avatarImg)" alt />
                </div>
              </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="home-aside">Aside</el-aside>
        <el-main class="home-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
@Component({
  name: "Home",
  components: {}
})
export default class Home extends Vue {
  assetImgs: object = {
    logoImg: "login-logoimg.jpg",
    avatarImg: "default_header.png"
  };
  //图片路径拼接
  handleSelect() {}
  getIcon(icon: string) {
    try {
      return require(`@/assets/images/${icon}`);
    } catch (e) {
      return "";
    }
  }
}
</script>
<style lang="scss" scoped>
.Home,
.home-container {
  max-width: 100vw;
  min-height: 100vh;
  .home-header {
    height: 60px;
    .left-header {
      float: left;
      .logoImg {
        width: 80px;
      }
    }
    .right-header {
      float: right;
      .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
        border-bottom: none;
      }
      .el-menu--horizontal > .el-submenu .el-submenu__title {
        border-bottom: 0;
      }
      .avatar {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        float: left;
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  .home-aside {
    background-color: #f91;
    background-color: rgba(255, 0, 0, 0.1);
  }
  .home-main {
    background-color: rgba(0, 255, 0, 0.1);
  }
}
</style>