<style scoped lang='less'>
@mainColor:#2b8cf0;
.login{
    min-width: 1366px;
    height: 100%;
    min-height: 948px;
    background: url(../assets/loginBg.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .login-from{
      width: 800px;
      height: 460px;
      display: flex;
      justify-content: start;
      .logo{
        width: 440px;
        height: 100%;
        background:rgba(44, 140, 240, 0.6);
        display: flex;
        align-items: center;
        flex-direction:column;
        img{
          margin-top: 100px;
        }
        p{
          font-size: 18px;
          font-weight:bold;
          color:#fff;
          margin-top:10px;
        }
      }
       .input-from{
        width: 360px;
        height: 100%;
        background-color: #fff;
        display: flex;
        align-items: center;
        flex-direction:column;
        p{
          margin: 80px auto 40px;
          font-size:20px;
          color: #1c2438;
        }
        div{
          height: 40px;
          width: 75%;
          border-bottom: 1px solid #ebebe4;
          margin-bottom: 16px;
         .icon{
           display: inline-block;
           width: 18px;
           height: 18px;
         }
         .icon-u{
           background: url(../assets/user.png) no-repeat;
         }
         .icon-p{
           background: url(../assets/pas.png) no-repeat;
         }
         .icon-v{
           background: url(../assets/ver.png) no-repeat;
         }
         input{
           width: 230px;
           padding: 0 8px;
           height: 100%;
           border: none;
           font-size: 14px;
         }
          .yanzhengma_input,.verification{
            width: 110px;          
          }
          .verification{
            width: 80px;
            margin-right: 10px;
            font-size: 16px;
            text-align: center;
            font-weight: bold;
            letter-spacing: 5px;
          }
        } 
        .login-bt{
          width: 250px;
          height: 50px;
          text-align: center;
          border-radius: 6px;
          color: #fff;
          background-color: @mainColor;
          font-size: 20px;
          border: none;
          cursor: pointer;
        }
        .login-bt:hover{
          background-color: #1272e4;
        } 
         input:focus {
            outline: none;
             }       
      }
    }
}
   
</style>
<template>
  <div class="login">
    <div class="login-from">
      <div class="logo">
        <img src="../assets/login-logo.png" alt="">
        <p>广州瓦良格机器人科技有限公司</p>
      </div>
      <div class="input-from">
          <p>瓦良格网站后台管理系统</p>
          <div>
            <i class="icon icon-u"></i>
            <input type="text" placeholder="请输入用户名" autofocus v-model="userInfor.userName">
          </div>
          <div>
            <i class="icon icon-p"></i>
            <input type="password" placeholder="请输入密码" v-model="userInfor.passWord">
          </div>
          <div>
            <i class="icon icon-v"></i> 
            <input type="text" placeholder="请输入验证码" id="yanzhengma" class="yanzhengma_input" v-model="picLyanzhengma"  @keyup.Enter="postUserInfor">
            <input type="text"  class="verification" v-model="checkCode" disabled/>
            <a style="color:gray" href="" @click.prevent="createCode">换一张</a>
          </div>
           <input type="button" class="login-bt" @click="postUserInfor" value="登录">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      userInfor:{
      userName:'',
      passWord:''
    },
        flag:false,
        checkCode:'',
        picLyanzhengma:''
    }
    
  },
  mounted(){
    this.createCode()
  },
  methods:{
     //验证码
    createCode(){
      //先清空验证码的输入
      this.code = "";
      this.checkCode = "";
      this.picLyanzhengma = "";
      //验证码的长度
      let codeLength = 4;
      //随机数
      let random = new Array( 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      )
      for(let i = 0; i < codeLength; i++) {
        //取得随机数的索引（0~35）
        let index = Math.floor(Math.random()*36);
        //根据索引取得随机数加到code上
        this.code += random[index];
      }
      //把code值赋给验证码
      this.checkCode = this.code;
    },
     postUserInfor(){
        let THIS = this
        if (THIS.userInfor.userName === '') {
          THIS.showmag('false','用户名不能为空！')
          THIS.flag = false
          return false
        }
        if (THIS.userInfor.passWord === '') {
        THIS.showmag('false','密码不能为空！')
        THIS.flag = false
        return false
      }
      if (THIS.picLyanzhengma === '') {
        THIS.showmag('false','验证码不能为空！')
        THIS.flag = false
        return false
      }else {
        if(THIS.picLyanzhengma.toLocaleLowerCase() === this.checkCode.toLocaleLowerCase()){
          THIS.flag = true
        }else{
          THIS.showmag('false','验证码错误！')
          THIS.flag = false
          return false
        }
      }
       if (THIS.flag){
         THIS.GLOBAL.$http(THIS.GLOBAL.HEADER +'login/in','POST',function(res){
           if(res.data.code === 2){
             THIS.showmag('false',res.data.msg)
           }else if(res.data.code === 1){
             THIS.$router.push({ path:'/'})
             sessionStorage.setItem('userName',THIS.userInfor.userName)
           }

         },{
           _method:'POST',
           userName: this.userInfor.userName,
           passWord: this.userInfor.passWord
         })

      }
     },
     //信息提示
    showmag (arg,msg) {
      this.$Message.config({
        top: 30,
        duration: 1
      })
      if(arg === 'true'){
        this.$Message.success(msg)
      }else {
        this.$Message.warning(msg);
      }
    }
       
  }
};
</script>