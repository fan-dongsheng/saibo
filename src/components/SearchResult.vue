<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="产品名称" name="first">
      <div class="searchDiv">
        <el-input placeholder="请输入内容" class="input"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <img src="../images/u160.png" class="u160_img" />
      </div>
      <el-row>
        <el-col :span="16">
          <div class="grid-content bg-purple marginBootom">
            <el-button round>型号</el-button>
            <el-button round>产品</el-button>
            <el-button round>质量问题</el-button>
            <el-button round>其他</el-button>
          </div>
          <div class="div_border">
            <div class="marginBootom">相关推荐</div>
            <div class="marginBootom">
              <span class="show">XX-10</span>
              <span class="show">XX-100</span>
              <span class="show">XX-101</span>
              <span class="show">XX-5</span>
            </div>
          </div>
          <div class="div_border">
            <div class="marginBootom">构成器件</div>
            <el-popover placement="bottom" class="show" width="400" trigger="hover">
              <div>
                <span>ds</span>
              </div>
              <el-button slot="reference" type="text">发动机</el-button>
            </el-popover>
            <el-popover placement="bottom" class="show" width="400" trigger="hover">
              <div>
                <span>ds</span>
              </div>
              <el-button slot="reference" type="text">散热器风扇</el-button>
            </el-popover>
            <el-popover placement="bottom" class="show" width="400" trigger="hover">
              <div>
                <span>ds</span>
              </div>
              <el-button slot="reference" type="text">推荐剂贮箱</el-button>
            </el-popover>
            <el-popover placement="bottom" class="show" width="400" trigger="hover">
              <div>
                <span>ds</span>
              </div>
              <el-button slot="reference" type="text">增压系统</el-button>
            </el-popover>
            <el-popover placement="bottom" class="show" width="400" trigger="hover">
              <div>
                <span>ds</span>
              </div>
              <el-button slot="reference" type="text">管路活门组</el-button>
            </el-popover>
          </div>
          <div class="div_border div_margin">
            <div class="marginBootom">故障现象</div>
            <el-popover placement="bottom" class="show" width="400" trigger="hover">
              <div>
                <span>ds</span>
              </div>
              <el-button slot="reference" type="text">发动机异常</el-button>
            </el-popover>
            <el-popover placement="bottom" class="show" width="400" trigger="hover">
              <div>
                <span>ds</span>
              </div>
              <el-button slot="reference" type="text">散热器异常</el-button>
            </el-popover>
            <el-popover placement="bottom" class="show" width="400" trigger="hover">
              <div>
                <span>ds</span>
              </div>
              <el-button slot="reference" type="text">火花塞损坏（5）</el-button>
            </el-popover>
            <el-popover placement="bottom" class="show" width="400" trigger="hover">
              <div>
                <span>ds</span>
              </div>
              <el-button slot="reference" type="text">蓄电池电压不足（5）</el-button>
            </el-popover>
          </div>

          <el-row class="div_border">
            <el-col :span="24" class="col_conent">型号xx-10</el-col>
          </el-row>
          <el-row class="row_border">
            <el-col :span="4" class="marginBootom">图片</el-col>
            <el-col :span="19" class="marginBootom">
              <el-row>
                <el-col :span="8" class="col_conent">故障现象：发动机漏油</el-col>
                <el-col :span="8" class="col_conent">故障类别:漏油</el-col>
                <el-col :span="7" class="col_conent">所属阶段:生产</el-col>
                <el-col :span="16" class="col_conent">故障详细情况：发动机在外场试验期间出现漏油现象</el-col>
              </el-row>
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

        <el-col :span="7" class="marginTab">
          <div class="grid-content bg-purple-light">
            <el-tabs type="border-card" class="tab_card">
              <el-tab-pane label="关联文本">
                <el-table :data="resultlist" stripe :show-header="false">
                  <el-table-column label="关联文本" prop="username"></el-table-column>
                  <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                      <!-- 修改按钮 -->
                      <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click="showEditDialog(scope.row.id)"
                      ></el-button>
                      <!-- 删除按钮 -->
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        @click="removeUserById(scope.row.id)"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane label="关联关系">
                <div class="searchDiv">
                  <img src="../images/u787.png" class="u787_img" />
                </div>
                <el-table :data="resultlist" stripe>
                  <el-table-column label="关系类型" prop="username"></el-table-column>
                  <el-table-column label="关系名称" prop="level"></el-table-column>
                  <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                      <!-- 修改按钮 -->
                      <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click="showEditDialog(scope.row.id)"
                      ></el-button>
                      <!-- 删除按钮 -->
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        @click="removeUserById(scope.row.id)"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script >
export default {
  data() {
    return {
      activeName: 'first',
      // 获取列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      resultlist: [],
      total: 0
    }
  },
  created() {
    this.getResultList()
  },
  methods: {
    async getResultList() {
      const { data: res } = await this.$ajax.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.resultlist = res.data.users
      this.total = res.data.total
      console.log(res)
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    }
  }
}
</script>
<style lang="less" scoped>
.searchDiv {
  text-align: center;
}

.col_h {
  height: 30px;
}
.marginBootom,
.searchDiv {
  margin-bottom: 20px;
}
.pagination_d {
  margin-top: 30px;
  text-align: right;
}
.marginBootom {
  margin-left: 10px;
  margin-top: 10px;
}
.marginTab {
  margin-left: 30px;
  margin-top: 10px;
}
.div_border {
  border: 1px;
  border-style: solid;
}
.row_border {
  border: 1px;
  border-style: solid;
  border-top-style: none;
}
.div_margin {
  margin-bottom: 20px;
}
.col_conent {
  margin-left: 10px;
  height: 40px;
}
.show {
  margin-left: 20px;
}
.img {
  width: 454px;
  height: 277px;
  margin-bottom: 20px;
}
.u787_img {
  width: 279px;
  height: 244px;
}
.div {
  width: 100%;
  height: 100%;
  text-align: center;
}
.input {
  width: 640px;
}
.u160_img {
  margin-left: 20px;
}
.tab_card {
  height: 640px;
}
</style>