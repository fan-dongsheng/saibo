<template>
  <div>
    <div class="div" v-if="!issearch">
      <img src="@/images/u124.png" class="img" />
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
          <!-- <i class="el-icon-edit el-input__icon"
    slot="suffix"><el-button type="primary" icon="el-icon-search">搜索</el-button>
          </i>-->
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
        <img src="@/images/u160.png" class="u160_img" />
      </div>
    </div>
    <div v-if="issearch">
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
        <img src="@/images/u160.png" class="u160_img" />
      </div>
      <el-row>        
        <el-col :span="18">
          <el-tabs type="border-card">
            <el-tab-pane :label="`型号(${modellist.quantity})`" class="tab-pane-content">
              <model :modellist="modellist"></model>
            </el-tab-pane>
            <el-tab-pane :label="`产品(${productlist.quantity})`" class="tab-pane-content">
              <product :productlist="productlist"></product>
            </el-tab-pane>
            <el-tab-pane :label="`质量问题(${qualityproblemlist.quantity})`" class="tab-pane-content">
              <quality-problem :qualityproblemlist="qualityproblemlist"></quality-problem>
            </el-tab-pane>
            <el-tab-pane :label="`其他(${otherlist.quantity})`" class="tab-pane-content">
              <other :otherlist="otherlist"></other>
            </el-tab-pane>
          </el-tabs>
        </el-col>

        <el-col :span="5" class="marginTab">
          <div class="grid-content bg-purple-light">
            <el-tabs type="border-card" class="tab_card">
              <el-tab-pane label="关联文本" class="tab-pane-content">
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
                  <img src="@/images/u787.png" class="u787_img" />
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
              <el-tab-pane label="关联标准" class="tab-pane-content">
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
import Model from '@/components/search/Model'
import Product from '@/components/search/Product'
import QualityProblem from '@/components/search/QualityProblem'
import Other from '@/components/search/Other'

export default {
  components: {
    Model,
    Product,
    QualityProblem,
    Other
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
      modellist: {
        id: '',
        name: '型号',
        quantity: '5',
        recomand: {
          XIANGGUANTIJAIN: [
            { id: '11', name: 'cc10' },
            { id: '110', name: 'cc100' }
          ],
          GOUCHENGQIJIAN: [],
          GUZHANXIANXIANG: [
            {
              id: '21',
              name: '11111111111111',
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
              name: '222222222222222',
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
              name: '3333333333',
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
        content: [
          { id: '41', name: 'cc41', zhujian: 'cc41_xihao', codename: 'cc41_1', systemname: 'aaa', guilingquanlity: '3', wentiquanlity: '3', chanpinquanlity: '5' },
          { id: '42', name: 'cc42', zhujian: 'cc41_xihao', codename: 'cc41_1', systemname: 'aaa', guilingquanlity: '3', wentiquanlity: '3', chanpinquanlity: '5' },
          { id: '43', name: 'cc43', zhujian: 'cc41_xihao', codename: 'cc41_1', systemname: 'aaa', guilingquanlity: '3', wentiquanlity: '3', chanpinquanlity: '5' }],
        relatedtext: [{ id: '511', name: 'guilingbaogao51' }],
        relatedstandard: [{ id: '611', name: 'guilingbaogao61' }]
      },
      productlist: {
        id: '',
        name: '产品',
        quantity: '5',
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
        relatedstandard: [{ id: '611', name: 'guilingbaogao61' }]
      },
      qualityproblemlist: {
        id: '',
        name: '质量问题',
        quantity: '5',
        recomand: {
          XIANGGUANTIJAIN: [
            { id: '11', name: 'cc1aaaaa0' },
            { id: '110', name: 'cc100' }
          ],
          GOUCHENGQIJIAN: [],
          GUZHANXIANXIANG: [
            {
              id: '21',
              name: 'qualityproblem',
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
              name: 'qualityproblem2222',
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
              name: 'qualityproblem2222ddsf',
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
              name: 'qualityproblem2222sdfs',
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
        relatedstandard: [{ id: '611', name: 'guilingbaogao61' }]
      },
      otherlist: {
        id: '',
        name: '其他',
        quantity: '5',
        recomand: {
          XIANGGUANTIJAIN: [
            { id: '11', name: 'cc10' },
            { id: '110', name: 'cc100' }
          ],
          GOUCHENGQIJIAN: [],
          GUZHANXIANXIANG: [
            {
              id: '21',
              name: 'other',
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
              name: 'other2222222222',
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
        relatedstandard: [{ id: '611', name: 'guilingbaogao61' }]
      },
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

    showPreview() {
      //this.$router.push('preview')
      // this.$router.replace({name:'preview', params: {}}, () => { this.warning('test!') }, () => { this.warning('test!') })
      let routeData = this.$router.resolve({ path: '/preview', query: {  id: 1 } });
      window.open(routeData.href, '_blank');
    }
  },
  mounted() {
    //this.keywords = this.getKeywords()
    this.keywords = this.test()
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/search.less';
.img {
  width: 454px;
  height: 277px;
  margin-bottom: 20px;
}
.autocomplete {
  width: 640px;
}
.u160_img {
  margin-left: 20px;
}
.col_h {
  height: 30px;
}

.marginTab {
  margin-left: 15px;
  // margin-top: 10px;
}
.u787_img {
  width: 279px;
  height: 244px;
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
  font-size: 14px;
}
</style>

<style lang="less">
  @title_bgc:#E6F0FE;
  @border_c:#B1D2FF;
.el-tabs--border-card > .el-tabs__header{
    background-color: #FFFFFF !important;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active{
    background-color:#E6F0FE !important; 
  }
  .el-tabs--border-card{
    border:2px solid @border_c !important;
  }
  .el-tabs--border-card > .el-tabs__header{
    border-bottom: 2px solid  @border_c !important;
  }
</style>