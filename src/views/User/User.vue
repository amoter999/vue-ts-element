<template>
  <div class="userManage">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="user-main">
      <div class="search-sec">
        <el-input placeholder="请输入姓名进行搜索" v-model="searchCont" class="input-with-select se-input">
          <el-button slot="append" icon="el-icon-search" @click.enter="searchRes"></el-button>
        </el-input>
        <el-button type="primary" @click="addUserInfo">添加用户</el-button>
      </div>
      <div class="userList">
        <el-table :data="userInfoList" stripe style="width: 100%" :border="true">
          <!-- <el-table-column type="index"></el-table-column> -->
          <el-table-column label="姓名" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column label="邮箱" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户状态" width="180">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.mg_state" :disabled="true"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="300">
            <template slot-scope="scope">
              <el-button size="mini" @click="editUserInfo(scope.row)" icon="el-icon-edit-outline">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                :disabled="scope.row.id===500"
                @click="delThisUser(scope.row.id)"
              >删除</el-button>
              <el-button
                size="mini"
                type="success"
                icon="el-icon-thumb"
                :disabled="scope.row.id===500"
                @click="dtbRoles(scope.row)"
              >分配角色</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginate">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalNum"
            :current-page="currentPage"
            :page-size="pageSize"
            @current-change="pageChange"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :close-on-click-modal="false" :visible.sync="showAddDialog">
      <el-form
        :model="addForm"
        :rules="addUserRule"
        ref="addForm"
        class="demo-ruleForm"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input type="text" v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="ensureAddUserInfo">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :close-on-click-modal="false" :visible.sync="showEditDialog">
      <el-form :model="editForm" class="demo-ruleForm" label-width="80px" label-position="left">
        <el-form-item label="用户名">
          <el-input type="text" disabled v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input type="text" v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input type="text" v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="ensureModUserInfo">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :close-on-click-modal="false" :visible.sync="showDtbRoleDialog">
      <el-form
        :model="dtbForm"
        :rules="dtbRolesRules"
        ref="dtbRolesRules"
        class="demo-ruleForm"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="dtbForm.username"></el-input>
        </el-form-item>
        <el-form-item label="角色选择" prop="chooseRole">
          <el-select v-model="dtbForm.chooseRole" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDtbRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="ensureDtbRoles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import axios from "axios";
@Component({
  name: "userManage",
  components: {}
})
export default class userManage extends Vue {
  searchCont: string = "";
  userInfoList: object[] = [];
  totalNum: number = 0;
  currentPage: number = 1;
  pageSize: number = 6;
  showEditDialog: boolean = false;
  showAddDialog: boolean = false;
  showDtbRoleDialog: boolean = false;
  roleList: any[] = [];
  editForm: any = {};
  addForm: any = {};
  dtbForm: any = {
    chooseRole: 0
  };

  addUserId: string = "";
  addUserRule: object = {
    username: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 12, message: "用户名的长度为3-12个字符", trigger: "blur" }
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 12, message: "密码长度为6-12个字符", trigger: "blur" }
    ],
    email: [
      { required: true, message: "请输入邮箱", trigger: "blur" },
      {
        pattern: /^[0-9-]{15}$/,
        message: "邮箱格式不正确",
        trigger: "blur"
      }
    ],
    mobile: [
      { required: true, message: "请输入手机号码", trigger: "blur" },
      {
        pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
        message: "手机号码格式不正确",
        trigger: "blur"
      }
    ]
  };
  dtbRolesRules: object = {};
  created() {
    this.getUserList();
    this.getAllRoles();
  }

  // 按照条件进行搜索
  searchRes() {
    this.getUserList(1, this.searchCont);
  }
  // 删除某个用户
  delThisUser(id: string) {
    let that: any = this;
    that
      .$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        axios
          .delete("/users/" + id, {
            headers: {
              Authorization: sessionStorage.getItem("token")
            }
          })
          .then(res => {
            that.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getUserList(1, this.searchCont);
          });
      });
  }
  // 编辑用户打开模态框
  editUserInfo(obj: object) {
    console.log("obj", obj);
    this.showEditDialog = true;
    this.editForm = obj;
  }
  // 确认编辑用户
  ensureModUserInfo() {
    axios
      .put("/users/" + this.editForm.id, {
        email: this.editForm.email,
        mobile: this.editForm.mobile
      })
      .then(res => {
        console.log(res);
        this.showEditDialog = false;
        this.getUserList();
      })
      .catch(err => {
        console.log(err);
      });
  }
  // 添加用户打开模态框
  addUserInfo(id: string) {
    this.showAddDialog = true;
  }
  // 确认添加用户
  async ensureAddUserInfo() {
    let addForm: any = this.$refs["addForm"];
    addForm.validate();
    const res = await axios.post("/users", this.addForm);
    let that: any = this;
    const { status, msg: message } = res.data.meta;
    if (status === 201) {
      // 关闭添加用户对话框
      // 重新刷新页面中的列表
      that.getUserList();
      let curPage = Math.ceil((+this.totalNum + 1) / this.pageSize);
      that.pageChange(curPage);
      that.showAddDialog = false;
      // 提示用户添加用户成功
      that.$message({
        message: message,
        type: "success"
      });
    } else {
      that.$message({
        message: message,
        type: "warning"
      });
    }
  }
  // 分页变化触发的函数
  pageChange(val: any) {
    this.getUserList(val, this.searchCont);
  }
  // 分配角色模态框
  async dtbRoles(obj: any) {
    this.showDtbRoleDialog = true;
    console.log("============", obj);
    console.log("dtbForm", this.dtbForm);
    const res = await axios.get(`/users/${obj.id}`);
    this.dtbForm = { ...this.dtbForm, ...obj };
    this.dtbForm.chooseRole = res.data.data.rid;
  }
  async ensureDtbRoles() {
    const { id, chooseRole } = this.dtbForm;
    let that: any = this;
    if (!this.dtbForm.chooseRole) {
      that.$message({
        message: "请选择该用户的角色",
        type: "warning"
      });
    } else {
      const res = await axios.put(`/users/${id}/role`, { rid: chooseRole });
      const { msg, status } = res.data.meta;
      if (status === 200) {
        this.showDtbRoleDialog = false;
        this.getUserList();
        that.$message({
          message: msg,
          type: "warning"
        });
      } else {
        that.$message({
          message: msg,
          type: "warning"
        });
        return;
      }
    }
  }
  // 获取全部的用户列表
  getUserList(pagenum: number = 1, query: string = "") {
    let config = {
      params: {
        pagenum,
        query,
        pagesize: this.pageSize
      },
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    };
    let that: any = this;
    axios
      .get("/users", config)
      .then(res => {
        const { users, total, pagenum } = res.data.data;
        this.userInfoList = users;
        this.totalNum = total;
        this.currentPage = pagenum;
        if (!res.data.data) {
          that.$message({
            message: res.data.meta.msg,
            type: "warning"
          });
        }
      })
      .catch(err => {});
  }
  // 获取全部的角色信息
  async getAllRoles() {
    const res = await axios.get("/roles");
    // console.log("角色信息", res);
    this.roleList = res.data.data;
    console.log("roleList", this.roleList);
  }
}
</script>
<style lang="scss">
.userManage {
  .user-main {
    margin-top: 20px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(17, 105, 172, 0.1);
    border-radius: 5px;
    .search-sec {
      width: 100%;
      .se-input {
        width: 300px;
        margin-right: 15px;
      }
    }
    .userList {
      margin-top: 15px;
      .paginate {
        margin-top: 20px;
        text-align: center;
      }
    }
    .el-table th > .cell {
      text-align: center;
    }
    .el-table .cell {
      text-align: center;
    }
  }
  .el-dialog__body {
    padding: 30px 40px;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>