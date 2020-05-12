<template>
  <div class="Home">
    <el-container class="home-container">
      <el-header class="home-header">
        <div class="left-header">
          <img :src="getIcon(assetImgs.logoImg)" class="logoImg" alt />
        </div>
        <div class="right-header">
          <div class="left-head-Icon">
            <i class="el-icon-s-unfold"></i>
          </div>
          <div class="right-head-cont">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <img :src="getIcon(assetImgs.avatarImg)" class="avatarImg" alt />
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" :split-button="true">
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout" @click="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="home-aside">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
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
  handleCommand(command: any) {
    if (command === "logout") {
      this.logout();
    } else if (command === "profile") {
      this.$router.push({
        name: "Profile"
      });
    }
  }
  handleOpen() {}
  handleClose() {}
  logout() {
    let that: any = this;
    that
      .$confirm("此操作将会退出您所在的系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        localStorage.removeItem("token");
        this.$router.replace({
          name: "Login"
        });
        that.$message({
          type: "success",
          message: "退出成功!"
        });
      })
      .catch(() => {
        that.$message({
          type: "info",
          message: "取消退出"
        });
      });
  }
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
    border-bottom: 1px solid #efefef;
    .left-header {
      width: 180px;
      height: 100%;
      float: left;
      padding-right: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      .logoImg {
        width: 80px;
      }
    }
    .el-menu--horizontal > .el-submenu .el-submenu__title {
      border-bottom: 0;
    }
    .right-header {
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      .left-head-Icon {
        padding-top: 4px;
        line-height: 60px;
        i {
          font-size: 24px;
        }
      }
      .right-head-cont {
        .el-dropdown {
          height: 100%;
          line-height: 60px;
        }
        .el-dropdown-link {
          cursor: pointer;
          color: #409eff;
          .avatarImg {
            border-radius: 50%;
            width: 48px;
            height: 48px;
            vertical-align: middle;
            margin-right: 6px;
          }
        }
        .el-icon-arrow-down {
          font-size: 12px;
        }
      }
      .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
        border-bottom: 0;
        border-bottom-color: rgba(0, 0, 0, 0) !important;
      }

      .el-menu--horizontal > .el-submenu .el-submenu__title {
        border-bottom: 0;
      }
      .el-menu.el-menu--horizontal {
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
    background-color: #fff;
    box-shadow: 0px 0px 20px 0px rgba(17, 105, 172, 0.1);
    .el-menu {
      border-right: 0;
    }
  }
  .home-main {
    background-color: #fff;
  }
}
</style>