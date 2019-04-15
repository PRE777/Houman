import request from '@/utils/request'
//加载组织树接口
export function LoadOrganizationTree() {
    return;
    const data = {

    }
    return request({
        url: '',
        method: 'post',
        params: data
    })
}
//查询人员信息接口
export function searchPersonsInfo(formInline) {
    return;
    const data = {
        orgcode: formInline.searchOrgList, //机构单位集合
        name: formInline.name, //人员姓名
        nativePlace: formInline.region, //籍贯
        identityid: formInline.identity, //身份号
        pageindex: formInline.currentPage, //当前页索引
        searchItems: formInline.seachItems, //多条件查询
        rowsize: 10 //每页显示数量，
    }
    return request({

    })
}
//查询当前人的多条件收藏列表
//参数：身份号
export function LoadCollections(identitycode){
    return "";
}
//通过单位信息获取人员列表
export function getPersonsbyorgcode(code){
    return ""
}
//点击收藏多条件信息功能
export function AddCollection(searchitems){
    return "";
}
//获取所有标签信息
export function GetAlllabels(){
    return "";
}
//保存给人员打标签信息
export function SaveLabelInfo(person){
    return "";
}
//通过标签查询人员
export function getpersonsbylabel(label){
    return "";
}
//添加自定义人员收藏
export function AddPersonCollection(){
    return "";
}
//删除自定义人员收藏
export function deletePersonCollection(){
    return "";
}
//获取数据字典信息
export function getAllDictionary(){
    return "";
}   
//保存字典信息
export function SaveDictionaryInfo(){
    return "";
}


