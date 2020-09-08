<template>
<div class="contair">
  <div class="left">
    <div id="contain" ref="tuImage"></div>
  </div>
  <div class="tran">
    <div class="trangle1" :class="{'trangle2':hiddenRight}"></div>
  </div>
    <div class="question">
        <!-- 消息列表 -->
    <div class="message-list" ref="message-list">
        
      <div
        class="message-item"
        :class="{ reverse:item.isMe }"
        v-for="(item,index) in messages"
        :key="index"
      >
        <el-avatar
          class="avatar"
          slot="icon"
          
           style="width: 30px; height: 30px"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="title">
          <span>{{ item.msg }}</span>
        </div>
      </div>
    </div>
    <!-- 发送消息 -->
    <div style="background:#54a4f9;height:2px;"></div>
    <div class="send-message" @keyup.enter="send">

      <el-input  v-model="message" center clearable>
        
        
      </el-input>
      <el-button 
        style="background:#0acf97;color:#fff;"
         size="small"
        @click="send"
       >发送</el-button>
    </div>
    <!-- /发送消息 -->
  </div>
  <div class="right">
    <div class="top"><img style="width:20px;vertical-align: sub;margin-right:5px;" src="@/assets/indexNew/fire.png" alt=""> 热点问题排行</div>
    <el-divider ></el-divider>
    <div class="conent">
      <ul style="list-style:none;padding:0;margin:0;">
        <li v-for="(item,index) in hotCont" :key="index"><span class="num">{{index+1}}</span><span :title="item">{{item}}</span> </li>
        <!-- <li><span>2</span>他他他他他他他他他他他他</li>
        <li><span>3</span>他他他他他他他他他他他他</li>
        <li><span>1</span>他他他他他他他他他他他他</li>
        <li><span>1</span>他他他他他他他他他他他他</li>
        <li><span>1</span>他他他他他他他他他他他他</li>
        <li><span>1</span>他他他他他他他他他他他他</li> -->
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import { update } from './update'
import { pltKg } from './archives'
import { getItem, setItem } from '@/utils/storage'
export default {
data(){
  return {
    hotCont:[], //热点问题
    hiddenRight: false,
    message: '飞行器材料损伤传感信号的特征分析和损伤模式识别和三维热传导的关系是什么',
      socket: null, // 为了方便调用
      // messages:getItem('chat-messages') || [] ,
      messages: [
        {
          msg:'我是谁？',
          isMe: true
        },
        {
          msg:'我是你大爷',
           isMe: false
        },
        {
          msg:'你说啥？',
          isMe: true
        },
        {
          msg:'我说我是你大爷',
           isMe: false
        },
        {
          msg:'我是谁？',
          isMe: true
        },
        {
          msg:'我是你大爷',
           isMe: false
        },
        {
          msg:'你说啥？',
          isMe: true
        },
        {
          msg:'我说我是你大爷',
           isMe: false
        },
      ]  // 页面显示数据
  }
},
created(){
this.getHot()
},
methods:{
  //获取热点问题
  async getHot(){
    const {data}=await this.$ajax({
        url:`/hehe/kg_hot_qa?n=3`
      })
      // console.log(data);
      this.hotCont=data
  },
  //svg启动程序
    initSvg(data) {
      pltKg(data)
    },
    async getData(){
      const {data}=await this.$ajax({
        url:'/hehe/kg_qa',
        params:{text:this.message}
      })
      console.log(data);
      this.messages.push({
        msg:data.ans,
        isMe: false
      })
      var graph=JSON.parse(data.graph.graph)  //d3入口
      
      console.log(JSON.parse(data.graph.graph));
      //返回数据再一次加工！
      var indata={}
      var nodes= graph.nodes.map((item,index)=>{
        return {
          id:item.index,
          index:item.index,
          name:item.name
        }
      })
      indata.nodes=nodes
      indata.links=graph.links.map((item,index)=>{
        return {
          source:item.source,
          source_name:item.source_name,
          target:item.target,
          target_name:item.target_name,
          name:item.type
        }
      })
      // console.log(data);
      update()
      this.initSvg(indata)
    },
   // 发送消息
    send () {
      // scoket 获取从data中
      const message = this.message
      if (!message.length) {
        return
      }
      
      const data = {
        msg: this.message,
        // timestamp: new Date(),
        isMe: true
      }
      
      
      this.messages.push(data)
      this.getData()
      this.message = ''
    },
  // 消息滚动到最底部
    toBottom () {
      const ListScroll = this.$refs['message-list'] // 先获取dom元素,消息框
      ListScroll.scrollTop = ListScroll.scrollHeight
      // 在watch中使用,数据变化就调用
    }
},
 watch: {
    // 数据持久化监听
    // 两个参数 1:返回来新的数据 2:原来的参数   这里不需要2
    messages (value) {
      setItem('chat-messages', value)
      // 数据变化,让消息滚动到底部
      // this.$nextTick()  是操作最新的dom变化,因为数据变化是响应式的,但是修改完数据后不及时更新,这就需要next操作最新的dom即时变化
      this.$nextTick(() => {
        this.toBottom()
      })
    }

  }
}
</script>

<style lang='less' scoped>
.contair{
  padding-top: 50px;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  .left{
height: 70%;
width: 442px;
 border: 1px solid #54a4f9;
 box-sizing: border-box;
  }
  .tran{
    box-sizing: border-box;
    height: 70%;
    width: 25px;
    z-index: 1;
      cursor: pointer;
      background-color: #eff7ff;
      opacity: 1;
      border: 1px solid #54a4f9;
      display: flex;
      align-items: center;
      justify-content: center;
       .trangle1 {
        width: 11px;
        height: 19px;
        background: url(../../../assets/indexNew/tranright.png);
        background-size: cover;
        transform: translate(0,-50%);
       
      }
 .trangle2 {
        width: 11px;
        height: 19px;
        background: url(../../../assets/indexNew/tranleft.png);
        background-size: cover;
        transform: translate(0,-50%);
       
      }

  }
  .right{
    width: 300px;
    height: 70%;
    border: 1px solid #54a4f9;  
    background: #F9F9F9;  
    padding: 16px 14px;  
    box-sizing: border-box;  
    .top{
      font-size: 16px;
    }
    .el-divider{
      background-color:#54a4f9;
      height: 2px;
      margin: 16px 0 ;
    }
    .conent{
      li{
        height: 20px;
        line-height: 20px;
        margin-bottom: 18px;
        color: #54677e;
        .num{
          color: #54a4f9;
          border:#54a4f9 1px solid;
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          box-sizing: border-box;
          margin-right: 10px;
        }
        span{
          display: inline-block;
          width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space:nowrap;
        }
        
      }
      overflow-y: scroll;
      &::-webkit-scrollbar{
        display: none;
      }
    }                                  
  }
}
  .question {
    border: 1px solid #54a4f9;
    position: relative;
    width: 580px;
    height: 70%;
    padding: 10px 0 90px 0;
    
    box-sizing: border-box;
    background: #EFF7FF;
    /deep/ .el-input{
    .el-input__inner{
        border-radius: 1px;
        height: 40px;
        line-height: 40px;
        border: #B9D6FF 1px solid;
      }
  }
    .message-list {
      height: 100%;
      overflow-y: scroll;
      &::-webkit-scrollbar{
        display: none;
      }
      .message-item {
        display: flex;
        align-items: center;
        padding: 10px;
        
        .title {
           background-image: linear-gradient(270deg, #c3cbf3 0% , #a9d0f9 100%);
          padding: 5px;
          border-radius: 6px;
          position: relative;
          max-width: 200px;
          span{
            line-height: 19px;
          }
        //   span::before{  
        //     content: '';
        //     display: block;
        //     position: absolute;
        //     top: 3px;
        //     left: 58px;
        //     border-top: 6px solid transparent ;
        //     border-bottom: 6px solid transparent;
        //     border-left: 6px solid #555;
        // }
        

        }

        
        .avatar {
          margin-right: 5px;
        }
      }
      .reverse {
        flex-direction: row-reverse;
        .title {
          margin-right: 5px;
          max-width: 200px;
          span{
            line-height: 19px;
          }
        }
      }
    }

    .send-message {
      display: flex;
      position: absolute;
      bottom: 15px;
      left: 15px;
      right: 15px;
      background: #f5f5f6 !important;
    }
  }
</style>