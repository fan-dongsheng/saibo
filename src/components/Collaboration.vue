<template>
  <div>
    <el-row>
      <el-col>
        <el-date-picker
          v-model="datatime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          prefix-icon="el-icon-date"
        ></el-date-picker>

        <el-input
          class="input_m"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="searchKey"
        ></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" class="content_border">
        <el-col>
          <img src="../images/u3407.png" />
        </el-col>
        <el-col>检索条件_时间</el-col>
        <el-col>作者：林劼</el-col>
        <el-col :span="18">时间：2018-11-03 12:20:48</el-col>
        <el-col :span="4">[删] [编]</el-col>
      </el-col>
      <el-col :span="5" class="content_border">
        <el-col>
          <img src="../images/u3407.png" />
        </el-col>
        <el-col>检索条件_时间</el-col>
        <el-col>作者：林劼</el-col>
        <el-col :span="18">时间：2018-11-03 12:20:48</el-col>
        <el-col :span="4">[删] [编]</el-col>
      </el-col>
      <el-col :span="5" class="content_border">
        <el-col>
          <img src="../images/u3407.png" />
        </el-col>
        <el-col>检索条件_时间</el-col>
        <el-col>作者：林劼</el-col>
        <el-col :span="18">时间：2018-11-03 12:20:48</el-col>
        <el-col :span="4">[删] [编]</el-col>
      </el-col>
      <el-col :span="5" class="content_border">
        <el-col>
          <img src="../images/u3407.png" />
        </el-col>
        <el-col>检索条件_时间</el-col>
        <el-col>作者：林劼</el-col>
        <el-col :span="18">时间：2018-11-03 12:20:48</el-col>
        <el-col :span="4">[删] [编]</el-col>
      </el-col>
    </el-row>  
    <div class="pagination_d">
      <!-- 分页区域 -->
      <el-pagination background layout="prev, pager, next" :total="50"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      datatime: '',
      searchKey: ''      
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.content_border {
  border: 1px;
  border-style: solid;
  padding: 15px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.input_m {
  margin-left: 20px;
  width: 300px;
}
.pagination_d {
  text-align: right;
}
</style>