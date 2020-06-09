<template>
  <div>
    <el-form
      :model="themeForm"
      :rules="rules"
      ref="themeForm"
      label-width="80px"
      class="demo-ruleForm"
      label-position="right"
    >
      <el-row class="bottom-w">
        <el-col :span="10">
          <img src="../images/u1510.png" />
        </el-col>
        <el-col :span="14">
          <el-form-item label="图谱权限">
            <el-select class="input-w">
              <el-option label="仅自己可见" value="shanghai"></el-option>
              <el-option label="新建主题" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主题名称">
            <el-input class="input-w"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="主题描述">
            <el-input type="textarea" v-model="themeForm.desc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="成员分享">
          <el-transfer
            class="el-input-t"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入城音"
            v-model="value"
            :data="data"
          ></el-transfer>
        </el-form-item>
      </el-row>
      <el-row class="conent-right">
        <el-button>确认</el-button>
        <el-button>取消</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    const generateData = _ => {
      const data = []
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu']
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        })
      })
      return data
    }
    return {
      themeForm: {
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]
      },
      data: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1
      }
    }
  }
}
</script>
<style lang="less" scoped>
.input-w {
  width: 245px;
}
.bottom-w {
  margin-bottom: 30px;
}
.conent-right {
  text-align: right;
}
.el-transfer-panel__filter{
  &> input {
    width: 168px;
  }
}
.el-input__inner, .el-transfer-panel__filter{
  width: 168px !important
}
</style>