<template>
  <div class="prview">
      <el-card>
        <el-button
      type="primary"
      size="small"
      style="margin-bottom:15px;"
      @click="$router.back()"
    >上一步</el-button>
      <el-table
        border
        max-height="800" 
        :data="tablePre"       
        :header-cell-style="{ background: '#E5F0FF',color:'#6D87A7',textAlign:'center' }"
        :cell-style="cellstyle"
      >
        <el-table-column :prop="item.name" :label="item.name" width="200" v-for="(item,index) in tableLabel" :key="index"></el-table-column>
       
      </el-table>
      <!-- 分页 -->
      <!-- <div class="pag">
        <el-pagination
          background
          layout="prev, pager, next,jumper"
          :current-page="page.currentPage"
          :total="page.total"
          @current-change="getCurrentPage"
        ></el-pagination>
      </div> -->
    </el-card>
  </div>
</template>

<script>
export default {
    created(){
        this.getList()
    },
data(){
    return {
        tableLabel:[],  //
tablePre:[
        {
          id: 1,
          date: '2016-05-02',
          name: '实体',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '实体',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '实体',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 4,
          date: '2016-05-03',
          name: '实体',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
    }
},
methods:{
    async getList(){
        const {data}=await this.$ajax({
        url:'/hehe/getCSVContent',
        params:{file_path:this.$route.query.file_path,}
        
        
      })
      console.log(data);
      this.tablePre=data.content
      
      this.tableLabel=data.entity.map((item,index)=>{
        return {
          name:item,
          type:''
        }
      })
    },
     //表格属性
    cellstyle({ row, column, rowIndex, columnIndex }) {
      return 'text-align:center;height:46px;line-height:46px;padding:0;border-right: 1px solid #DBE8FB;border-bottom: 1px solid #DBE8FB;'
    },
}
}
</script>

<style scoped lang="less">

</style>