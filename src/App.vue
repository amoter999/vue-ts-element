<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>
@import url("./assets/css/normalize.css");
html,
body,
#app {
  max-width: 100vw;
  min-height: 100vh;
}
.el-cascader-panel {
  height: 300px;
}
</style>
