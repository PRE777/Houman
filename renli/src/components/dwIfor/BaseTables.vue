<template>
    <div class="table">
        <div class="crumbs">
            当前位置  ({{dwName}})
            <el-button type="primary" icon="search" class="setGw" style="margin-left:100px;padding: 7px;">查缺编</el-button>
        </div>
        <div class="container">
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="name" label="单位名称">
                </el-table-column>
                <el-table-column prop="type" label="单位类型">
                </el-table-column>
                <el-table-column prop="numbers" label="单位编码">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit-outline" @click="xhandleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>
        <!-- 修改弹出框 -->
        <el-dialog title="基本信息修改" :visible.sync="editVisible" width="60%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="单位名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="单位类型">
                    <el-input v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="单位编码">
                    <el-input v-model="form.numbers"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <box></box>
    </div>
</template>

<script>
    import box from './personEditDialog.vue'
    export default {
        name: 'basetable',
        data() {
            return {
                dwName:'',
                tableData: [],
                cur_page: 1,
                select_name:'',
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    type: '',
                    numbers: ''
                },
                idx: -1
            }
        },
        components:{box},
        props:{
           lit:{
                type: Object,
                default: 0
            }
        },
        watch:{
            lit:{
                
                handler:function(val,oldval){
                    this.$nextTick( ()=>{
                        this.dwName = val.label;
                    })
                    
                },
                immediate:true,//关键
                deep:true
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                // return this.tableData.filter((d) => {
                //     let is_del = false;
                //     for (let i = 0; i < this.del_list.length; i++) {
                //         if (d.name === this.del_list[i].name) {
                //             is_del = true;
                //             break;
                //         }
                //     }
                //     if (!is_del) {
                //         if (d.address.indexOf(this.select_cate) > -1 &&
                //             (d.name.indexOf(this.select_word) > -1 ||
                //                 d.address.indexOf(this.select_word) > -1)
                //         ) {
                //             return d;
                //         }
                //     }
                // })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                // if (process.env.NODE_ENV === 'development') {
                //     this.url = '/ms/table/list';
                // };
                // this.$axios.post(this.url, {
                //     page: this.cur_page
                // }).then((res) => {
                //     this.tableData = res.data.list;
                // })
                this.tableData = [{
                    "name": "单位1",
                    "type" : "类型1",
                    "numbers":"22xxx4444"
                }, {
                    "name": "单位1",
                    "type" : "类型1",
                    "numbers":"22xxx4444"
                }, {
                    "name": "单位1",
                    "type" : "类型1",
                    "numbers":"22xxx4444"
                }, {
                    "name": "单位1",
                    "type" : "类型1",
                    "numbers":"22xxx4444"
                }, {
                   "name": "单位1",
                    "type" : "类型1",
                    "numbers":"22xxx4444"
                }, {
                    "name": "单位1",
                    "type" : "类型1",
                    "numbers":"22xxx4444"
                }, {
                    "name": "单位1",
                    "type" : "类型1",
                    "numbers":"22xxx4444"
                }, {
                    "name": "单位1",
                    "type" : "类型1",
                    "numbers":"22xxx4444"
                }]
            },
            handleEdit(index, row) {
                this.$bus.$emit("openPersonInfoEditDialog",true)
            },
            xhandleEdit(index, row) {
                // 调用修改接口部分
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    type: item.type,
                    numbers: item.numbers
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                // 修改基本信息
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改成功`);
            },
            // 监听树形结构---并修改名称
            
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    .container {
        padding: 30px;
        padding-top: 59px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .pagination{
        margin-top: 10px;
    }
    .crumbs{
        width: 100%;
        height: 48px;
        background: #FFFFFF;
        box-shadow: 2px 2px 4px 0 rgba(209,209,209,0.50);
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #5173A8;
        line-height: 48px;
        padding-left: 30px;
        box-sizing: border-box;
        position: absolute;
        z-index: 222;   
    }
</style>
