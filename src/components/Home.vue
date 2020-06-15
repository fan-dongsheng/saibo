<template>
  <el-container class="home-container">
    <el-header style="height:80px;">
      <div>
        <img src="../assets/logo.png" class="img-home-logo" alt />
        
      </div>
    
    </el-header>
    <el-container>
      <el-aside width="180px">
        <!-- 侧边栏菜单区域 -->
        <el-menu
        v-loading="menuLoading"
          class="menu"
          active-text-color="#396FFF"
          unique-opened
          :collapse-transition="false"
         router
         :default-active="$route.path"
        >
          
          <el-menu-item :index="`/${item.index}`" v-for="item in aside_list" :key="item.index">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <img :src="require('../images/'+item.icon+'.png')" class="icom" />

              <span>{{item.title}}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="background:#F2F3F4">
        <!-- 路由占位符 -->
        <router-view></router-view>

        
      </el-main>
    </el-container>
  </el-container>
</template>

<script>



export default {
  data() {
    return {
      menuLoading:false,
      editableTabsValue: this.$my_editableTabsValue,
      editableTabs: this.$my_tag_list,
      default_active_index: { active: '' },

      aside_list: [
         {
          index: 'projectManagement',
          title: '项目管理',
          name: 'projectManagement',
          icon: 'u228',
          component: '@/components/projectManagement.vue',
          path: 'projectManagement',
          menuorigin: 'local'
        },
        {
          index: 'dataManagement',
          title: '数据管理',
          name: 'dataManagement',
          icon: 'u196',
          component: '@/components/dataManagement.vue',
          path: 'dataManagement',
          menuorigin: 'local'
        },
        {
          index: 'modelManagement',
          title: '模型管理',
          name: 'modelManagement',
          icon: 'u194',
          component: '@/components/modelManagement.vue',
          path: 'modelManagement',
          menuorigin: 'local'
        },
        {
          index: 'dataImport',
          title: '数据导入',
          name: 'dataImport',
          icon: 'u200',
          component: '@/components/dataImport.vue',
          path: 'dataImport',
          menuorigin: 'local'
        },
        {
          index: 'mapQuiz',
          title: '图谱问答',
          name: 'mapQuiz',
          icon: 'u196',
          component: '@/components/mapQuiz.vue',
          path: 'mapQuiz',
          menuorigin: 'local'
        },
      ],
      // 左侧菜单数据
      menulist: []
    }
  },
  components: {},
  methods: {
    
  },
  computed: {
    // keepAliveTagsList() {
    //   return this.$store.getters.keepAliveTagsList
    // }
  },
  created(){
    this.menuLoading=true
    window.setTimeout(() => {
      this.menuLoading=false
    }, 300);
    
  }
}
</script>
<style lang="less">
.el-menu-item.is-active {
  background-color: #c1defc !important;
}
.menu {
  font-family: 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #868686;
}
.overflow_h{
  overflow-y:hidden;
}

.el-header {
  background-color: #396FFF;
  display: flex;
  
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 14px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  .el-menu {
    border-right: none;
    
    .el-menu-item{
      height: 62px;
      line-height: 62px;
    }
  }
  // border-right: 1px solid #C7CEDA;

  //border-color: #C7CEDA !important;
}
.img-home-logo {
  width: 190px;
  height: inherit;
}
.icom {
  margin-right: 10px;
  left: 0px;
  top: 0px;
  width: 23px;
  height: 23px;
}
.el-main {
  height: calc(100vh - 80px);
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 0px !important;
    &::-webkit-scrollbar {
      display: none;
    }
}

</style>


