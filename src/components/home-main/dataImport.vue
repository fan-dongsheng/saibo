<template>
  <div class="dataImport">
    <el-card class="cardT">
      <div class="flex">
<div class="left" >
        <div class="title">详细数据</div>
        <div class="ent">实体(个) : <span>{{imp['entityCount']}}</span></div>
        <div class="relation">关系(个) : <span>{{imp['relationCount']}}</span></div>
        <div class="center">中心节点(个) : <span>{{imp['entityCenter']}}</span></div>
      </div>
      <div class="right">
         <div id="main" style="width: 600px;height:600px;"></div>
      </div>
      </div>
      
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
imp:{}
    }
  },
  mounted(){
    this.dataImp() //数据导入
    this.echat()
  },
  methods:{
    //数据导入
    async dataImp(){
      const {data}=await this.$ajax({
        url:'/hehe/fm_dataCount?csvPath=/home/gnx/tmp/pycharm_project_180/data/csvdata',
      })
      console.log(data);
      
this.imp=data
    },
        echat() {
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
            // data: data,
            // links: links
            data: [
            {
                "name": "项目",
                 itemStyle: {
                    normal: {
                        borderColor: '#63adfc',
                        borderWidth: 2,
                        shadowBlur: 10,
                        shadowColor: '#63adfc',
                        color: '#63adfc',
                    },
                },

            },
            {
                "name": "单位",

            },
            {
                "name": "需求单位",

            },
             {
                "name": "申报单位",

            },
             {
                "name": "曾合作单位",

            },
             {
                "name": "所在学会",

            },
            {
                "name": "专业领域",
                itemStyle: {
                    normal: {
                        borderColor: '#07B0FE',
                        borderWidth: 2,
                        shadowBlur: 10,
                        shadowColor: '#07B0FE',
                        color: '#07B0FE',
                    },
                },

            }, {
                "name": "研究方向",
                itemStyle: {
                    normal: {
                        borderColor: '#FDB408',
                        borderWidth: 2,
                        shadowBlur: 10,
                        shadowColor: '#FDB408',
                        color: '#FDB408',
                    },
                },

            },
            ],
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
  }
}
</script>

<style lang='less' scoped>
.dataImport {
  .cardT {
    margin: 24px;
    
    .flex{
display: flex;
    }
    .left{
      flex: 1;
      font-size: 18px;
      span{
        color: #396fff;
      }
      .title{
        font-size: 20px;
        font-weight: 700;
        margin: 24px;
         margin-top: 0;
      }
      .ent{
        margin: 24px;
       
      }
      .relation{
margin: 24px;
      }
      .center{
margin: 24px;
      }
    }
  }
}
</style>