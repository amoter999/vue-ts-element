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
      <el-table :data="rolesList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope" v-if="scope.row.children">
            <el-row v-for="level1 in scope.row.children" class="expandCont" :key="level1.id">
              <el-col :span="4" class="lrlayout padTop">
                <el-tag :closable="true" class="mbot">{{level1.authName}}</el-tag>
                <i class="el-icon-arrow-right rightArrow1"></i>
              </el-col>
              <el-col :span="20">
                <el-row class="perRow" v-for="level2 in level1.children" :key="level2.id">
                  <el-col :span="4" class="lrlayout">
                    <el-tag :closable="true" type="warning">{{level2.authName}}</el-tag>
                    <i class="el-icon-arrow-right rightArrow"></i>
                  </el-col>
                  <el-col :span="20" class="padleft20">
                    <el-tag
                      :closable="true"
                      class="perTag"
                      type="success"
                      v-for="level3 in level2.children"
                      :key="level3.id"
                    >{{level3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column width="50px" type="index"></el-table-column>
        <el-table-column prop="roleName" label="权限名称"></el-table-column>
        <el-table-column prop="roleDesc" label="路径"></el-table-column>
        <el-table-column prop="roleDesc" label="层级">
          <template slot="scope"></template>
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
  created() {}
}
</script>
<style lang="scss">
.Rights {
}
</style>