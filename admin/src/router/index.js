import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 引入登录组件
import Login from '@/components/Login'
// 引入主页面组件
import List from '@/components/List'
// 引入标签组件
import Tag from '@/components/Tag'
// 引入阅读组件
import ReadingList from '@/components/ReadingList'
// 引入关于我的组件
import About from '@/components/About'

export default new Router({
  routes: [
    // {
    //   path:'/',
    //   redirect:'/list'
    // },
    {
      path:'/login',
      component:Login
    },
    {
      path:"/list",
      component:List
    },
    {
      path:'/tags',
      component:Tag
    },
    {
      path:"/readinglists",
      component:ReadingList
    },
    {
      path:"/about",
      component:About
    },
    {
      path:'*',
      redirect:'/login'
    }
  ]
})
