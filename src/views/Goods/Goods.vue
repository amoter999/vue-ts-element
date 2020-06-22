<template>
  <div class="Goods">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="goods-main">
      <div class="btns">
        <el-input
          placeholder="这里的输入框就是摆设"
          class="input-with-select se-input"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" plain @click="enterAddGoodPage"
          >添加新商品</el-button
        >
      </div>
      <el-table :data="goodList" style="width: 100%">
        <el-table-column width="50px" type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格(元)"
        ></el-table-column>
        <el-table-column
          prop="goods_number"
          label="商品数量(个)"
        ></el-table-column>
        <el-table-column
          prop="goods_weight"
          label="商品重量(kg)"
        ></el-table-column>
        <el-table-column
          prop="add_time"
          :formatter="dateFormat"
          label="创建时间"
        ></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="delThisGood(scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editThisGood(scope.row)"
              >编辑</el-button
            >
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
    <el-dialog
      title="编辑商品"
      :close-on-click-modal="false"
      :visible.sync="isShowEditDialog"
    >
      <el-form
        :model="editForm"
        class="demo-ruleForm"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="商品名称">
          <el-input type="text" v-model="editForm.goodName"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input type="text" v-model="editForm.goodsPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input type="text" v-model="editForm.goodsNumber"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input type="text" v-model="editForm.goodsWeight"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input type="text" v-model="editForm.createdTime"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="ensureModUserInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import axios from "axios";
import dayjs from "dayjs";
@Component({
  name: "Goods",
  components: {}
})
export default class Goods extends Vue {
  goodList: any = [];
  totalNum: number = 0;
  currentPage: number = 1;
  pageSize: number = 6;
  isShowEditDialog: boolean = false;
  editForm: any = {};
  created() {
    this.getGoodList();
  }
  // 删除商品
  delThisGood(obj: any) {
    // console.log(obj);
    let that: any = this;
    that
      .$confirm("此操作将永久删除该条商品数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        let goodId = obj["goods_id"];
        axios
          .delete(`/goods/${goodId}`)
          .then(res => {
            this.getGoodList();
            that.$message({
              type: "success",
              message: res.data.meta.msg
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(() => {
        console.log("取消");
      });
  }
  // 编辑商品
  editThisGood(obj: any) {
    this.isShowEditDialog = true;
    console.log(obj);
    const {} = obj;
  }
  // 确认编辑商品
  ensureModUserInfo() {
    this.isShowEditDialog = false;
  }
  // 分页
  pageChange(pageNum: number) {
    this.getGoodList(pageNum);
  }
  dateFormat(row: any, column: any) {
    var date = row[column.property];
    if (date == undefined) {
      return "";
    }
    console.log("created date", date);
    return dayjs(date).format("YYYY年MM月DD日 HH:mm:ss");
  }
  enterAddGoodPage() {
    this.$router.push({
      name: "addgood"
    });
  }
  // 获取商品列表
  async getGoodList(curPage: any = 1) {
    let config = {
      params: {
        pagenum: curPage,
        pagesize: this.pageSize
      },
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    };
    const res = await axios.get("/goods", config);
    console.log("getGoodList", res.data);
    this.goodList = res.data.data.goods;
    this.totalNum = res.data.data.total;
  }
}
</script>
<style lang="scss">
.Goods {
  .goods-main {
    margin-top: 20px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px #1169ac1a;
    border-radius: 5px;
    .paginate {
      margin-top: 20px;
      text-align: center;
    }
    .btns {
      // text-align: right;
      .se-input {
        width: 300px;
        margin-right: 15px;
      }
    }
  }
}
</style>
