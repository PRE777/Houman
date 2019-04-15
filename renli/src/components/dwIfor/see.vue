<template>
    <div style="display: flex;width:100%">
        <el-aside width="50%" class="el-aside">
            <el-table :data="RList.data"  border style="width: 100%">
                <el-table-column v-for="(item,index) in RList.biaotou" :key="index" :prop="item.key" :label="item.name">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handlxiugai(scope.$index, scope.row)">修改</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </el-aside>
            <el-main class="el-main_style">
            <el-form ref="RList" :model="froms" label-width="100px">
                <el-form-item v-for="(item,index) in RList.biaotou" :key="index" :label="item.name" v-if="item.key != 'qishishijian'">
                    <!-- 没理解，请问我  author：董 -->
                    <el-input v-model="froms[item.key]"></el-input>
                </el-form-item>
                <el-form-item v-else label="时间:">
                <el-col :span="11">
                    <el-date-picker
                    type="date"
                    placeholder="起始时间"
                    v-model="froms[item.key]"
                    style="width:90%"
                    class="el-form-item__content"
                    ></el-date-picker>
                </el-col>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="biwuEven" v-if="showhide">增加</el-button>
                <el-button type="primary" @click="biwuxiugai" v-else>修改完成</el-button>
                </el-form-item>
            </el-form>
            </el-main>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                RList:[],
                showhide:true,
                delVisible:false,
                editVisible:false,
                froms:{},
                biwuform: {
                    qishishijian: "",
                    zhongzhishijian: "",
                    danwei: "",
                    zhuanye: "",
                    dengji: "",
                    xingshi: ""
                },
            }
        },
        props:['RewardsList'],
        watch:{
            RewardsList:{
                handler:function(val,oldval){
                console.log(val)
                    this.RList = val;
                    this.froms = val.from;
                },
                immediate:true,//关键
                deep:true
            }
        },
        created() {
            console.log(this.RewardsList)
        },
        computed: {
           
        },
        methods: {
            // 删除
            handleDelete(index, row) {
            // 删除接口
                this.idx = index;
                this.RList.data.splice(this.idx, 1);
                console.log('2222')
                // this.delVisible = true;
            },
            // 增加新的信息
            biwuEven(){
                // 添加新增比武接口
                this.RList.data = JSON.parse(JSON.stringify(this.RList.data))
                // 比武的数据格式
                this.froms = JSON.parse(JSON.stringify(this.froms))
                this.RList.data.push(this.froms)
            },
            // 比武表格修改回填
            handlxiugai(index,row){
                this.showhide = false;
                this.idx = index;
                const item = this.RList.data[index];
                console.log(item)
                var obj={};
                obj=JSON.parse(JSON.stringify(item))
                this.froms = obj
                console.log(obj)
            },
            biwuxiugai(){
                // 修改接口----
                this.showhide = true;
                console.log(222)
                console.log(this.idx)
                this.$set(this.RList.data,this.idx, this.froms);
            }
        }      
    }

</script>

<style scoped>
    .div{
        display: flex;
        justify-content: end;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #666666;
    }
    .div >>> .el-input{
        max-width: 210px;
        width: 78.4%;
        height: 32px;
        line-height: 32px;
    }
    .div >>> .el-input__inner{
        height: 32px;
        line-height: 32px;
        border-radius:0px; 
    }
    .div >>> .el-form-item{
        margin-bottom: 15px;
    }
    .divs >>> .el-input{
        width: 516px;
        height: 32px;
        line-height: 32px;
    }
    .divs >>> .el-form-item{
        margin-bottom: 15px;
    }
    .div >>> .el-form-item__label{
        color: #666666;
        font-family: PingFangSC-Regular;
        font-size: 12px;
    }
    .divs >>> .el-form-item__label{
        color: #666666;
        font-family: PingFangSC-Regular;
        font-size: 12px;
    }
    .div,.divs >>> .el-form-item__label{
        line-height: 32px;
    }
    .divs >>> .el-input__inner{
        height: 32px;
        line-height: 32px;
        border-radius:0px; 
    }
    .el-dialog__wrapper{
        overflow: hidden;
    }
    .el-dialog__wrapper::-webkit-scrollbar{
        display: none;
    }
    .el-dialog >>> .el-dialog__header{
        background: #F6F7FB;
    }
</style>
