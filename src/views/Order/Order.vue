<template>
  <div class="Order">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="order_main">
      <el-table :data="orderList" style="width: 100%">
        <el-table-column
          prop="order_number"
          width="210"
          label="订单编号"
        ></el-table-column>
        <el-table-column
          prop="order_price"
          label="订单价格（元）"
        ></el-table-column>
        <el-table-column prop="is_send" label="是否发送"></el-table-column>
        <el-table-column prop="order_id" label="订单id"></el-table-column>
        <el-table-column prop="create_time" label="下单时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="openEditDialog(scope.row)"
              type="primary"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑订单 -->
    <el-dialog
      title="编辑订单"
      :close-on-click-modal="false"
      :visible.sync="showEditOrderDialog"
    >
      <el-form
        :model="editOrderForm"
        :rules="editOrderRules"
        ref="dtbRolesRules"
        class="demo-ruleForm"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="editOrderForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="editOrderForm.username"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditOrderDialog = false">取 消</el-button>
        <el-button type="primary" @click="ensureEditOrder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import axios from "axios";
@Component({
  name: "Order",
  components: {}
})
export default class Order extends Vue {
  orderList: any[] = [];
  pagesize: number = 10;
  pagenum: number = 1;
  showEditOrderDialog: boolean = false;
  perOrderLineData: object = {};
  editOrderForm: object = {};
  editOrderRules: object = {};
  created() {
    this.getOrderList();
  }
  async getOrderList(pagesize: number = 10, pagenum: number = 1) {
    try {
      const res = await axios.get("/orders", {
        params: {
          pagenum,
          pagesize
        },
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      this.orderList = res.data.data.goods;
      console.log("orderList", this.orderList);
    } catch (error) {
      console.log(error);
    }
  }
  openEditDialog(data: any) {
    console.log("perOrderLineData", data);
    this.perOrderLineData = data;
    console.log(this.perOrderLineData);
    this.showEditOrderDialog = true;
  }
  ensureEditOrder() {}
}
</script>
<style lang="scss">
.Order {
  .order_main {
    margin-top: 20px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px #1169ac1a;
    border-radius: 5px;
  }
}
</style>
