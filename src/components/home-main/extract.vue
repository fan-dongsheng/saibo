<template>
  <div class="extract">
    <el-button
      type="primary"
      size="small"
      style="margin:24px;margin-bottom:0"
      @click="$router.back()"
    >上一步</el-button>
    <div class="left" v-if="$route.params.extract==='抽取'">
      <el-card class="crd" v-loading="EartLoading">
        <div slot="header" class="clearfix">
          <div class="title">实体生成数据集：{{entDataPath}}_csv</div>
        </div>
        <div class="card1">
          <div class="bus" v-if="teamListAll.length==0">
            <el-popover
              class="box"
              width="200"
              v-for="(val,key,index) in teamList"
              :key="index"
              placement="top-start"
              title="路径"
              trigger="hover"
              :content="val"
            >
              <div slot="reference" style="padding-top: 21px;
        padding-left: 30px;">
                <div class="text">{{ key }}</div>
                <div class="line"></div>
                <div class="icon"></div>
              </div>
            </el-popover>
          </div>
          <div class="bus" v-else v-for="(ele,i) in teamListAll" :key="i">
            <el-popover
              class="box"
              width="200"
              v-for="(item,index) in ele"
              :key="index"
              placement="top-start"
              title="路径"
              trigger="hover"
              :content="item.fie"
            >
              <div slot="reference" style="padding-top: 21px;
        padding-left: 30px;">
                <div class="text">{{ item.name }}</div>
                <div class="line"></div>
                <div class="icon"></div>
              </div>
            </el-popover>
          </div>
        </div>
      </el-card>
      <el-card class="crd">
        <div slot="header" class="clearfix">
          <div class="title">关系生成</div>
        </div>
        <div class="card1">
          <div class="bus">
            <el-popover
              class="box"
              width="200"
              v-for="(item,index) in figureList"
              :key="index"
              placement="top-start"
              title="路径"
              trigger="hover"
              :content="item.fie"
            >
              <div
                slot="reference"
                style="padding-top: 21px;
        padding-left: 30px;"
                @click="downRelation(item.fie)"
              >
                <div class="text">{{ item.name }}</div>
                <div class="line"></div>
                <div class="icon"></div>
              </div>
            </el-popover>
          </div>
          <!-- <div class="bus">
            <div class="box" style="padding-top: 21px;
        padding-left: 30px;" v-for="item in figureList" :key="item.id">
              <div class="text">{{ item.name }}</div>
              <div class="line"></div>
              <div class="icon"></div>
            </div>
          </div>-->
        </div>
      </el-card>
    </div>
    <div class="right" v-else>
      <div class="title">a.txt标注补充</div>

      <div class="cont">      
        <el-card class="htmlx">
          <p v-html="text"></p>
        </el-card>
        <!-- <el-card v-loading="marLoading">
          <div
            class="cont-mak"
            v-for="(item,index) in markList"
            :key="index"
            v-html="item.text"
            @mouseup="getWord(item,index)"
          ></div>
        </el-card> -->
        <!-- //右侧的列表展示 -->
        <el-card class="list">
          <!-- //右侧添加类别按钮 -->
        <div style="font-weight:600;margin-bottom:10px;">点击标注 ：
          <!-- <span @click="addLabel" style="margin-left:10px;border:1px #ccc solid;padding:5px;">+</span> -->
          </div>
          <div class="list-cont" v-for="(item,index) in listMark" :key="index">
            <el-button size="small" round @click="selectText(item.color,item.label)">{{item.label}}</el-button>
            
          </div>
           
          <el-button style="margin-bottom:8px;" type="danger" size="small" round @click="cancle()">取消标注</el-button>
          <div>
            <el-button type="primary" size="small" round @click="submit">保存</el-button>
          </div>
          <!-- <div class="list-cont" v-for="(item,index) in listMark" :key="index">
            <div
              class="a"
              v-for="(val,key,i) in item"
              :key="i"
              :style="`background-color:${val}`"
              @click="activeLis(item,index,val,key,i)"
            >
              {{key}}
             
              <i class="el-icon-aim" v-if="i==activeMark"></i>
            </div>
          </div> -->
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //后台文本数组
     
						dataArr: [{
								content: '相信在高考考场上,语文的第一大困难就是阅读量',
							},
							{
								content: '原创小学生作文,初中作文,高中作文,满分作文',
							},
							{
								content: '今年高考作文会考什么?这个问题对于即将参加高考的学生',
							},
						],
						//文本
						text: '',
						//文本高亮配置
						config: [
							// {
							// 	content: '今年',color: 'red'
							// },
							// {
							// 	content: '小学',color: 'blue'
							// },
						],
      entDataPath: this.$route.query.dataPath,
      activeMark: false, //右侧标注选中
      inputValue: '',
      inputVisible: false, //标注input显示
      marLoading: false, //标记loading
      EartLoading: false, //实体loading
      //标注文件
      markList: [
        // { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] },
        // { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] },
        // { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] },
        // { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] },
        // { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] },
        // { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] },
        // { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] },
        // { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] }
      ],
      teamList: [], //抽取结果
      teamListAll: [], //批量抽取展示
      figureList: [], //关系抽取
      //标注右侧的数组队列
      listMark: []
    }
  },
  methods: {
    //增加右侧类型
    addLabel(){
      
    },
    //取消标注
    cancle(){
      let selectionObj = window.getSelection();
      let selectedText = selectionObj.toString();
      console.log(selectedText);
      this.text = this.keywordscolorful(this.text, selectedText, '#000')
      console.log(this.config);
      this.config.forEach((item,index)=>{
        if(selectedText==item.content){
          
          this.config.splice(index,1)
        }
      })
    },
    //初始化，把文本数组转换一段文字
					init() {
						this.text = '';
						for (let i = 0; i < this.dataArr.length; i++) {
							this.text += this.dataArr[i].content + '<br/>'
						}
					},
					//选中关键词后标注事件
					selectText(color,label) {
						let selectionObj = window.getSelection();
						let selectedText = selectionObj.toString();
						if (selectedText !== undefined && selectedText !== '') {
							let obj = {}
							obj.content = selectedText;
              obj.color = color;
              obj.label=label
							this.updateConfig(obj)
							this.textHighlight();
						}
					},
					//更新高亮配置
					updateConfig(obj) {
						let isExist = false;
						for (let i = 0; i < this.config.length; i++) {
							if (obj.content == this.config[i].content) {
								this.config.splice(i, 1, obj)
								isExist = true
							}
						}
						if (!isExist) {
							this.config.push(obj)
						}
					},
					//文本关键词高亮
					textHighlight() {
						for (let i = 0; i < this.config.length; i++) {
							this.text = this.keywordscolorful(this.text, this.config[i].content, this.config[i].color)
						}
					},
					//关键词高亮
					keywordscolorful(str, key, color) {
						let reg = new RegExp("(" + key + ")", "g");
						let newstr = str.replace(reg, "<span style='color:" + color + ";'>$1</span>");
					
						
						return newstr;
					},
					//保存高亮配置
					submit() {
						console.log("保存到后台的配置:", this.config)
            console.log(this.text);    
                
            this.$ajax({
               url: `/hehe/marksave`,
               params:{
                 data:JSON.stringify (this.config),
                 path: `/${this.$route.query.dataPath}/${this.$route.params.name}`
               }
            })
            this.textHighlight()  //高亮数组
						
					},
    //标注右侧列表
    async markRight() {
      const { data } = await this.$ajax({
        url: `/hehe/markkeys`,
         params: {
            path: `${this.$route.query.dataPath}/${this.$route.params.name}`
          }
      })
      console.log(data, '获取右侧数组')
      
     

      for (const key in data) {
      //  console.log(key,"====",data[key]);
      if(key=='word'){
          this.listMark=data[key]
          this.pushConfig()  //修改右侧数组结构
      }
       
      }
    },
    //遍历右侧数组给到config想要的数据
    pushConfig(){
       var bgColor = ['#06FDBC', '#07B0FE', '#F6FE05', '#FDB408','#F5DEB3', '#00DB1C','#07B0FE', '#F6FE05','#FFB6C1','#DC143C',
       '#DB7093','#C71585','#FFA500','#DA70D6','#8B008B','#6A5ACD','#B0C4DE','#00BFFF','#B8860B']
      var cog= this.listMark
      this.listMark=cog.map((item,index)=>{
        return{
          content:item.name,
          label:item.label,
          color:bgColor[index]
        }
      })
      this.config=cog.map((item,index)=>{
        return{
          content:item.name,
          label:item.label,
          color:bgColor[index]
        }
      })
      console.log(this.config,'===============');
       
      this.textHighlight()  //高亮数组
    },
    //downRelation下载关系
    downRelation(file) {
      window.open(`/hehe/csvDownload?path=${file}`)
    },
    //点击选中标注右侧数组组
    activeLis(item, index, val, key, i) {
      this.activeMark = i
    },
    // //标注颜色的改变
    // rgb() {
    //   var markList = this.markList
    //   var bgColor = { '型号': '#F6FE05', '模块': '#06FDBC' }
    //   // var bgColor=['#06FDBC', '#F6FE05', '#07B0FE', '#FDB408', '#00DB1C']
    //   //  var bgRight = {}
    //   this.listMark = []
    //   var newTxt = ''
    //   markList.forEach((item, index) => {
    //     for (const key in item) {
    //       for (const bg in bgColor) {
    //         //  console.log(bg,':',item[key]);

    //         if (bg === item[key]) {
    //           //在文字中找key，key是高亮字段
    //           var text = newTxt ? newTxt : item['sentence']
    //           // console.log(text,'================================');

    //           if (text.indexOf(key) >= 0) {
    //             var text = text.replace(key, `<span style=background-color:${bgColor[bg]};>` + key + '</span>')
    //             newTxt = text
    //             console.log(text, '111111111111111111111111')

    //             markList[index].text = newTxt
    //           }
    //         }
    //       }
    //     }
    //   })

    //   // markList.forEach((item,index)=>{

    //   //   //需要遍历每个对象
    //   //   for (const key in item) {
    //   //     // console.log(key,':',item[key]);
    //   //     if(key=='国家'){
    //   //         //右侧导航栏颜色加文字
    //   //         bgRight[key]=bgColor[0]
    //   //       var newBgcolor=bgColor[0]
    //   //       item[key].forEach((ele,i)=>{
    //   //         var text = item.text
    //   //           if (text.indexOf(ele) >= 0) {
    //   //             // if (typeof bgNew[searchText] == 'undefined') {
    //   //             //   bgNew[searchText] = this.backGr()
    //   //             // }
    //   //             // var bgColor = bgNew[searchText]
    //   //             var text = text.replace(ele, `<span style=background-color:${newBgcolor};>` + ele + '</span>')
    //   //             // console.log(text,'111111111111111111111111');
    //   //             markList[index].text=text
    //   //           }
    //   //       })
    //   //       // markList[index].text=text

    //   //     }
    //   //     if(key=='武器'){
    //   //       //右侧导航栏颜色加文字
    //   //         bgRight[key]=bgColor[1]
    //   //       var newBgcolor=bgColor[1]
    //   //       item[key].forEach((ele,i)=>{
    //   //         var text = item.text
    //   //           if (text.indexOf(ele) >= 0) {
    //   //             // if (typeof bgNew[searchText] == 'undefined') {
    //   //             //   bgNew[searchText] = this.backGr()
    //   //             // }
    //   //             // var bgColor = bgNew[searchText]
    //   //             var text = text.replace(ele, `<span style=background-color:${newBgcolor};>` + ele + '</span>')
    //   //             // console.log(text,'2222222222222');
    //   //             markList[index].text=text
    //   //           }
    //   //       })
    //   //     }
    //   //     if(key=='装备'){
    //   //       //右侧导航栏颜色加文字
    //   //         bgRight[key]=bgColor[2]
    //   //       var newBgcolor=bgColor[2]
    //   //       item[key].forEach((ele,i)=>{
    //   //         var text = item.text
    //   //           if (text.indexOf(ele) >= 0) {
    //   //             // if (typeof bgNew[searchText] == 'undefined') {
    //   //             //   bgNew[searchText] = this.backGr()
    //   //             // }
    //   //             // var bgColor = bgNew[searchText]
    //   //             var text = text.replace(ele, `<span style=background-color:${newBgcolor};>` + ele + '</span>')
    //   //             // console.log(text,'33333333333333');
    //   //             markList[index].text=text
    //   //           }
    //   //       })
    //   //     }
    //   //   }
    //   // })
    //   // this.listMark.push(bgRight)
    // },
    //标注右侧的input改变
    handleInputConfirm() {
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    //标注结果
    async markResult() {
      if (this.$route.params.extract == '标记') {
        this.marLoading = true

        const { data } = await this.$ajax({
          url: '/hehe/mark',
          params: {
            path: `${this.$route.query.dataPath}/${this.$route.params.name}`
          }
        })
        this.marLoading = false
        console.log(data, '标注结果')
        this.text=data

        this.textHighlight()  //高亮数组
        // this.rgb()
      }
    },
    //抽取结果
    async exrtResult() {
      if (this.$route.params.extract == '抽取') {
        try {
          this.EartLoading = true
          //判断是不是批量抽取
          if (this.$route.query.dirpath) {
            const { data } = await this.$ajax({
              url: '/hehe/fm_batchLabel',
              params: { dirpath: this.$route.query.dirpath, filenames: this.$route.query.filenames }
            })
            this.teamListAll = data.map((item, index) => {
              return item.map((ele, i) => {
                return {
                  name: ele.substring(ele.lastIndexOf('/') + 1, ele.lastIndexOf('.')),
                  fie: ele
                }
              })
            })

            console.log(this.teamListAll)
            this.$message.success('抽取成功')
            console.log(data, '批量抽取结果')

            this.EartLoading = false
          } else {
            const { data } = await this.$ajax({
              url: '/hehe/ner',
              params: {
                filelist: this.$route.params.name,
                modelpath: this.$route.query.dataPath,
                dataset: this.$route.query.dataPath
                // input_file: `${this.$route.query.dataPath}/${this.$route.params.name}`
              }
            })
            console.log(data, '实体结果')
            //抽取关系
            const res = await this.$ajax({
              url: '/hehe/ext',
              params: {
                filelist: this.$route.params.name,
                modelpath: this.$route.query.dataPath,
                dataset: this.$route.query.dataPath
              }
            })
            console.log(res, '关系')
            for (const key in res.data) {
              this.figureList.push({ name: key, fie: res.data[key] })
            }

            this.teamList = data //抽取结果
            // this.regs()
            this.$message.success('抽取成功')
            this.EartLoading = false
          }
        } catch (error) {
          console.log(error)

          this.EartLoading = false
          // this.$message.error('获取实体失败')
        }
      }
    },
    // //滑动取词
    // getWord(item, index) {
    //   let txt = window.getSelection ? window.getSelection() : document.selection.createRange().text
    //   txt = txt + ''
    //   txt = txt.replace(/^\s+|\s+$/g, '')
    //   if (txt.length > 0) {
    //     console.log(txt)
    //     console.log(item, ';', index)

    //     // this.regs(txt)
    //     // var bgColor = this.backGr() //右侧card数组的添加文字背景色
    //     //判断选择的list是哪个，然后标注颜色
    //     var bgColor = ['#06FDBC', '#F6FE05', '#07B0FE', '#FDB408', '#00DB1C']
    //     if (this.activeMark == 0) {
    //       var text = item.text
    //       var newBgcolor = bgColor[0]
    //       if (text.indexOf(txt) >= 0) {
    //         var text = text.replace(txt, `<span style=background-color:${newBgcolor};>` + txt + '</span>')
    //         // console.log(text,'2222222222222');
    //         this.markList[index].text = text
    //       }
    //     } else if (this.activeMark == 1) {
    //       var text = item.text
    //       var newBgcolor = bgColor[1]
    //       if (text.indexOf(txt) >= 0) {
    //         var text = text.replace(txt, `<span style=background-color:${newBgcolor};>` + txt + '</span>')
    //         // console.log(text,'2222222222222');
    //         this.markList[index].text = text
    //       }
    //     } else if (this.activeMark == 2) {
    //       var text = item.text
    //       var newBgcolor = bgColor[2]
    //       if (text.indexOf(txt) >= 0) {
    //         var text = text.replace(txt, `<span style=background-color:${newBgcolor};>` + txt + '</span>')
    //         // console.log(text,'2222222222222');
    //         this.markList[index].text = text
    //       }
    //     }
    //   }
    // },
    // //颜色随机数
    // backGr(colorRam) {
    //   var r = Math.floor(Math.random() * 256)
    //   var g = Math.floor(Math.random() * 256)
    //   var b = Math.floor(Math.random() * 256)
    //   var a = 0.5
    //   return 'rgb(' + r + ',' + g + ',' + b + ',' + a + ')'
    // },

    // //正则改标签颜色 //点击标注
    // regs(word) {
    //   var mark = this.markList
    //   var bgNew = {} //新数组,
    //   this.listMark = []
    //   mark.forEach((item, index) => {
    //     // console.log(item, '111111111111111')

    //     if (item.nr) {
    //       var searchText = word ? word : item.nr[0]
    //       var text = item.text
    //       if (text.indexOf(searchText) >= 0) {
    //         if (typeof bgNew[searchText] == 'undefined') {
    //           bgNew[searchText] = this.backGr()
    //         }
    //         var bgColor = bgNew[searchText]
    //         var text = text.replace(searchText, `<span style=background-color:${bgColor};>` + searchText + '</span>')
    //         // this.listMark.push(`<span style=background-color:${bgColor};>` + searchText + '</span>')
    //       }
    //       mark[index].text = text
    //     }

    //     if (word ? false : item.ns) {
    //       var searchText = item.ns[0] //需要搜索的字段
    //       var text = item.text // 每行文字
    //       if (text.indexOf(searchText) >= 0) {
    //         //判断对象中的建有没有值
    //         if (typeof bgNew[searchText] == 'undefined') {
    //           bgNew[searchText] = this.backGr()
    //         }
    //         var bgColor = bgNew[searchText] //随机颜色调用
    //         var text = text.replace(searchText, `<span style=background-color:${bgColor};>` + searchText + '</span>')
    //         // this.listMark.push(`<span style=background-color:${bgColor};>` + searchText + '</span>')
    //       }
    //       mark[index].text = text
    //     }
    //   })

    //   console.log(bgNew, 'ssssssssssssss')
    //   this.listMark.push(bgNew)
    // },
    //点击×删除右侧数组队列
    delLis(item, index, val, key, i) {
      console.log(item, index, val, key, i, 'aaaaaaa')
      var oldTxt = this.markList
      console.log(oldTxt, 'old')
      /*   oldTxt.forEach((it,id)=>{
        console.log(it,'wwwwwwwww');
        
          if (it.nr) {
          var searchText = it.nr[0]
          
          
          var text = it.text
          if (searchText.indexOf(key) >= 0) {
        //  alert(1)
            // var text = text.replace(searchText,  `<span >` + key + '</span>')
            console.log(text,'eeeeeeeeeeeeeeeeeee');
            
           
          }
          oldTxt[id].text = text
        }
         if (it.ns) {
          var searchText = it.ns[0]
          var text = it.text
          if (searchText.indexOf(key) >= 0) {
        //  alert(1)
            var text = text.replace(searchText,  `<span >` + key + '</span>')
           
          }
          oldTxt[id].text = text
         
          
        }
      }) */
    },
    open() {},
    toTeamInfo() {
      //下载功能
    }
  },
  created() {
    // this.regs()

    this.exrtResult() //抽取
    this.markResult() //标记
    this.markRight() //获取右侧数组标记
    
  }
}
</script>

<style lang='less' scoped>
.extract {
  .crd {
    margin: 20px;
    padding: 2px 20px;

    .title {
      font-size: 20px;
      font-weight: 700;
    }
  }
  .card1 {
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }

    background: #fff;

    .bus {
      display: flex;
      flex-wrap: wrap;
      padding-left: 10px;
      padding-top: 10px;
      .box {
        margin-right: 10px;
        width: 140px;
        height: 85px;
        box-sizing: border-box;
        cursor: pointer;
        margin-bottom: 25px;

        background-size: cover;
        position: relative;
        .text {
          color: #fff;
          font-size: 16px;
          font-weight: 400;
        }
        .line {
          margin-top: 8px;
          width: 52px;
          height: 4px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
        }
        .icon {
          width: 30px;
          height: 30px;
          // background-image: url(@/assets/indexNew/right.png);
          position: absolute;
          bottom: 20px;
          right: 20px;
          cursor: pointer;
        }
      }
      .box:hover {
        background-color: #ffffff !important;
        opacity: 0.72;
      }
    }

    .bus > :nth-child(4n-3) {
      background-image: url(../../assets/indexNew/team1.png);
      background-size: cover;
    }
    .bus > :nth-child(4n-2) {
      background-image: url(../../assets/indexNew/team2.png);
      background-size: cover;
    }
    .bus > :nth-child(4n-1) {
      background-image: url(../../assets/indexNew/team3.png);
      background-size: cover;
    }
    .bus > :nth-child(4n) {
      background-image: url(../../assets/indexNew/team4.png);
      background-size: cover;
    }
  }
  .right {
    margin: 20px;
    padding: 2px 20px;
    .title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    .cont {
      font-size: 16px;
      display: flex;
  justify-content: space-between;
  .htmlx{
    
  }
      .cont-mak {
        margin-bottom: 10px;
      }
      .list {
        margin-left: 20px;
        min-width: 200px;
        .list-input {
          margin-bottom: 10px;
        }
        .button-new-tag {
          margin-left: 10px;
          height: 32px;
          line-height: 30px;
          padding-top: 0;
          padding-bottom: 0;
        }
        .input-new-tag {
          width: 90px;
          margin-left: 10px;
          vertical-align: bottom;
        }
        .list-cont {
          margin: 5px 0;
          .a {
            cursor: pointer;
          }
          .el-icon-close {
            margin-left: 30px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>