<template>
  <div class="wrap">
    <div class="header">
      <navbar></navbar>
    </div>
    <div class="main" style="height: 463px; padding: 10px">
      <el-container style="height: 500px; border: 1px solid #eee">
        <el-main>
          <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
            <el-tab-pane label="人力资源考核指标管理功能" name="first1">
              <p>
                <el-button
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  @click="kaohezhibiaoVisible = true"
                >添加考核指标</el-button>
              </p>
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column fixed prop="xuhao" label="序号" width="50"></el-table-column>
                <el-table-column prop="zhibiaomingcheng" label="指标名称"></el-table-column>
                <el-table-column prop="zhibiaoleixing" label="指标类型"></el-table-column>
                <el-table-column prop="pingfenleixing" label="评分类型"></el-table-column>
                <el-table-column prop="juesexuanze" label="角色选择"></el-table-column>
                <el-table-column prop="caijishiji" label="采集时机"></el-table-column>
                <el-table-column prop="zuozhengcailiao" label="佐证材料"></el-table-column>
                <el-table-column prop="pingjianeirong" label="评价内容"></el-table-column>
                <el-table-column prop="pingjiazhongdian" label="评价重点"></el-table-column>
                <el-table-column fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="kaohezhibiaoVisible = true">编辑</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                title="人力资源考核指标管理"
                :visible.sync="kaohezhibiaoVisible"
                width="60%"
                :before-close="kaohezhibiaoClose"
              >
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="指标名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="指标类型">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="评分类型">
                    <el-checkbox-group v-model="form.type">
                      <el-checkbox label="类型1" name="type"></el-checkbox>
                      <el-checkbox label="类型2" name="type"></el-checkbox>
                      <el-checkbox label="类型3" name="type"></el-checkbox>
                      <el-checkbox label="类型4" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="角色选择">
                    <el-radio-group v-model="form.resource">
                      <el-radio label="角色1"></el-radio>
                      <el-radio label="角色2"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="采集时机">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="佐证材料">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                  </el-form-item>
                  <el-form-item label="评价内容">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                  </el-form-item>
                  <el-form-item label="评价重点">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="kaohezhibiaoVisible = false">取 消</el-button>
                  <el-button type="primary" @click="kaohezhibiaoVisible = false">确 定</el-button>
                </span>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="人力资源考核评价内容管理" name="first2">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column fixed prop="xuhao" label="序号" width="50"></el-table-column>
                <el-table-column prop="zhibiaomingcheng" label="指标名称"></el-table-column>
                <el-table-column prop="zhibiaoleixing" label="指标类型"></el-table-column>
                <el-table-column prop="pingfenleixing" label="评分类型"></el-table-column>
                <el-table-column prop="juesexuanze" label="角色选择"></el-table-column>
                <el-table-column prop="caijishiji" label="采集时机"></el-table-column>
                <el-table-column prop="zuozhengcailiao" label="佐证材料"></el-table-column>
                <el-table-column prop="pingjianeirong" label="评价内容"></el-table-column>
                <el-table-column prop="pingjiazhongdian" label="评价重点"></el-table-column>
                <el-table-column fixed="right" label="操作">
                  <template slot-scope>
                    <el-button @click="kaohepingjiaVisible = true" type="text" size="small">修改评价内容</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                title="人力资源考核评价内容"
                :visible.sync="kaohepingjiaVisible"
                width="60%"
                :before-close="kaohepingjiaClose"
              >
                <el-form ref="form1" :model="form1" label-width="80px">
                  <el-form-item label="指标名称">
                    <el-input v-model="form1.name" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="指标类型">
                    <el-select v-model="form1.region" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="评分类型">
                    <el-checkbox-group v-model="form1.type">
                      <el-checkbox label="类型1" name="type"></el-checkbox>
                      <el-checkbox label="类型2" name="type"></el-checkbox>
                      <el-checkbox label="类型3" name="type"></el-checkbox>
                      <el-checkbox label="类型4" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="角色选择">
                    <el-radio-group v-model="form1.resource">
                      <el-radio label="角色1"></el-radio>
                      <el-radio label="角色2"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="采集时机">
                    <el-input v-model="form1.name" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="佐证材料">
                    <el-input type="textarea" v-model="form1.desc" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="评价内容">
                    <el-input type="textarea" v-model="form1.desc"></el-input>
                  </el-form-item>
                  <el-form-item label="评价重点">
                    <el-input type="textarea" v-model="form1.desc" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="kaohepingjiaVisible = false">取 消</el-button>
                  <el-button type="primary" @click="kaohepingjiaVisible = false">确 定</el-button>
                </span>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="人力资源考核评价模型管理" name="first3">
              <p>
                <el-button
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  @click="pingjiamoxingVisible = true"
                >添加模型管理</el-button>
              </p>
              <el-table :data="tablemoxingpingjia" border style="width: 100%">
                <el-table-column fixed prop="xuhao" label="序号" width="50"></el-table-column>
                <el-table-column prop="mxzlb" label="模型内容主类别"></el-table-column>
                <el-table-column prop="zhiwudengji" label="职务等级"></el-table-column>
                <el-table-column prop="xiangleibie" label="详类别"></el-table-column>
                <el-table-column prop="moxingmingcheng" label="模型名称"></el-table-column>
                <el-table-column fixed="right" label="操作">
                  <template slot-scope>
                    <el-button @click="pingjiamoxingVisible = true" type="text" size="small">编辑</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                title="人力资源考核评价模型"
                :visible.sync="pingjiamoxingVisible"
                width="60%"
                :before-close="pingjiamoxingClose"
              >
                <el-form ref="form2" :model="form2" label-width="100px">
                  <el-form-item label="内容主类别">
                    <el-select v-model="form2.region" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="职务等级">
                    <el-checkbox-group v-model="form2.type">
                      <el-checkbox label="类型1" name="type"></el-checkbox>
                      <el-checkbox label="类型2" name="type"></el-checkbox>
                      <el-checkbox label="类型3" name="type"></el-checkbox>
                      <el-checkbox label="类型4" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="详类别">
                    <el-radio-group v-model="form2.resource">
                      <el-radio label="角色1"></el-radio>
                      <el-radio label="角色2"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="模型名称">
                    <el-input v-model="form2.name" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="pingjiamoxingVisible = false">取 消</el-button>
                  <el-button type="primary" @click="pingjiamoxingVisible = false">确 定</el-button>
                </span>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="人力资源考核对象信息管理" name="first4">
              <p>
                <el-button
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  @click="kaohejihuaVisible = true"
                >添加考核计划</el-button>
              </p>
              <el-table :data="tablekaoheduixiang" border style="width: 100%">
                <el-table-column fixed prop="xuhao" label="序号" width="50"></el-table-column>
                <el-table-column prop="jihuamingcheng" label="计划名称"></el-table-column>
                <el-table-column prop="jihuamaioshu" label="计划描述"></el-table-column>
                <el-table-column prop="zhiwudengji" label="职务等级"></el-table-column>
                <el-table-column prop="kaishishijian" label="开始时间"></el-table-column>
                <el-table-column prop="jiwshushijian" label="结束时间"></el-table-column>
                <el-table-column prop="jiwshushijian" label="状态">
                  <span>未分发</span>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="300">
                  <template slot-scope>
                    <el-button type="text" size="small" @click="kaohejihuaVisible = true">编辑</el-button>
                    <el-button type="text" size="small" @click="xuanzerenyuanVisible = true">待考核人员</el-button>
                    <el-button type="text" size="small" @click="kaohezhibiaoVisible = true">计划分发</el-button>
                    <el-button type="text" size="small">计划归档</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                title="人力资源考核对象信息管理"
                :visible.sync="kaohejihuaVisible"
                width="60%"
                :before-close="kaohejihuaClose"
              >
                <el-form ref="form3" :model="form3" label-width="100px">
                  <el-form-item label="计划名称">
                    <el-input v-model="form3.jihuamingcheng"></el-input>
                  </el-form-item>
                  <el-form-item label="计划描述">
                    <el-input v-model="form3.jihuamiaoshu"></el-input>
                  </el-form-item>
                  <el-form-item label="职务等级">
                    <el-input v-model="form3.zhiwudengji"></el-input>
                  </el-form-item>
                  <el-form-item label="考核时间">
                    <el-col :span="11">
                      <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form3.kaishishijian"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-time-picker
                        placeholder="选择时间"
                        v-model="form3.jieshushijian"
                        style="width: 100%;"
                      ></el-time-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="kaohejihuaVisible = false">取 消</el-button>
                  <el-button type="primary" @click="kaohejihuaVisible = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-dialog
                title="选择待考核人员"
                :visible.sync="xuanzerenyuanVisible"
                width="60%"
                :before-close="xuanzerenyuanClose"
              >
                <el-container style="height: 500px; border: 1px solid #eee">
                  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu :default-openeds="['1', '3']">
                      <el-submenu index="1">
                        <template slot="title">
                          <i class="el-icon-message"></i>导航一
                        </template>
                        <el-menu-item-group>
                          <template slot="title">分组一</template>
                          <el-menu-item index="1-1">选项1</el-menu-item>
                          <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                          <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                          <template slot="title">选项4</template>
                          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                        </el-submenu>
                      </el-submenu>
                      <el-submenu index="2">
                        <template slot="title">
                          <i class="el-icon-menu"></i>导航二
                        </template>
                        <el-menu-item-group>
                          <template slot="title">分组一</template>
                          <el-menu-item index="2-1">选项1</el-menu-item>
                          <el-menu-item index="2-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                          <el-menu-item index="2-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="2-4">
                          <template slot="title">选项4</template>
                          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                        </el-submenu>
                      </el-submenu>
                      <el-submenu index="3">
                        <template slot="title">
                          <i class="el-icon-setting"></i>导航三
                        </template>
                        <el-menu-item-group>
                          <template slot="title">分组一</template>
                          <el-menu-item index="3-1">选项1</el-menu-item>
                          <el-menu-item index="3-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                          <el-menu-item index="3-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="3-4">
                          <template slot="title">选项4</template>
                          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                        </el-submenu>
                      </el-submenu>
                    </el-menu>
                  </el-aside>
                  <el-container>
                    <el-main>
                      <el-table :data="tablerenyuan">
                        <el-table-column prop="date" label="姓名" width="140"></el-table-column>
                        <el-table-column prop="name" label="部别" width="120"></el-table-column>
                        <el-table-column prop="address" label="职务等级"></el-table-column>
                        <el-table-column prop="caozuo" label="操作">
                          <template>
                            <el-button
                              type="text"
                              size="small"
                              @click="xuanzemoxingVisible = true"
                            >选择评价模型</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-main>
                  </el-container>
                </el-container>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="xuanzerenyuanVisible = false">取 消</el-button>
                  <el-button type="primary" @click="xuanzerenyuanVisible = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-dialog
                title="选择评价模型"
                :visible.sync="xuanzemoxingVisible"
                width="40%"
                :before-close="xuanzemoxingClose"
              >
                <el-container style="height: 500px; border: 1px solid #eee">
                  <el-container>
                    <el-main>
                      <el-table :data="tablepingjiamoxing">
                        <el-table-column prop="date" label="模型内容主类别" width="140"></el-table-column>
                        <el-table-column prop="name" label="职务等级" width="120"></el-table-column>
                        <el-table-column prop="address" label="模型名称"></el-table-column>
                      </el-table>
                    </el-main>
                  </el-container>
                </el-container>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="xuanzemoxingVisible = false">取 消</el-button>
                  <el-button type="primary" @click="xuanzemoxingVisible = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-dialog
                title="人力资源考核指标管理"
                :visible.sync="kaohezhibiaoVisible"
                width="60%"
                :before-close="kaohezhibiaoClose"
              >
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="指标名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="指标类型">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="评分类型">
                    <el-checkbox-group v-model="form.type">
                      <el-checkbox label="类型1" name="type"></el-checkbox>
                      <el-checkbox label="类型2" name="type"></el-checkbox>
                      <el-checkbox label="类型3" name="type"></el-checkbox>
                      <el-checkbox label="类型4" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="角色选择">
                    <el-radio-group v-model="form.resource">
                      <el-radio label="角色1"></el-radio>
                      <el-radio label="角色2"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="采集时机">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="佐证材料">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                  </el-form-item>
                  <el-form-item label="评价内容">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                  </el-form-item>
                  <el-form-item label="评价重点">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="kaohezhibiaoVisible = false">取 消</el-button>
                  <el-button type="primary" @click="kaohezhibiaoVisible = false">确 定</el-button>
                </span>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="人力资源考核评价" name="first5">
              <p>
                <el-button type="primary" icon="el-icon-circle-plus-outline">选择考核计划</el-button>
              </p>
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column fixed prop="xuhao" label="序号" width="50"></el-table-column>
                <el-table-column prop="zhibiaomingcheng" label="指标名称"></el-table-column>
                <el-table-column prop="zhibiaoleixing" label="指标类型"></el-table-column>
                <el-table-column prop="pingfenleixing" label="评分类型"></el-table-column>
                <el-table-column prop="juesexuanze" label="角色选择"></el-table-column>
                <el-table-column prop="caijishiji" label="采集时机"></el-table-column>
                <el-table-column prop="zuozhengcailiao" label="佐证材料"></el-table-column>
                <el-table-column prop="pingjianeirong" label="评价内容"></el-table-column>
                <el-table-column prop="pingjiazhongdian" label="评价重点"></el-table-column>
                <el-table-column fixed="right" label="操作">
                  <template slot-scope>
                    <el-button type="text" size="small">保存</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="人力资源考核信息归档" name="first6">
              <p>
                <el-button type="primary" icon="el-icon-circle-plus-outline">添加考核指标</el-button>
              </p>
              <el-table :data="tablekaoheduixiang" border style="width: 100%">
                <el-table-column fixed prop="xuhao" label="序号" width="50"></el-table-column>
                <el-table-column prop="jihuamingcheng" label="计划名称"></el-table-column>
                <el-table-column prop="jihuamaioshu" label="计划描述"></el-table-column>
                <el-table-column prop="zhiwudengji" label="职务等级"></el-table-column>
                <el-table-column prop="kaishishijian" label="开始时间"></el-table-column>
                <el-table-column prop="jiwshushijian" label="结束时间"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="人力资源考核情况统计分析" name="first7">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column fixed prop="xuhao" label="序号" width="50"></el-table-column>
                <el-table-column prop="zhibiaomingcheng" label="姓名"></el-table-column>
                <el-table-column prop="zhibiaoleixing" label="单位"></el-table-column>
                <el-table-column prop="pingfenleixing" label="职务名称"></el-table-column>
                <el-table-column prop="juesexuanze" label="职务等级"></el-table-column>
                <el-table-column prop="caijishiji" label="年龄"></el-table-column>
                <el-table-column prop="zuozhengcailiao" label="出生面余额"></el-table-column>
                <el-table-column fixed="right" label="操作">
                  <template slot-scope="">
                    <el-button type="text" size="small" @click="gerenkaoheVisible = true">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                title="个人考核情况统计分析"
                :visible.sync="gerenkaoheVisible"
                width="60%"
                :before-close="gerenkaoheClose"
              >
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column fixed prop="xuhao" label="序号" width="50"></el-table-column>
                  <el-table-column prop="zhibiaomingcheng" label="指标名称"></el-table-column>
                  <el-table-column prop="zhibiaoleixing" label="指标类型"></el-table-column>
                  <el-table-column prop="pingfenleixing" label="评分类型"></el-table-column>
                  <el-table-column prop="juesexuanze" label="角色选择"></el-table-column>
                  <el-table-column prop="caijishiji" label="采集时机"></el-table-column>
                  <el-table-column prop="zuozhengcailiao" label="佐证材料"></el-table-column>
                  <el-table-column prop="pingjianeirong" label="评价内容"></el-table-column>
                  <el-table-column prop="pingjiazhongdian" label="评价重点"></el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="gerenkaoheVisible = false">取 消</el-button>
                  <el-button type="primary" @click="gerenkaoheVisible = false">确 定</el-button>
                </span>
              </el-dialog>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Navbar from "@/views/Dashboard/Navbar.vue";
import Footer from "@/views/Dashboard/footer.vue";
export default {
  name: "dashboard",
  components: { Navbar, Footer },
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tablerenyuan: Array(20).fill(item),
      tablepingjiamoxing: Array(20).fill(item),
      activeName: "second",
      tableData: [
        {
          xuhao: "2",
          zhibiaomingcheng: "王小虎",
          zhibiaoleixing: "上海",
          pingfenleixing: "普陀区",
          juesexuanze: "金沙江路",
          caijishiji: 200333,
          zuozhengcailiao: 200333,
          pingjianeirong: 200333,
          pingjiazhongdian: 200333
        },
        {
          xuhao: "2",
          zhibiaomingcheng: "王小虎",
          zhibiaoleixing: "上海",
          pingfenleixing: "普陀区",
          juesexuanze: "金沙江路",
          caijishiji: 200333,
          zuozhengcailiao: 200333,
          pingjianeirong: 200333,
          pingjiazhongdian: 200333
        }
      ],
      tablemoxingpingjia: [
        {
          xuhao: "1",
          mxzlb: "zzzzz",
          zhiwudengji: "aaaaaa",
          xiangleibie: "qqqqq",
          moxingmingcheng: "qqqqwww"
        }
      ],
      tablekaoheduixiang: [
        {
          jihuamingcheng: "1",
          jihuamaioshu: "zzzzz",
          zhiwudengji: "aaaaaa",
          kaishishijian: "qqqqq",
          jiwshushijian: "qqqqwww"
        }
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      form1: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      form2: {
        name: "",
        region: "",
        type: [],
        resource: ""
      },
      form3: {
        jihuamingcheng: "",
        jihuamiaoshu: "",
        zhiwudengji: "",
        kaishishijian: "",
        jieshushijian: ""
      },
      kaohezhibiaoVisible: false,
      kaohepingjiaVisible: false,
      pingjiamoxingVisible: false,
      kaohejihuaVisible: false,
      xuanzerenyuanVisible: false,
      xuanzemoxingVisible: false,
      gerenkaoheVisible: false
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    kaohezhibiaoClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    kaohepingjiaClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    pingjiamoxingClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    kaohejihuaClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    xuanzerenyuanClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    xuanzemoxingClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    gerenkaoheClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>