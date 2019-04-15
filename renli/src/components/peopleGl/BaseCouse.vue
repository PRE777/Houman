<template>
    <div class="table">
        <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <div class="flex">
                <el-form-item
                    label="姓名"
                    prop="name"
                    :rules="[
                    { required: true, message: '姓名不能为空'}
                    ]"
                >
                <el-input type="text" v-model.number="numberValidateForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="年龄"
                    prop="age"
                    :rules="[
                    { required: true, message: '年龄不能为空'},
                    { type: 'number', message: '年龄必须为数字值'}
                    ]"
                >
                <el-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="岗位"
                    prop="gw"
                    :rules="[
                    { required: true, message: '岗位不能为空'}
                    ]"
                >
                <el-input type="text" v-model.number="numberValidateForm.gw" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="xxxx">
                    <el-select v-model="numberValidateForm.region" placeholder="xxxx">
                    <el-option label="xxx一" value="shanghai"></el-option>
                    <el-option label="xxx二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="numberValidateForm.resource">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                    </el-radio-group>
            </el-form-item>
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
                <el-button @click="resetForm('numberValidateForm')">重置</el-button>
            </el-form-item>
         </el-form>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
               numberValidateForm: {
                age: '',
                name:'',
                gw:'',
                resource:'',
                region:''
               }
            }
        },
        created() {

        },
        computed: {
            data() {
                
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                console.log(this.numberValidateForm)
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }

</script>

<style scoped>
    .table{
        height: 100%;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .table >>> .el-input__inner{
        width: 200px;
    }
    .table >>> .el-form-item{
        margin: 20px;
    }

    .flex{
        display: flex;
        flex-wrap: wrap;
    }
</style>
