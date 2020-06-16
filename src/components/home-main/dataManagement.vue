<template>
  <div class="dataManagement">
    <el-card>
      <div slot="header" class="clearfix">
    <div class="title">数据管理</div>
    
  </div>  
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="文件名称" >
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" ></el-table-column>
        
        <el-table-column prop="extract" label="抽取" ></el-table-column>
        <el-table-column prop="mark" label="标记" ></el-table-column>
        <el-table-column prop="bank" label="入库" ></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small" @click="extract(scope.row)">抽取</el-button>
        <el-button type="text" size="small" >标注</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
<el-button type="text" size="small" @click="regs()">标注</el-button>
    <!-- 标注补充 -->
    <div class="mark">
      <div v-for="(item,index) in markList" :key="index" v-html="item.text">{{item.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markList: [
        { text: '中国第一款陆基超音速巡航导弹长剑-100', ta: '中国', tb: '剑-1' },
        { text: '正则匹配字符串改变颜色', ta: '正则', tb: '颜色' }
      ],
      dataParams: {}, //上传文件file参数
      modelParams: {},
      tableData: [
        {
          name: 'a.txt',
          createTime: '2020-6-15',
          description: '描述',
          extract: '未抽取',
          mark: '未标注',
          bank: '未入库'
        },
        {
          name: 'a.txt',
          createTime: '2020-6-15',
          description: '描述',
          extract: '未抽取',
          mark: '未标注',
          bank: '未入库'
        },
        {
          name: 'a.txt',
          createTime: '2020-6-15',
          description: '描述',
          extract: '未抽取',
          mark: '未标注',
          bank: '未入库'
        }
      ], //多选列表
      multipleSelection: [] //多选结果
    }
  },
  methods: {
    //正则改标签颜色 //点击标注
    regs() {
      var mark = this.markList
      mark.forEach((item, index) => {
        if (item.tb) {
          var searchText = item.tb
          var text = item.text
          if (text.indexOf(searchText) >= 0) {
            var text = text.replace(searchText, '<span style=color:red;>' + searchText + '</span>')
          }
          mark[index].text = text
        }
        if (item.ta) {
          var searchText = item.ta
          var text = item.text
          if (text.indexOf(searchText) >= 0) {
            var text = text.replace(searchText, '<span style=color:red;>' + searchText + '</span>')
          }
          mark[index].text = text
        }
      })
      console.log(this.markList)
    },
    //表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //抽取
    extract(row){
      this.$router.push(`/dataManagement/${row.name}/${row.extract}`)
    }
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
    padding: 2px 20px;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
    
  }
 
}
</style>