<template>
  <div class="AddGood">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods' }"
          >商品列表</el-breadcrumb-item
        >
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="addgood-main">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step
          title="第一步"
          description="基础信息"
          icon="el-icon-setting"
        ></el-step>
        <el-step
          title="第二步"
          description="商品图片"
          icon="el-icon-picture"
        ></el-step>
        <el-step
          title="第三步"
          description="商品内容"
          icon="el-icon-edit-outline"
        ></el-step>
      </el-steps>
      <div class="tabMain">
        <el-tabs :tab-position="tabPosition" v-model="tabActive">
          <el-tab-pane label="基础信息" disabled name="baseinfo">
            <div class="tipText">请填写商品的基础信息</div>
            <el-form ref="form" :model="goodForm" label-width="80px">
              <el-form-item label="商品名称">
                <el-input
                  v-model="goodForm.goods_name"
                  placeholder="请输入商品名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品价格">
                <el-input
                  v-model="goodForm.goods_price"
                  placeholder="请输入商品价格"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品数量">
                <el-input
                  v-model="goodForm.goods_number"
                  placeholder="请输入商品数量"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品重量">
                <el-input
                  v-model="goodForm.goods_weight"
                  placeholder="请输入商品重量"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <el-cascader
                  v-model="value"
                  :options="cateOptionList"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="是否促销">
                <el-switch v-model="goodForm.is_promote"></el-switch>
              </el-form-item>
              <div class="btns">
                <el-button type="primary" @click="back(-1)" plain
                  >返回</el-button
                >
                <el-button type="primary" @click="next(1, 'goodpic')"
                  >下一步</el-button
                >
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品图片" disabled name="goodpic">
            <div class="tipText">请上传需要的商品图片</div>
            <el-upload
              :action="submitUrl"
              class="submitPic"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <div class="btns">
              <el-button type="primary" @click="back(0, 'baseinfo')" plain
                >返回</el-button
              >
              <el-button type="primary" @click="next(2, 'goodcont')"
                >下一步</el-button
              >
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品内容" disabled name="goodcont">
            <div class="tipText">请填写商品描述内容</div>
            <div class="btns">
              <el-button type="primary" @click="back(1, 'goodpic')" plain
                >返回</el-button
              >
              <el-button type="primary" @click="finish">完成</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import axios from "axios";
@Component({
  name: "AddGood",
  components: {}
})
export default class AddGood extends Vue {
  active: number = 0;
  tabPosition: string = "left";
  tabActive: string = "baseinfo";
  submitUrl: string = "http://localhost:8888/api/private/v1/upload";
  goodForm: any = {
    goods_name: "",
    goods_price: "",
    goods_number: "",
    goods_weight: "",
    goods_cat: "",
    is_promote: false,
    pic: [],
    goods_introduct: ""
  };
  cateOptionList: object[] = [];
  dialogImageUrl: string = "";
  dialogVisible: boolean = false;
  created() {
    this.getCateOptionList();
  }
  async getCateOptionList() {
    const res = await axios.get("/categories", {
      params: {
        type: 3
      }
    });
    console.log(res);
  }
  next(step: number, tab: string) {
    this.active = step;
    this.tabActive = tab;
  }
  back(step: number, tabNum: string) {
    if (step !== -1) {
      this.active = step;
      this.tabActive = tabNum;
    } else {
      this.$router.back();
    }
  }
  finish() {
    console.log(666);
  }
  handlePictureCardPreview(file: any) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }
  handleRemove(file: any, fileList: any) {}
  handleChange() {}
}
</script>
<style lang="scss" scoped>
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
      .el-upload-list {
        padding-left: 12px;
      }
      .el-form-item:last-child {
        margin-bottom: 0;
      }
      .tipText {
        color: #666;
        font-size: 16px;
        font-weight: 700;
        padding: 0 12px 40px;
      }
      .btns {
        padding: 30px 12px 20px;
        box-sizing: border-box;
      }
      .submitPic {
        padding-left: 12px;
      }
      .el-tab-pane {
        min-height: 400px;
        max-width: 500px;
      }
    }
  }
}
</style>
