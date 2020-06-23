<template>
  <div class="Data">
    <div class="data_main">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :xs="0" :sm="12" :md="8" :lg="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :xs="0" :sm="0" :md="8" :lg="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :xs="0" :sm="0" :md="0" :lg="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
@Component({
  name: "Data",
  components: {}
})
export default class Data extends Vue {}
</script>
<style lang="scss">
.Data {
  .grid-content {
    width: 100%;
    height: 40px;
    &.bg-purple {
      background-color: purple;
    }
    &.bg-purple-light {
      background-color: lightblue;
    }
  }
}
</style>
