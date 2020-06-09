<template>
  <el-row>
    <el-col :span="4">
      <el-row class="row-sr">
        <el-col>详情</el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col>
          <el-input placeholder="输入关键字搜索" suffix-icon="el-icon-search" v-model="input2"></el-input>
        </el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col>搜索结果</el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col :span="6">图片</el-col>
        <el-col :span="18">dsfds</el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col :span="6">图片</el-col>
        <el-col :span="18">
          <div>xx-01 问题</div>
          <div>主键：xx-01 问题</div>
          <div>详情：xx-01分系统</div>
        </el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col :span="6">图片</el-col>
        <el-col :span="18">
          <div>xx-01 问题</div>
          <div>主键：xx-01 问题</div>
          <div>详情：xx-01分系统</div>
        </el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col :span="6">图片</el-col>
        <el-col :span="18">
          <div>xx-01 问题</div>
          <div>主键：xx-01 问题</div>
          <div>详情：xx-01分系统</div>
        </el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col :span="6">图片</el-col>
        <el-col :span="18">
          <div>xx-01 问题</div>
          <div>主键：xx-01 问题</div>
          <div>详情：xx-01分系统</div>
        </el-col>
      </el-row>
      <el-row class="row-sr">
        <el-col :span="6">图片</el-col>
        <el-col :span="18">
          <div>xx-01 问题</div>
          <div>主键：xx-01 问题</div>
          <div>详情：xx-01分系统</div>
        </el-col>
      </el-row>
      <div class="pagination_d">
        <!-- 分页区域 -->
        <el-pagination
          :current-page="1"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-col>
    <el-col :span="15">
      <el-row>
        <el-col :span="20">
          <img src="@/images/u1445.png" />
          <img src="@/images/u1447.png" />
          <img src="@/images/u1449.png" />
          <img src="@/images/u1451.png" />
          <img src="@/images/u1453.png" />
        </el-col>
        <el-col :span="4">
          <img src="@/images/u1022.png" />
          <img src="@/images/u1024.png" />
        </el-col>
      </el-row>
      <el-row>
        <el-col></el-col>
      </el-row>
    </el-col>
    <el-col :span="5">
      <el-row class="row-sr">
        <el-col>详情
          
        </el-col>
      </el-row>
      <el-row class="row-sr">
        <!-- <el-col><img src="@/images/u1026.png"/><span>主键：发射车故障质量归零报告</span>
        
        </el-col>-->
        <el-col :span="6">
          <img src="@/images/u1026.png" />
        </el-col>
        <el-col :span="18">
          <div>主键：发射车故障质量归零报告</div>
        </el-col>
       
      </el-row>
      <el-row class="row-sr">
        <el-col>类型/描述</el-col>
        <el-col>名称：发射车故障</el-col>
        <el-col>类型：报告</el-col>
      </el-row>
      <el-row class="row-sr">
        <el-tabs type="border-card">
          <el-tab-pane label="实体"></el-tab-pane>

          <el-tab-pane label="关系"></el-tab-pane>
          <el-tab-pane label="事件">
            <el-table :data="resultlist" stripe>
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column label="关系名称" prop="username"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        
      </el-row>
    </el-col>
    <!-- 搜索话框 -->
    <el-dialog title="定位搜索" :visible.sync="searchVisible" width="30%" @close="searchDialogClosed">
      <el-form :model="searchForm" :rules="searchFormRules" ref="searchFormRef" label-width="">
        <el-form-item  prop="search">
          <el-input
            class="input_m"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="searchForm.search"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
     <!-- 历史记录 -->
    <el-dialog title="历史记录" :visible.sync="historyVisible" width="30%">
      <el-table :data="historylist" stripe>
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column label="导入时间" prop="datatime"></el-table-column>              
              <el-table-column label="导入实体数量" prop="number"></el-table-column>
            </el-table>
    </el-dialog>
    <!-- 保存主题 -->
    <el-dialog title="保存主题"  :visible.sync="themeVisible" width="750px">
      
      <Theme></Theme>
    </el-dialog>
  </el-row>
</template>
<script>
import Theme from '../components/Theme.vue'
export default {
  components:{
    Theme
  },
  data() {
    return {
      resultlist: [{ username: '发射车故障' }, { username: '系统_型号组成关系' }, { username: '产品_型号组成关系' }],
      searchVisible: false,
      historyVisible:false,
      themeVisible:true,
      historylist:[{datatime:'2019-06-28 16:32:50',number:3},{datatime:'2019-06-26 16:32:50',number:1},{datatime:'2019-06-27 16:32:50',number:2}],
      searchForm: {
        search: []
      },
      searchFormRules: {
        search: [{ required: true, message: '请输入查询的内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    searchDialogClosed() {
      this.$refs.addressFormRef.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.row-sr {
  padding-left: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 0.5px;
  border-bottom-style: solid;
  border-bottom-color: #797979;
  //height: 50px;
  border-right: 1px;
  border-right-style: solid;

  //   border-style: solid;
  //   border-top: 0.5px;
  //   border-top-style: solid;
  //   border-top-color: #797979;
}
</style>