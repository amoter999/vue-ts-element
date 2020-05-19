<template>
  <div class="Role">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="role-main">
      <el-table :data="rolesList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="level1 in scope.row.children" class="expandCont" :key="level1.id">
              <el-col :span="4">
                <el-tag closable class="mbot">{{level1.authName}}</el-tag>
                <i class="el-icon-arrow-right rightArrow1"></i>
              </el-col>
              <el-col :span="20">
                <el-row class="perRow" v-for="level2 in level1.children" :key="level2.id">
                  <el-col :span="4">
                    <el-tag closable type="warning">{{level2.authName}}</el-tag>
                    <i class="el-icon-arrow-right rightArrow"></i>
                  </el-col>
                  <el-col :span="20">
                    <el-tag
                      closable
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
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" min-width="260px">
          <el-button size="mini" icon="el-icon-edit-outline">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
          <el-button size="mini" type="success" icon="el-icon-thumb">分配角色</el-button>
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
  name: "Role",
  components: {}
})
export default class Role extends Vue {
  rolesList: any[] = [];
  created() {
    this.getRoleList();
  }
  async getRoleList() {
    const res = await axios.get("/roles");
    console.log(res.data);
    this.rolesList = res.data.data;
  }
}
</script>
<style lang="scss">
.Role {
  .role-main {
    margin-top: 20px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px #1169ac1a;
    border-radius: 5px;
    .perRow {
      margin-top: 5px;
      padding-left: 40px;
      box-sizing: border-box;
    }
    .expandCont {
      margin-top: 12px;
      padding-left: 35px;
      box-sizing: border-box;
    }
    .perTag {
      margin-right: 5px;
    }
    .rightArrow {
      margin-left: 30px;
    }
    .rightArrow1 {
      margin-left: 80px;
    }
  }
}
</style>