import Vue from 'vue'
import Router from 'vue-router'
// 全加载
// import Index from '../components/Index'
// 懒加载

const companyintrd = () => import('../components/company_introduction')
const banner = () => import('../components/index/Banner')
const modulemanage = () => import('../components/index/ModuleManage')
const sectionedit = () => import('../components/index/SectionEdit')
const productintroduction = () => import('../components/Product_introduction')
const login = () => import('../components/Login')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: banner
  },{
    path: '/modulemanage',
    component: modulemanage
  },{
    path: '/sectionedit',
    component: sectionedit
  },{
    path: '/companyintrd/:id',
    component: companyintrd
  },{
    path: '/productintroduction/:id',
    component: productintroduction
  },{
    path: '/login',
    component: login
  }]
})