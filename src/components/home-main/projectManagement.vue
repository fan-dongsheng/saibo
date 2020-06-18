<template>
  <div class="projectManagement">
    <el-button type="primary" class="add" size="medium" @click="showAddfolderDialog">新建项目</el-button>
    <el-card v-loading="tableLoading">
      <el-table :data="tableProject" style="width: 100%">
        <el-table-column prop="name" label="项目名称"></el-table-column>
        <el-table-column label="数据集">
          <template slot-scope="scope" class>
            <el-button size="mini" type="text" @click="pushDetail(scope.$index, scope.row)">{{scope.row.data}}</el-button>
            
          </template>
        </el-table-column>
        <!-- <el-table-column prop="data" label="数据集"></el-table-column> -->
        
         <el-table-column label="本体图">
          <template slot-scope="scope" class>
            <el-button size="mini" type="text" >{{scope.row.figure}}</el-button>
            
          </template>
        </el-table-column>
        <el-table-column prop="atlas" label="图谱"></el-table-column>
        <el-table-column prop="description" label="备注"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" class>
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <!-- <el-button size="mini" type="text" @click="handleDown(scope.$index, scope.row)">导出</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
    <div class="pag">
      <el-pagination
        background
        layout="total,prev, pager, next,jumper"
        :current-page="page.currentPage"
        :total="page.total"
        @current-change="getCurrentPage"
       
      ></el-pagination>
    </div>
    </el-card>
    
    <el-dialog width="600px" title="新增项目" :visible.sync="addfolderDialog.visible">
      <div v-loading="addfolderDialog.loading" class="dialog-wrapper">
        <el-form
          label-width="150px"
          ref="addfolderForm"
          :model="addfolderDialog.form"
          :rules="addfolderDialog.rules"
          size="mini"
        >
          <el-form-item label="项目名称:" prop="name">
            <el-input v-model="addfolderDialog.form.name" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="数据集存储地址:" prop="dataPath" >
            <el-input v-model="addfolderDialog.form.dataPath" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="模型存储地址:" prop="modelPath">
            <el-input v-model="addfolderDialog.form.modelPath" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述:" >
            <el-input v-model="addfolderDialog.form.description" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="数据集存储地址:" > -->
            <!-- <input type="file" :id="id" name="image" class="getImgUrl_file" @change="preview($event)"> -->
            <!-- <el-upload class="upload"  action :http-request="dataUpload" :on-success="success"> -->
          <!-- <div class="up">
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__text">点击上传</div>
          </div> -->

          <!-- <el-button type="primary">点击上传</el-button>
        </el-upload> -->
            <!-- <el-input v-model="addfolderDialog.form.dataPath" autocomplete="off"></el-input> -->
          <!-- </el-form-item> -->
          <!-- <el-form-item label="模型存储地址:" >
            <el-upload class="upload"  action :http-request="modelUpload">

          <el-button type="primary">点击上传</el-button>
        </el-upload> -->
            <!-- <el-input v-model="addfolderDialog.form.modelPath" autocomplete="off"></el-input> -->
          <!-- </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="handelAddfolder">保 存</el-button>
          <el-button size="mini" @click="addfolderDialog.visible = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 修改项目 -->
    <el-dialog width="600px" title="修改项目" :visible.sync="editfolderDialog.visible">
      <div v-loading="editfolderDialog.loading" class="dialog-wrapper">
        <el-form
          label-width="150px"
          ref="editfolderForm"
          :model="editfolderDialog.form"
          :rules="editfolderDialog.rules"
          size="mini"
        >
          <el-form-item label="项目名称:" prop="name" >
            <el-input v-model="editfolderDialog.form.name" autocomplete="off" disabled></el-input>
          </el-form-item>
           <el-form-item label="数据集存储地址:" prop="dataPath" >
            <el-input v-model="addfolderDialog.form.dataPath" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="模型存储地址:" prop="modelPath">
            <el-input v-model="addfolderDialog.form.modelPath" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="数据集存储地址:" >           
            <el-upload class="upload"  action :http-request="dataUpload" :on-success="success">        
          <el-button type="primary">点击上传</el-button>
        </el-upload>         
          </el-form-item>
          <el-form-item label="模型存储地址:" >
            <el-upload class="upload"  action :http-request="modelUpload">
          <el-button type="primary">点击上传</el-button>
        </el-upload>         
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="handeleditfolder">保 存</el-button>
          <el-button size="mini" @click="editfolderDialog.visible = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  /**
 * @author: dsvan
 * @date: 2020年6月09日14:51:40
 * @Last Modified by: dsvan
 * @Last Modified time: 2020-05-01 09:31:30
 * @description: 项目管理
 */
  data() {
    return {
      id:'',
      imgDataUrl:'',
      dataParams:{}, //上传文件file参数
      modelParams:{},
      //新增项目弹层
      addfolderDialog: {
        loading: false,
        visible: false,
        form: {
          name: '', // 项目名称
          dataPath: '', //数据集成位置
          modelPath: '' ,//模型存储位置
          description:'' //描述
        },
        rules: {
          name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
          dataPath: [{ required: true, message: '请输入数据集存储地址', trigger: 'blur' }],
          modelPath: [{ required: true, message: '请输入模型存储地址', trigger: 'blur' }]
        }
      },
       //编辑项目弹层
      editfolderDialog: {
        loading: false,
        visible: false,
        form: {
          name: '', // 项目名称
          dataPath: '', //数据集成位置
          modelPath: '' //模型存储位置
        },
        rules: {
          name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
          dataPath: [{ required: true, message: '请输入数据集存储地址', trigger: 'blur' }],
          modelPath: [{ required: true, message: '请输入模型存储地址', trigger: 'blur' }]
        }
      },
      tableLoading: false,
      tableProject: [
        {
          name: '质量图谱',
          data: 'a.txt',
          figure: '',
          atlas: '',
          description: '123131'
        }
      ],
      count: '', // 总页数
      page: {
        total: 0, // 总条数
        pageSize: 5, // 每页显示条数
        currentPage: 1 // 当前页
      }
    }
  },

  methods: {
    //点击文件名跳转详情页
    pushDetail(index,row){
this.$router.push(`/dataManagement/${row.name}?dataPath=${row.data}`)
    },
    //获取list
    async getProjectList(){
      
      try {
        this.tableLoading=true
        const {data}=await this.$ajax({
        url:'/hehe/pm_getProjectList',
        
      })
      console.log(data,'获取list')
      this.tableProject=data.map((item,i)=>{
        return {
          name:item[0],
          data:item[1],
          figure:item[2]
        }
        
      })
      this.tableLoading=false
      console.log(this.tableProject);
      this.page.total=data.length
      } catch (error) {
        console.log(error,'获取数据失败');
        this.tableLoading=false
      }
      
      
    },
    success(event, file, fileList){
console.log(event, file, fileList,'1111');

    },
    //上传文件
    dataUpload(params) {
      console.log(params)
      this.dataParams = params.file
    },
    modelUpload(params) {
      console.log(params)
      this.modelParams = params.file
    },
    // 上传
    async onSubmit() {
      // console.log('上传')
      // console.log(this.addfolderDialog.form.name)
      // ,将id和form{}直接传到ajax后,重新调用请求接口就可以;
      // let formData = new FormData()
      // formData.append('name', this.addfolderDialog.form.name)
      // //文件参数
      // formData.append('datapath', this.dataParams.file)
      // formData.append('modelpath', this.modelParams.file)
      // this.formData = formData
      // const res = await this.$ajax.post(formData)

      this.$message.success('上传成功')
      console.log(res, '新增成功')
      
    },
    //修改项目
    handleEdit(index, row) {
      console.log(row);
      
      this.editfolderDialog.visible=true
      this.editfolderDialog.form=row
    },
    //修改项目
    async handeleditfolder(){
      try {
        const res= await this.$ajax({
        url:`/hehe/pm_modProject`,
        params:this.editfolderDialog.form
      })
     
      this.editfolderDialog.visible=false
      this.$message.success('修改成功')
      this.getProjectList()
      } catch (error) {
        this.$message.error('修改失败')
      }
      
      
    },
    //删除项目
    handleDelete(index, row) {
      
      this.$confirm('您确定要删除此项目吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const res= this.$ajax({
            url:`/hehe/pm_delProject`,
            params:{
              key:row.name
            }

          })
          this.getProjectList()
          console.log(res,'删除成功');
          
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
    handleDown(index, row) {
      console.log(index, row)
    },
    //新增项目
    async handelAddfolder() {
      this.$refs.addfolderForm.validate(async (valid)=>{
        if (valid) {
          try {
       this.addfolderDialog.loading = true
      // let dataUp={
      //   name:this.addfolderDialog.form.name,
      //   datapath:`/home/gnx/${this.dataParams.name}`,
      //   modelpath:`/home/gnx/${this.modelParams.name}`
      // }
      console.log(this.dataParams.name,this.modelParams.name);
      
      const res=await this.$ajax({
      url:`/hehe/pm_addProject?name=${this.addfolderDialog.form.name}&datapath=${this.addfolderDialog.form.dataPath}&modelpath=${this.addfolderDialog.form.modelpath}`
      })
      console.log(res,'add');
      this.$message.success('保存成功')
      this.addfolderDialog.visible = false
      this.addfolderDialog.loading = false
      this.getProjectList()
          } catch (error) {
            console.log(error,'新增失败');
              this.addfolderDialog.loading = false
          }

          } else {
            console.log('error submit!!');
              this.addfolderDialog.loading = false
            return false;
          }
      })
     
    },
    // 展示新增项目弹窗
    showAddfolderDialog() {
      this.addfolderDialog.visible = true
      this.addfolderDialog.loading = false
    },
    
    // 请求当前页数;
    getCurrentPage(newPage) {
      this.page.currentPage = newPage
      console.log(this.page.currentPage)

      //掉接口
    }
  },
  created(){
 this.getProjectList()
  }
}
</script>

<style lang="less" scoped>
.projectManagement {
  height: 100%;
  position: relative;
  border: 1px solid rgb(242, 243, 244);
  .add {
    border-radius: 2px;
    position: absolute;
    top: 24px;
    right: 24px;
  }
  .el-card {
    border-radius: 2px;
    margin: 24px;
    margin-top: 88px;
    /deep/ .el-table thead {
      color: #333333;
      font-weight: 500;
    }
  }
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
  .dialog-footer {
    margin-top: 24px;
  }
}
</style>