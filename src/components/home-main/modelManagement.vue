<template>
  <div class="modelManagement">
    <!-- 模型管理首页 -->
    <!-- echarts -->
    <el-button
      type="primary"
      size="medium"
      style="margin:24px;margin-bottom:0"
      @click="$router.back()"
    >上一步</el-button>
    <el-button type="primary" size="medium" style="margin:24px;margin-bottom:0">新建实体</el-button>
    <el-button type="primary" size="medium" style="margin:24px;margin-bottom:0">修改实体</el-button>
    <el-button type="primary" size="medium" style="margin:24px;margin-bottom:0">删除实体</el-button>
    <el-button type="primary" size="medium" style="margin:24px;margin-bottom:0">新建关系</el-button>
    <el-button type="primary" size="medium" style="margin:24px;margin-bottom:0">修改实体</el-button>
    <el-button type="primary" size="medium" style="margin:24px;margin-bottom:0">删除关系</el-button>
    <el-card style="margin:24px;">
      <div class="modelM">
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
        <div class="json">
          json
          <pre><code id="json"></code></pre>
        </div>
        <div id="main" style="width: 600px;height:600px;"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      echDataJson: [], //echarts的data数据，需要接口处理
      linksJson: [], //关系links数据修改
      verD: [{ d: 'test1' }, { d: 'test2' }], //版本号
      activeVerd: 9 //激活样式
    }
  },
  methods: {
      ceshi(){
//             "relation": {
    //     "因果关系": [],
    //     "从属关系": [["故障", "故障原因"]]
    // }
var linksJson=[
    {value:'因果关系',arr:[]},
    {value:"从属关系",arr:[["故障", "故障原因"]]}
]
         
              linksJson= linksJson.map((ele,i)=>{
                   
                   return {
                        source:ele.arr.map(it=>{
                            return it[0]?it[0]:''
                        }).toString() ,
                        target: ele.arr.map(it=>{
                            return it[1]?it[1]:''
                        }).toString() ,
                        value: ele.value
                   }
               })
               console.log(linksJson,'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
               

      },
    //获取json文件、
    async getJson(d) {
      try {
        const { data } = await this.$ajax({
          url: '/hehe/read_json',
          params: {
            file_path: `/home/gnx/tmp/pycharm_project_180`,
            version: d
          }
        })
        console.log(data, '获取json文件test1')
        let btn = document.querySelector('#json')
        let dataHtml = data
        let bigger = data //后套返回json数据需要处理成eachrts需要的数据
        btn.textContent = JSON.stringify(dataHtml, null, '  ')
        //遍历后台返回的json对象
        //第一层最大的外圈

        for (var key in bigger) {
        //   console.log(key, ':', bigger[key], '==================')
          //如果是实体的话
          if (key == 'entity') {
            for (var key1 in bigger[key]) {
              console.log(key1, ':', bigger[key][key1], 'shitishishishiss')
              this.echDataJson.push({ name: key1 })
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

            // console.log(this.echDataJson,'+++++++++++++++++++++++++++++++++++++=');
          }
          if(key=='relation'){
               for (var key1 in bigger[key]) {
                //    console.log(key1, ':', bigger[key][key1], 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
                   this.linksJson.push({value:key1,arr:bigger[key][key1]})
                   
               }
    //             "relation": {
    //     "因果关系": [],
    //     "从属关系": [["故障", "故障原因"]]
    // }
 

               
               this.linksJson.map((ele,i)=>{
                   
                   return {
                        source:ele.arr.map(it=>{
                            return it[0]?it[0]:''
                        }).toString(),
                        target: ele.arr.map(it=>{
                            return it[1]?it[1]:''
                        }).toString(),
                        value: ele.value
                   }
               })
               
                 
          }
            console.log(this.linksJson,'lllllllllllllllllllllllaaaaaaaaaaaaaaaaaaaaaaaaa');
            


          this.echat()
        }
      } catch (error) {
        console.log(error, '获取信息错误')
      }
    },
    //点击下标点亮
    activeVer(i, d) {
      this.activeVerd = i
      this.getJson(d)
    },
    //默认页面展示json数据
    jsonData() {
      let btn = document.querySelector('#json')
      let dataHtml = {
        entity: {
          项目: {},
          单位: {
            type: ['需求单位', '申报单位', '曾合作单位', '所在学会']
          },
          专业领域: {},
          研究方向: {}
        },
        relation: {
          需求关系1: ('项目', '单位'),
          需求关系2: ('项目', '专业领域'),
          申报关系: ('项目', '单位'),
          合作关系: ('申报单位', '曾合作单位'),
          研究关系: ('申报单位', '研究方向'),
          包含关系1: ('专业领域', '研究方向'),
          包含关系2: ('学会', '申报单位')
        }
      }
      btn.textContent = JSON.stringify(dataHtml, null, '  ')
    },
    echat() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'))
      //获取后台数据的处理赋值
      var data = this.echDataJson
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
            links: [
              {
                source: '项目',
                target: '单位',
                value: '需求关系1'
              },
              {
                source: '项目',
                target: '专业领域',
                value: '需求关系2'
              },
              {
                source: '项目',
                target: '单位',
                value: '申报关系'
              },
              {
                source: '单位',
                target: '申报单位单位',
                value: ''
              },
              {
                source: '单位',
                target: '需求单位',
                value: ''
              },
              {
                source: '单位',
                target: '曾合作单位',
                value: ''
              },
              {
                source: '单位',
                target: '所在学会',
                value: ''
              },
              {
                source: '申报单位',
                target: '曾合作单位',
                value: '合作关系'
              },
              {
                source: '申报单位',
                target: '研究方向',
                value: '研究关系'
              },
              {
                source: '专业领域',
                target: '研究方向',
                value: '包含关系1'
              },
              {
                source: '所在学会',
                target: '申报单位',
                value: '包含关系2'
              }
            ]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  },
  mounted() {
    this.echat()
    this.jsonData()
    this.ceshi()
  }
}
</script>

<style lang='less' scoped>
.modelManagement {
  .modelM {
    display: flex;
    .version {
      .active {
        background-color: rgb(0, 110, 255);
      }
      width: 200px;
      height: 200px;
      font-size: 18px;
      font-weight: 600;
      .ver-cont {
        margin-top: 150px;

        .ver-cont1 {
          width: 100px;
          text-align: center;
          height: 30px;
          line-height: 30px;

          margin-bottom: 30px;
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
      flex: 1;
      width: 200px;
      height: 200px;
    }
  }
}
</style>