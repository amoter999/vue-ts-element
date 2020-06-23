<template>
  <div class="Home">
    <el-container class="home-container">
      <el-header class="home-header">
        <div class="left-header">
          <img :src="getIcon(assetImgs.logoImg)" class="logoImg" alt />
        </div>
        <div class="right-header">
          <div class="left-head-Icon">
            <i class="el-icon-s-unfold" @click="clickCollapse"></i>
          </div>
          <div class="right-head-cont">
            <el-dropdown @command="handleCommand" trigger="click">
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
        <el-aside class="home-aside" width="auto">
          <!-- -->
          <el-menu
            :unique-opened="true"
            :router="true"
            :style="{ width: setSideWidth }"
            @open="handleOpen"
            :default-active="defaultActive"
            :collapse-transition="false"
            :collapse="isCollapse"
            @close="handleClose"
          >
            <el-submenu
              :index="floorItem1.id + ''"
              v-for="floorItem1 in menuList"
              :key="floorItem1.id"
            >
              <template slot="title">
                <i v-if="floorItem1.id === 125" class="el-icon-user"></i>

                <i v-else-if="floorItem1.id === 103" class="el-icon-set-up"></i>
                <i v-else-if="floorItem1.id === 101" class="el-icon-collection-tag"></i>
                <i v-else-if="floorItem1.id === 102" class="el-icon-notebook-1"></i>
                <i v-else-if="floorItem1.id === 145" class="el-icon-data-board"></i>

                <span>{{ floorItem1.authName }}</span>
              </template>
              <el-menu-item
                v-for="floorItem2 in floorItem1.children"
                :key="floorItem2.id"
                :index="'/' + floorItem2.path"
              >
                <i v-if="floorItem2.id === 110" class="el-icon-s-order"></i>
                <i v-else-if="floorItem2.id === 111" class="el-icon-coin"></i>
                <i v-else-if="floorItem2.id === 112" class="el-icon-house"></i>
                <i v-else-if="floorItem2.id === 104" class="el-icon-collection"></i>
                <i v-else-if="floorItem2.id === 115" class="el-icon-suitcase"></i>
                <i v-else-if="floorItem2.id === 121" class="el-icon-school"></i>
                <i v-else-if="floorItem2.id === 107" class="el-icon-shopping-cart-full"></i>
                <i v-else-if="floorItem2.id === 146" class="el-icon-data-analysis"></i>
                <!-- <i v-if="floorItem2.id === 111" class="el-icon-coin"></i> -->
                <!-- 
                  <i v-if="floorItem2.id === 110" class="el-icon-s-order"></i>
                  <i v-if="floorItem2.id === 110" class="el-icon-s-order"></i>
                  <i v-if="floorItem2.id === 110" class="el-icon-s-order"></i>
                <i v-if="floorItem2.id === 110" class="el-icon-s-order"></i>-->
                <span>{{ floorItem2.authName }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <!-- <div class="inner-home-aside"></div> -->
        </el-aside>
        <el-main class="home-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { Vue, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import axios from "axios";
@Component({
  name: "Home",
  components: {}
})
export default class Home extends Vue {
  assetImgs: object = {
    logoImg: "login-logoimg.png",
    avatarImg: "default_header.png"
  };
  menuList: any[] = [];
  isCollapse: boolean = false;
  isStart: boolean = false;
  setSideWidth: string = "200px";
  defaultActive: string = "";
  clickCollapse() {
    this.isCollapse = !this.isCollapse;
    this.isCollapse
      ? (this.setSideWidth = "auto")
      : (this.setSideWidth = "200px");
  }
  @Watch("$route")
  routeChange(val: any, oldVal: any) {
    this.defaultActive = val.path;
  }
  //图片路径拼接
  handleCommand(command: any) {
    if (command === "logout") {
      this.logout();
    } else if (command === "profile") {
      this.$router.push({
        name: "profile"
      });
    }
  }
  created() {
    this.getMenuList();
  }
  handleOpen() {}
  handleClose() {}
  // clickThisEnter(path: string) {
  //   this.$router.push({
  //     name: path
  //   });
  // }
  logout() {
    let that: any = this;
    that
      .$confirm("此操作将会退出您所在的系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        sessionStorage.removeItem("token");
        this.$router.replace({
          name: "login"
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
  async getMenuList() {
    const res = await axios.get("/menus");
    console.log(res);
    this.menuList = res.data.data;
    console.log("this.menuList", this.menuList);
    this.defaultActive = location.href.split("#")[1];
    // console.log("arr", arr);
    //
  }
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
      width: 160px;
      height: 100%;
      float: left;
      margin-right: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      .logoImg {
        width: 100px;
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
    min-height: 100%;
    .inner-home-aside {
      height: 100%;
      background-color: #fff;
      box-shadow: 0px 0px 20px 0px rgba(17, 105, 172, 0.1);
    }
    .el-submenu .el-menu-item {
      min-width: auto;
    }
    .el-menu {
      border-right: 0;
      .el-menu-item {
        user-select: none;
      }
    }
  }
  .home-main {
    background-color: #f5f5f5;
    // padding-left: 0;
  }
}
</style>
