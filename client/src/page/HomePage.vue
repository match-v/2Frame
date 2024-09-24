<template>
  <div class="container">
    <side-nav :items="navItems" :login-info="loginInfo"/>
    <div class="main-content-container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import router from '@/router';
import SideNav from '../components/layout.vue';
import { onMounted, ref } from 'vue'

const navItems = [
  {
    title: '内容管理',
    icon: require('@/assets/manage.png'),
    children: [
      { title: '课程信息', route: '/course' },
      { title: '试卷信息', route: '/paper'},
    ],
  },
  {
    title: '组件',
    icon: require('@/assets/comp.png'),
    children: [
      { title: '搜索', route: '/component1' },
      { title: '轮播图', route: '/component2' },
    ],
  },
];

const loginInfo = ref('登录')
//前端：初始页面进行身份验证：验证用户是否登录{user信息存在}，如果没有登录显示登录toast，有蒙层不可点击
//登录成功有用户信息，右上角显示，返回用户信息，存在localstorage
//后端：收到用户名及密码，进行验证
//用token作为后续请求的身份验证

onMounted(()=>{
  const user = localStorage.getItem('user')
  if(user){
    router.push('./course')
    loginInfo.value = user
  }else{
    router.push('./login')
  }
})

</script>

<style>
.container {
  display: flex;
}
.main-content-container {
  width: 100%;
  flex-grow: 1;
  padding-top: 65px;
  padding-left: 16px;
}
</style>