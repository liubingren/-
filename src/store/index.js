import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    author: 'LBR',
    editor_content: '',
    refreshNavigate:false
  },
  mutations: {
    newAuthor(state, msg) {
      state.author = msg
    },
    getEditorContent(state, val) {
      //获取编辑器里面的数据
      state.editor_content = val
      console.log("获取编辑器里面的数据:"+ state.editor_content)
    },
    handleRefreshNavigate(state, val){
      state.refreshNavigate = val
    }
  }
})

export default store