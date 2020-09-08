<template>
  <!-- 数据预处理 -->
  <div class="preprocess">
    <el-card>
      <el-table
        border
        max-height="400"
        :data="tablePre"
        :header-cell-style="{ background: '#E5F0FF',color:'#6D87A7',textAlign:'center' }"
        :cell-style="cellstyle"
      >
        <el-table-column
          :prop="item.name"
          :label="item.name"
          width="200"
          v-for="(item,index) in tableLabel"
          :key="index"
        ></el-table-column>
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
      </div>-->
    </el-card>
    <el-card class="middle">
      <el-tag
        v-for="tag in tags"
        :key="tag.name"
        closable
        style="width:150px;text-align: center;"
        @close="handleClose(tag)"
        :type="tag.type"
      >{{tag.name}}</el-tag>
      <div class="btn">
        <!--      <el-button  type="primary" size="small" @click="btnSave">保存</el-button>-->
        <el-button type="primary" size="small" @click="btnResv">还原</el-button>
      </div>
    </el-card>
    <el-card class="bottom">
      <el-button class="add" type="primary" icon="el-icon-plus" circle @click="add"></el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column header-align="center" align="center" label="实体1">
          <template slot-scope="scope">
            <el-select v-model="scope.row.value" placeholder="请选择">
              <el-option
                v-for="(item,index) in tags"
                :key="index"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="实体2">
          <template slot-scope="scope">
            <el-select v-model="scope.row.value1" placeholder="请选择">
              <el-option
                v-for="(item,index) in tags"
                :key="index"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="关系名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.input" placeholder="请输入关系"></el-input>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="deleteHandle(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="saves" type="primary" size="small" @click="relationSave">保存</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {

      file_path: '', //接口提交地址
      tableLabel: [],  //
      tablePre: [
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
      count: '', // 总页数
      page: {
        total: 0, // 总条数
        pageSize: 10, // 每页显示条数
        currentPage: 1 // 当前页
      },
      tags: [
        { name: '实体一', type: '' },
        { name: '实体二', type: 'success' },
        { name: '实体三', type: 'info' },
        { name: '实体四', type: 'warning' },
        { name: '实体五', type: 'danger' }
      ],
      input: '',
      tableData: [{

        value: '',
        vauel1: '',
        input: ''
      }],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      relaArry: [] //最下面的数组提交
    }
  },
  methods: {
    deleteHandle (index) {
      this.tableData.splice(index, 1)
    },
    //保存关系
    relationSave () {
      let obj = "["
      this.tableData.forEach((v, k) => {
        let str = v.value + "|" + v.value1 + "|" + v.input + ","
        if (str !== 'undefined') {
          obj += str;
        }
      })
      if (this.tableData.length > 0) {
        obj = obj.substr(0, obj.length - 1) + "]"
      } else {
        obj += "]"
      }
      let entity = "["
      this.tags.forEach((v, k) => {
        entity += "\"" + v.name + "\","
      })
      entity = entity.substr(0, entity.length - 1) + "]"
      // console.log("entity:",entity)
      // console.log("obj:",obj)
      this.$ajax({
        url: `/hehe/saverelation?file_path=${this.file_path}&scheme=${obj}&entity=${entity}`,
        // params:{
        //   file_path:this.file_path,
        //   scheme:this.relaArry
        // }
      }).then(res => {
        console.log(res, '关系保存');
        this.$message.success('保存成功')

      })
    },
    //添加最下面的数组
    add () {
      this.tableData.push({
        value: '',
        value1: '',
        input: ''
      })
    },
    handleEdit (i, row) {
      console.log(i, row);
      // var a=[]
      // a.push(row.value)
      // a.push(row.value1)
      // a.push(row.input)
      // this.relaArry.push(`(${row.value},${row.value1},${row.input})`)
      console.log(this.relaArry);
      console.log(this.tableData, 'aaaaaaaaaaaaaaaa');
    },
    //上列表
    // getTable(){
    //     this.$ajax({
    //       url: '/hehe/getContent',
    //       params:{
    //         file_path:this.file_path,
    //       }
    //     }).then(res=>{
    //       console.log(res);


    //     })
    // },
    //获取最下面和保存刷新实体的接口
    getEnt () {
      this.$ajax({
        url: '/hehe/getentity',
        params: {
          file_path: this.file_path,
        }
      }).then(res => {
        console.log(res.data);
        this.tags = res.data.map((item, index) => {
          return {
            name: item,
            type: ''
          }
        })

      })
    },
    //实体处理，tags
    tagsPro () {
      var tags = this.$store.state.tablePE
      console.log(tags);
      this.tags = tags.entity.map((item, index) => {
        return {
          name: item,
          type: ''
        }
      })
      this.tableLabel = tags.entity.map((item, index) => {
        return {
          name: item,
          type: ''
        }
      })
      //最下的实体
      this.options = tags.entity.map((item, index) => {
        return {
          label: item,
          value: item,
        }
      })

    },
    //处理表格
    tablePro () {
      var tableTest = this.$store.state.tablePE.content
      this.tablePre = tableTest
    },
    //获取stroe存储的数据
    storeTba () {
      // this.tablePre=this.$store.state.tablePE
      console.log(this.$store.state.tablePE);
      var project = this.$store.state.tablePE
      //处理中间tags
      this.tagsPro()
      this.tablePro()
      //获取filepath
      this.file_path = project.file_path

    },
    //删除中间的tags
    handleClose (tag) {
      console.log(tag);

      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    //tags保存按钮
    btnSave () {
      var a = []
      this.tags.forEach(item => {
        a.push(item.name)
      })
      console.log(a);
      this.$ajax({
        url: '/hehe/saveentity',
        params: {
          file_path: this.file_path,
          save_content: JSON.stringify(a)
        }
      }).then(res => {
        console.log(this.$store.state.tablePE);
        console.log(res);
        // this.getEnt()
      })
    },
    //tags还原按钮
    btnResv () {
      this.getEnt()
      // this.$ajax({
      //   url: '/hehe/getentity',
      //   params:{
      //     file_path:this.file_path,
      //   }
      // }).then(res=>{
      //   console.log(res);

      // })
    },
    //表格属性
    cellstyle ({ row, column, rowIndex, columnIndex }) {
      return 'text-align:center;height:46px;line-height:46px;padding:0;border-right: 1px solid #DBE8FB;border-bottom: 1px solid #DBE8FB;'
    },
  },
  created () {
    this.storeTba()
    // this.getEnt()
    // this.getTable()
  }
}
</script>

<style lang='less' scoped>
.preprocess {
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
  .middle {
    padding: 20px;
    .el-tag {
      margin: 10px;
    }
    .btn {
      margin-top: 10px;
      margin-left: 15px;
    }
  }
  .bottom {
    position: relative;
    .add {
      z-index: 1;
      position: absolute;
      top: 15px;
      right: 25px;
    }
    .saves {
      margin: 10px 10px;
    }
  }
}
.el-select {
  width: 100%;
}
</style>
