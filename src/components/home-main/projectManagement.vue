<template>
  <div class="projectManagement">
    <el-card v-loading="tableLoading">
      <div slot="header" class="clearfix">
        <el-button type="primary" class="add" size="small" @click="showAddfolderDialog">新建项目</el-button>
        <!-- <el-button type="primary" class="add" size="small" @click="showData()">数据预处理</el-button> -->
        <el-upload

            style="margin-left:10px;"
            action="/hehe/uploadexcel"
            :show-file-list="false"
            :data="uploadParams"
            :on-success="uploadSuccess"
            :on-error="uploadError"
          >
            <el-button class="add" type="primary" size="small">excel导入</el-button>
          </el-upload>

      </div>
      <el-table
        border
        :data="tableProject"
        style="width: 100%"
        :header-cell-style="{ background: '#E5F0FF',color:'#6D87A7',textAlign:'center' }"
        :cell-style="cellstyle"
      >
        <el-table-column prop="name" label="项目名称" width="200"></el-table-column>
        <el-table-column label="数据集" show-overflow-tooltip>
          <template slot-scope="scope" class>
            <el-button
              size="mini"
              type="text"
              @click="pushDetail(scope.$index, scope.row)"
            >{{scope.row.dataPath}}</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="data" label="数据集"></el-table-column> -->

        <el-table-column label="本体图">
          <template slot-scope="scope" class>
            <el-button
              size="mini"
              type="text"
              @click="pushModel(scope.$index, scope.row)"
            >{{scope.row.modelPath}}</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="atlas" label="图谱"></el-table-column> -->
        <el-table-column label="数据类型" width="100">
          <template slot-scope="scope">{{ scope.row.dataType=='s' ?'结构化': '非结构化' }}</template>
        </el-table-column>
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="imgs">
              <span class="imgs-a" @click="handleEdit(scope.$index, scope.row)"></span>
              <span class="imgs-b" @click="handleDelete(scope.$index, scope.row)"></span>
            </div>

            <!-- <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            <!-- <el-button size="mini" type="text" @click="handleDown(scope.$index, scope.row)">导出</el-button> -->
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
          <el-form-item label="数据选择:">
            <el-select
              v-model="value"
              value-key="label"
              clearable
              placeholder="请选择"
              @change="handelData"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据集存储地址:" prop="dataPath" v-if="value.value=='op'">
            <el-input v-model="addfolderDialog.form.dataPath" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="模型选择:">
            <el-select v-model="value1" clearable placeholder="请选择" @change="handelModel">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型:">
            <el-select v-model="value2" clearable placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述:">
            <el-input v-model="addfolderDialog.form.description" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="数据集存储地址:" > -->
          <!-- <input type="file" :id="id" name="image" class="getImgUrl_file" @change="preview($event)"> -->
          <!-- <el-upload class="upload"  action :http-request="dataUpload" :on-success="success"> -->
          <!-- <div class="up">
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__text">点击上传</div>
          </div>-->

          <!-- <el-button type="primary">点击上传</el-button>
          </el-upload>-->
          <!-- <el-input v-model="addfolderDialog.form.dataPath" autocomplete="off"></el-input> -->
          <!-- </el-form-item> -->
          <!-- <el-form-item label="模型存储地址:" >
            <el-upload class="upload"  action :http-request="modelUpload">

          <el-button type="primary">点击上传</el-button>
          </el-upload>-->
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
          <el-form-item label="项目名称:" prop="name">
            <el-input v-model="editfolderDialog.form.name" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="数据选择:">
            <el-select
              v-model="value"
              value-key="label"
              disabled
              clearable
              placeholder="请选择"
              @change="handelData"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据集存储地址:" prop="dataPath" v-if="value.value=='op'">
            <el-input disabled v-model="addfolderDialog.form.dataPath" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="模型选择:">
            <el-select disabled v-model="value1" clearable placeholder="请选择" @change="handelModel">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型:">
            <el-select disabled v-model="value2" clearable placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述:">
            <el-input v-model="editfolderDialog.form.description" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="数据集存储地址:" prop="dataPath">
            <el-input v-model="editfolderDialog.form.dataPath" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="模型存储地址:" prop="modelPath">
            <el-input v-model="editfolderDialog.form.modelPath" autocomplete="off"></el-input>
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
      options: [],
      options1: [],
      options2: [
        {
          value: 's',
          label: '结构化'
        },
        {
          value: 'un',
          label: '非结构化'
        }
      ],
      value: {},
      value1: '',
      value2: '',
      id: '',
      imgDataUrl: '',
      dataParams: {}, //上传文件file参数
      modelParams: {},
      //新增项目弹层
      addfolderDialog: {
        loading: false,
        visible: false,
        form: {
          name: '', // 项目名称
          dataPath: '/home/xl/project/ChineseNER/tensorflow/temp14', //数据集成位置
          modelPath: '/home/gnx/tmp/pycharm_project_180/data/csvdata', //模型存储位置
          description: '' //描述
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
          modelPath: '' ,//模型存储位置
          description: '' //描述
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
        },
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
        pageSize: 10, // 每页显示条数
        currentPage: 1 // 当前页
      }
    }
  },
computed: {
    uploadParams() {
      // var date = new Date()
      // date = this.dateFormat('YYYY-mm-dd HH:MM', date)
      return {
        // file_name: `${date}.xlsx`,
        // project: this.project
      }
    }
  },
  methods: {
    //数据预处理
    uploadSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.$message.success('导入成功')
      this.$store.commit('tablePE',response)
      this.$router.push('preprocess')
    },
    uploadError() {
      this.$message.error('上传失败')
    },
    showData(){
this.$router.push('preprocess')
    },
    handelModel(valued) {
      console.log(valued)
      console.log(this.value1, '===========================')
    },
    //handelData数据选择请求接口
    async handelData(valueCh) {
      console.log(this.value, '++++++++++++++')

      this.options1 = []
      //请求模型接口
      const { data } = await this.$ajax({
        url: '/hehe/fm_selectJson',
        params: {
          datasetname: valueCh.label
        }
      })
      var obj = JSON.parse(data)
      //   this.options1.concat(obj)
      // console.log(this.options1,'拼接数组');
      for (var key in obj) {
        // console.log(key,);

        this.options1.push({
          value: obj[key],
          label: key
        })
      }
    },

    //下拉菜单
    async getSelectData() {
      const { data } = await this.$ajax({
        url: '/hehe/fm_selectData'
      })
      console.log(data, '项目管理下拉菜单获取')

      for (var key in data) {
        console.log(key, ':', data[key])
        this.options.push({
          value: data[key],
          label: key
        })

        // this.options=a.map(()=>{
        //   return{
        //     value:data[key],
        //     label:key
        //   }
        // })
      }
      this.options.push({
        value: 'op',
        label: '自定义'
      })
    },
    //表格属性
    cellstyle({ row, column, rowIndex, columnIndex }) {
      return 'text-align:center;height:46px;line-height:46px;padding:0;border-right: 1px solid #DBE8FB;border-bottom: 1px solid #DBE8FB;'
    },
    //
    pushModel(index,row) {


      this.$router.push({path:'modelManagement',query:{dataPath:row.dataPath,name:row.name}})
    },
    //点击文件名跳转详情页
    pushDetail(index, row) {
      this.$router.push(`/dataManagement/${row.name}?dataPath=${row.dataPath}&dataType=${row.dataType}`)
    },
    //获取list
    async getProjectList() {
      try {
        this.tableLoading = true
        const { data } = await this.$ajax({
          url: '/hehe/pm_getProjectList',
          params:{
            page:this.page.currentPage,
            num:this.page.pageSize
          }
        })
        console.log(data, '获取list')
        this.tableProject = data.data.map((item, i) => {
          return {
            name: item[0],
            dataPath: item[1],
            modelPath: item[2],
            dataType: item[3],
            date:item[4],
            description:item[5]
          }
        })
        this.tableLoading = false
        console.log(this.tableProject)
        this.page.total = data.total
      } catch (error) {
        console.log(error, '获取数据失败')
        this.tableLoading = false
      }
    },
    success(event, file, fileList) {
      console.log(event, file, fileList, '1111')
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
      console.log(row)
     this.value={}
      this.value1=''
      this.value2=''

      this.editfolderDialog.visible = true
      this.editfolderDialog.form = row
    },
    //修改项目
    handeleditfolder() {
      console.log("name:",this.editfolderDialog.form.name)
      console.log("datapath",this.value)
      console.log("modelpath:",this.value1)
      console.log("datatype:",this.value2)
      console.log("remark:",this.addfolderDialog.form.description)

      console.log("editfolderDialog.form:",this.editfolderDialog.form)
      this.$refs.editfolderForm.validate(async valid => {
        if (valid) {
          try {
            const res = await this.$ajax({
              url: `/hehe/pm_modProject?name=${this.editfolderDialog.form.name}&datapath=${this.value.value}&modelpath=${this.value1}&datatype=${this.value2}&remark=${this.editfolderDialog.form.description}`,
              // params: {
              //   name: this.editfolderDialog.form.name,
              //   datapath: this.editfolderDialog.form.dataPath,
              //   modelpath: this.editfolderDialog.form.modelPath
              // }
            })

            this.editfolderDialog.visible = false
            this.$message.success('修改成功')
            this.getProjectList()
          } catch (error) {
            this.$message.error('修改失败')
          }
        } else {
          console.log('error submit!!')
          this.addfolderDialog.loading = false
          return false
        }
      })
    },
    //删除项目
    handleDelete(index, row) {
      this.$confirm('您确定要删除此项目吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const res = this.$ajax({
            url: `/hehe/pm_delProject`,
            params: {
              key: row.name
            }
          })
          this.getProjectList()
          console.log(res, '删除成功')

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
    //新增项目,保存按钮
    async handelAddfolder() {
      this.$refs.addfolderForm.validate(async valid => {
        if (valid) {
          try {
            this.addfolderDialog.loading = true
            // let dataUp={
            //   name:this.addfolderDialog.form.name,
            //   datapath:`/home/gnx/${this.dataParams.name}`,
            //   modelpath:`/home/gnx/${this.modelParams.name}`
            // }
            console.log(this.dataParams.name, this.modelParams.name)

            console.log(this.addfolderDialog, 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjklllkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')

            const res = await this.$ajax({
              url: `/hehe/pm_addProject?name=${this.addfolderDialog.form.name}&datapath=${this.value.value}&modelpath=${this.value1}&datatype=${this.value2}&remark=${this.addfolderDialog.form.description}`
            })
            console.log(res, 'add')
            if (res.data != 'True') {
              this.$message.error('保存失败')
              this.addfolderDialog.visible = false
              this.addfolderDialog.loading = false
              return
            }
            this.$message.success('保存成功')
            this.addfolderDialog.visible = false
            this.addfolderDialog.loading = false
            this.getProjectList()
          } catch (error) {
            console.log(error, '新增失败')
            this.addfolderDialog.loading = false
          }
        } else {
          console.log('error submit!!')
          this.addfolderDialog.loading = false
          return false
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

this.getProjectList()
      //掉接口
    }
  },
  created() {
    this.getProjectList()
    this.getSelectData()
  }
}
</script>

<style lang="less" scoped>
.projectManagement {
  height: 100%;
  position: relative;
  border: 1px solid rgb(242, 243, 244);
  .clearfix{
    display: flex;
  }
  .imgs {
    display: flex;
    align-items: center;
    justify-content: center;

    .imgs-a {
      display: inline-block;
      background: url(../../assets/indexNew/edit.png) no-repeat;
      background-size: cover;
      width: 21px;
      height: 21px;
      cursor: pointer;
    }
    .imgs-b {
      margin-left: 10px;
      display: inline-block;
      background: url(../../assets/indexNew/del.png) no-repeat;
      background-size: cover;
      width: 21px;
      height: 22px;
      cursor: pointer;
    }
  }
  .add {
    border-radius: 4px;

  }
  /deep/ .el-card {
    border-radius: 2px;
    margin: 24px;
    padding: 2px 20px;
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
