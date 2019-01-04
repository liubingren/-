<style scoped lang='less'>
    .header{
        height: 70px;
        width: 100%;
        display: flex;
        flex-flow: row;
        align-items: center;
        border-bottom: 1px solid #e7eaf1;
        .icon{
            height: 30px;
            width: 30px;
            background: url("../../assets/man.png");
            background-size:100% 100%; 
            margin:0 10px 0 30px;
        
        }
        div.title{
            height: 40px;
            line-height: 40px;
            width: 120px;
            font-size: 14px;
            font-weight: bold;
        }
    }
    .contentBody{
        display: flex;
        flex-flow: row;
        height: 78vh;
        #tree{
            width: 240px;
            height: 100%;
            border-right: 1px solid #e7eaf1;
        }
        .table-wrap{
            width: 100%;
            height: 100%;
            table{
                margin-top: 20px;
            }
        }
    }

      table {
        margin: 0 auto 30px;
        width: 96%;
        border-spacing: 0;
        border-collapse: collapse;
        text-align: center;
        thead {
            background-color: #dfeffe;
            font-size: 16px;
            tr {
                height: 50px;
                th {
                    &:first-of-type {
                        padding-left: 10px;
                    }
                    &:last-of-type {
                        position: relative;
                        .add-meter {
                            margin: 5px 20px 0 0;
                            color: #2d8cf0;
                            font-size: 20px;
                            cursor: pointer;
                        }
                    }
                    &.price-unit {
                        position: relative;
                        span {
                            position: absolute;
                            width: 40px;
                            font-size: 12px;
                            color: #80848f;
                            bottom: 0;
                            right: 50%;
                            -webkit-transform: translateX(50%);
                            -moz-transform: translateX(50%);
                            -ms-transform: translateX(50%);
                            -o-transform: translateX(50%);
                            transform: translateX(50%);
                        }
                    }
                }
            }
        }
        tbody {
            font-size: 14px;
            tr {
                height: 50px;
                &:nth-of-type(2n) {
                    background: #f9f9fb;
                }
                td:not(.operation-td) {
                    max-width: 70px;
                    overflow: hidden;
                    white-space: nowrap;
                    -ms-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    &:first-of-type {
                        padding-left: 10px;
                    }
                }
                td{
                    button{
                        width: 45px;
                        height: 28px;
                        &:first-child{
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
    }
    @media (max-width: 1450px) {
        table {
            thead {
                font-size: 14px;
            }
            tbody {
                font-size: 12px;
            }
        }
    }
    .table-wrap>div{
        margin: 20px auto 0px;
        text-align: center;
        color:red;
    }
    .ivu-modal-body{
        >div{
            display: flex;
            flex-flow: row;
            justify-content: center;
            align-items: center;           
            margin-bottom: 10px;
            >span{
                margin-right: 5px;   
                display: flex;
                flex-flow: row;
                justify-content: center;
                align-items: center;
                width: 80px;
                i{
                    color: red;
                }
            }
            .addImg{
                font-size: 14px;
                padding: 6px 7px;
                height: 118px;
                display: flex;
                flex-flow: column;
                justify-content: center;
                align-items: center;
                width: 186px;
                padding: 4px 7px;
                font-size: 12px;
                border: 1px solid #dcdee2;
                border-radius: 4px;
                color: #b3b6bd;
                background-color: #fff;
                div{
                    font-size: 34px;
                }
            }
        }
    }
    #tree{
        padding: 12px;
    }
</style>

<template>
    <Layout>
        <Breadcrumb slot="breadcrumb">
            <BreadcrumbItem>栏目编辑</BreadcrumbItem>
        </Breadcrumb>
        <div class="header">
            <div class="icon"></div>
            <div class="title">栏目编辑</div>
        </div>
        <div class="contentBody">
            <div class="tree" id="tree">
                <Tree :data="treeData" @on-select-change="getID"></Tree>
            </div>
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>顺序编号</th>
                            <th>资源名称</th>
                            <th>是否为内容页</th>
                            <th>父菜单</th>
                            <th>操作</th>
                            <th style="color:#2c8cf0"><Icon type="md-add" size="24"  @click="add"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in tableData" :key="item.id">
                            <td><InputNumber :max="10" :min="1" v-model="item.number" @on-change="submitEdit(`${index}`,$event)"></InputNumber></td>
                            <td>{{item.name}}</td>
                            <td>{{item.isContent===0?'否':'是'}}</td>
                            <td>{{item.parentName}}</td>
                            <td><Button type="primary" size="small" @click="edit(`${index}`)">编辑</Button><Button type="error" size="small" @click="deleteModal=true;currentID=`${item.id}`">删除</Button></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Modal
            v-model="editModal"
            :title="modalTitle"
            @on-ok="ok"
            @on-cancel="cancel">
            <div>
                <span><i>&nbsp;</i><span>父菜单:&nbsp;</span></span>
                <Input placeholder="请输入名称" style="width: auto" disabled  v-model="currentParentName"></Input>
            </div>
            <div>
                <span><i>*</i><span>资源名称:</span></span>
                <Input placeholder="请输入资源名称" style="width: auto" v-model="currentName"></Input>
            </div>
            <div>
                <span><i>*</i><span>是否为内容页:</span></span>
                <RadioGroup v-model="currentIsContent" style="width: 186px;">
                    <Radio :label="1">是</Radio>
                    <Radio :label="0">否</Radio>
                </RadioGroup>
            </div>
            <div>
                <span><i>*</i><span>顺序编号:</span></span>
                <InputNumber :max="10" :min="1"  v-model="currentNUmber" style="width: 186px;"></InputNumber>
            </div>
        </Modal>
        <Modal v-model="deleteModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-aligsn:center">
                <p>是否继续删除此栏目？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="del">删除</Button>
            </div>
        </Modal>
    </Layout>
</template>
<script>
import Layout from "../Layout"
import Qs from 'qs'
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data(){
    return {
        editModal:false,
        deleteModal:false,
        editOrAdd:"",
        modalTitle:"",
        treeData:[],
        tableData:{},
        currentID:'',
        currentNUmber:0,
        currentName:'',
        currentParentId:'',
        currentParentName:'',
        currentIsContent:0
    }
    
  },
  mounted(){
        this.renderTree()
  },
  methods:{
     ok () {
        this.submitEdit()
    },
    cancel () {
        this.$Message.info('Clicked cancel')
    },
    add(){
        this.editModal=true
        this.modalTitle='新建资源'
        this.editOrAdd='add'
    },
    edit(i){
        this.currentID=this.tableData[i*1].id
        this.currentName=this.tableData[i*1].name
        this.currentParentId=this.tableData[i*1].parentId
        this.currentParentName=this.tableData[i*1].parentName
        this.currentIsContent=this.tableData[i*1].isContent*1
        this.currentNUmber=this.tableData[i*1].number
        this.editModal=true
        this.modalTitle='编辑资源'
        this.editOrAdd='edit'
    },
    del(){
        let that=this
        this.GLOBAL.$http(this.GLOBAL.HEADER+'frontResources',"DELETE",function(res){
            console.log(res)
            if(res.data.code === 1){
                that.$Message.info('删除成功')
                that.renderTree()
                that.getTableData()
                that.deleteModal=false
            }
        },{
            id:that.currentID
        });
    },
    renderTree(){
        let that=this
        this.GLOBAL.$http(this.GLOBAL.HEADER+'frontResources/getChildrenAll',"GET",function(res){
            console.log(res)
            if(res.data.code === 1){
                that.treeData=[]
                that.treeData=res.data.data.tree
                that.refreshNavigate=true
            }
        });
    },
    // 新增和编辑方法
    submitEdit(i,num){
        if(num){
            this.editOrAdd="edit"
            this.currentID=this.tableData[i*1].id
            this.currentName=this.tableData[i*1].name
            this.currentParentId=this.tableData[i*1].parentId
            this.currentParentName=this.tableData[i*1].parentName
            this.currentIsContent=this.tableData[i*1].isContent*1
            this.currentNUmber=num
        }
        let that=this
        let url,method,data,msg
        if(this.editOrAdd==="edit"){
            url=this.GLOBAL.HEADER+'frontResources'
            method="PUT"
            msg="编辑成功"
            data={
                id:this.currentID,
                isContent:this.currentIsContent*1,
                name:this.currentName,
                number:this.currentNUmber,
                parentId:this.currentParentId,
                parentName:this.currentParentName
            }
        }else{
            url=this.GLOBAL.HEADER+'frontResources'
            method="POST"
            msg="添加成功"
            data={
                isContent:this.currentIsContent*1,
                name:this.currentName,
                number:this.currentNUmber,
                parentId:this.currentParentId,
                parentName:this.currentParentName
            }
        }
        this.GLOBAL.$http(url,method,function(res){
            if(res.data.code === 1){
                that.$Message.info(msg)
                that.getTableData()
                that.renderTree()
                // 刷新导航栏
                that.$store.commit('handleRefreshNavigate',true)
            }
        },data);
    },
    getID(data){
        this.currentParentId=data[0].id
        this.currentParentName=data[0].name
        this.getTableData()
    },
    getTableData(){
        let that=this
        this.GLOBAL.$http(this.GLOBAL.HEADER+`frontResources/parents/${that.currentParentId}`,"GET",function(res){
            if(res.data.code === 1){
                that.tableData=res.data.data.list
            }
        });
    }
  },
  components:{
      Layout
  }
};
</script>