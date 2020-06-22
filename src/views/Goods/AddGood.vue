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
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="第一步" description="基础信息" icon="el-icon-setting"></el-step>
        <el-step title="第二步" description="商品图片" icon="el-icon-picture"></el-step>
        <el-step title="第三步" description="商品内容" icon="el-icon-edit-outline"></el-step>
      </el-steps>
      <div class="tabMain">
        <el-tabs :tab-position="tabPosition" v-model="tabActive">
          <el-tab-pane label="基础信息" disabled name="baseinfo">
            <div class="tipText">请填写商品的基础信息</div>
            <el-form :rules="addGoodRules" :model="goodForm" ref="addGoodRules" label-width="100px">
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="goodForm.goods_name" placeholder="请输入商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" class="cateItem" prop="goods_cat">
                <el-cascader
                  v-model="goodForm.goods_cat"
                  :options="cateOptionList"
                  :props="{ label: 'cat_name', value: 'cat_id' }"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="是否促销" prop="is_promote">
                <el-switch v-model="goodForm.is_promote"></el-switch>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input v-model="goodForm.goods_price" placeholder="请输入商品价格" type="number"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input type="number" v-model="goodForm.goods_number" placeholder="请输入商品数量"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input type="number" v-model="goodForm.goods_weight" placeholder="请输入商品重量"></el-input>
              </el-form-item>
              <div class="btns">
                <el-button type="primary" @click="back(-1)" plain>返回</el-button>
                <el-button type="primary" @click="next(1, 'goodpic')">下一步</el-button>
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品图片" disabled name="goodpic">
            <div class="tipText">请上传需要的商品图片</div>
            <el-upload
              :action="submitUrl"
              class="submitPic"
              list-type="picture-card"
              :file-list="picList"
              :on-preview="handlePictureCardPreview"
              :headers="uploadHeader"
              :on-success="succeedUpload"
              :on-remove="handleRemove"
              :on-change="handleChange"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <div class="btns">
              <el-button type="primary" @click="back(0, 'baseinfo')" plain>返回</el-button>
              <el-button type="primary" @click="next(2, 'goodcont')">下一步</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品内容" disabled name="goodcont">
            <div class="tipText">请填写商品描述内容</div>
            <div class="descText">
              <el-input type="textarea" :rows="10" v-model="goodForm.goods_introduce"></el-input>
            </div>
            <div class="btns">
              <el-button type="primary" @click="back(1, 'goodpic')" plain>返回</el-button>
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
import { Message } from "element-ui";
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
    goods_cat: [],
    is_promote: false,
    pics: [],
    goods_introduce: ""
  };
  uploadHeader: object = { Authorization: sessionStorage.getItem("token") };
  addGoodRules: object = {
    goods_name: [
      { required: true, message: "请输入商品名称", trigger: "blur" }
    ],
    goods_price: [
      { required: true, message: "请输入商品价格", trigger: "blur" },
      {
        pattern: /^\d+$/,
        message: "商品价格必须是大于零",
        trigger: "blur"
      }
    ],
    goods_number: [
      { required: true, message: "请输入商品数量", trigger: "blur" }
    ],
    goods_weight: [
      { required: true, message: "请输入商品重量", trigger: "blur" }
    ],
    goods_cat: [
      { required: true, message: "请选择商品分类", trigger: "change" }
    ]
    // is_promote: [{ message: "请选择商品是否促销", trigger: "change" }]
  };
  picList: object[] = [];
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
    this.cateOptionList = res.data.data;
    console.log("cateOptionList", this.cateOptionList);
  }

  next(step: number, tab: string) {
    let addFormRef: any = this.$refs;
    addFormRef["addGoodRules"].validate((valid: any) => {
      step == 1
        ? valid
          ? ((this.active = step), (this.tabActive = tab))
          : Message("请按照内容填写产品的基本信息")
        : this.picList.length === 0
        ? Message("请选择至少一张图片")
        : ((this.active = step), (this.tabActive = tab));
    });
  }
  back(step: number, tabNum: string) {
    if (step !== -1) {
      this.active = step;
      this.tabActive = tabNum;
    } else {
      this.$router.back();
    }
  }
  async finish() {
    const {
      goods_name,
      goods_price,
      goods_number,
      goods_weight,
      goods_cat,
      is_promote,
      pics,
      goods_introduce
    } = this.goodForm;
    console.log(this.goodForm);

    try {
      const res = await axios.post("/goods", {
        goods_name,
        goods_cat: goods_cat.join(","),
        goods_price,
        goods_number,
        goods_weight,
        is_promote,
        goods_introduce,
        pics
      });

      if (res.data.status === 200) {
        this.$router.push({ name: "goods" });
      } else {
        Message(res.data.meta.msg);
      }
    } catch (err) {
      console.log(err);
    }
  }
  handlePictureCardPreview(file: any) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }
  succeedUpload(response: any, file: any, fileList: any) {
    console.log(response);
    this.goodForm.pics.push({
      pic: response.data.tmp_path
    });
  }
  handleRemove(file: any, fileList: any) {
    const { tmp_path } = file.response.data;
    let index = this.goodForm.pics.findIndex((item: any) => {
      return item.pic == tmp_path;
    });
    this.goodForm.pics.splice(index, 1);
  }
  handleChange(file: any, fileList: any) {
    this.picList = fileList;
  }
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
    .el-form-item__label {
      text-align: left;
    }
    .tabMain {
      margin-top: 30px;
      .el-tabs--left .el-tabs__header.is-left {
        margin-right: 15px;
      }

      .cateItem {
        position: relative;
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
