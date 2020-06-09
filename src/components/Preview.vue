<template>
  <el-row class="conten_div">
    <el-col :span="5" class="conten_div">
      <div class="conten_div p_div_border">
        <el-row class="title_div row_height">
          <el-col>关联文本列表</el-col>
        </el-row>
        <el-row>
          <el-col>
            <ul class="col-content">
              <li v-for="(item,i) in datalist.relatedtext" :key="item.id">
                {{i+1}}
                <a href="#" @click.stop.prevent="getReport(item.id)">{{item.name}}</a>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-col>

    <el-col :span="19" class="conten_div">
      <div class="conten_div p_div_border content">
        <el-row class="title_div row_height">
          <el-col :span="22">【文件名】</el-col>
          <el-col :span="1">
            <a href="#" @click.stop.prevent>预览</a>
          </el-col>
          <el-col :span="1">
            <a href="#" @click.stop.prevent>下载</a>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <div v-html="datalist.content[0].content" class="col-content"></div>
          </el-col>
        </el-row>
      </div>
    </el-col>

    <el-col :span="4" class="conten_div" v-if="false">
      <div class="conten_div div_border content">
        <el-row class="title_div row_height">
          <el-col>关联实体</el-col>
        </el-row>
        <el-row>
          <el-col class="collapse-item-header">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item
                class="collapse-item-header"
                :title="item.xinghao"
                :name="i"
                v-for="(item,i) in datalist.relatedentity"
                :key="item.id"
              >
                <span>{{i}}</span>
              </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    id: String
  },

  data() {
    return {
      activeName: '1',
      datalist: {
        content: [{ id: '111', name: '关联文本列表', content: 'dsfdsfsd<br>fsddfs' }],
        relatedtext: [{ id: '112', name: '关联文本列表' }],
        //page: [{ zongye: '113' }, { dangqianye: '1' }, { meiye: '5' }],
        relatedentity: [{ xinghao: 'v11', chanpin: 'guilingbaogao61' }]
      }
    }
  },
  methods: {
    async getReport(val) {
      const data = await this.$ajax.get(`http://127.0.0.1:8081/api/search_id/${val}`)
      if (data.code !== 200) {
        return this.$message.error('获取关键词检索类别失败！')
      }
      return data.datas
    }
  },

  mounted() {
    //  getReport(this.id);
  },
  created() {
    console.log('2222')
  }
}
</script>
<style lang="less"  scoped>
@import '../assets/css/search.less';
@left:15px;
.row_height {
  height: 40px;
  line-height: 40px;
  padding-left: @left;
}
.content {
  margin-left: @left;
}
.conten_div {
  height: 99%;
}
.title_div {
  border-bottom: 2px solid @border_c;;
}
.p_div_border {
    
    border: 2px solid @border_c;
  }
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
ul,
li,
a {
  text-decoration: none;
  font-size: 14px;
}
.col-content {
  margin-top: @left;
  margin-left: @left;
}
.collapse-item-header {
  padding-left: @left;
  padding-right: @left;
}

</style>