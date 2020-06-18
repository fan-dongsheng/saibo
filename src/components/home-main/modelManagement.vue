<template>
  <div class="modelManagement">
      <!-- 模型管理首页 -->
      <!-- echarts -->
      <el-card style="margin:24px;" >
          <div class="modelM">
 <div class="version">版本</div>
          <div class="json">json</div>
            <div id="main" style="width: 600px;height:600px;"></div>
          </div>
         
      </el-card>
       
  </div>
</template>

<script>
export default {
data(){
  return {

  }
},
methods:{
  echat(){
    // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = { 
          color: ['#06FDBC', '#F6FE05', '#07B0FE', '#FDB408', '#00DB1C', '#0188FE'],
          title: {
        text: '注释：滚动鼠标可缩放',
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
                    },
                }
            },
            draggable: false, // 节点是否可拖拽，只在使用力引导布局的时候有用。
		focusNodeAdjacency: true, // 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。

            categories: [{
                name: '一般'
            }],
               
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
            color:"black"
                    },
            
                    formatter: "{c}"
                }
            },
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
            links: [{
                "source": "项目",
                "target": "单位",
                "value": "需求关系1"
             },{
                "source": "项目",
                "target": "专业领域",
                "value": "需求关系2"
             },{
                "source": "项目",
                "target": "单位",
                "value": "申报关系"
             },{
                "source": "单位",
                "target": "申报单位单位",
                "value": ""
             },{
                "source": "单位",
                "target": "需求单位",
               "value": ""
             },{
                "source": "单位",
                "target": "曾合作单位",
                "value": ""
             },{
                "source": "单位",
                "target": "所在学会",
                "value": ""
             },
             {
                "source": "申报单位",
                "target": "曾合作单位",
                "value": "合作关系"
             },{
                "source": "申报单位",
                "target": "研究方向",
                "value": "研究关系"
             },{
                "source": "专业领域",
                "target": "研究方向",
                "value": "包含关系1"
             },{
                "source": "所在学会",
                "target": "申报单位",
                "value": "包含关系2"
             },
             
             
            ],

        }
    ]
};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
  }
},
mounted(){
  this.echat()
}
}
</script>

<style lang='less' scoped>
.modelManagement{
    .modelM{
        display: flex;
        .version{
            width: 200px;
            height: 200px;
        }
        .json{
            flex: 1;
            width: 200px;
            height: 200px;
        }
    }
}
</style>