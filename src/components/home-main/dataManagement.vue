<template>
  <div class="dataManagement">
    <el-card>
      <div slot="header" class="clearfix">
    <div class="title">数据管理</div>
    <el-button type="success" class="extrt" size="medium">批量抽取</el-button>
    <el-button type="success" size="medium" >批量入库</el-button>
    <el-button type="primary" size="medium" style="margin-left:570px" @click="$router.back()">上一步</el-button>
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
        <el-table-column label="抽取" >
          <template slot-scope="scope">{{ scope.row.extract | extract}}</template>
        </el-table-column>
        <el-table-column label="标记" >
          <template slot-scope="scope">{{ scope.row.mark | mark}}</template>
        </el-table-column>
        <el-table-column label="入库" >
          <template slot-scope="scope">{{ scope.row.bank | bank}}</template>
        </el-table-column>
        <!-- <el-table-column prop="extract" label="抽取" ></el-table-column> -->
        <!-- <el-table-column prop="mark" label="标记" ></el-table-column>
        <el-table-column prop="bank" label="入库" ></el-table-column> -->
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="delData(scope.row)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small" @click="pushextract(scope.row)">抽取</el-button>
        <el-button type="text" size="small" @click="pushmark(scope.row)">标注</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

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
  filters:{
    //列表抽取，标记，入库状态
extract(value){
if(value){
  return '已抽取'
}else{
  return '未抽取'
}
},
mark(value){
if(value){
  return '已标记'
}else{
  return '未标记'
}
},
bank(value){
if(value){
  return '已入库'
}else{
  return '未入库'
}
}
  },
  methods: {
    //获取列表数据
    async getFileList(){
      const {data} =await this.$ajax({
        url:'/hehe/fm_getFileList',
      })
      this.tableData=data.map(item=>{
        return{
          name:item[0],
          createTime:item[1],
          extract:item[2],
          mark:item[3],
          bank:item[4]
        }
      })
      console.log(data,'获取文件列表成功');
      
    },
    //删除数据
    async delData(row){
      this.$confirm('您确定要删除此项目吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax({
  url:'/hehe/fm_delFile',
  params:{key:row.name}
})
          this.getFileList()
          
          
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })



    },
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
    pushextract(row){
      console.log(row);
      
      this.$router.push(`/dataManagement/${row.name}/${row.extract?'抽取':'抽取'}?dataPath=${this.$route.query.dataPath}`)
    },
    //标注
    pushmark(row){
      this.$router.push(`/dataManagement/${row.name}/${row.mark?'标记':'标记'}?dataPath=${this.$route.query.dataPath}`)
    }
  },
  created() {
    this.getFileList()
  }
}
</script>

<style lang="less" scoped>
.dataManagement {
  border: 1px solid rgb(242, 243, 244);
  height: 100%;
  .clearfix{
    display: flex;
    align-items: center;
    .extrt{
      margin-left: 30px;
      margin-right: 30px;
    }
  }
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