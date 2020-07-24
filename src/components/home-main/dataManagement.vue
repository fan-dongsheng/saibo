<template>
  <div class="dataManagement">
    <el-card v-loading="daLoading">
      <div slot="header" class="clearfix">
    <div class="title">{{$route.params.name}}</div>
    <el-button type="success" v-if="$route.query.dataType!='s'" class="extrt" size="small" @click="allEart">批量抽取</el-button>
    <el-button type="success" class="extrt" size="small" @click="allBank">批量入库</el-button>
    <el-button type="primary" size="small" style="margin-left:30px" @click="$router.back()">上一步</el-button>
    
    <!-- <el-tag color="#396fff" style="margin-left:500px;color:#fff;">项目名称：{{$route.params.name}}</el-tag> -->
  </div>  
      <el-table
      border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#E5F0FF',color:'#6D87A7',textAlign:'center' }"
        :cell-style="cellstyle"
        @selection-change="handleSelectionChange"
        :row-key="getRowKeys"
      >
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column label="文件名称" >
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" ></el-table-column>
        <el-table-column label="入库" v-if="$route.query.dataType=='s'">
          <template slot-scope="scope">{{ scope.row.bank | bank}}</template>
        </el-table-column>
        <el-table-column label="抽取" v-else width="100">
          <template slot-scope="scope">{{ scope.row.extract | extract}}</template>
        </el-table-column>
        
        <el-table-column label="标记" v-if="$route.query.dataType!='s'" width="100">
          <template slot-scope="scope">{{ scope.row.mark | mark}}</template>
        </el-table-column>
        
        <!-- <el-table-column prop="extract" label="抽取" ></el-table-column> -->
        <!-- <el-table-column prop="mark" label="标记" ></el-table-column>
        <el-table-column prop="bank" label="入库" ></el-table-column> item.substring( 0,item.lastIndexOf('.'))  -->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <!-- <el-button @click="delData(scope.row)" type="text" size="small">删除</el-button> -->
        <el-button type="text" size="small" v-if="scope.row.name.substring( scope.row.name.lastIndexOf('.')+1)=='txt'" @click="pushextract(scope.row)">抽取</el-button>
        <el-button type="text" size="small" v-if="scope.row.name.substring( scope.row.name.lastIndexOf('.')+1)=='txt'" @click="pushmark(scope.row)">标注</el-button>
        <el-button type="text" size="small" v-else @click="pushbank(scope.row)">入库</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pag">
        <el-pagination
          background
          layout="prev, pager, next,jumper"
          :current-page="page.currentPage"
          :total="page.total"
          @current-change="getCurrentPage"
        ></el-pagination>
      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
       // 获取row的key值
       getRowKeys(row) {
            return row.name
        },
      dataPath:this.$route.query.dataPath,  //数据集名称
      page: {
        total: 0, // 总条数
        pageSize: 10, // 每页显示条数
        currentPage: 1 // 当前页
      },
      daLoading:false,
      markList: [
        { text: '中国第一款陆基超音速巡航导弹长剑-100', ta: '中国', tb: '剑-1' },
        { text: '正则匹配字符串改变颜色', ta: '正则', tb: '颜色' }
      ],
      dataParams: {}, //上传文件file参数
      modelParams: {},
      tableData: [
        // {
        //   name: 'a.txt',
        //   createTime: '2020-6-15',
        //   description: '描述',
        //   extract: '未抽取',
        //   mark: '未标注',
        //   bank: '未入库'
        // },
        // {
        //   name: 'a.txt',
        //   createTime: '2020-6-15',
        //   description: '描述',
        //   extract: '未抽取',
        //   mark: '未标注',
        //   bank: '未入库'
        // },
        // {
        //   name: 'a.txt',
        //   createTime: '2020-6-15',
        //   description: '描述',
        //   extract: '未抽取',
        //   mark: '未标注',
        //   bank: '未入库'
        // }
      ], //多选列表
      multipleSelection:[],//多选结果
      mut:[]
      // mut:window.localStorage.getItem('arr') ? localStorage.getItem('arr').split(',') : [] 
    }
  },
  filters:{
    //列表抽取，标记，入库状态
extract(value){
if(value==='true'){
  return '已抽取'
}else{
  return '未抽取'
}
},
mark(value){
if(value==='true'){
  return '已标记'
}else{
  return '未标记'
}
},
bank(value){
if(value==='true'){
  return '已入库'
}else{
  return '未入库'
}
}
  },
  methods: {
        //表格属性
    cellstyle({row, column, rowIndex, columnIndex}){
return 'text-align:center;height:46px;line-height:46px;padding:0;border-right: 1px solid #DBE8FB;border-bottom: 1px solid #DBE8FB;'

    },
    //入库
   async pushbank(){
     this.daLoading=true
const {data} =await this.$ajax({
        url:'/hehe/into',
        
        params:{datasetname:this.dataPath,
        filelist: 'relation.csv,entity.csv',
        modelpath:'/home/gnx/tmp/pycharm_project_180/data/model/pro1/v1.json'}
      })
      console.log('入库成功',data);
      this.$message.success('入库成功')
       this.$router.push({path:'/dataImport',query:{result:data.result,model:data.model}})
    },
    //批量入库
    async allBank(){
      if(this.multipleSelection.length<=0){
         this.$message.warning('请先选择数据')
      }else{
        this.daLoading=true
 const {data} =await this.$ajax({
        url:'/hehe/into',
        params:{datasetname:this.dataPath,
        filelist: 'relation.csv,entity.csv',
        // filelist: this.multipleSelection.join(),
        modelpath:'/home/gnx/tmp/pycharm_project_180/data/model/pro1/v1.json'}
      })
      console.log('入库成功',data);
      // var a=JSON.parse(data)
      // console.log(a);
      
      if(data.error){
        this.$message.error(data.error)
        this.$router.push({path:'/dataImport',query:{result:data.result,model:data.model}})
        return
      }
      
     
      
      this.$message.success('入库成功')
       this.$router.push({path:'/dataImport',query:{result:data.result,model:data.model}})
      }

      
    },
    //批量抽取
   async allEart(){
if(this.multipleSelection.length<=0){
  this.$message.warning('请先选择数据')
}else{
   this.$router.push(`/dataManagement/allExt/抽取?dirpath=${this.$route.query.dataPath}&filenames=${this.multipleSelection}`)
  
}
    },
    // 请求当前页数;
    getCurrentPage(newPage) {
      this.page.currentPage = newPage
       
      console.log(this.page.currentPage)

this.getFileList()
      //掉接口
    },
    //获取列表数据
    async getFileList(){
      try {
         this.daLoading=true
      const {data} =await this.$ajax({
        url:'/hehe/fm_getFileList',
        params:{dirpath:this.$route.query.dataPath,
        page:this.page.currentPage,
        num:this.page.pageSize
        }
      })
      this.tableData=data.data.map(item=>{
        return{
          name:item[0],
          createTime:item[1],
          extract:item[2],
          mark:item[3],
          bank:item[4]
        }
      })
      console.log(data,'获取文件列表成功');
      this.page.total = data.total
      //  this.multipleSelection.concat(this.mut)  //赋值给本地数组
      setTimeout(() => {
        this.daLoading=false
      }, 0);
      } catch (error) {
        this.daLoading=false
      }
     
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

    //表格多选
    handleSelectionChange(val) {
      console.log(this.multipleSelection);
      
        this.mut.push(...val)
     console.log(val);
     console.log(this.mut);
     var a=[]
     a=val.map(item=>{
       return item.name
     })
     this.multipleSelection=a
   
     console.log(a);

    //  var b=this.mut.concat(val)

    // console.log(b,'==============');
    
    //   window.localStorage.setItem('arr',b)
      
    },
    //抽取
    pushextract(row){
      console.log(row);
      
      this.$router.push(`/dataManagement/${row.name}/${row.extract?'抽取':'抽取'}?dataPath=${this.$route.query.dataPath}`)
    },
    //标注
    pushmark(row){
      console.log(row);
      if(row.extract=='false'){
        this.$alert('请先进行抽取', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.$router.push(`/dataManagement/${row.name}/${row.mark?'标记':'标记'}?dataPath=${this.$route.query.dataPath}`)
    }
  },
  created() {
    this.getFileList()
  },
  watch:{
    // multipleSelection:function (val) {
      
    //   console.log(val,'监听1111111111');

    // var b=this.mut.push(...val)

    // console.log(b,'==============');
    
    //   window.localStorage.setItem('arr',this.mut)
    //   console.log(this.multipleSelection,'111111111');
    //   // console.log(window.localStorage.getItem('arr').split(','));
    // //  this.multipleSelection=this.mut
      
    // }
  }
}
</script>

<style lang="less" scoped>
.dataManagement {
  border: 1px solid rgb(242, 243, 244);
  height: 100%;
  .pag {
    height: 65px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    .el-pagination {
      margin-top: 24px;
      .el-pager {
        color: #606266;
        font-weight: 500;
      }
      .el-pagination__total {
        margin-right: 25px;
      }
    }
  }
  .clearfix{
    display: flex;
    align-items: center;
    .extrt{
      margin-left: 30px;
      margin-right: 20px;
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
  /deep/ .el-card {
    border-radius: 2px;
    margin: 24px;
    padding: 2px 20px;
    padding-bottom: 10px;
    .el-card__header {
      padding: 20px 0;
    }
    .el-card__body {
      padding: 0;
    }
    .el-table {
      margin-top: 20px;
      border-radius: 4px;
    }
    /deep/ .el-table thead {
      color: #333333;
      font-weight: 500;
    }
  }
 
}
</style>