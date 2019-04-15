<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <span>姓名：</span>
                <el-input v-model="select_name" placeholder="姓名" class="handle-input mr10"></el-input>
                <span>岗位：</span>
                <el-input v-model="select_word" placeholder="岗位" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="date" label="生日" sortable>
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="age" label="年龄">
                </el-table-column>
                <el-table-column prop="gw" label="职位">
                </el-table-column>
                <el-table-column prop="address" label="编码" :formatter="formatter">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
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
                    date: '',
                    address: ''
                },
                idx: -1
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
                // this.is_search = true;
                this.tableData = [{
                    "date": "1997-11-11",
                    "name": "林丽",
                    "age" : "18",
                    "gw":"正团",
                    "address": "12341"
                }]
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
        margin-top:30px; 
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    .container {
        padding: 30px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .pagination{
        margin-top: 10px;
    }
</style>
