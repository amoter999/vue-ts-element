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
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" min-width="260px">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-edit-outline">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="showDelDialog(scope.row.id)"
            >删除</el-button>
            <el-button
              size="mini"
              type="success"
              icon="el-icon-thumb"
              @click="showDtbRolesDialog(scope.row)"
            >分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="分配权限" :close-on-click-modal="false" center :visible.sync="showDtbRoleDialog">
      <el-tree
        ref="tree"
        :data="rightTree"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
      ></el-tree>

      <!-- :props="defaultProps" -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDtbRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="ensureDtbRole">确 定</el-button>
      </div>
    </el-dialog>
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
  showDtbRoleDialog: boolean = false;
  rightTree: any[] = [];
  roleId: number = -1;
  defaultProps: object = {
    children: "children",
    label: "authName"
  };
  delId: number = -1;
  created() {
    this.getRoleList();
    this.getRightTree();
  }
  async getRoleList() {
    const res = await axios.get("/roles");
    console.log(res.data);
    this.rolesList = res.data.data;
  }
  async getRightTree() {
    const res = await axios.get("/rights/tree");
    this.rightTree = res.data.data;
    // console.log(this.rightTree);
  }
  // 删除弹框显示
  showDelDialog(id: number) {
    let that: any = this;
    that
      .$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        axios
          .delete(`/roles/${id}`, {
            headers: {
              Authorization: sessionStorage.getItem("token")
            }
          })
          .then(res => {
            this.getRoleList();
            that.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
  }
  // 分配角色弹框显示
  showDtbRolesDialog(obj: any) {
    this.showDtbRoleDialog = true;
    this.roleId = obj.id;
    console.log(obj);
    this.$nextTick(() => {
      let rightCheckTree: any = [];
      obj.children.forEach((item1: any) => {
        item1.children.forEach((item2: any) => {
          item2.children.forEach((item3: any) => {
            rightCheckTree.push(item3.id);
          });
        });
      });
      let setTree: any = this.$refs["tree"];
      setTree.setCheckedKeys(rightCheckTree);
    });
  }
  // 确认分配角色
  async ensureDtbRole() {
    let setTree: any = this.$refs["tree"];
    let checkKeys = setTree.getCheckedKeys();
    let halfCheckKeys = setTree.getHalfCheckedKeys();
    let allCheckKeys = [...checkKeys, ...halfCheckKeys];
    let allCheckId: any[] = [];
    allCheckKeys.forEach((ele: any) => {
      allCheckId.push(ele);
    });
    const res = await axios.post(`/roles/${this.roleId}/rights`, {
      rids: allCheckId.join(",")
    });
    let that: any = this;
    const { status, msg } = res.data.meta;
    if (status === 200) {
      that.$message({
        type: "success",
        message: msg
      });
      this.showDtbRoleDialog = false;
      this.getRoleList();
    }
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
      margin-top: 8px;
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
      margin-bottom: 5px;
    }
    .rightArrow {
      margin-left: 30px;
    }
    .rightArrow1 {
      margin-left: 80px;
    }
    .lrlayout {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-right: 20px;
    }
    .padTop {
      padding-top: 6px;
      box-sizing: border-box;
    }
    .padleft20 {
      padding-left: 50px;
    }
    .dialog-footer {
      text-align: center;
    }
  }
}
</style>