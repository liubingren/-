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
    .toolTip{
        height: 80px;
        padding: 20px 0px 20px 30px;
        .ivu-date-picker,.ivu-input-wrapper{
           margin-right: 15px;
        }
    }
    .table-wrap{
        background: #fff;
        padding-bottom: 20px;
    }
    table {
        margin: 0 auto 30px;
        width: 96%;
        max-height: 100vh;
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
            // height: 100%;
            tr {
               height: 60px;
                &:nth-of-type(2n) {
                    background: #f9f9fb;
                }
                td:not(.operation-td) {
                    max-width: 70px;
                    max-height: 90px;
                    white-space: nowrap;
                    -ms-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    overflow: hidden;
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
    .page-bar {
        text-align: center;
    }
    .imgUpload{
        width: 186px;
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
    .ivu-modal-body{
        >div{
            >span{
                width: 80px;
            }
        }
    }
</style>

<template>
    <Layout>
        <Breadcrumb slot="breadcrumb">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem to="/">模块管理</BreadcrumbItem>
        </Breadcrumb>
        <div class="header">
            <div class="icon"></div>
            <div class="title">模块管理</div>
        </div>
        <div class="toolTip">
            <Button type="primary" @click="del(`all`)">批量删除</Button>
        </div>
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th><Checkbox v-model="chooseAllCheckboxFlag" @on-change="chooseDataAll"></Checkbox></th>
                        <th>顺序编号</th>
                        <th>名称</th>
                        <th>操作</th>
                        <th><Icon type="md-add" size="24"  @click="add"/></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tableData">
                        <td><Checkbox v-model="item.state" @on-change="chooseData(index)"></Checkbox></td>
                        <td><InputNumber :max="10" :min="1" v-model="item.number"  @on-change="changeNumber(`${index}`,$event)"></InputNumber></td>
                        <td>{{item.name}}</td>
                        <td><Button type="primary" size="small" @click="edit(`${index}`,`${item.id}`,`${item.frontresourcesIds}`)">编辑</Button><Button type="error" size="small"  @click="del(`single`,`${item.id}`)">删除</Button></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <Page class="page-bar"  show-elevator show-total></Page>
        </div>
        <Modal
            v-model="editModal"
            :title="modalTitle"
            @on-ok="ok"
            @on-cancel="cancel">
            <div>
                <span><i>*</i><span>模块名称:</span></span>
                <Dropdown style="width:186px;" @on-click="getModule">
                    <Button type="primary">
                       {{DropdownSelected===''?'请选择模块':`${DropdownSelected}`}}
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem :name="index" v-for="(item,index) in DropdownList">{{item.name}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div>
                <span><i>*</i><span>序号:</span></span>
                <Input placeholder="请输入序号" style="width: 186px" v-model="currentNumber"></Input>
            </div>
        </Modal>
         <Modal v-model="deleteModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-aligsn:center">
                <p>是否继续删除选中模块？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="batchDelete()">删除</Button>
            </div>
        </Modal>
    </Layout>
</template>
<script>
import Layout from "../Layout"

/* 
 * 删除数组中指定值 
 */
Array.prototype.remove = function (value) {
	var len = this.length;
	for (var i = 0, n = 0; i < len; i++) { //把出了要删除的元素赋值给新数组 
		if (this[i] != value) {
			this[n++] = this[i];
		}
	}
	this.length = n;
};

export default {
  data(){
    return {
        editModal:false,
        deleteModal:false,
        editOrAdd:"",
        modalTitle:"",
        tableData:[],
        currentID:'',
        chooseAllCheckboxFlag:false,
        chosenDataIndex: [], //选中数据的索引
        currentDataIndex:0,
        currentNumber:0,
        currentModuleName:'',
        currentfrontresourcesIds:'',
        deleteType:'',
        DropdownSelected:'',
        DropdownList:[]
        // publicOrdersTableData: [], //表格数据
    }
    
  },
  mounted(){
      this.getModuleList()
      this.getTableData()
  },
  methods:{
     ok () {
        this.submitEdit()
    },
    cancel () {
        this.$Message.info('Clicked cancel')
    },
    getModuleList(){
        let that=this
        this.GLOBAL.$http(this.GLOBAL.HEADER+'frontResources/content',"GET",function(res){
            console.log(res.data)
            if(res.data.code === 1){
                that.DropdownList=res.data.data
            }
        });
    },
    getModule(index){
        console.log(this.DropdownList[index])
        this.DropdownSelected=this.DropdownList[index].name
        this.currentfrontresourcesIds=this.DropdownList[index].id
    },
    add(){
        this.editModal=true
        this.modalTitle='新建模块'
        this.editOrAdd='add'
    },
    edit(index,id,currentfrontresourcesIds){
        this.editModal=true
        this.modalTitle='编辑模块'
        this.editOrAdd='edit'
        this.currentID=id
        this.currentfrontresourcesIds=currentfrontresourcesIds
        this.currentDataIndex=index*1
        this.currentNumber=this.tableData[this.currentDataIndex].number
    },
    changeNumber(index,event){
        this.editOrAdd='edit'
        this.currentNumber=event
        this.currentID=this.tableData[index].id
        this.currentfrontresourcesIds=this.tableData[index].frontresourcesIds
        this.submitEdit()
    },
    //提交编辑(添加)
    submitEdit(){
        let that=this,data,method,msg,id
        if(this.editOrAdd==='edit'){
            method='PUT'
            msg='编辑成功'
             data={
                frontResourcesIds:this.currentfrontresourcesIds,
                id:this.currentID,
                number:this.currentNumber
            }
        }else{
            method='POST'
            msg='添加成功'
             data={
                frontResourcesIds:this.currentfrontresourcesIds,
                id:'',
                number:this.currentNumber
            }
        }
        this.GLOBAL.$http(this.GLOBAL.HEADER+'homePage',method,function(res){
            console.log(res)
            if(res.data.code === 1){
                that.$Message.info(msg)
                that.getTableData()
            }
        },data);
    },
    chooseData(index) { //多选
        //选中立即把对应索引push进数组中,否则就删除
        if (this.tableData[index].state == true) {
            this.chosenDataIndex.push(index)
            this.chosenDataIndex = Array.from(new Set(this.chosenDataIndex)) //去重
        } else {
            this.chosenDataIndex.remove(index)
        }
        //不是所有数据都选上时去掉全选
        if (this.chosenDataIndex.length != this.tableData.length) {
            this.chooseAllCheckboxFlag = false;
        }
    },
    chooseDataAll() { //全选	
        this.chosenDataIndex = []; //清空数据索引数组
        if (this.chooseAllCheckboxFlag == true) { 
            //把所有的checkbox勾选上
            for (let i = 0; i < this.tableData.length; i++) {
                    this.tableData[i]['state'] = this.chooseAllCheckboxFlag
                    this.chosenDataIndex.push(i)
            }
        } else { 
            //把所有的checkbox去掉勾选
            for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i]['state'] = this.chooseAllCheckboxFlag
            }
        }
    },
    del(type,id){
        this.currentID=id
        this.deleteType=type
        this.deleteModal=true
    },
    //逐条或者批量删除
    batchDelete(){
        let that=this
        let data={}
        let newIdArr=[]
        if(this.deleteType==="single"){
            data={
                id:this.currentID
            }
        }else{
            for(let i=0;i<this.chosenDataIndex.length;i++){
                newIdArr.push(this.tableData[this.chosenDataIndex[i]].id)
            }
            data={
                id:newIdArr.join(",")
            }
        }
        this.GLOBAL.$http(this.GLOBAL.HEADER+'homePage',"DELETE",function(res){
            console.log(res)
            if(res.data.code === 1){
                that.$Message.info('删除成功')
                that.getTableData()
                that.deleteModal=false
            }
        },data);
    },
    getTableData(){
        let that=this
        this.GLOBAL.$http(this.GLOBAL.HEADER+'homePage',"GET",function(res){
            console.log(res.data.data.list)
            if(res.data.code === 1){
                that.tableData=[]
                let newArr=res.data.data.list
                for (let i = 0; i < newArr.length; i++) {  //重新构造数组
                    newArr[i]['state'] = false;
                }
                that.tableData=newArr
                console.log(that.tableData)
            }
        });
    }
  },
  components:{
      Layout
  }
};
</script>