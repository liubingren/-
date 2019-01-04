
<style scoped lang='less'>
.header {
  height: 70px;
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  border-bottom: 1px solid #e7eaf1;
  .icon {
    height: 30px;
    width: 30px;
    background: url("../../static/img/company_intrd.png");
    background-size: 100% 100%;
    margin: 0 10px 0 30px;
  }
  div.title {
    height: 40px;
    line-height: 40px;
    width: 80px;
    font-size: 14px;
    font-weight: bold;
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

.page-content {
  width: 70%;
  margin: 5% 15%;
  text-align: center;
  // border: #aaa solid 1px;

  .code-row-bg .model-name div {
    height: 26px;
    font-size: 26px;
    color: #2d8cf0;
    font-weight: 700;
    cursor: default;
  }

  .code-row-bg .operate-name div {
    height: 16px;
    font-size: 16px;
    color: #2d8cf0;
    text-align: left;
    cursor: default;
  }

  .code-row-bg .preview div {
    height: 16px;
    font-size: 16px;
    color: #2d8cf0;
    font-weight: 700;
    cursor: pointer;
  }

  .editBox {
    margin: 30px 0;
    // border: #999 solid 1px;
    border-radius: 10px;
    height: 430px;
  }
}

@mainColor: #2b8cf0;
.header {
  height: 70px;
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  border-bottom: 1px solid #e7eaf1;
  .icon {
    height: 30px;
    width: 30px;
    background: url("../assets/productInfor.png");
    background-size: 100% 100%;
    margin: 0 10px 0 30px;
  }
  div.title {
    height: 40px;
    line-height: 40px;
    width: 120px;
    font-size: 16px;
    font-weight: bold;
  }
}
.toolTip {
  span {
    margin-right: 10px;
    color: gray;
  }
  height: 80px;
  padding: 20px 0px 20px 30px;
  .ivu-date-picker,
  .ivu-input-wrapper {
    margin-right: 15px;
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
.pageContent {
  margin-top: 60px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    margin-bottom: 40px;
    span {
      font-size: 24px;
      font-weight: bold;
      color: @mainColor;
      span {
        font-size: 16px;
        font-weight: normal;
        margin-left: 10px;
      }
    }
    span + span {
      font-size: 16px;
      cursor: pointer;
    }
  }
  form div {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    font-size: 16px;
    margin-bottom: 10px;
    i {
      color: #f73131;
      margin-right: 8px;
    }
    span {
      width: 110px;
      display: inline-block;
      color: #535f6b;
    }
    .addImg {
      width: 260px;
      border-radius: 5px;
      text-align: center;
      position: relative;
      cursor: pointer;
      p {
        font-size: 12px;
        color: #dcdee2;
      }
    }
    .addImg:hover,
    .editDetail:hover {
      border-color: #2b8cf0;
    }
    .editDetail {
      border-radius: 5px;
      width: auto;
      width: 80%;
      .editor {
        width: 100%;
      }
    }
  }
  .but {
    margin-top: 50px !important;
    display: flex !important;
    justify-content: center !important;
    button:first-child {
      margin-right: 120px;
    }
  }
}
</style>
<template>
  <Layout>
      <Breadcrumb slot="breadcrumb">
          <BreadcrumbItem>{{pagename1}}</BreadcrumbItem>
          <BreadcrumbItem to="/">{{pagename2}}</BreadcrumbItem>
      </Breadcrumb>
      <div class="header">
          <div class="icon"></div>
          <div class="title">{{pagename1}}</div>
      </div>
    <div class="pageContent">
        <div class="title">
            <span>
                {{pagename2}}<span>详情编辑</span>
            </span>
            <span @click="showPreviewModel">预览</span>
        </div>
        <form ref="form">
            <div>
                <span><i>&nbsp;&nbsp;</i>编号：</span>  <div>&nbsp;&nbsp;{{recordId}}</div>
            </div>
            <div>
                <span><i>*</i>标题：</span>  
                <i-input placeholder="请输入文章标题" style="width:260px" v-model="addTitle"></i-input>
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
           <Button @click="cancelEditor()">取消</Button>
           <Button type="primary" @click="submitEditor()">发布</Button>
        </div>
    </div>
          
    <!-- 全屏 --> 
    <Modal v-model="showmodal" footer-hide fullscreen title="全屏预览" width="1080px">
          <div  style="width:1080px;margin:0 auto; color:#000;" class="showContent" v-html="previewHtml">
            <!-- 公司资质 -->
            <!-- <div class="col-md-5 productionInfor">
              <img class="featurette-image img-fluid mx-auto" src="../../static/img/product1.png" alt="Generic placeholder image">
            </div>
            <div class="col-md-7">
              <ul class="detailedItem">
                <li><span>产品名称：</span><span>预付费电表</span></li>
                <li><span>电压输入范围：</span><span>AC 90V~250V</span></li>
                <li><span>最大电流：</span><span>60A</span></li>
                <li><span>最小电流：</span><span>0.01A</span></li>
                <li><span>精度等级：</span><span>0.5</span></li>
                <li><span>电源频率：</span><span>50/60Hz</span></li>
                <li><span>记量方式：</span><span>精密电阻分压</span></li>
                <li><span>断电后继电器保持状态：</span><span>支持</span></li>
                <li><span>无线类型：</span><span>WIFI</span></li>
                <li><span>无线标准：</span><span>802.11b/g/n</span></li>
                <li><span>尺寸（长*宽*高）mm：</span><span>99*68*56</span></li>
                <li><span>安装方式：</span><span>导轨式安装</span></li>
              </ul>
            </div>
            <div class="itemList pr-3 pl-3">
              <h4>产品简介</h4>
              付费APP及智慧能源管理平台可以对预付费电表进行电表管理、电费充值、订单管理、用电数据分析，可对预付费用户的电表信息添加、删除、编辑功能，支持订单数据导出。
            </div>
            <div class="itemList pr-3 pl-3">
              <h4>产品功能</h4>
              电表管理、预付费、订单管理、用电数据、用户管理等，可应用于小区商铺预付费用户。
            </div> -->

            <!-- 公司理念 -->
            <!-- <div class="thumbnail">
                <img src="../../static/img/product1.png" alt="..." class="img-fluid" width="100%">
                <div class="caption mt-lg-3 mt-3">
                <h4>广州瓦良格机器人科技有限公司</h4>
                <p>这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是
                这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是</p>
                <p>这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是</p>
                <h6><strong>公司理念</strong></h6>
                <p>这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是
                这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是</p>
                <h6><strong>服务方向</strong></h6>
                <p>这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是
                这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是</p>
            </div> -->

            <!-- 公司历程 -->
            <!-- <div class="demo mt-3">
                <div class="col-md-12">
                    <div class="main-timeline">
                        <div class="timeline">
                            <a href="#" class="timeline-content">
                                <span class="year">2018</span>
                                <div class="inner-content">
                                    <p class="description">
                                        这是一段介绍这是一段介绍这绍这是一段介绍这是一段介这是一段介绍这是一段介绍这是一段介绍这是
                                    </p>
                                </div>
                            </a>
                        </div>

                        <div class="timeline">
                            <a href="#" class="timeline-content">
                                <span class="year">2017</span>
                                <div class="inner-content">
                                    <p class="description">
                                        这是一段介绍这是一段介绍这绍这是一段介绍这是一段介绍这是一段介绍这是一段介绍这是一段介绍这是一段介绍这是
                                    </p>
                                </div>
                            </a>
                        </div>

                        <div class="timeline">
                            <a href="#" class="timeline-content">
                                <span class="year">2016</span>
                                <div class="inner-content">
                                    <p class="description">
                                        这是一段介绍这是一段介绍这绍这是一段介绍这是一段介绍这是一段介绍这是一段介绍这是一段介绍这是一段介绍这是
                                    </p>
                                </div>
                            </a>
                        </div>

                        <div class="timeline">
                            <a href="#" class="timeline-content">
                                <span class="year">2015</span>
                                <div class="inner-content">
                                    <p class="description">
                                        这是一段介绍这是一段介绍这绍这是一段介绍这是一段介绍这是一段介绍这是一段介绍这是一段介绍这是一段介绍这是
                                    </p>
                                </div>
                            </a>
                        </div>

                        <div class="timeline">
                            <a href="#" class="timeline-content">
                                <span class="year">2014</span>
                                <div class="inner-content">
                                    <p class="description">
                                        这是一段介绍这是一段介绍这绍这是一段介绍这是一段介绍这是一段这是一段绍这是一段介绍这是一段介绍这是一段介绍这是
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- 合作伙伴 -->
            <!-- <Row :gutter="16" style="margin-bottom:30px;">
                <Col span="6">
                    <img src="../../static/img/product1.png" width="100%"/>
                </Col>
                <Col span="6">
                    <img src="../../static/img/product1.png"  width="100%"/>
                </Col>
                <Col span="6">
                    <img src="../../static/img/product1.png"  width="100%"/>
                </Col>
                <Col span="6">
                    <img src="../../static/img/product1.png"  width="100%"/>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="6">
                    <img src="../../static/img/product1.png"  width="100%"/>
                </Col>
                <Col span="6">
                    <img src="../../static/img/product1.png"  width="100%"/>
                </Col>
                <Col span="6">
                    <img src="../../static/img/product1.png"  width="100%"/>
                </Col>
                <Col span="6">
                    <img src="../../static/img/product1.png"  width="100%"/>
                </Col>
            </Row> -->
          </div>
    </Modal>
  </Layout>
</template>
<script>
import Layout from "./Layout";
import store from "../store/index.js"; //vuex
import editor from "./editor-other";
import "../../static/skins/lightgray/content.min.css";
import "../../static/skins/lightgray/skin.min.css";
import "../../static/skins/zh_CN.js";
import "../css/general.css";
import "../css/content_page.css";

export default {
  name: "bulletin-add",
  store,
  components: {
    Layout,
    editor
  },
  data() {
    return {

      showmodal: false, //全屏预览
      editModal: true,
      //添加
      // isAdd: false, //是否是新增
      addTitle: "", //文章标题
      addImage: "", //文章封面
      addIntroduce: "", //文章简介

      // 编辑器
      recordId: "", //记录id
      content1: "",
      editorSetting: "",
      actionurl: this.GLOBAL.HEADER + "pageContent",

      //导航选项id
      routerId: this.$router.currentRoute.params.id, //栏目id
      pagename1: "", //父标题
      pagename2: "", //子标题
      showList: "",
      file: "", //封面文件
      previewHtml: "", //预览html
      origiHtml: ""
    };
  },
  watch: {
    $route(to, from) {
      this.$store.state.editor_content = "";
      this.routerId = this.$router.currentRoute.params.id; //监听栏目id
      console.log("页面id: " + this.$router.currentRoute.params.id);
      this.initMsg(); // 初始化页面数据
    }
  },
  mounted() {
    this.initMsg(); // 初始化页面数据
  },
  methods: {
    initMsg() {
      // 初始化页面数据
      const THIS = this; //后台返回数据时要这样操作
      THIS.GLOBAL.$http(
        THIS.GLOBAL.HEADER + "/pageContent/title",
        "GET",
        function(res) {
          console.log(res);
          if (res.data.code === 1 && res.data.data != null) {
            let data = res.data.data.list[0];
            console.log(data);
            THIS.recordId = data.id; //记录id
            let pagename = data.frontResourcesName.split(",");
            THIS.pagename1 = pagename[0]; //父标题
            THIS.pagename2 = pagename[1]; //子标题
            THIS.previewHtml = data.content; //预览代码
            THIS.origiHtml = data.content; //原始代码
            THIS.addTitle = data.title;
            THIS.addIntroduce = data.introduction;
            THIS.$refs.editorParent.editors(THIS.previewHtml);
          } else if (res.data.code === 2) {
            this.$Modal.error({
              title: "提示信息",
              content: res.data.msg
            });
          }
        },
        {
          frontResourcesId: THIS.routerId,
          pageNum: 1,
          pageSize: 1,
          title: ""
        }
      );
    },
    change: function(event) {
      this.file = event.target.files[0];
    },
    showPreviewModel() {
      //点击预览
      if (this.$store.state.editor_content) {
        this.showmodal = true;
        this.previewHtml = this.$store.state.editor_content;
      } else {
        this.$Message.warning("请输入产品详情再预览！");
      }
    },
    submitEditor() {
      //提交内容
      const THIS = this;
      THIS.previewHtml = this.$store.state.editor_content; //编辑器的内容
      let flag = true;
      if (THIS.addTitle === "") {
        this.$Message.warning("产品名称不能为空！");
        flag = false;
        return;
      }

      if (THIS.addIntroduce === "") {
        this.$Message.warning("产品简介不能为空！");
        flag = false;
        return;
      }
      if (THIS.previewHtml === "") {
        this.$Message.warning("产品详情不能为空！");
        flag = false;
        return;
      }
      let paramsData = new FormData(THIS.$refs.form);
      paramsData.append("content", THIS.previewHtml); //编辑器内容
      paramsData.append("frontResourcesId", THIS.routerId); //栏目id
      paramsData.append("introduction", THIS.addIntroduce); //简介
      paramsData.append("title", THIS.addTitle); //标题
      paramsData.append("file", THIS.file); //封面文件
      paramsData.append("id", THIS.recordId); //编辑需要记录id
      console.log(paramsData);
      THIS.GLOBAL.axios
        .post(THIS.GLOBAL.HEADER + "pageContent/update", paramsData)
        .then(function(respData) {
          if (respData.data.code === 1) {
            THIS.instance("success", "提交成功！");
            THIS.editModal = true;
            THIS.addImage = THIS.previewHtml = THIS.addIntroduce = THIS.addTitle =
              "";
            THIS.initMsg(); //刷新页面
          } else {
            THIS.instance("error", respData.data.msg);
          }
        });
    },
    cancelEditor() {
      //点击取消
      // console.log("点击取消"+this.previewHtml)
      this.$store.state.editor_content = this.origiHtml; //
      this.$refs.editorParent.cancelEditorParent(this.origiHtml);
    },
    contentUe(value) {
      this.content1 = value; //富文本中的内容
    },
    submitbulletin() {
      //新增编辑保存
      var params = {
        content: Base64.encode(this.content1) //公告内容
      };
      if (this.recordId == "" || this.recordId == undefined) {
        var url = this.GLOBAL.API_ACCOUNT_ADD;
      } else {
        params.id = this.recordId;
        var url = this.GLOBAL.API_ACCOUNT_EDIT;
      }
      Vue.axios.post(url, params).then(res => {
        if (res.data.retCode == 200) {
          this.$Message.success("操作成功");
          this.$router.go(-1);
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    //提示框
    instance(type, contentData) {
      const title = "提示信息";
      const content = "<p>" + contentData + "</p>";
      switch (type) {
        case "success":
          this.$Modal.success({
            title: title,
            content: content
          });
          break;
        case "error":
          this.$Modal.warning({
            title: title,
            content: content
          });
          break;
      }
    },
    formatDate(date, fmt) {
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    }
  }
};
</script>