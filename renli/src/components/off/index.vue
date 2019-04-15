<template>
    <div class="table">
        <div class="crumbs">
              当前位置  (用户注销)
          </div>
        <div class="container">
          
            <!-- <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div> -->
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="date" label="生日" sortable width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="120">
                </el-table-column>
                <el-table-column prop="gw" label="职位" width="120">
                </el-table-column>
                <el-table-column prop="address" label="编码" :formatter="formatter">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">注销</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">注销后不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
            }
        },
        watch:{
            list(n,w){
                console.log(123)
                this.tableData = list
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
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
                    "date": "1997-11-11",
                    "name": "林丽",
                    "age" : "18",
                    "gw":"正团",
                    "address": "12341"
                }, {
                    "date": "1987-09-24",
                    "name": "文敏",
                    "age" : "18",
                    "gw":"正团",
                    "address": "123"
                }, {
                    "date": "1996-08-08",
                    "name": "杨秀兰",
                    "age" : "18",
                    "gw":"正团",
                    "address": "2222"
                }, {
                    "date": "1978-06-18",
                    "name": "魏强",
                    "age" : "18",
                    "gw":"正团",
                    "address": "11111"
                }, {
                    "date": "1977-07-09",
                    "name": "石秀兰",
                    "age" : "18",
                    "gw":"正团",
                    "address": "4444"
                }, {
                    "date": "1994-09-20",
                    "name": "朱洋",
                    "age" : "18",
                    "gw":"正团",
                    "address": "55555"
                }, {
                    "date": "1980-01-22",
                    "name": "傅敏",
                   "age" : "18",
                    "gw":"正团",
                    "address": "23424"
                }, {
                    "date": "1985-10-10",
                    "name": "毛明",
                    "age" : "18",
                    "gw":"正团",
                    "address": "234"
                }, {
                    "date": "1975-09-08",
                    "name": "何静",
                    "age" : "18",
                    "gw":"正团",
                    "address": "33333"
                }, {
                    "date": "1970-06-07",
                    "name": "郭秀英",
                    "age" : "18",
                    "gw":"正团",
                    "address": "876543"
                }]
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
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
        padding: 20px;
        padding-top:59px; 
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .pagination{
        margin-top: 10px;
    }
    .crumbs{
        top: 0px;
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
