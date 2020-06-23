<template>
  <div class="Categary">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="cate_main">
      <el-table :data="cateList" style="width: 100%">
        <el-table-column width="50px" type="index"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)"></el-table-column>
        <el-table-column prop="goods_number" label="商品数量(个)"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量(kg)"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="delThisGood(scope.row)"
            >删除</el-button>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editThisGood(scope.row)"
            >编辑</el-button>
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
  name: "Categary",
  components: {}
})
export default class Categary extends Vue {
  cateList: any[] = [];
  created() {
    this.getCategory();
  }
  async getCategory() {
    const res = await axios.get("/categories");
  }
}
</script>
<style lang="scss">
.Categary {
  .cate_main {
    margin-top: 20px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px #1169ac1a;
    border-radius: 5px;
  }
}
</style>
