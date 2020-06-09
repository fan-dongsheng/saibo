<template>
  <div>
    <div class="div_border">
      <div class="marginBootom">相关推荐</div>
      <div class="marginBootom">
        <span
          class="show"
          v-for="mode in modellist.recomand.XIANGGUANTIJAIN"
          :key="mode.id"
        >{{mode.name}}</span>
      </div>
    </div>
    <div class="div_border">
      <div class="marginBootom">构成器件</div>
      <el-row v-if="isMponentHide">
        <el-col :span="23">
          <div class="summary">
            <el-popover
              placement="bottom"
              class="show"
              width="400"
              trigger="hover"
              v-for="model in modellist.recomand.GOUCHENGQIJIAN"
              :key="model.id"
            >
              <div>
                <span v-for="m in model.data" :key="m.id">{{m.name}}</span>
              </div>
              <el-button slot="reference" type="text">{{model.name}}</el-button>
            </el-popover>
          </div>
        </el-col>
        <el-col :span="1" v-if="modellist.recomand.GOUCHENGQIJIAN.length>0">
          <!-- 绑定点击事件onShow，点击展开全文 -->
          <a href="#" @click.stop.prevent="onMShow">
            
             <img src="@/images/u_up.png" class="arrow_img" />
            <!-- 向下的角箭头符号，用css画 -->
            <!-- <span class="downArrow"></span> -->
          </a>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="23">
          <el-popover
            placement="bottom"
            class="show"
            width="400"
            trigger="hover"
            v-for="model in modellist.recomand.GOUCHENGQIJIAN"
            :key="model.id"
          >
            <div>
              <span v-for="m in model.data" :key="m.id">{{m.name}}</span>
            </div>
            <el-button slot="reference" type="text">{{model.name}}</el-button>
          </el-popover>
        </el-col>
        <el-col :span="1" v-if="modellist.recomand.GOUCHENGQIJIAN.length>0">
          <a href="#" @click.stop.prevent="onMHide">
            
             <img src="@/images/u_up.png" class="arrow_img upArrow" />
            <!-- 向上的角箭头符号 -->
            <!-- <span class="upArrow"></span> -->
          </a>
        </el-col>
      </el-row>
    </div>
    <div class="div_border">
      <div class="marginBootom">故障现象</div>
      <el-row v-if="isFaultHide">
        <el-col :span="23">
          <div class="summary">
            <el-popover
              placement="bottom"
              class="show"
              width="400"
              trigger="hover"
              v-for="model in modellist.recomand.GUZHANXIANXIANG"
              :key="model.id"
            >
              <div>
                <span v-for="m in model.data" :key="m.id">{{m.name}}</span>
              </div>
              <el-button slot="reference" type="text">{{model.name}}({{model.quantity}})</el-button>
            </el-popover>
          </div>
        </el-col>
        <el-col :span="1" v-if="modellist.recomand.GUZHANXIANXIANG.length>0">
          <a href="#" @click.stop.prevent="onFShow">
            <img src="@/images/u_up.png" class="arrow_img arrow_img_Position"  />
            <!-- 向上的角箭头符号 -->
            <!-- <span class="downArrow"></span> -->
          </a>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="23">
          <el-popover
            placement="bottom"
            class="show"
            width="400"
            trigger="hover"
            v-for="model in modellist.recomand.GUZHANXIANXIANG"
            :key="model.id"
          >
            <div>
              <span v-for="m in model.data" :key="m.id">{{m.name}}</span>
            </div>
            <el-button slot="reference" type="text">{{model.name}}({{model.quantity}})</el-button>
          </el-popover>
        </el-col>
        <el-col :span="1" v-if="modellist.recomand.GUZHANXIANXIANG.length>0">
          <a href="#" @click.stop.prevent="onFHide">
             <img src="@/images/u_up.png" class="arrow_img upArrow" />
            <!-- 向上的角箭头符号 -->
            <!-- <span class="upArrow"></span> -->
          </a>
        </el-col>
      </el-row>
    </div>
    <div v-for="item in modellist.content" class="model_info" :key="item.id">
      <el-row class="div_border model_info_title">
        <el-col :span="24" class="col_conent">{{item.name}}</el-col>
      </el-row>
      <el-row class="content_left">
        <el-row>
          <el-col :span="4" class="marginBootom">
            <img src="@/images/u262x.png" class="u262_img" />
          </el-col>
          <el-col :span="19" class="marginBootom">
            <el-row>
              <el-col :span="8" class="col_conent">主键：{{item.zhujian}}</el-col>
              <el-col :span="8" class="col_conent">名称：{{item.codename}}</el-col>
              <el-col :span="7" class="col_conent">型号名称:{{item.systemname}}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">归零报告{{item.guilingquanlity}}篇</el-col>
          <el-col :span="4">质量问题{{item.wentiquanlity}}个</el-col>
          <el-col :span="4">关联产品{{item.chanpinquanlity}}个</el-col>
        </el-row>
      </el-row>
    </div>
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
  </div>
</template>
<script>
export default {
  props: {
    modellist: Array
  },
  data() {
    return {
      isMponentHide: true,
      isFaultHide: true,
      // 获取列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      total: 0
    }
  },
  created() {
    //  test();
  },
  methods: {
    onMShow: function() {
      this.isMponentHide = false //点击onShow切换为false，显示为展开画面
    },
    onMHide: function() {
      this.isMponentHide = true //点击onHide切换为true，显示为折叠画面
    },
    onFShow: function() {
      this.isFaultHide = false
    },
    onFHide: function() {
      this.isFaultHide = true
    }
  }
}
</script>
<style lang="less"  scoped>
@import '@/assets/css/search.less';

</style>