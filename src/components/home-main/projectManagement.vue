<template>
  <div class="projectManagement">
      <el-button type="primary" class="add" >新建项目</el-button>
      <el-card>
        <el-table
      :data="tableProject"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="项目名称"
        >
      </el-table-column>
      <el-table-column
        prop="data"
        label="数据集"
        >
      </el-table-column>
      <el-table-column
        prop="figure"
        label="本体图">
      </el-table-column>
      <el-table-column
        prop="atlas"
        label="图谱"
        >
      </el-table-column>
      <el-table-column
        prop="description"
        label="备注"
        >
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope" class="">
        <el-button
          size="mini"
          type="text"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="text"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
          size="mini"
          type="text"
          @click="handleDown(scope.$index, scope.row)">导出</el-button>
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
              tableLoading:false,
              tableProject: [{
                name: '质量图谱',
                data:'',
                figure: '',
                atlas:'',
                description:'123131'
              },
              {
                name: '质量图谱',
                data:'',
                figure: '',
                atlas:'',
                description:'123131'
              },
              {
                name: '质量图谱',
                data:'',
                figure: '',
                atlas:'',
                description:'123131'
              }]
            }
          },
          methods:{
              handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleDown(index, row) {
        console.log(index, row);
      }

          }
}
</script>

<style lang="less" scoped>
.projectManagement{
  height: 100%;
  position: relative;
  border: 1px solid rgb(242, 243, 244);
.add{
  border-radius: 2px;
  position: absolute;
  top: 24px;
  right:24px;
}
.el-card{
  border-radius: 2px;
  margin: 24px;
  margin-top: 88px;
  /deep/ .el-table thead {
     color: #333333;
    font-weight: 500;
}
}
}

</style>