<template>
  <div class="Rights">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="rightsMain">
      <el-table :data="rightList" style="width: 100%" stripe>
        <el-table-column width="50px" type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="层级">
          <template slot-scope="scope">
            <span v-if="scope.row.level === '0'">一级</span>
            <span v-else-if="scope.row.level === '1'">二级</span>
            <span v-else-if="scope.row.level === '2'">三级</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import axios from "axios";
@Component({
  name: "Rights",
  components: {}
})
export default class Rights extends Vue {
  rightList: any = [];
  created() {
    this.getRightLists();
  }
  async getRightLists() {
    const res = await axios.get("/rights/list");
    console.log("getRightLists", res);
    this.rightList = res.data.data;
  }
}
</script>
<style lang="scss">
.Rights {
  .rightsMain {
    margin-top: 20px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px #1169ac1a;
    border-radius: 5px;
  }
}
</style>
