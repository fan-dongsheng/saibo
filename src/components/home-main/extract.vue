<template>
  <div class="extract">
    <div class="left">
      <el-card class="crd">
        <div slot="header" class="clearfix">
          <div class="title">实体生成</div>
        </div>
        <div class="card1">
          <div class="bus">
            <div class="box" @click="toTeamInfo(item.id)" v-for="item in teamList" :key="item.id">
              <div class="text">{{ item.name }}</div>
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
            <div class="box" @click="toTeamInfo(item.id)" v-for="item in figureList" :key="item.id">
              <div class="text">{{ item.name }}</div>
              <div class="line"></div>
              <div class="icon"></div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="right">
        
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teamList: [{ name: 'a.txt' }, { name: 'b.txt' }, { name: 'c.txt' }, { name: 'd.txt' }, { name: 'a.txt' }, { name: 'b.txt' }, { name: 'c.txt' }, { name: 'd.txt' }],
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
      ]
    }
  },
  methods: {
    toTeamInfo() {
      //下载功能
    }
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
      padding-left: 25px;
      padding-top: 10px;
      .box {
        margin-right: 10px;
        width: 160px;
        height: 100px;
        box-sizing: border-box;
        cursor: pointer;
        margin-bottom: 25px;
        padding-top: 30px;
        padding-left: 30px;
        background-image: url('');
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
}
</style>