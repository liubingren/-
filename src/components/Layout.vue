<style scoped  lang='less'>
   .ivu-layout.ivu-layout-has-sider{
       background: #edeffc;
       height: 100%;
       position: fixed;
        width: 100%;
       .meter-sider {
            min-height: 688px;
            max-width: 260px !important;
            flex-basis: 260px !important;
            background: #02093d;
            color: #fff;
            text-align: center;
            font-size: 16px;
            .layout-logo{
                width: 260px;
                height: 70px;
                background: #2d8cf0;
                color: #fff;
                font-weight: 700;
                font-size: 18px;
                display: flex;
                flex-flow: row;
                justify-content: center;
                align-items: center;
                .logo{
                    display: inline-block;
                    width: 50px;
                    height: 64px;
                    background: url("../assets/logo2.png") no-repeat;
                    background-size: 100% 100%;
                }
                .logo-name {
                    height: 100%;
                    line-height: 80px;
                    color: #fff;
                    letter-spacing: 3px;
                    font-size: 12px;
                }
            }
            .user-info-bar {
            border-bottom: 1px solid #495060;
            padding-bottom: 39px;
            .user-avatar {
                width: 80px;
                height: 80px;
                margin: 40px auto 20px;
                border-radius: 50%;
                //background-color: #fff;
                background-image: url("../assets/man.png");
                background-size: 100%, 100%
            }
            .woman-avatar {
                background-image: url("../assets/woman.png");
            }
            }
            .user-btn-group {
            padding-top: 40px;
            .user-config {
                margin-bottom: 10px;
                cursor: pointer;
                &:hover {
                color: #2d8cf0;
                }
            }
            .pwd-config {
                margin-bottom: 50px;
                cursor: pointer;
                &:hover {
                color: #2d8cf0;
                }
            }
            }
            .quit-btn {
            width: 120px;
            color: #fff;
            background-color: transparent;
            }
        }
       .ivu-layout-header{
            height: 60px;
            display: flex;
            flex-flow: row;
            background: #ffffff;
            min-width: 1200px;
            min-width: 82vw;
            margin:0px 24px 0px 0px;
        }
        .ivu-layout-content{
            min-width: 78vw;
            min-height: 88vh;
            margin:0px 24px 0;
            background-color: #fff;
            border-radius: 6px;
             overflow: auto;
        }
        .ivu-layout{
            overflow: hidden;
            width: 88vw!important;
        }
        header {
            height: 70px;
            display: flex;
            flex-flow: row;
            .layout-logo {
                width: 200px;
                height: 100%;
                background: #2d8cf0;
                // float: left;
                color: #fff;
                font-weight: bold;
                font-size: 18px;
                .logo {
                display: inline-block;
                width: 70px;
                height: 100%;
                //   background: url("../img/logo.png") no-repeat 15px 4px;
                }
                .logo-name {
                position: absolute;
                height: 100%;
                line-height: 80px;
                color: #fff;
                letter-spacing: 3px;
                }
            }
            > .nav-ul {
                display: flex;
                width:calc(~"100% - 200px - 40px"); 
                // justify-content: space-evenly;
                // float: left;
                // width: 100%;
                height: 100%;
                // margin-left: 200px;
                padding: 0 20px;
                font-size: 16px;
                > li {
                flex-grow: 1;
                min-width: 108px!important;
                max-width: 150px!important;
                padding: 0 !important;
                text-align: center;
                font-size: 16px;
                line-height: 85px !important;
                &:hover {
                    > a {
                    color: #2d8cf0;
                    }
                    > div {
                        > a {
                            color: #2d8cf0;
                        }
                    }
                }
                a {
                    color: #000000!important;
                }
                ul {
                    li:hover {
                        a {
                            color: #2d8cf0;
                        }
                    }
                    a{
                        color: #000000!important;
                    }
                }
                }
                >li.hide{
                display: none;
                }
            }
            .right,.left{
                height: 70px;
                line-height: 70px;
                text-align: center;
                width: 20px;
                background: #ffffff;
            }
        }
     a{
         color: #8f9299;
     }
   }
   .input-bar{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        margin-bottom: 20px;       
        span{
            width: 120px;
            display: inline-block;
            color: #535f6b;
            text-align: right;
            margin-right: 10px;
            i{
                color: #f73131;
                margin-right: 8px;
                }
        }
   }
   
</style>
<template>
    <div class="layout" v-cloak>
        <Layout>
            <sider class="meter-sider" hide-trigger>
                <div class="layout-logo" @click="jumpToIndex">
                    <i class="logo"></i> 
                    <a class="logo-name">广州瓦良格机器人科技有限公司</a>
                </div>
                <div class="user-info-bar">
                    <div :class="['user-avatar',{'woman-avatar':wonmenshow}]"></div>
                    <div class="user-name" id="user-name">{{userInfor.userName}}</div>
                </div>
                <div class="user-btn-group">
                    <div class="user-config"  @click="userSetmodal = true">
                        <Icon type="gear-a"></Icon>
                        个人设置
                    </div>
                <div class="pwd-config"  @click="passwordSetmodal = true">
                    <Icon type="locked"></Icon>
                    密码修改
                </div>
                <i-button class="quit-btn" to="/login" @click="deleteSession()">退出</i-button>
                </div>
            </sider>
            <Layout>
                <Header>
                    <Menu class="nav-ul" mode="horizontal" :theme="theme1" active-name="1" accordion>
                    <Submenu name="index" :key="`index`">
                        <template slot="title">
                            首页
                        </template>
                        <MenuItem name="Banner" :to="`/`" :key="`Banner`">
                            首页Banner
                        </MenuItem>
                        <MenuItem name="modulemanage"  :to="`/modulemanage`" :key="`modulemanage`">
                            模块管理
                        </MenuItem>
                    </Submenu>
                    <MenuItem :name="item.id" :key="item.id" :to="item.route" v-for="(item,index) in menuItem" v-if="!item.children">
                        {{item.name}}
                    </MenuItem>
                    <Submenu :key="item.id" :name="item.id"
                                v-else>
                        <template slot="title">
                            <a href="javascript:void(0)">{{item.name}}</a>
                        </template>
                        <MenuItem v-for="page of item.children" 
                                    :key="page.id" :name="page.id" :to="page.route">
                            {{page.name}}
                        </MenuItem>
                    </Submenu> 
                    <MenuItem name="sectionedit" :key="`sectionedit`" :to="`/sectionedit`">
                        栏目编辑
                    </MenuItem>
                </Menu>
                </Header>
                <slot name="breadcrumb"></slot>
                <Content>
                    <slot></slot>
                </Content>
            </Layout>
        </Layout>
        <!-- 个人设置 -->
        <Modal
            v-model="userSetmodal"
            title="个人设置"
            @on-ok="postUserSet()"
         :loading="loading">
            <div class="input-bar">
                <span><i>*</i>用户名：</span>
                <label style="width: 220px">{{ userInfor.userName }}</label>
            </div>
            <div class="input-bar">
                <span><i>*</i>姓名：</span>
                <i-input placeholder="请输入姓名" size="large" v-model="userInfor.name" style="width: 220px"></i-input>
            </div>
            <div class="input-bar">
                <span><i>*</i>手机：</span>
                <i-input placeholder="请输入手机" size="large" v-model="userInfor.phoneNumber" style="width: 220px"></i-input>
            </div>
            <div class="input-bar">
                <span><i>*</i>邮箱：</span>
                <i-input placeholder="请输入邮箱" size="large" v-model="userInfor.email" style="width: 220px"></i-input>
            </div>
        </Modal>
        <!-- 密码设置 -->
        <Modal
            v-model="passwordSetmodal"
            title="密码修改"
            @on-ok="postPwdSet()"
            :loading="loading">
            <div class="input-bar">
                <span><i>*</i>旧密码：</span>
                <i-input type="password" placeholder="请输入旧密码" size="large" v-model="oldPwd" style="width: 220px"></i-input>
            </div>
            <div class="input-bar">
                <span><i>*</i>新密码：</span>
                <i-input type="password" placeholder="请输入新密码" size="large" v-model="newPwd" style="width: 220px"></i-input>
            </div>
            <div class="input-bar">
                <span><i>*</i>确认密码：</span>
                <i-input type="password" placeholder="请再次输入新密码" size="large" v-model="surePwd" style="width: 220px"></i-input>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return {
            reg: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, //邮箱
            regphone: /^1[34578]\d{9}$/, //电话
            loading: true,
            wonmenshow:false,
            passwordSetmodal:false,
            userSetmodal: false,
            oldPwd:'',
            newPwd:'',
            surePwd:'',
            userInfor:'',
            theme1: "light",
            navigationBarData:[],
            menuItem:[]    
        }
    },
    mounted(){
        this.getNavigationBarItem()
        this.getUserList()
    },
    computed: {
        refresh() {
            return this.$store.state.refreshNavigate
        }
    },
    watch:{
        //监听栏目编辑数据改变刷新头部导航栏
        refresh:function(newVal, oldVal){
            if(newVal==true){
                this.getNavigationBarItem('refresh')
            }
        } 
    },
    methods:{
        getNavigationBarItem(val){
             let that=this
            this.GLOBAL.$http(this.GLOBAL.HEADER+'frontResources/getChildren',"GET",function(res){
                that.menuItem=[]
                if(res.data.code === 1){
                    // that.navigationBarData=res.data.data.tree
                    let data=res.data.data.tree
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].children != null && data[i].children.length > 0) {
                            for (let j = 0; j < data[i].children.length; j++) {
                                data[i].children[j]['route']=data[i].children[j].isContent==0?`/productintroduction/${data[i].children[j].id}`:`/companyintrd/${data[i].children[j].id}`
                            }
                             that.menuItem.push(data[i])
                        } else {
                            if(data[i].name!=='首页'){
                                data[i]['route']=data[i].isContent==0?`/productintroduction/${data[i].id}`:`/companyintrd/${data[i].id}`
                                that.menuItem.push(data[i])
                            }
                        }
                    }
                }
                if(val==='refresh'){
                    that.$store.commit('handleRefreshNavigate',false)
                }
            });
        },
        jumpToIndex(){
            this.$router.push({path: '/'});
        },
        getUserList () {
           let THIS = this;   
           THIS.GLOBAL.$http(THIS.GLOBAL.HEADER +'user/logged','GET',function(res){
            THIS.userInfor = res.data.data
                if(THIS.userInfor.sex === '女'){
                THIS.wonmenshow = true
                }
         },{
           _method:'GET',
           userName: this.userInfor.userName,
           passWord: this.userInfor.passWord
         })
        },
          postUserSet() {
            let flag = true
            let THIS = this
            if (THIS.userInfor.name === '') {
                THIS.$Message.warning('姓名不能为空！')
                flag = false
                THIS.banSureBut()
                return false
            }
            if (THIS.userInfor.phoneNumber === '') {
                THIS.$Message.warning('手机不能为空！')
                flag = false
                THIS.banSureBut()
                return false
            }
            if (!THIS.regphone.test(THIS.userInfor.phoneNumber)) {
                THIS.$Message.warning('请输入正确手机号！')
                flag = false
                THIS.banSureBut()
                return false
            }
            if (THIS.userInfor.email === '') {
                THIS.$Message.warning('邮箱不能为空！')
                flag = false
                THIS.banSureBut()
                return false
            }
            if (!THIS.reg.test(THIS.userInfor.email)) {
                THIS.$Message.warning('请输入正确邮件格式！')
                flag = false
                THIS.banSureBut()
                return false
            }
            if(flag){
                let THIS = this;   
                THIS.GLOBAL.$http(THIS.GLOBAL.HEADER +'user/personal/data','PUT',function(res){
                   if (res.data.code === 1) {
                    THIS.banSureBut()
                    THIS.userSetmodal = false
                    THIS.$Modal.success({
                      title: '提示信息',
                      content: '设置成功！'
                    })
                  } else {
                    THIS.banSureBut()
                    THIS.$Modal.error({
                      title: '提示信息',
                      content: res.data.data.msg
                    })
                  }
                },{
                _method:'PUT',
                email:THIS.userInfor.email,
                name:THIS.userInfor.name,
                phoneNumber:THIS.userInfor.phoneNumber
                })
            }
          },
           //提交密码设置
            postPwdSet() {
            let flag = true
            let THIS = this
            if (THIS.oldPwd === '') {
                THIS.$Message.warning('旧密码不能为空！')
                flag = false
                THIS.banSureBut()
                return false
            }
            if (THIS.newPwd === '') {
                THIS.$Message.warning('新密码不能为空！')
                flag = false
                THIS.banSureBut()
                return false
            }
            if (THIS.surePwd === '') {
                THIS.$Message.warning('请再输入新密码！')
                flag = false
                THIS.banSureBut()
                return false
            }
            if (THIS.surePwd !== THIS.newPwd) {
                THIS.$Message.warning('确认密码和新密码不一致！')
                flag = false
                THIS.banSureBut()
                return false
            }
            if (flag) {
                 let THIS = this;   
           THIS.GLOBAL.$http(THIS.GLOBAL.HEADER +'user/personal/password','PUT',function(res){
            if (res.data.code === 1) {
                THIS.banSureBut()
                THIS.passwordSetmodal = false
                THIS.$Modal.success({
                title: '提示信息',
                content: '修改成功！'
                })
                THIS.newPwd = ''
                THIS.surePwd = ''
                THIS.oldPwd = ''
            } else {
                THIS.banSureBut()
                THIS.$Modal.error({
                title: '提示信息',
                content: res.data.msg
                })
            }
         },{
           _method:'PUT',
           oldPassword:THIS.oldPwd,
           newPassword: THIS.newPwd
         })
             }
            },
            deleteSession(){
                sessionStorage.clear()
            },
           //禁止对话框’确定‘后关闭
            banSureBut() {
            setTimeout(() => {
                this.loading = false;
                this.$nextTick(() => {
                this.loading = true;
                });
            }, 1000);
            }
    }
}
</script>


