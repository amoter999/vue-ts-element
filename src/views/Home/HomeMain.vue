<template>
  <div class="HomeMain">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="homeMainContainer">
      <el-calendar>
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template slot="dateCell" slot-scope="{date, data}">
          <p
            :class="data.isSelected ? 'is-selected' : ''"
          >{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}</p>
        </template>
      </el-calendar>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
@Component({
  name: "HomeMain",
  components: {}
})
export default class HomeMain extends Vue {}
</script>
<style lang="scss">
.HomeMain {
  .is-selected {
    color: #1989fa;
  }
  .homeMainContainer {
    margin-top: 20px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px #1169ac1a;
    border-radius: 5px;
    .el-calendar {
      background-color: #fff;
    }
    .el-calendar-table {
      th {
        font-size: 17px;
        font-weight: bold;
      }
    }
    .el-calendar__header {
      font-size: 16px;
    }
    .el-calendar-day {
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        font-size: 16px;
      }
    }
  }
}
</style>