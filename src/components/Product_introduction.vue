<style scoped lang='less'>
@mainColor:#2b8cf0;
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
            background: url("../assets/productInfor.png");
            background-size:100% 100%; 
            margin:0 10px 0 30px;
        
        }
        div.title{
            height: 40px;
            line-height: 40px;
            width: 120px;
            font-size: 16px;
            font-weight: bold;
        }
    }
    .toolTip{
        span{
           margin-right: 10px;
           color:gray; 
        }
        height: 80px;
        padding: 20px 0px 20px 30px;
        .ivu-date-picker,.ivu-input-wrapper{
           margin-right: 15px;
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
                i{
                    cursor: pointer;
                }
            }
        }
        tbody {
            font-size: 14px;
            tr {
                height: 100px;
                padding: 5px 0;
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
                            margin-right: 30px;
                        }
                    }
                    img{
                        width: 120px;
                        height: 80px;
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
    .addModel{
        margin-top: 60px;
        width: 70%;
        margin-left: auto;
        margin-right: auto;
        .title{
            width: 100%;
            display: flex;
            justify-content:space-between;
            height: 40px;
            line-height: 40px;
            margin-bottom: 40px;
            span{
                font-size: 24px;
                font-weight: bold;
                color: @mainColor;
                span{
                    font-size: 16px;
                    font-weight: normal;
                    margin-left: 10px;
                }
            }
            span+span{
                font-size: 16px;
                cursor: pointer;
            }
        }
        form div{
            width: 100%;
            display: flex;
            justify-content: flex-start;
            font-size: 16px;
            margin-bottom: 10px;
            i{
                color: #f73131;
                margin-right: 8px;
            }
            span{
                width: 110px;
                display: inline-block;
                color: #535f6b;
            }
            .addImg{
                width: 260px;
                border-radius: 5px;
                text-align: center;
                position: relative;
                cursor: pointer;
                border: 1px solid #dcdee2;
                input{
                    width: 100%;
                }
            }
            .addImg:hover,.editDetail:hover{
                border-color: #2b8cf0;
            }
            .editDetail{
                border-radius: 5px;
                width: 80%;
                z-index: 9999;
                .editor{
                     width: 100%;
                }
            }
            
        }
        .but{
                margin-top: 50px !important;
                margin-bottom: 30px;
                display: flex !important;
                justify-content: center !important;
                button:first-child{
                    margin-right: 120px;
                }
            } 
            .show{
                img{
                    width: 100%!important;
                }
            }           
    }
    
</style>

<template>
    <Layout>
        <Breadcrumb slot="breadcrumb">
            <BreadcrumbItem v-for="(value,index) in frontResourcesName" :key="index">{{value}}</BreadcrumbItem>
        </Breadcrumb>
        <div class="header">
            <div class="icon"></div>
            <div class="title">{{frontResourcesName[frontResourcesName.length-1]}}</div>
        </div>
        <div class="toolTip" v-if="editModal">
             <i-input placeholder="请输入名称" style="width: auto" v-model.trim="keywords" @on-keyup.enter="getList(1)">
                <Icon type="ios-search" slot="suffix" @click="getList(1)"/>
            </i-input>
            <Button type="primary" @click="openDeleteModel(1)">批量删除</Button>
        </div>
        <div class="table-wrap" v-if="editModal">
            <table>
                <thead>
                    <tr>
                        <th><Checkbox style="margin-left: 10px;" @on-change="getCheckboxes($event)" v-model="check"></Checkbox></th>
                        <th>顺序编号</th>
                        <th>名称</th>
                        <th>图片</th>
                        <th>发布时间</th>
                        <th>相关操作</th>
                        <th><Icon type="md-add" size="24"  @click="showAdd"/></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in list" :key="item.id" :data-id="item.id">
                        <td><Checkbox @on-change="getCheckboxes($event,item.id)"
                                        v-model="checkStatus[index]"></Checkbox></td>                       
                        <td><InputNumber :max="100" :min="1" v-model="item.number"  @on-change="changeNumber(`${item.id}`,$event)"></InputNumber></td>                      
                        <td>{{item.title}}</td>
                        <td>
                            <img :src=`${GLOBAL.HEADER}pageContent/images/${item.coverUrl}`>
                        </td>
                        <td>{{formatDate(new Date(item.createTime),'yyyy-MM-dd hh:mm')}}</td>
                        <td><Button size="small" @click="edit(index)">编辑</Button>
                        <Button size="small" @click="openDeleteModel(0,index)">删除</Button></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <Page class="page-bar"  show-elevator show-total :page-size="pageSize" :total="totalpage" :current="pageCurrent" @on-change="pageInfor($event)"></Page>
        </div>
    <div class="addModel" v-if="!editModal">
        <div class="title">
            <span>
                编辑{{frontResourcesName[frontResourcesName.length-1]}}<span>详情编辑</span>
            </span>
            <span @click="previewModel">预览</span>
        </div>
        <form ref="form">
            <div  v-if="!isAdd">
                <span><i>*</i>编号：</span>
                <div>{{editId}}</div>
            </div>
            <div>
                <span><i>*</i>名称：</span>  
                <i-input placeholder="请输入名称" style="width:260px" v-model="addTitle"></i-input>
            </div>

            <div>
                <span><i>*</i>图片：</span>  
                <div class="addImg" id="addImg" title="添加图片">
                    <input type="file" name="fileUpload" id="fileUp" accept="image/*" @change="change($event)" ref="inputFile" >
                </div>
            </div>
            <div>
                <span><i>*</i>简介：{{content1}}</span>  
                <i-input type="textarea" :rows="3" placeholder="请输入简介" style="width:60%" v-model="addIntroduce"></i-input>
            </div>
            <div>
                <span><i>*</i>详情：</span>  
                <div class="editDetail">
                    <editor class="editor" ref="editorParent" :value="content1"  :setting="editorSetting" @input="contentUe"></editor>
                </div>
            </div>
        </form>
        <div class="but">
           <Button @click="editModal = true">取消</Button>
           <Button type="primary" @click="addNews()">发布</Button>
        </div>
    </div>
    <!-- 删除确认弹框 -->
        <Modal v-model="deleteSureModal" title="提示信息" :mask-closable="false" @on-ok="deleteInfor()" width="300" class-name="vertical-center-modal">
            <p style="margin: 10px 0; font-size: 16px; color: #848484">确认删除该信息？</p>
        </Modal>
        <!-- 全屏 --> 
        <Modal v-model="showmodal" footer-hide fullscreen title="全屏预览">
             <div style="width:1080px;margin:0 auto; color:#000;" class="show" v-html="showList"></div>
        </Modal>
</Layout>
</template>
<script>
import Layout from "./Layout"
import editor from "./editor-other";
import "../../static/skins/lightgray/skin.min.css";
import "../../static/skins/lightgray/content.min.css";
import "../../static/skins/zh_CN.js";
import store from "../store/index.js"; //vuex
export default {
  name: "bulletin-add",
  store,
  data(){
    return {
        showmodal:false,
        editModal:true,
        totalpage:0,
        pageCurrent:1,
        pageSize:4,
        keywords: '',//搜索
        list: [],      //数据列表
        //全选
        readMids: [],
        checkStatus: [],
        check : false,
        deleteSureModal:false,
        deleteList:'',
        deleteId:'',
        //添加
        isAdd:false,
        addTitle:'',
        addImage:'',
        addIntroduce:'',
        imgName : '',

        // 编辑器
        editId:'',//列表编辑id
        content1: "",
        editorSetting: "",
        contenList:'',
        actionurl : this.GLOBAL.HEADER + 'pageContent',
        //导航选项id
        frontResourcesId:this.$router.currentRoute.params.id,
        frontResourcesName:'',
        showList:'',
        file:'',
        currentNumber:'',
        currentID:''
    }
    
  },
  watch:{
      $route(to, from) {
        this.frontResourcesId = this.$router.currentRoute.params.id;//监听当前页面的id
        this.getList(1)
        }
  },
  mounted(){
      this.getList(1)
  },
  methods:{   
     //获取列表 
      getList(page){
          let THIS = this
          THIS.editModal = true
          THIS.GLOBAL.$http(THIS.GLOBAL.HEADER +'pageContent/title','GET',function(res){
           if(res.data.code === 1){
               THIS.totalpage = res.data.data.total
                THIS.list = res.data.data.list
                THIS.frontResourcesName = THIS.list[0].frontResourcesName.split(',')
            }
         },{
           _method:'GET',
            pageNum:page,
            pageSize:5,
            title: this.keywords,
            frontResourcesId:this.frontResourcesId
         })
      },
     change:function(event){
        this.file = event.target.files[0]
      },
    //添加
    showAdd(){
        this.editModal = false
        this.isAdd = true 
        this.addImage = this.contenList = this.file = this.addIntroduce = this.addTitle = ''
    },
      addNews(){
        let THIS = this       
        THIS.contenList = this.$store.state.editor_content//编辑器的内容            
        let flag = true  
        if(THIS.addTitle === ''){
            this.$Message.warning('名称不能为空！');
            flag = false 
            return 
        } 
        
        if(THIS.addIntroduce === ''){
            this.$Message.warning('简介不能为空！');
            flag = false 
            return 
        } 
        if(THIS.contenList === ''){
            this.$Message.warning('详情不能为空！');
            flag = false 
            return 
        }
        let paramsData = new FormData(THIS.$refs.form)      
        paramsData.append('content', THIS.contenList)
        paramsData.append('frontResourcesId', THIS.frontResourcesId)
        paramsData.append('introduction', THIS.addIntroduce)
        paramsData.append('title', THIS.addTitle )
        paramsData.append('file', THIS.file)
        if(THIS.isAdd){
            if(THIS.file === ''){
            this.$Message.warning('请上传图片！');
            flag = false 
            return 
        } 
            if(flag){
            THIS.GLOBAL.axios.post(THIS.GLOBAL.HEADER +'pageContent', paramsData)
            .then(resp => {
                let respData = resp.data
                if (respData.code === 1) {
                THIS.instance('success', '编辑成功！')
                THIS.editModal = true
                THIS.isAdd = false
                THIS.getList(1)
                THIS.addImage = THIS.contenList = THIS.file = THIS.addIntroduce = THIS.addTitle = '' 
                } else {
                THIS.instance('error', respData.msg)
                }
            }) 
            }
        }else{ //编辑 
            paramsData.append('id', THIS.editId )             
            THIS.GLOBAL.axios.post(THIS.GLOBAL.HEADER +'pageContent/update',paramsData).then(function(respData){
            if (respData.data.code === 1) {
                THIS.instance('success', '编辑成功！')
                THIS.editModal = true
                THIS.getList(THIS.pageCurrent)
                THIS.addImage = THIS.contenList = THIS.file = THIS.addIntroduce = THIS.addTitle = ''
                } else {
                THIS.instance('error', respData.data.msg)
                }
          })
        }
      },
      contentUe(value) {
        this.content1 = value; 
      },
    handleBeforeUpload (file) {
        this.addImage = file
        this.imgName = file.name
        // 取消自动上传的触发，手动上传
        return false 
    },
    //获取顺序号
    changeNumber(id,event){
        this.currentNumber=event
        this.currentID=id
        this.updateNumber()
    },
    // 修改序列号
    updateNumber(){
        let THIS = this
          THIS.editModal = true
          THIS.GLOBAL.$http(THIS.GLOBAL.HEADER +'pageContent/number','PUT',function(res){
           if(res.data.code === 1){
               THIS.getList(1)
            }
         },{
           _method:'PUT',
           id:THIS.currentID,
           number:THIS.currentNumber
         })
    },
    //编辑
      edit(index){
            this.editModal = false
            this.isAdd = false
            let thisList = JSON.parse(JSON.stringify(this.list[index]))          
            this.addTitle = thisList.title
            this.addIntroduce = thisList.introduction
            this.addImage = this.GLOBAL.HEADER+'pageContent/images/'+ thisList.coverUrl
            this.imgName = thisList.coverUrl
            this.contenList = thisList.content
            this.editId = thisList.id
            this.frontResourcesId =thisList.frontResourcesId
            this.currentNumber=thisList.number
            setTimeout(() =>{
                this.$refs.editorParent.editors(thisList.content)
            },100)
      },
      //点击预览
      previewModel(){
          
        if(this.$store.state.editor_content){
            this.showmodal =true
            this.showList = this.$store.state.editor_content
        }else{
             this.$Message.warning('请输入详情再预览！');
        }
      },
      //删除
    //打开确认删除弹框
    openDeleteModel(type,index){
      if(type){//批量删除
        if(this.readMids.length >0){
            for(let i=0;i<this.readMids.length;i++){
                 this.deleteId += this.readMids[i] +','
            }
        }else{
            this.instance('error', '请选择要删除的信息！')
            return
        }
      }else{
        this.deleteList = JSON.parse(JSON.stringify(this.list[index]))
        this.deleteId = this.deleteList.id
        }
      this.deleteSureModal = true
    },
    deleteInfor(){
        let THIS = this
        THIS.GLOBAL.$http(THIS.GLOBAL.HEADER +'pageContent','DELETE',function(res){
           if(res.data.code === 1){
            THIS.checkStatus = []
            THIS.readMids = []
            THIS.deleteId = ''
            THIS.instance('success', '删除成功！')
            THIS.getList(1)
          }else{
            THIS.instance('error', res.data.msg)
          }
         },{
           _method:'DELETE',
           ids: THIS.deleteId
        })
    },
    getCheckboxes(e, mid) {
      if (mid) {
        if (e) {
          this.readMids.push(mid)
        }
        else {
          this.readMids.splice(this.readMids.indexOf(mid), 1)
        }
      }
      else {   // 没传 mid 就是全选/全不选的情况
        if (e) {      
          this.checkStatus = []
          this.readMids = []
          for (let item of this.list) {
            this.readMids.push(item.id)
            this.checkStatus.push(true)
          }
        }
        else {
          this.checkStatus = []
          this.readMids = []
        }
      }
    },
      //分页
    pageInfor(e) {
      this.pageCurrent = e
      this.getList(this.pageCurrent)
       this.checkStatus = []
        this.readMids = []
    },
      //提示框
    instance(type, contentData) {
      const title = '提示信息';
      const content = '<p>' + contentData + '</p>';
      switch (type) {
        case 'success':
          this.$Modal.success({
            title: title,
            content: content
          })
          break
        case 'error':
          this.$Modal.warning({
            title: title,
            content: content
          })
          break
      }
    },
    
       formatDate (date, fmt) {
            var o = {
                "M+" : date.getMonth()+1,                 //月份
                "d+" : date.getDate(),                    //日
                "h+" : date.getHours(),                   //小时
                "m+" : date.getMinutes(),                 //分
                "s+" : date.getSeconds(),                 //秒
                "q+" : Math.floor((date.getMonth()+3)/3), //季度
                "S"  : date.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt))
                fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(var k in o)
                if(new RegExp("("+ k +")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            return fmt;
        } 
  },
  components:{
    Layout,
    editor
  }
};
</script>