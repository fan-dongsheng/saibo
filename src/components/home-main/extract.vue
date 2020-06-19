<template>
  <div class="extract">
    <el-button
      type="primary"
      size="medium"
      style="margin:24px;margin-bottom:0"
      @click="$router.back()"
    >上一步</el-button>
    <div class="left" v-if="$route.params.extract==='抽取'">
      <el-card class="crd" v-loading="EartLoading">
        <div slot="header" class="clearfix">
          <div class="title">实体生成</div>
        </div>
        <div class="card1">
          <div class="bus">
            <div class="box" v-for="(val,key,index) in teamList" :key="index">
              <div class="text">{{ key }}</div>
              <div class="line"></div>
              <div class="icon"></div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="crd">
        <div slot="header" class="clearfix">
          <div class="title">关系生成</div>
        </div>
        <div class="card1">
          <div class="bus">
            <div class="box" v-for="item in figureList" :key="item.id">
              <div class="text">{{ item.name }}</div>
              <div class="line"></div>
              <div class="icon"></div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="right" v-else>
      <div class="title">a.txt标注补充</div>

      <div class="cont">
        <!-- <span class="title">a.txt标注补充</span> -->
        <el-card v-loading="marLoading">
          <div
            class="cont-mak"
            v-for="(item,index) in markList"
            :key="index"
            v-html="item.text"
            @mouseup="getWord"
          ></div>
          <!-- <div class="cont-mak">
            中国第一款陆基超音速巡航导弹长剑-100
            正则匹配字符串改变颜色
          </div>-->
        </el-card>
        <!-- //右侧的列表展示 -->
        <el-card class="list">
          <div class="list-cont" v-for="(item,index) in listMark" :key="index">
            <div class="a" v-for="(val,key,i) in item" :key="i" :style="`background-color:${val}`">
              {{key}}
              <!-- <i class="el-icon-close" @click="delLis(item,index,val,key,i)"></i> -->
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      marLoading: false, //标记loading
      EartLoading: false, //实体loading
      //标注文件
      markList: [
        { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] },
        { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] },
        { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] },
        { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] },
        { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] },
        { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] },
        { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] },
        { text: '中国第一款陆基超音速巡航导弹长剑-100', ns: ['中国'], nr: ['剑-1'], nt: [] }
      ],
      teamList: [],
      figureList: [
        {
          name: 'a.json'
        },
        {
          name: 'a.json'
        },
        {
          name: 'a.json'
        }
      ],
      //标注右侧的数组队列
      listMark: []
    }
  },
  methods: {
    //标注结果
    async markResult() {
      this.marLoading = true
      try {
        const { data } = await this.$ajax({
          url: '/hehe/fm_labelSave',
          params: {
            filepath: `${this.$route.query.dataPath}/tmp/test02.txt`
          }
        })
        this.marLoading = false
        console.log(data, '标注结果')
        this.markList = data
        this.regs()
      } catch (error) {
        this.marLoading = false
        // this.$message.error('获取标注失败')
      }
    },
    //抽取结果
    async exrtResult() {
      try {
        this.EartLoading = true
        const { data } = await this.$ajax({
          url: '/hehe/fm_extract',
          params: {
            input_file: `${this.$route.query.dataPath}/test02.txt`
          }
        })

        console.log(data, '实体结果')
        this.teamList = data
        this.regs()
        this.EartLoading = false
      } catch (error) {
        console.log(error)

        this.EartLoading = false
        // this.$message.error('获取实体失败')
      }
    },
    //滑动取词
    getWord() {
      let txt = window.getSelection ? window.getSelection() : document.selection.createRange().text
      txt = txt + ''
      txt = txt.replace(/^\s+|\s+$/g, '')
      if (txt.length > 0) {
        console.log(txt)
        this.regs(txt)
        // var bgColor = this.backGr() //右侧card数组的添加文字背景色

        // this.listMark.push(`<span style=background-color:${bgColor};>` + txt + '</span>')
      }
    },
    //颜色随机数
    backGr(colorRam) {
      var r = Math.floor(Math.random() * 256)
      var g = Math.floor(Math.random() * 256)
      var b = Math.floor(Math.random() * 256)
      var a = 0.5
      return 'rgb(' + r + ',' + g + ',' + b + ',' + a + ')'
    },

    //正则改标签颜色 //点击标注
    regs(word) {
      var mark = this.markList
      var bgNew = {} //新数组,
      mark.forEach((item, index) => {
        // console.log(item, '111111111111111')

        if (item.nr) {
          var searchText = word ? word : item.nr[0]
          var text = item.text
          if (text.indexOf(searchText) >= 0) {
            if (typeof bgNew[searchText] == 'undefined') {
              bgNew[searchText] = this.backGr()
            }
            var bgColor = bgNew[searchText]
            var text = text.replace(searchText, `<span style=background-color:${bgColor};>` + searchText + '</span>')
            // this.listMark.push(`<span style=background-color:${bgColor};>` + searchText + '</span>')
          }
          mark[index].text = text
        }

        if (word ? false : item.ns) {
          var searchText = item.ns[0] //需要搜索的字段
          var text = item.text // 每行文字
          if (text.indexOf(searchText) >= 0) {
            //判断对象中的建有没有值
            if (typeof bgNew[searchText] == 'undefined') {
              bgNew[searchText] = this.backGr()
            }
            var bgColor = bgNew[searchText] //随机颜色调用
            var text = text.replace(searchText, `<span style=background-color:${bgColor};>` + searchText + '</span>')
            // this.listMark.push(`<span style=background-color:${bgColor};>` + searchText + '</span>')
          }
          mark[index].text = text
        }
      })

      console.log(bgNew, 'ssssssssssssss')
      this.listMark.push(bgNew)
    },
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
    this.regs()
    console.log(this.$route)
    this.exrtResult()
    this.markResult()
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
        padding-top: 21px;
        padding-left: 30px;

        background-size: cover;
        position: relative;
        .text {
          color: #fff;
          font-size: 26px;
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

      .cont-mak {
        margin-bottom: 10px;
      }
      .list {
        margin-left: 200px;
        width: 400px;
        .list-cont {
          .a {
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