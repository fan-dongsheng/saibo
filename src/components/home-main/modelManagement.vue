<template>
  <div class="modelManagement">
    <!-- 模型管理首页 -->
    <!-- echarts -->
    
    
    <el-card>
      <div slot="header" class="clearfix">
   <el-button
      type="primary"
      size="small"
      
      @click="$router.back()"
    >上一步</el-button>
    <div v-if="activeVerd!==9" style="float:left">
      <el-button type="primary" size="small"  @click="addEntDilog.visible=true">新建实体</el-button>
    <el-button type="primary" size="small"  @click="editEntDilog.visible=true">修改实体</el-button>
    <el-button type="primary" size="small"  @click="delEntDilog.visible=true">删除实体</el-button>
    <el-button type="primary" size="small"  @click="addRelationDilog.visible=true">新建关系</el-button>
    <el-button type="primary" size="small"  @click="editRelationDilog.visible=true">修改关系</el-button>
    <el-button type="primary" size="small" style="margin-right:10px;"  @click="delRelationDilog.visible=true">删除关系</el-button>
    </div>
  </div> 
      <div class="modelM">
        <el-card class="cardddd">
          <div class="version">
                    版本号
                    <div class="ver-cont">
                      <div
                        class="ver-cont1"
                        :class="{active:index==activeVerd}"
                        v-for="(item,index) in verD"
                        :key="index"
                        @click="activeVer(index,item.d)"
                      >{{item.d}}</div>
                      <!-- <div class="ver-cont2" >2</div> -->
                    </div>
                  </div>
        </el-card>
        
        <el-card class="cardddd" style="flex:1;">
            <div class="json" >
                      json
                      <div class="jsonBorder" v-loading="jsonLoading">
                        <pre style="background-color: rgb(1, 132, 252,0.5);border-radius: 5px;padding:10px;"><code id="json"></code></pre>
                      </div>
                    </div>
        </el-card>
        

        <!-- echarts ======================================================-->

        <el-card class="cardddd">
<div id="main" style="width: 600px;height:600px;" v-loading="echLoading"></div>
        </el-card>
        
      </div>
    </el-card>
    <!-- //新建实体弹窗 -->
    <el-dialog width="600px" title="新增实体" :visible.sync="addEntDilog.visible">
      <div v-loading="addEntDilog.loading" class="dialog-wrapper">
        <el-form
          label-width="150px"
          ref="addEntForm"
          :model="addEntDilog.form"
          :rules="addEntDilog.rules"
          size="mini"
        >
          <el-form-item label="实体名称:" prop="ent" >
            <el-input v-model="addEntDilog.form.ent" autocomplete="off" ></el-input>
          </el-form-item>
           <el-form-item label="实体属性:" >
            <el-input v-model="addEntDilog.form.attr" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="实体属性值:" >
            <el-input v-model="addEntDilog.form.attr_val" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="文件路径:" prop="file_path" >
            <el-input v-model="addEntDilog.form.file_path" autocomplete="off" disabled></el-input>
          </el-form-item> -->
          <el-form-item label="版本号:" prop="version">
            <el-input v-model="this.version" autocomplete="off" disabled></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="handeladdent">保 存</el-button>
          <el-button size="mini" @click="addEntDilog.visible = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- //修改实体弹窗 -->
    <el-dialog width="600px" title="修改实体" :visible.sync="editEntDilog.visible">
      <div v-loading="editEntDilog.loading" class="dialog-wrapper">
        <el-form
          label-width="150px"
          ref="editEntForm"
          :model="editEntDilog.form"
          :rules="editEntDilog.rules"
          size="mini"
        >
          <el-form-item label="新实体名称:" prop="new_ent" >
            <el-input v-model="editEntDilog.form.new_ent" autocomplete="off" ></el-input>
          </el-form-item>
           <el-form-item label="旧实体名称:" prop="old_ent" >
            <el-input v-model="editEntDilog.form.old_ent" autocomplete="off" ></el-input>
          </el-form-item>
           
          <!-- <el-form-item label="文件路径:" prop="file_path" >
            <el-input v-model="editEntDilog.form.file_path" autocomplete="off" disabled></el-input>
          </el-form-item> -->
         
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="handeleditent">保 存</el-button>
          <el-button size="mini" @click="editEntDilog.visible = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- //删除实体弹窗 -->
    <el-dialog width="600px" title="删除实体" :visible.sync="delEntDilog.visible">
      <div v-loading="delEntDilog.loading" class="dialog-wrapper">
        <el-form
          label-width="150px"
          ref="delEntForm"
          :model="delEntDilog.form"
          :rules="delEntDilog.rules"
          size="mini"
        >
          <el-form-item label="实体名称:" prop="ent" >
            <el-input v-model="delEntDilog.form.ent" autocomplete="off" ></el-input>
          </el-form-item>
         
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="handeldelent">确 定</el-button>
          <el-button size="mini" @click="delEntDilog.visible = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- //新建关系弹窗 -->
    <el-dialog width="600px" title="新增关系" :visible.sync="addRelationDilog.visible">
      <div v-loading="addRelationDilog.loading" class="dialog-wrapper">
        <el-form
          label-width="150px"
          ref="addRelationForm"
          :model="addRelationDilog.form"
          :rules="addRelationDilog.rules"
          size="mini"
        >
          <el-form-item label="实体source:" prop="ent1" >
            <el-input v-model="addRelationDilog.form.ent1" autocomplete="off" ></el-input>
          </el-form-item>
           <el-form-item label="实体target:" prop="ent2">
            <el-input v-model="addRelationDilog.form.ent2" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="关系:"  prop="rel">
            <el-input v-model="addRelationDilog.form.rel" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="文件路径:" prop="file_path" >
            <el-input v-model="addRelationDilog.form.file_path" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="版本号:" prop="version">
            <el-input v-model="this.version" autocomplete="off" disabled></el-input>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="handeladdrelation">保 存</el-button>
          <el-button size="mini" @click="addRelationDilog.visible = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- //修改关系弹窗 -->
    <el-dialog width="600px" title="修改关系" :visible.sync="editRelationDilog.visible">
      <div v-loading="editRelationDilog.loading" class="dialog-wrapper">
        <el-form
          label-width="150px"
          ref="editRelationForm"
          :model="editRelationDilog.form"
          :rules="editRelationDilog.rules"
          size="mini"
        >
          <el-form-item label="实体source(索引: 1):" prop="ent1" >
            <el-input v-model="editRelationDilog.form.ent1" autocomplete="off" ></el-input>
          </el-form-item>
           <el-form-item label="实体target(索引：2):" prop="ent2">
            <el-input v-model="editRelationDilog.form.ent2" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="关系(索引：0):"  prop="rel">
            <el-input v-model="editRelationDilog.form.rel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="要修改的索引:"  prop="search_index">
            <el-input v-model="editRelationDilog.form.search_index" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="修改值为 :"  prop="new_value">
            <el-input v-model="editRelationDilog.form.new_value" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="文件路径:" prop="file_path" >
            <el-input v-model="editRelationDilog.form.file_path" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="版本号:" prop="version">
            <el-input v-model="this.version" autocomplete="off" disabled></el-input>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="handeleditrelation">保 存</el-button>
          <el-button size="mini" @click="editRelationDilog.visible = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- //删除关系弹窗 -->
    <el-dialog width="600px" title="删除关系" :visible.sync="delRelationDilog.visible">
      <div v-loading="delRelationDilog.loading" class="dialog-wrapper">
        <el-form
          label-width="150px"
          ref="delRelationForm"
          :model="delRelationDilog.form"
          :rules="delRelationDilog.rules"
          size="mini"
        >
          <el-form-item label="实体source:"  >
            <el-input v-model="delRelationDilog.form.ent1" autocomplete="off" ></el-input>
          </el-form-item>
           <el-form-item label="实体target:" >
            <el-input v-model="delRelationDilog.form.ent2" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="关系:"  >
            <el-input v-model="delRelationDilog.form.rel" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="文件路径:" prop="file_path" >
            <el-input v-model="delRelationDilog.form.file_path" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="版本号:" prop="version">
            <el-input v-model="this.version" autocomplete="off" disabled></el-input>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="handeldelrelation">保 存</el-button>
          <el-button size="mini" @click="delRelationDilog.visible = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      echLoading:false,
      jsonLoading:false, //json数据loading
      echDataJson: [], //echarts的data数据，需要接口处理
      linksJson: [], //关系links数据修改
      verD: [{ d: 'v2' }, { d: 'v1' }], //版本号
      activeVerd: 9, //激活样式
      version:'v1', //当前点击的版本号
      //新增实体
      addEntDilog:{
        visible:false,
        loading:false,
        form:{
          ent:'故障', //实体
          attr:'名称',//实体属性
          attr_val:'故障1',  //实体属性值,
          project:'pro1',//项目名称
          // file_path:'/home/gnx/tmp/pycharm_project_180',  //文件路径
          version:'v1'//版本号
        },
        rules: {
          ent: [{ required: true, message: '请输入实体名称', trigger: 'blur' }],
          attr: [{ required: true, message: '请输入实体属性', trigger: 'blur' }],
          attr_val: [{ required: true, message: '请输入实体属性值', trigger: 'blur' }], 
        }
        
      },
      //修改实体
      editEntDilog:{
        visible:false,
        loading:false,
        form:{
          new_ent:'',   //新实体
          old_ent:'故障', //旧实体
          // file_path:'/home/gnx/tmp/pycharm_project_180',  //文件路径
          project:'pro1',//项目名称
          version:'v1'//文件名
        },
        rules: {
          new_ent: [{ required: true, message: '请输入实体名称', trigger: 'blur' }],
          old_ent: [{ required: true, message: '请输入实体名称', trigger: 'blur' }]
        }
        
      },
       //删除实体
      delEntDilog:{
        visible:false,
        loading:false,
        form:{
          ent:'',   //实体
        //  file_path:'/home/gnx/tmp/pycharm_project_180',  //文件路径
         project:'pro1',//项目名称
          version:'v1'//文件名
        },
        rules: {
          ent: [{ required: true, message: '请输入实体名称', trigger: 'blur' }]
        }
        
      },
      //新增关系
      addRelationDilog:{
        visible:false,
        loading:false,
        form:{
          ent1:'故障', //实体
          rel:'因果关系',//关系
          ent2:'故障原因',  //
          project:'pro1',//项目名称
          // file_path:'/home/gnx/tmp/pycharm_project_180',  //文件路径
          version:'v1'//版本号
        },
        rules: {
          ent1: [{ required: true, message: '请输入实体名称', trigger: 'blur' }],
          rel: [{ required: true, message: '请输入实体属性', trigger: 'blur' }],
          ent2: [{ required: true, message: '请输入实体属性值', trigger: 'blur' }]
        }
        
      },
       //修改关系
      editRelationDilog:{
        visible:false,
        loading:false,
        form:{
          ent1:'故障', //实体
          rel:'因果关系',//关系
          ent2:'故障原因',  //
          search_index:'0',  //搜素引擎
          new_value:'从属关系',  //修改关系
          project:'pro1',//项目名称
          // file_path:'/home/gnx/tmp/pycharm_project_180',  //文件路径
          version:'v1'//版本号
        },
        rules: {
          ent1: [{ required: true, message: '请输入实体名称', trigger: 'blur' }],
          rel: [{ required: true, message: '请输入实体属性', trigger: 'blur' }],
          ent2: [{ required: true, message: '请输入实体属性值', trigger: 'blur' }],
          search_index: [{ required: true, message: '请输入实体属性值', trigger: 'blur' }],
          new_value: [{ required: true, message: '请输入实体属性值', trigger: 'blur' }]
        }
        
      },
      //删除关系
      delRelationDilog:{
        visible:false,
        loading:false,
        form:{
          ent1:'故障', //实体
          rel:'因果关系',//关系
          ent2:'故障原因',  //
          project:'pro1',//项目名称
          // file_path:'/home/gnx/tmp/pycharm_project_180',  //文件路径
          version:'v1'//版本号
        },
        rules: {
          ent1: [{ required: true, message: '请输入实体名称', trigger: 'blur' }],
          rel: [{ required: true, message: '请输入实体属性', trigger: 'blur' }],
          ent2: [{ required: true, message: '请输入实体属性值', trigger: 'blur' }]
        }
        
      },

    }
  },
  methods: {
    //获取版本号
    async getVersion(){
      const {data}=await this.$ajax({
        url:`/hehe/mm_getVersionList?project=pro1`,
      })
      console.log(data,'获取版本号成功');
      this.verD=data.map((item,index)=>{
        return {
          d: item.substring( 0,item.lastIndexOf('.'))  
        }
      })
    },
  
   //新建实体保存按钮
   handeladdent(){
this.$refs.addEntForm.validate(async(valid)=>{
if(valid){
  try {
    const {data}=await this.$ajax({
      url:'/hehe/add_entity',
      params:this.addEntDilog.form
    })
    //这里需要判断后台返回的是不是fail，如果是就拦截
    if(data=='fail'){
this.addEntDilog.visible = false
this.$message.error('添加的实体已存在')
    }else{
console.log(data,'新增成功');
    this.addEntDilog.visible = false
    this.getJson()
    this.$message.success('新增实体成功')
    }
    
  } catch (error) {
    console.log(error,'新增失败');
    this.addEntDilog.visible = false
  }
}else{
   console.log('error submit!!');
              this.addEntDilog.visible = false
            return false;
}
})
   },
   //修改实体
   handeleditent(){
this.$refs.editEntForm.validate(async(valid)=>{
if(valid){
  try {
    const {data}=await this.$ajax({
      url:'/hehe/update_entity',
      params:this.editEntDilog.form
    })
    if(data=='fail'){
      this.editEntDilog.visible = false
    this.$message.error('原实体不存在')
    }else{
console.log(data,'修改成功');
    this.getJson()
    this.editEntDilog.visible = false
    this.$message.success('修改实体成功')
    }
    
  } catch (error) {
    console.log(error,'修改失败');
    this.editEntDilog.visible = false
  }
}else{
   console.log('error submit!!');
              this.editEntDilog.visible = false
            return false;
}
})
   },
   //删除实体
    handeldelent(){
this.$refs.delEntForm.validate(async(valid)=>{
if(valid){
  try {
    const {data}=await this.$ajax({
      url:'/hehe/delete_entity',
      params:this.delEntDilog.form
    })
    console.log(data,'删除成功');
    this.getJson()
    this.delEntDilog.visible = false
    this.$message.success('删除实体成功')
  } catch (error) {
    console.log(error,'删除失败');
    this.delEntDilog.visible = false
  }
}else{
   console.log('error submit!!');
              this.delEntDilog.visible= false
            return false;
}
})
   },  
   //新增关系
   async handeladdrelation(){
this.$refs.addRelationForm.validate(async(valid)=>{
if(valid){
  try {
    const {data}=await this.$ajax({
      url:'/hehe/add_relation',
      params:this.addRelationDilog.form
    })
    //判断后台给的数据，进行拦截
    if(data=='fail'){
    this.addRelationDilog.visible = false
    this.$message.error('ent1、ent2不存在或新增的关系已存在')
    }else{
console.log(data,'新增成功');
    this.getJson()
    this.addRelationDilog.visible = false
    this.$message.success('新增关系成功')
    }

    
  } catch (error) {
    console.log(error,'新增失败');
    this.addRelationDilog.visible = false
  }
}else{
   console.log('error submit!!');
              this.addRelationDilog.visible = false
              
            return false;
}
})
   },
   //修改关系
   handeleditrelation(){
this.$refs.editRelationForm.validate(async(valid)=>{
if(valid){
  try {
    const {data}=await this.$ajax({
      url:'/hehe/update_relation',
      params:this.editRelationDilog.form
    })
    if(data=='fail'){
      this.editRelationDilog.visible = false
    this.$message.error('原关系三元组不存在')
    }else{
console.log(data,'修改成功');
    this.getJson()
    this.editRelationDilog.visible = false
    this.$message.success('修改关系成功')
    }
    
  } catch (error) {
    console.log(error,'修改失败');
    this.editRelationDilog.visible = false
  }
}else{
   console.log('error submit!!');
              this.editRelationDilog.visible = false
            return false;
}
})
   },
   //删除关系
   async handeldelrelation(){
     var valid=this.delRelationDilog.form.ent1 || this.delRelationDilog.form.ent2 || this.delRelationDilog.form.rel
     if(valid){
try {
    const {data}=await this.$ajax({
      url:'/hehe/delete_relation',
      params:this.delRelationDilog.form
    })
    console.log(data,'删除成功');
    this.getJson()
    this.delRelationDilog.visible = false
    this.$message.success('删除成功')
  } catch (error) {
    console.log(error,'删除失败');
    this.delRelationDilog.visible = false
  }
     }else{
      this.$message.warning('请输入实体或关系')
     }
// this.$refs.delRelationForm.validate(async(valid)=>{
// if(valid){
//   try {
//     const {data}=await this.$ajax({
//       url:'/hehe/delete_relation',
//       params:this.delRelationDilog.form
//     })
//     console.log(data,'删除成功');
//     this.getJson()
//     this.delRelationDilog.visible = false
//   } catch (error) {
//     console.log(error,'删除失败');
//     this.delRelationDilog.visible = false
//   }
// }else{
//    console.log('error submit!!');
//               this.delRelationDilog.visible = false
//             return false;
// }
// })
   },
    //获取json文件、
    async getJson(d) {
      this.jsonLoading=true
     this.echDataJson = []
    this.linksJson = []

      try {
         
        const { data } = await this.$ajax({
          url: '/hehe/read_json',
          params: {
            project:'pro1',
            // file_path: `/home/gnx/tmp/pycharm_project_180`,
            version: 'v1'
          }
        })
        console.log(data, '获取json文件test1')
        let btn = document.querySelector('#json')
        let dataHtml = data
        let bigger = data //后套返回json数据需要处理成eachrts需要的数据

//         let bigger={
//     "entity": {
//         "基金项目名称": {},
//         "单位": {
//             "type": ["需求单位", "申报单位", "曾合作单位", "所在学会"]
//         },
//         "专业领域": {},
//         "研究方向": {}
//     },
//     "relation": {
//         "需求关系1": [["项目", "单位"]],
//         "需求关系2": [["项目", "专业领域"]],
//         "申报关系": [["项目", "单位"]],
//         "合作关系": [["申报单位", "曾合作单位"]],
//         "研究关系": [["申报单位", "研究方向"]],
//         "包含关系1": [["专业领域", "研究方向"]],
//         "包含关系2": [["学会", "申报单位"]],
//         "因果关系": [],
//         "从属关系": []
//     }
// }
        btn.textContent = JSON.stringify(dataHtml, null, '  ')
        //遍历后台返回的json对象
        //第一层最大的外圈

        for (var key in bigger) {
          
          //   console.log(key, ':', bigger[key], '==================')
          //如果是实体的话
          if (key == 'entity') {
            var typeList=[]  //key1设置一个空数组，这个主要是为了type这个添加数组设置的中间变量
            for (var key1 in bigger[key]) {
              console.log(key1, ':', bigger[key][key1], 'shitishishishiss')
              //判断对象有没有子集，有的话还需要遍历取出，添加到name
           if(JSON.stringify(bigger[key][key1]) == "{}"){
this.echDataJson.push({ name: key1 })
           }else{
             //单位里面继续套的type需要解析出来
             
            //  var typeList=[]
             typeList.push(key1)
for (const key2 in bigger[key][key1]) {
 console.log( key2,':', bigger[key][key1][key2], 'shitishishishiss============')
//遍历type的数组val值,再加到数组中
      for(const key3 in bigger[key][key1][key2]){
        console.log(key3,':', bigger[key][key1][key2][key3], ',,,,,,,,,,,,,,,,,,,,,,,,,,,');
        
        typeList.push(bigger[key][key1][key2][key3])
      }

}


           }
              
            }

            var color = ['#06FDBC', '#0188FE', '#07B0FE', '#FDB408', '#00DB1C', '#0188FE']
            this.echDataJson = this.echDataJson.map((el, i) => {
              var normal = {}
              return {
                name: el.name,
                itemStyle: {
                  normal: {
                    borderColor: color[i],
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: color[i],
                    color: color[i]
                  }
                }
              }
            })
          //else 中type需要整合添加的颜色
console.log(typeList,'typeList');
typeList=typeList.map((item,i)=>{
  return{
    name:item,
    itemStyle: {
                  normal: {
                    borderColor: '#C07AB8',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#C07AB8',
                    color: '#C07AB8'
                  }
                }
  }
})
this.echDataJson.push(...typeList)

            // console.log(this.echDataJson,'+++++++++++++++++++++++++++++++++++++=');
          }
          if (key == 'relation') {
            for (var key1 in bigger[key]) {
              //    console.log(key1, ':', bigger[key][key1], 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
              this.linksJson.push({ value: key1, arr: bigger[key][key1] })
            }
            //             "relation": {
            //     "因果关系": [],
            //     "从属关系": [["故障", "故障原因"]]
            // }

            this.linksJson = this.linksJson.map((ele, i) => {
              return {
                source: ele.arr
                  .map(it => {
                    return it[0] ? it[0] : ''
                  })
                  .toString(),
                target: ele.arr
                  .map(it => {
                    return it[1] ? it[1] : ''
                  })
                  .toString(),
                value: ele.value
              }
            })
          }
          console.log(this.linksJson, 'lllllllllllllllllllllllaaaaaaaaaaaaaaaaaaaaaaaaa')

          this.echat()
          setTimeout(() => {
            this.jsonLoading=false
          }, 300);
          
        }
      } catch (error) {
        this.jsonLoading=false
        console.log(error, '获取信息错误')
      }
    },
    //点击下标点亮
    activeVer(i, d) {
      this.activeVerd = i
      this.getJson(d)
      this.echDataJson = []
      this.linksJson = []
    },
    //默认页面展示json数据
    jsonData() {
      let btn = document.querySelector('#json')
      // let dataHtml = {
      //   entity: {
      //     项目: {},
      //     单位: {
      //       type: ['需求单位', '申报单位', '曾合作单位', '所在学会']
      //     },
      //     专业领域: {},
      //     研究方向: {}
      //   },
      //   relation: {
      //     需求关系1: ('项目', '单位'),
      //     需求关系2: ('项目', '专业领域'),
      //     申报关系: ('项目', '单位'),
      //     合作关系: ('申报单位', '曾合作单位'),
      //     研究关系: ('申报单位', '研究方向'),
      //     包含关系1: ('专业领域', '研究方向'),
      //     包含关系2: ('学会', '申报单位')
      //   }
      // }

      let dataHtml = { entity: {}, relation: {} }
      btn.textContent = JSON.stringify(dataHtml, null, '')
    },
    echat() {
      this.echLoading=true
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'))
      //获取后台数据的处理赋值
      var data = this.echDataJson
      console.log(data, 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee=========')

      var links = this.linksJson

      // 指定图表的配置项和数据
      var option = {
        color: ['#06FDBC', '#F6FE05', '#07B0FE', '#FDB408', '#00DB1C', '#0188FE'],
        title: {
          text: '注释：滚动鼠标可缩放'
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            symbolSize: 60,
            roam: true,
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12
                }
              }
            },
            draggable: false, // 节点是否可拖拽，只在使用力引导布局的时候有用。
            focusNodeAdjacency: true, // 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。

            categories: [
              {
                name: '一般'
              }
            ],

            force: {
              // 力引导图基本配置
              // initLayout: , // 力引导的初始化布局，默认使用xy轴的标点
              repulsion: 300, // 节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
              gravity: 0.02, // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
              edgeLength: 200, // 边的两个节点之间的距离，这个距离也会受 repulsion影响 。值越大则长度越长
              layoutAnimation: true // 因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画
              // 在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 14,
                  color: 'black'
                },

                formatter: '{c}'
              }
            },
            data: data,
            links: links
            // data: [
            // {
            //     "name": "项目",
            //      itemStyle: {
            //         normal: {
            //             borderColor: '#63adfc',
            //             borderWidth: 2,
            //             shadowBlur: 10,
            //             shadowColor: '#63adfc',
            //             color: '#63adfc',
            //         },
            //     },

            // },
            // {
            //     "name": "单位",

            // },
            // {
            //     "name": "需求单位",

            // },
            //  {
            //     "name": "申报单位",

            // },
            //  {
            //     "name": "曾合作单位",

            // },
            //  {
            //     "name": "所在学会",

            // },
            // {
            //     "name": "专业领域",
            //     itemStyle: {
            //         normal: {
            //             borderColor: '#07B0FE',
            //             borderWidth: 2,
            //             shadowBlur: 10,
            //             shadowColor: '#07B0FE',
            //             color: '#07B0FE',
            //         },
            //     },

            // }, {
            //     "name": "研究方向",
            //     itemStyle: {
            //         normal: {
            //             borderColor: '#FDB408',
            //             borderWidth: 2,
            //             shadowBlur: 10,
            //             shadowColor: '#FDB408',
            //             color: '#FDB408',
            //         },
            //     },

            // },
            // ],
            // links: [
            //   {
            //     source: '项目',
            //     target: '单位',
            //     value: '需求关系1'
            //   },
            //   {
            //     source: '项目',
            //     target: '专业领域',
            //     value: '需求关系2'
            //   },
            //   {
            //     source: '项目',
            //     target: '单位',
            //     value: '申报关系'
            //   },
            //   {
            //     source: '单位',
            //     target: '申报单位单位',
            //     value: ''
            //   },
            //   {
            //     source: '单位',
            //     target: '需求单位',
            //     value: ''
            //   },
            //   {
            //     source: '单位',
            //     target: '曾合作单位',
            //     value: ''
            //   },
            //   {
            //     source: '单位',
            //     target: '所在学会',
            //     value: ''
            //   },
            //   {
            //     source: '申报单位',
            //     target: '曾合作单位',
            //     value: '合作关系'
            //   },
            //   {
            //     source: '申报单位',
            //     target: '研究方向',
            //     value: '研究关系'
            //   },
            //   {
            //     source: '专业领域',
            //     target: '研究方向',
            //     value: '包含关系1'
            //   },
            //   {
            //     source: '所在学会',
            //     target: '申报单位',
            //     value: '包含关系2'
            //   }
            // ]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      setTimeout(() => {
        this.echLoading=false
      }, 300);
      
    }
  },
  mounted() {
    this.getVersion() //获取版本号
    this.echat() //
    this.jsonData() //页面展示的json数据
   
  }
}
</script>

<style lang='less' scoped>
.modelManagement {
  overflow: hidden;
  /deep/ .el-card {
    border-radius: 2px;
    margin: 24px;
    padding: 2px 20px;
    padding-bottom: 10px;
    .el-card__header {
      padding: 20px 0;
    }
    .el-card__body {
      padding: 20px 0;

    }
   
  }
  .modelM {
    display: flex;
    .cardddd{
      margin: 24px 5px;
      background-color: #F6F6F6;
      box-shadow:none;
    }
    .version {
      .active {
        background-color: rgb(0, 162, 255);
        color: white;
      }
      // width: 165px;

      font-size: 18px;
      font-weight: 600;
      .ver-cont {
        margin-top: 20px;

        .ver-cont1 {
          width: 100px;
          text-align: center;
          height: 30px;
          line-height: 30px;
          border-radius: 4px;
          margin-bottom: 12px;
          cursor: pointer;
        }
        .ver-cont2 {
          width: 100px;
          text-align: center;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
        }
      }
    }
    .json {
      font-size: 18px;
      font-weight: 600;
      // flex: 1;
      // width: 200px;
      // margin-right: 20px;
      .jsonBorder {
        height: 520px;
        margin-top: 20px;
        font-size: 14px;
        // border: 2px solid #ccc;
        // padding: 10px;
        border-radius: 4px;
        overflow-y: auto;
      }
    }
  }
}
</style>