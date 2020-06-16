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
      <div class="show-cnoent">
        <div class="left">
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
        </div>
        <!-- 右侧表格 -->
        <div class="right">
          <el-table border :data="markTable" style="width: 100%">
            <el-table-column prop="name" label="名称" width="200px"></el-table-column>
            <el-table-column width="200px" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="regs(scope.$index, scope.row)"
                  type="text"
                  size="small"
                >标注补充</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
    <!-- 标注补充 -->
    <div class="mark">
      <span v-for="(item,index) in markList" :key="index" v-html="item.text">{{item.text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markList: [
        { text: '中国第一款陆基超音速巡航导弹长剑-100', ta:'中国', tb: '剑-1' },
        { text: '正则匹配字符串改变颜色', ta:'正则', tb: '颜色' }
      ],
      dataParams: {}, //上传文件file参数
      modelParams: {},
      markTable: [{ name: 'en.txt' }]
    }
  },
  methods: {
    //正则改标签颜色 //点击标注
    regs() {
      var mark = this.markList
      mark.forEach((item,index) => {
      
        if (item.tb) {
          var searchText = item.tb
          var text=item.text
          if (text.indexOf(searchText) >= 0) {
            var text = text.replace(searchText, '<span style=color:red;>' + searchText + '</span>')
            
          }
           mark[index].text=text
        }
         if (item.ta) {
          var searchText = item.ta
          var text=item.text
          if (text.indexOf(searchText) >= 0) {
            var text = text.replace(searchText, '<span style=color:red;>' + searchText + '</span>')
            
          }
           mark[index].text=text
        }
        
        
      })
      console.log(this.markList);
      
      
      
     
    },
    //上传文件
    dataUpload(params) {
      console.log(params)
      this.dataParams = params
    },
    modelUpload(params) {
      console.log(params)
      this.modelParams = params
    },
   
    
  },
  created() {}
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
  .show {
    .show-cnoent {
      display: flex;
      .entity {
        margin: 12px;
        display: flex;
        align-items: center;
      }
      .relation {
        margin: 12px;
        display: flex;
        align-items: center;
      }
      .text {
        margin-right: 12px;
      }
      .cont {
        border-radius: 2px;
        text-align: center;
        width: 70px;
        height: 40px;
        line-height: 40px;
        background: lightcoral;
        margin-left: 12px;
      }
      .extract {
        margin: 12px;
      }
      .right {
        margin-left: 200px;
        margin-top: 10px;
      }
    }
  }
}
</style>