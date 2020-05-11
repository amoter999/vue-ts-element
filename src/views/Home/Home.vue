<template>
  <div class="Home">
    <el-container class="home-container">
      <el-header class="home-header">
        <div class="left">
          <img :src="getIcon()" alt />
        </div>
        <div class="right"></div>
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
  //图片路径拼接
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
    background-color: skyblue;
  }
  .home-aside {
    background-color: #f91;
  }
  .home-main {
    background-color: limegreen;
  }
}
</style>