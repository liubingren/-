
<template>
  <div class="app-container calendar-list-container">
        <div style="width:100%">
          <editor 
            style="border-radius:10px" 
            class="editor"
            :value="content"
            :setting="editorSetting"
            @show="editors"
            :url              = "Url"
            :max-size         = "MaxSize"
            :accept           = "Accept"
            :with-credentials = "withCredentials"
            @on-upload-fail         = "onEditorReady"
            @on-upload-success= "onEditorUploadComplete"
            ref="editorChild">
            </editor>
        </div>
  </div>
</template>
<script type="text/ecmascript-6">
import editor from "./editor"; // 根据editor.vue组件位置引入
export default {
  data() {
    return {
      editorSetting: {
        // 配置富文本编辑器高
        height: 300
      },
      Url: "", // 图片对应的上传地址
      MaxSize: 75765, // 文件大小
      Accept: "image/jpeg, image/png", // 文件格式
      withCredentials: true,
      content: "" // 富文本编辑器双向绑定的内容
    };
  },
  components: {
    // 引入组件
    editor
  },
  methods: {
    cancelEditorParent(res) {
      const THIS = this;
      THIS.$refs.editorChild.cancelEditorChild(res);
    },
    editors(content) {
      // editor组件传过来的值赋给content
      console.log(content);
      this.content = content;
    },
    onEditorReady(err) {
      // 上传失败的函数
      console.log("上传失败的函数");
      console.log(err);
    },
    onEditorUploadComplete(res) {
      // 处理上传图片后返回数据，添加img标签到编辑框内
      console.log(res);
      this.content = this.content + "<img src=" + res[0].data.location + ">";
      // this.$store.commit("getEditorContent", this.content);
    }
  }
};
</script>
<style scoped >
</style>