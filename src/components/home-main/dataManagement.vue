<template>
  <div class="dataManagement">
    <el-card>
      <div class="model">
        模型选择:
        <el-upload class="upload" action :http-request="dataUpload">
          <el-button type="primary" size="small" class="choose">点击选择</el-button>
        </el-upload>
      </div>
      <div class="data">
        数据选择:
        <el-upload class="upload" action :http-request="modelUpload">
          <el-button type="primary" size="small" class="choose">点击选择</el-button>
        </el-upload>
      </div>

      <el-button class="extract" size="medium" type="success">抽取</el-button>
    </el-card>
    <el-card class="show">
      <div class="entity">
        <div class="text">实体生成:</div>
        <div class="cont">entity1</div>
        <div class="cont">entity2</div>

        </div>
      <div class="relation">
        <div class="text">关系生成:</div>
        <div class="cont">relation1</div>
        <div class="cont">relation2</div>
        </div>
       <el-button class="extract" size="medium" type="success">入库</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataParams: {}, //上传文件file参数
      modelParams: {}
    }
  },
  methods: {
    //上传文件
    dataUpload(params) {
      console.log(params)
      this.dataParams = params
    },
    modelUpload(params) {
      console.log(params)
      this.modelParams = params
    }
  },
  created(){
    
  }
}
</script>

<style lang="less" scoped>
.dataManagement {
  border: 1px solid rgb(242, 243, 244);
  height: 100%;
  .el-card {
    font-size: 16px;
    margin: 24px;
    .choose {
      margin: 12px;
      margin-left: 0;
    }
    .model {
      margin: 12px;
      margin-bottom: 24px;
    }
    .data {
      margin: 12px;
    }
    .extract {
      margin: 12px;
    }
  }
  .show{
    .entity{
      margin: 12px;
      display: flex;
      align-items: center;
    }
    .relation{
      margin: 12px;
      display: flex;
      align-items: center;
    }
    .text{
margin-right: 12px;
    }
    .cont{
border-radius: 2px;
text-align: center;
width: 70px;
height: 40px;
line-height: 40px;
background: lightcoral;
margin-left: 12px;
    }
    .extract{
      margin: 12px;
    }
  }
}
</style>