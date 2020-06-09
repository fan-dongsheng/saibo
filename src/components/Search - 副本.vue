<template>
  <div>
    <div class="div" v-if="!issearch">
      <img src="../images/u124.png" class="img" />
      <div>
        <!-- <el-input placeholder="请输入内容" class="input" v-model="searchKeyword"></el-input> -->
        <el-autocomplete
          class="inline-input autocomplete"
          v-model="searchKeyword"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"          
          @keyup.enter.native="search"
        >
          <template slot-scope="{ item }">
            <el-row>
              <el-col :span="22">
                <div>{{ item.value=item.name }}</div>
              </el-col>
              <el-col style="text-align:right" :span="2">
                <div>{{item.quality}}</div>
              </el-col>
            </el-row>
          </template>
        </el-autocomplete>
        <el-button type="primary" icon="el-icon-search" @focus="getKeywords" @click="search">搜索</el-button>
        <img src="../images/u160.png" class="u160_img" />
      </div>
    </div>
    <div v-if="issearch" class="conten_div">
      <div class="searchDiv">
        <!-- <el-input placeholder="请输入内容" class="input"></el-input> -->
        <el-autocomplete
          class="inline-input autocomplete"
          v-model="searchKeyword"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        >
          <template slot-scope="{ item }">
            <el-row>
              <el-col :span="22">
                <div>{{ item.name }}</div>
              </el-col>
              <el-col style="text-align:right" :span="2">
                <div>{{item.quality}}</div>
              </el-col>
            </el-row>
          </template>
        </el-autocomplete>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <img src="../images/u160.png" class="u160_img" />
      </div>
      <el-row>
        <el-col :span="16">
          <div class="grid-content bg-purple marginBootom">
            <el-button round value="model" @click="showModel">型号{{modellist.quantity}}</el-button>
            <el-button round value="product" @click="showModel">产品{{productlist.quantity}}</el-button>
            <el-button round value="qualit">质量问题{{qualityproblemlist.quantity}}</el-button>
            <el-button round value="other">其他{{otherlist.quantity}}</el-button>
          </div>
          <div v-if="isModel">
            <model :modellist="modellist"></model>
            <div class="div_border">
              <div class="marginBootom">相关推荐</div>
              <div class="marginBootom">
                <span
                  class="show"
                  v-for="mode in modellist.recomand.XIANGGUANTIJAIN"
                  :key="mode.id"
                >{{mode.name}}</span>
              </div>
            </div>
            <div class="div_border">
              <div class="marginBootom">构成器件</div>
              <el-row v-if="isMponentHide">
                <el-col :span="23">
                  <div class="summary">
                    <el-popover
                      placement="bottom"
                      class="show"
                      width="400"
                      trigger="hover"
                      v-for="model in modellist.recomand.GOUCHENGQIJIAN"
                      :key="model.id"
                    >
                      <div>
                        <span v-for="m in model.data" :key="m.id">{{m.name}}</span>
                      </div>
                      <el-button slot="reference" type="text">{{model.name}}</el-button>
                    </el-popover>
                  </div>
                </el-col>
                <el-col :span="1">
                  <!-- 绑定点击事件onShow，点击展开全文 -->
                  <a href="#" @click.stop.prevent="onMShow">
                    <!-- 向下的角箭头符号，用css画 -->
                    <span class="downArrow"></span>
                  </a>
                </el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="23">
                  <el-popover
                    placement="bottom"
                    class="show"
                    width="400"
                    trigger="hover"
                    v-for="model in modellist.recomand.GOUCHENGQIJIAN"
                    :key="model.id"
                  >
                    <div>
                      <span v-for="m in model.data" :key="m.id">{{m.name}}</span>
                    </div>
                    <el-button slot="reference" type="text">{{model.name}}</el-button>
                  </el-popover>
                </el-col>
                <el-col :span="1">
                  <a href="#" @click.stop.prevent="onMHide">
                    <!-- 向上的角箭头符号 -->
                    <span class="upArrow"></span>
                  </a>
                </el-col>
              </el-row>
            </div>
            <div class="div_border div_margin">
              <div class="marginBootom">故障现象</div>
              <el-row v-if="isFaultHide">
                <el-col :span="23">
                  <div class="summary">
                    <el-popover
                      placement="bottom"
                      class="show"
                      width="400"
                      trigger="hover"
                      v-for="model in modellist.recomand.GUZHANXIANXIANG"
                      :key="model.id"
                    >
                      <div>
                        <span v-for="m in model.data" :key="m.id">{{m.name}}</span>
                      </div>
                      <el-button slot="reference" type="text">{{model.name}}({{model.quantity}})</el-button>
                    </el-popover>
                  </div>
                </el-col>
                <el-col :span="1">
                  <a href="#" @click.stop.prevent="onFShow">
                    <!-- 向上的角箭头符号 -->
                    <span class="downArrow"></span>
                  </a>
                </el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="23">
                  <el-popover
                    placement="bottom"
                    class="show"
                    width="400"
                    trigger="hover"
                    v-for="model in modellist.recomand.GUZHANXIANXIANG"
                    :key="model.id"
                  >
                    <div>
                      <span v-for="m in model.data" :key="m.id">{{m.name}}</span>
                    </div>
                    <el-button slot="reference" type="text">{{model.name}}({{model.quantity}})</el-button>
                  </el-popover>
                </el-col>
                <el-col :span="1">
                  <a href="#" @click.stop.prevent="onFHide">
                    <!-- 向上的角箭头符号 -->
                    <span class="upArrow"></span>
                  </a>
                </el-col>
              </el-row>
            </div>
            <div v-for="item in modellist.content" :key="item.id">
              <el-row class="div_border">
                <el-col :span="24" class="col_conent">{{item.name}}</el-col>
              </el-row>
              <el-row class="row_border">
                <el-col :span="4" class="marginBootom">图片</el-col>
                <el-col :span="19" class="marginBootom">
                  <el-row>
                    <el-col :span="8" class="col_conent">主键：{{item.zhujian}}</el-col>
                    <el-col :span="8" class="col_conent">名称：{{item.codename}}</el-col>
                    <el-col :span="7" class="col_conent">型号名称:{{item.systemname}}</el-col>
                  </el-row>
                </el-col>
                <el-col :span="4">归零报告{{item.guilingquanlity}}篇</el-col>
                 <el-col :span="4">质量问题{{item.wentiquanlity}}个</el-col>
                  <el-col :span="4">关联产品{{item.chanpinquanlity}}个</el-col>
              </el-row>
            </div>
            <div class="pagination_d">
              <!-- 分页区域 -->
              <el-pagination
                :current-page="1"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
          <div v-if="isProduct">
            <div class="div_border">
              <div class="marginBootom">相关推荐</div>
              <div class="marginBootom">
                <span
                  class="show"
                  v-for="mode in modellist.recomand.XIANGGUANTIJAIN"
                  :key="mode.id"
                >{{mode.name}}</span>
              </div>
            </div>
            <div class="div_border">
              <div class="marginBootom">构成器件</div>
              <el-popover
                placement="bottom"
                class="show"
                width="400"
                trigger="hover"
                v-for="model in modellist.recomand.GOUCHENGQIJIAN"
                :key="model.id"
              >
                <div>
                  <span v-for="m in model.data" :key="m.id">{{m.name}}</span>
                </div>
                <el-button slot="reference" type="text">{{model.name}}</el-button>
              </el-popover>
            </div>
            <div class="div_border div_margin">
              <div class="marginBootom">故障现象</div>
              <el-popover
                placement="bottom"
                class="show"
                width="400"
                trigger="hover"
                v-for="model in modellist.recomand.GUZHANXIANXIANG"
                :key="model.id"
              >
                <div>
                  <span v-for="m in model.data" :key="m.id">{{m.name}}</span>
                </div>
                <el-button slot="reference" type="text">{{model.name}}({{model.quantity}})</el-button>
              </el-popover>
            </div>

            <el-row class="div_border">
              <el-col :span="24" class="col_conent">型号xx-10</el-col>
            </el-row>
            <el-row class="row_border">
              <el-col :span="4" class="marginBootom">图片</el-col>
              <el-col :span="19" class="marginBootom">
                <el-row>
                  <el-col :span="8" class="col_conent">故障现象：发动机漏油</el-col>
                  <el-col :span="8" class="col_conent">故障类别:漏油</el-col>
                  <el-col :span="7" class="col_conent">所属阶段:生产</el-col>
                  <el-col :span="16" class="col_conent">故障详细情况：发动机在外场试验期间出现漏油现象</el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="pagination_d">
              <!-- 分页区域 -->
              <el-pagination
                :current-page="1"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
          <div v-if="isQualityproblem">
            <div class="div_border">
              <div class="marginBootom">相关推荐</div>
              <div class="marginBootom">
                <span
                  class="show"
                  v-for="mode in modellist.recomand.XIANGGUANTIJAIN"
                  :key="mode.id"
                >{{mode.name}}</span>
              </div>
            </div>
            <div class="div_border">
              <div class="marginBootom">构成器件</div>
              <el-popover
                placement="bottom"
                class="show"
                width="400"
                trigger="hover"
                v-for="model in modellist.recomand.GOUCHENGQIJIAN"
                :key="model.id"
              >
                <div>
                  <span v-for="m in model.data" :key="m.id">{{m.name}}</span>
                </div>
                <el-button slot="reference" type="text">{{model.name}}</el-button>
              </el-popover>
            </div>
            <div class="div_border div_margin">
              <div class="marginBootom">故障现象</div>
              <el-popover
                placement="bottom"
                class="show"
                width="400"
                trigger="hover"
                v-for="model in modellist.recomand.GUZHANXIANXIANG"
                :key="model.id"
              >
                <div>
                  <span v-for="m in model.data" :key="m.id">{{m.name}}</span>
                </div>
                <el-button slot="reference" type="text">{{model.name}}({{model.quantity}})</el-button>
              </el-popover>
            </div>

            <el-row class="div_border">
              <el-col :span="24" class="col_conent">型号xx-10</el-col>
            </el-row>
            <el-row class="row_border">
              <el-col :span="4" class="marginBootom">图片</el-col>
              <el-col :span="19" class="marginBootom">
                <el-row>
                  <el-col :span="8" class="col_conent">故障现象：发动机漏油</el-col>
                  <el-col :span="8" class="col_conent">故障类别:漏油</el-col>
                  <el-col :span="7" class="col_conent">所属阶段:生产</el-col>
                  <el-col :span="16" class="col_conent">故障详细情况：发动机在外场试验期间出现漏油现象</el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="pagination_d">
              <!-- 分页区域 -->
              <el-pagination
                :current-page="1"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
          <div v-if="isOther">
            <div class="div_border">
              <div class="marginBootom">相关推荐</div>
              <div class="marginBootom">
                <span
                  class="show"
                  v-for="mode in modellist.recomand.XIANGGUANTIJAIN"
                  :key="mode.id"
                >{{mode.name}}</span>
              </div>
            </div>
            <div class="div_border">
              <div class="marginBootom">构成器件</div>
              <el-popover
                placement="bottom"
                class="show"
                width="400"
                trigger="hover"
                v-for="model in modellist.recomand.GOUCHENGQIJIAN"
                :key="model.id"
              >
                <div>
                  <span v-for="m in model.data" :key="m.id">{{m.name}}</span>
                </div>
                <el-button slot="reference" type="text">{{model.name}}</el-button>
              </el-popover>
            </div>
            <div class="div_border div_margin">
              <div class="marginBootom">故障现象</div>
              <el-popover
                placement="bottom"
                class="show"
                width="400"
                trigger="hover"
                v-for="model in modellist.recomand.GUZHANXIANXIANG"
                :key="model.id"
              >
                <div>
                  <span v-for="m in model.data" :key="m.id">{{m.name}}</span>
                </div>
                <el-button slot="reference" type="text">{{model.name}}({{model.quantity}})</el-button>
              </el-popover>
            </div>

            <el-row class="div_border">
              <el-col :span="24" class="col_conent">型号xx-10</el-col>
            </el-row>
            <el-row class="row_border">
              <el-col :span="4" class="marginBootom">图片</el-col>
              <el-col :span="19" class="marginBootom">
                <el-row>
                  <el-col :span="8" class="col_conent">故障现象：发动机漏油</el-col>
                  <el-col :span="8" class="col_conent">故障类别:漏油</el-col>
                  <el-col :span="7" class="col_conent">所属阶段:生产</el-col>
                  <el-col :span="16" class="col_conent">故障详细情况：发动机在外场试验期间出现漏油现象</el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="pagination_d">
              <!-- 分页区域 -->
              <el-pagination
                :current-page="1"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </el-col>

        <el-col :span="7" class="marginTab">
          <div class="grid-content bg-purple-light">
            <el-tabs type="border-card" class="tab_card">
              <el-tab-pane label="关联文本">
                <ul>
                  <li v-for="(item,i) in modellist.relatedtext" :key="item.id">
                    {{i+1}}
                    <a href="#" @click.stop.prevent="onFHide">{{item.name}}</a>
                  </li>
                </ul>
                <div class="pagination_d">
                  <!-- 分页区域 -->
                  <el-pagination
                    :current-page="1"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                  ></el-pagination>
                </div>
              </el-tab-pane>

              <el-tab-pane label="关联关系" v-if="false">
                <div class="searchDiv">
                  <img src="../images/u787.png" class="u787_img" />
                </div>
                <el-table :data="resultlist" stripe>
                  <el-table-column label="关系类型" prop="username"></el-table-column>
                  <el-table-column label="关系名称" prop="level"></el-table-column>
                  <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                      <!-- 修改按钮 -->
                      <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click="showEditDialog(scope.row.id)"
                      ></el-button>
                      <!-- 删除按钮 -->
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        @click="removeUserById(scope.row.id)"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="关联标准">
                <ul>
                  <li v-for="(item,i) in modellist.relatedstandard" :key="item.id">
                    {{i+1}}
                    <a href="#" @click.stop.prevent="showPreview">{{item.name}}</a>
                  </li>
                </ul>
                <div class="pagination_d">
                  <!-- 分页区域 -->
                  <el-pagination
                    :current-page="1"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                  ></el-pagination>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Model from '@/components/Model';

export default {
  components:{
    Model
  },
  data() {
    return {
      searchKeyword: '',
      keywords: [],
      issearch: false,
      activeName: 'first',
      isModel: true,
      isProduct: false,
      isQualityproblem: false,
      isOther: false,
      isMponentHide: true,
      isFaultHide: true,
      modellist: {
        recomand: {
          XIANGGUANTIJAIN: [
            { id: '11', name: 'cc10' },
            { id: '110', name: 'cc100' }
          ],
          GOUCHENGQIJIAN: [],
          GUZHANXIANXIANG: [
            {
              id: '21',
              name: 'cc10wqqqqqqqqqqqqqqqqqqqqqq',
              quantity: 5,
              data: [
                { id: '211', name: 'guilingbaogao21' },
                { id: '212', name: 'guilingbaogao21' },
                { id: '213', name: 'guilingbaogao21' },
                { id: '214', name: 'guilingbaogao21' },
                { id: '215', name: 'guilingbaogao21' }
              ]
            },
            {
              id: '22',
              name: 'aaaaaaaaaaaaaaqwwqwqwqaaa',
              data: [
                { id: '211', name: 'guilingbaogao21' },
                { id: '212', name: 'guilingbaogao21' },
                { id: '213', name: 'guilingbaogao21' },
                { id: '214', name: 'guilingbaogao21' },
                { id: '215', name: 'guilingbaogao21' }
              ]
            },
            {
              id: '23',
              name: 'bbbbbbbbbbbbbwqwqwqbbbbbbbbbbbb',
              data: [
                { id: '211', name: 'guilingbaogao21' },
                { id: '212', name: 'guilingbaogao21' },
                { id: '213', name: 'guilingbaogao21' },
                { id: '214', name: 'guilingbaogao21' },
                { id: '215', name: 'guilingbaogao21' }
              ]
            },
            {
              id: '24',
              name: 'bbbbbbbbbbbbbwqwqwqbbbbbbbbbbbb',
              data: [
                { id: '211', name: 'guilingbaogao21' },
                { id: '212', name: 'guilingbaogao21' },
                { id: '213', name: 'guilingbaogao21' },
                { id: '214', name: 'guilingbaogao21' },
                { id: '215', name: 'guilingbaogao21' }
              ]
            },
            {
              id: '24',
              name: 'bbbbbbbbbbbbbwqwqwqbbbbbbbbbbbb',
              data: [
                { id: '211', name: 'guilingbaogao21' },
                { id: '212', name: 'guilingbaogao21' },
                { id: '213', name: 'guilingbaogao21' },
                { id: '214', name: 'guilingbaogao21' },
                { id: '215', name: 'guilingbaogao21' }
              ]
            },
            {
              id: '26',
              name: 'bbbbbbbbbbbbbwqwqwqbbbbbbbbbbbb',
              data: [
                { id: '211', name: 'guilingbaogao21' },
                { id: '212', name: 'guilingbaogao21' },
                { id: '213', name: 'guilingbaogao21' },
                { id: '214', name: 'guilingbaogao21' },
                { id: '215', name: 'guilingbaogao21' }
              ]
            },
            {
              id: '27',
              name: 'bbbbbbbbbbbbbwqwqwqbbbbbbbbbbbb',
              data: [
                { id: '211', name: 'guilingbaogao21' },
                { id: '212', name: 'guilingbaogao21' },
                { id: '213', name: 'guilingbaogao21' },
                { id: '214', name: 'guilingbaogao21' },
                { id: '215', name: 'guilingbaogao21' }
              ]
            },
            {
              id: '28',
              name: 'bbbbbbbbbbbbbwqwqwqbbbbbbbbbbbb',
              data: [
                { id: '211', name: 'guilingbaogao21' },
                { id: '212', name: 'guilingbaogao21' },
                { id: '213', name: 'guilingbaogao21' },
                { id: '214', name: 'guilingbaogao21' },
                { id: '215', name: 'guilingbaogao21' }
              ]
            },
            {
              id: '29',
              name: 'bbbbbbbbbbbbbwqwqwqbbbbbbbbbbbb',
              data: [
                { id: '211', name: 'guilingbaogao21' },
                { id: '212', name: 'guilingbaogao21' },
                { id: '213', name: 'guilingbaogao21' },
                { id: '214', name: 'guilingbaogao21' },
                { id: '215', name: 'guilingbaogao21' }
              ]
            },
            {
              id: '30',
              name: 'bbbbbbbbbbbbbwqwqwqbbbbbbbbbbbb',
              data: [
                { id: '211', name: 'guilingbaogao21' },
                { id: '212', name: 'guilingbaogao21' },
                { id: '213', name: 'guilingbaogao21' },
                { id: '214', name: 'guilingbaogao21' },
                { id: '215', name: 'guilingbaogao21' }
              ]
            },
            {
              id: '31',
              name: 'bbbbbbbbbbbbbwqwqwqbbbbbbbbbbbb',
              data: [
                { id: '211', name: 'guilingbaogao21' },
                { id: '212', name: 'guilingbaogao21' },
                { id: '213', name: 'guilingbaogao21' },
                { id: '214', name: 'guilingbaogao21' },
                { id: '215', name: 'guilingbaogao21' }
              ]
            },
            {
              id: '32',
              name: 'bbbbbbbbbbbbbwqwqwqbbbbbbbbbbbb',
              data: [
                { id: '211', name: 'guilingbaogao21' },
                { id: '212', name: 'guilingbaogao21' },
                { id: '213', name: 'guilingbaogao21' },
                { id: '214', name: 'guilingbaogao21' },
                { id: '215', name: 'guilingbaogao21' }
              ]
            },
            {
              id: '33',
              name: 'bbbbbbbbbbbbbwqwqwqbbbbbbbbbbbb',
              data: [
                { id: '211', name: 'guilingbaogao21' },
                { id: '212', name: 'guilingbaogao21' },
                { id: '213', name: 'guilingbaogao21' },
                { id: '214', name: 'guilingbaogao21' },
                { id: '215', name: 'guilingbaogao21' }
              ]
            },
            {
              id: '34',
              name: 'bbbbbbbbbbbbbwqwqwqbbbbbbbbbbbb',
              data: [
                { id: '211', name: 'guilingbaogao21' },
                { id: '212', name: 'guilingbaogao21' },
                { id: '213', name: 'guilingbaogao21' },
                { id: '214', name: 'guilingbaogao21' },
                { id: '215', name: 'guilingbaogao21' }
              ]
            },
            {
              id: '35',
              name: 'bbbbbbbbbbbbbwqwqwqbbbbbbbbbbbb',
              data: [
                { id: '211', name: 'guilingbaogao21' },
                { id: '212', name: 'guilingbaogao21' },
                { id: '213', name: 'guilingbaogao21' },
                { id: '214', name: 'guilingbaogao21' },
                { id: '215', name: 'guilingbaogao21' }
              ]
            }
          ]
        },
        content: [{ id: '41', name: 'cc41', zhujian: 'cc41_xihao', codename: 'cc41_1', systemname: 'aaa', guilingquanlity: '3', wentiquanlity: '3', chanpinquanlity: '5' }],
        relatedtext: [{ id: '511', name: 'guilingbaogao51' }],
        relatedstandard: [{ id: '611', name: 'guilingbaogao61' }],
        
      },
      productlist: {},
      qualityproblemlist: {},
      otherlist: {},
      // 获取列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      resultlist: [],
      total: 0
    }
  },
  methods: {
    showModel(e) {
      e.currentTarget.value === 'model' ? (this.isModel = true) : (this.isModel = false)
      e.currentTarget.value === 'product' ? (this.isProduct = true) : (this.isProduct = false)

      e.currentTarget.value === 'qualit' ? (this.isQualityproblem = true) : (this.isQualityproblem = false)

      e.currentTarget.value === 'other' ? (this.isOther = true) : (this.isOther = false)
    },
    async getKeywords() {
      const data = await this.$ajax.get('http://127.0.0.1:8081/api/related/', { name: this.searchKeyword })
      if (data.code !== 200) {
        return this.$message.error('获取关键字检索列表失败！')
      }
      return data.datas
    },
    querySearch(queryString, cb) {
      var keywords = this.keywords
      var results = queryString ? keywords.filter(this.createFilter(queryString)) : keywords
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return keyword => {
        return keyword.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    async getSearchrank() {
      const data = await this.$ajax.get('http://127.0.0.1:8081/api/searchrank/', { name: this.searchKeyword })
      if (data.code !== 200) {
        return this.$message.error('获取关键词检索类别失败！')
      }
      return data.datas
    },
    async getSearch() {
      const data = await this.$ajax.get('http://127.0.0.1:8081/api/search/', { name: this.searchKeyword })
      if (data.code !== 200) {
        return this.$message.error('获取关键词检索结果失败！')
      }
      if (data.datas) {
        data.datas.forEach(itme => {
          if (item.name.indexOf('型号') != -1) {
            this.modellist = itme
          } else if (itme.name.indexOf('产品') != -1) {
            this.productlist = itme
          } else if (itme.name.indexOf('质量问题') != -1) {
            this.productlist = itme
          } else if (itme.name.indexOf('others') != -1) {
            this.productlist = itme
          }
        })
        3
      }
      return data.datas
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    test() {
      return [
        { name: '三全鲜食（北新泾店）', quality: '1000' },
        { name: 'Hot honey 首尔炸鸡（仙霞路）', quality: '100' },
        { name: '新旺角茶餐厅', quality: '10' }
      ]
    },
    handleSelect(item) {
      console.log(item)
    },
    search() {
      // this.$router.push('searchResult')

      // this.$router.push({ name: '/test', params: {} })
      this.issearch = true
      this.getSearchrank()
      this.getSearch()
    },
    onMShow: function() {
      this.isMponentHide = false //点击onShow切换为false，显示为展开画面
    },
    onMHide: function() {
      this.isMponentHide = true //点击onHide切换为true，显示为折叠画面
    },
    onFShow: function() {
      this.isFaultHide = false
    },
    onFHide: function() {
      this.isFaultHide = true
    },
    showPreview(){
       this.$router.push("preview")
    }
  },
  mounted() {
    //this.keywords = this.getKeywords()
    this.keywords = this.test()
  }
}
</script>
<style lang="less" scoped>
.img {
  width: 454px;
  height: 277px;
  margin-bottom: 20px;
}
.div {
  width: 100%;
  height: 100%;
  text-align: center;
}
.autocomplete {
  width: 640px;
}
.u160_img {
  margin-left: 20px;
}
.searchDiv {
  text-align: center;
}

.col_h {
  height: 30px;
}
.marginBootom,
.searchDiv {
  margin-bottom: 20px;
}
.pagination_d {
  margin-top: 30px;
  text-align: right;
}
.marginBootom {
  margin-left: 10px;
  margin-top: 10px;
}
.marginTab {
  margin-left: 30px;
  margin-top: 10px;
}
.div_border {
  border: 1px;
  border-style: solid;
}
.row_border {
  border: 1px;
  border-style: solid;
  border-top-style: none;
}
.div_margin {
  margin-bottom: 20px;
}
.col_conent {
  margin-left: 10px;
  height: 40px;
  line-height: 40px;
}
.show {
  margin-left: 20px;
}
.img {
  width: 454px;
  height: 277px;
  margin-bottom: 20px;
}
.u787_img {
  width: 279px;
  height: 244px;
}
.div {
  width: 100%;
  height: 100%;
  text-align: center;
}
.input {
  width: 640px;
}
.u160_img {
  margin-left: 20px;
}
.tab_card {
  height: 640px;
}
.conten_div {
  padding-left: 20px;
}
/* 向下角箭头 */
.downArrow {
  display: inline-block;
  width: 8px; /* 尺寸不超过字号的一半为宜 */
  height: 8px;
  border-right: 1px solid; /* 画两条相邻边框 */
  border-bottom: 1px solid;
  transform: rotate(45deg); /* 顺时针旋转45° */
  margin-bottom: 3px;
}
/* 向上角箭头，原理与下箭头相同 */
.upArrow {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-left: 1px solid;
  border-top: 1px solid;
  transform: rotate(45deg);
  margin-top: 3px;
}
/* 摘要背景板 */
.hideBg {
  // margin: 1.5rem;
  // padding: 1.5rem;
  padding-bottom: 0; /* 方便渐变层遮挡 */
  position: relative; /* 用于子元素定位 */
}
/* 摘要内容 */
.summary {
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: clip; /* 修剪文本 */
  display: -webkit-box; /* 弹性布局 */
  -webkit-box-orient: vertical; /* 从上向下垂直排列子元素 */
  -webkit-line-clamp: 2; /* 限制文本仅显示前三行 */
}
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
ul,
li,
a {
  text-decoration: none;
}
</style>