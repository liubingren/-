<template>
  <textarea :id='id' :value='value'></textarea>
</template>
 
<script>
// Import TinyMCE
import tinymce from "tinymce/tinymce";
import "tinymce/themes/modern/theme";
import "tinymce/plugins/advlist"; // 这几条引入是因为我的导入不了，不知道为啥
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/paste";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/fullscreen/plugin.js";
import store from "../store/index.js"; //vuex
const INIT = 0;
const CHANGED = 2;
// let EDITOR = null

export default {
  store, //注册vuex
  props: {
    value: {
      type: String,
      editor: null,
      required: true
    },
    setting: {},
    url: {
      // 接口
      default: "",
      type: String
    },
    accept: {
      // 文件类型
      default: "image/jpeg, image/png",
      type: String
    },
    maxSize: {
      // 大小
      default: 2097152,
      type: Number
    },
    withCredentials: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    value: function(val) {
      this.$store.commit("getEditorContent", val); /*改变存储的editor内容*/
      //   此方法能监听到当前编辑器里面已输入的内容
      if (this.status === INIT || tinymce.activeEditor.getContent() !== val) {
        // 如果现在是初始化状态或者编辑器内容跟上一次不相同时更新编辑器内容
        tinymce.activeEditor.setContent(val); //设置
      }
      this.status = CHANGED; //状态：已改变
    }
  },
  data() {
    return {
      status: INIT,
      id: "editor-" + new Date().getMilliseconds()
    };
  },
  methods: {
    cancelEditorChild(res) {
      const THIS = this;
      tinymce.activeEditor.setContent(THIS.$store.state.editor_content);
    }
  },
  mounted() {
    const _this = this;
    const setting = {
      selector: "#" + _this.id,
      upload_image_url: _this.GLOBAL.HEADER + "pageContent/images", // 配置的上传图片的路由
      language: "zh_CN",
      branding: false,
      init_instance_callback: function(editor) {
        // EDITOR = editor
        // console.log("Editor: " + editor.id + " is now initialized.");

        editor.on("input change undo redo", () => {
          let content = editor.getContent();
          _this.$emit("show", content);
        });
      },
      content_style: `
        *                         { padding:0; margin:0; }
        html, body                { height:100%; }
        img                       { max-width:100%; display:block;height:auto; }
        a                         { text-decoration: none; }
        iframe                    { width: 100%; }
        p                         { line-height:1.6; margin: 0px; }
        table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
        .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
        ul,ol                     { list-style-position:inside; }`,
      insert_button_items: "image link | inserttable",
      paste_retain_style_properties: "all",
      paste_word_valid_elements: "*[*]", // word需要它
      paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
      paste_convert_word_fake_lists: false, // 插入word文档需要该属性
      paste_webkit_styles: "all",
      paste_merge_formats: true,
      nonbreaking_force_tab: false,
      paste_auto_cleanup_on_paste: false,
      plugins: [
        "advlist link image",
        "code",
        "table textcolor paste textcolor colorpicker",
        "fullscreen"
      ], // 配置
      toolbar_items_size: "small",
      block_formats:
        "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;",
      toolbar1:
        "table |insertfile undo redo | formatselect | link unlink | uploadimg image media", // 工具栏1
      toolbar2:
        " fontsizeselect | forecolor backcolor | fontselect bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | removeformat | fullscreen", // 工具栏2
      image_advtab: true,
      table_default_styles: {
        width: "100%",
        borderCollapse: "collapse"
      },
      image_title: false, // 是否开启图片标题设置的选择，这里设置否
      automatic_uploads: true,
      // 图片异步上传处理函数
      images_upload_handler: (blobInfo, success, failure) => {
        var xhr, formData;
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open("POST", _this.GLOBAL.HEADER + "/pageContent/images"); //第一个参数是请求方式，第二个参数是请求地址

        xhr.onload = function() {
          var json;
          if (xhr.status !== 200) {
            failure("HTTP Error: " + xhr.status);
            return;
          }
          json = JSON.parse(xhr.responseText);
          if (
            !json ||
            json.code != 1 ||
            !json.data ||
            typeof json.data.location !== "string"
          ) {
            failure("Invalid JSON: " + xhr.responseText);
            return;
          }
          success(json.data.location); //编辑器图片展示
        };
        formData = new FormData();
        formData.append("file", blobInfo.blob(), blobInfo.filename());
        xhr.send(formData);
      },
      fontsize_formats: "12px 14px 16px 18px 20px 22px 24px"
    };
    Object.assign(setting, _this.setting);
    tinymce.init(setting);
  },
  beforeDestroy: function() {
    tinymce.get(this.id).destroy();
  }
};
</script>