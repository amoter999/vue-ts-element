<template>
  <div class="AddGood">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="addgood-main">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
      <div class="tabMain">
        <el-tabs :tab-position="tabPosition" v-model="tabActive">
          <el-tab-pane label="基础信息" disabled name="baseinfo">
            <el-form ref="form" :model="goodForm" label-width="80px">
              <el-form-item label="商品名称">
                <el-input v-model="goodForm.goods_name" placeholder="请输入商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品价格">
                <el-input v-model="goodForm.goods_price" placeholder="请输入商品价格"></el-input>
              </el-form-item>
              <el-form-item label="商品数量">
                <el-input v-model="goodForm.goods_number" placeholder="请输入商品数量"></el-input>
              </el-form-item>
              <el-form-item label="商品重量">
                <el-input v-model="goodForm.goods_weight" placeholder="请输入商品重量"></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <el-switch v-model="goodForm.goods_cat"></el-switch>
              </el-form-item>
              <el-form-item label="是否促销">
                <el-switch v-model="goodForm.is_promote"></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="next(1,'goodpic')">下一步</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品图片" disabled name="goodpic">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" disabled name="goodcont">商品内容</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
@Component({
  name: "AddGood",
  components: {}
})
export default class AddGood extends Vue {
  active: number = 0;
  tabPosition: string = "left";
  tabActive: string = "baseinfo";
  goodForm: any = {};
  next(step: number, tab: string) {
    this.active = step;
    this.tabActive = tab;
  }
}
</script>
<style lang="scss">
.AddGood {
  .addgood-main {
    margin-top: 20px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px #1169ac1a;
    border-radius: 5px;
    .tabMain {
      margin-top: 30px;
      .el-tabs--left .el-tabs__header.is-left {
        margin-right: 15px;
      }
    }
  }
}
</style>
