<template>
  <div :class="['sidenav', { collapsed }]">

    <div class="header">
      <div class="navLeft" @click="toggleCollapse">
        <img src="../assets/menu.png" alt="">
        <span>后台系统</span>
      </div>
      <div class="right">
        <img src="../assets/login.png" alt="">
        <span>用户：{{ loginInfo }}</span>
      </div>
    </div>

    <ul class="nav-list">
      <li v-for="(item, index) in props.items" :key="index" :class="['firstList', { active: activeIndex === index && !item.children }]" @click="handleClick(index)">
        <div class="nav-item" @click.stop="toggleItem(index)">
          <img :src="item.icon" alt="">
          <span v-if="!collapsed">{{ item.title }}</span>
          <div v-if="item.children && !collapsed" :class="[expandedIndex === index ? 'icon-up' : 'icon-down']"></div>
        </div>
        <ul v-if="item.children && expandedIndex === index" class="sub-nav-list">
          <li v-for="(child, childIndex) in item.children" :key="childIndex" :class="{ active: activeSubIndex === `${index}-${childIndex}` }" @click="navigateTo(child.route, `${index}-${childIndex}`)">
            <div>{{ child.title }}</div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  loginInfo: String,
});
const router = useRouter();

const collapsed = ref(false);//控制列表展开
const expandedIndex = ref(0);//控制当前二级展开

const activeIndex = ref(null); // 当前一级菜单激活索引
const activeSubIndex = ref('0-0'); // 当前二级菜单激活索引

const toggleCollapse = () => {
  expandedIndex.value = null
  collapsed.value = !collapsed.value;
};

const toggleItem = (index) => {
  if (expandedIndex.value === index) {
    expandedIndex.value = null;
  } else {
    expandedIndex.value = index;
  }
};

const handleClick = (index) => {
  if (!props.items[index].children) {
    activeIndex.value = index;
    navigateTo(props.items[index].route, index);
  }
};

const navigateTo = (route, subIndex) => {
  activeSubIndex.value = subIndex;
  router.push(route);
};
</script>

<style scoped>
.header{
  width: 100vw;
  height: 60px;
  background-color: #1c243a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.navLeft span,
.right span{
  line-height: 25px;
  padding-left: 20px;
  font-weight: 500;
}

.navLeft{
  padding-left: 25px;
}
.right{
  padding-right: 25px;
}
img{
  width: 25px;
  height: 25px;
  vertical-align: middle;
}

.sidenav {
  width: 200px;
  height: 100vh;
  transition: width 0.3s;
  background-color: #1c243a;
  color: #ccc;
}
.sidenav.collapsed {
  width: 70px;
}
.toggle-button {
  cursor: pointer;
}

.nav-list {
  list-style-type: none;
  padding: 25px;

}
.nav-list div {
  height: 30px;
  padding: 5px 0;
}
.nav-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.nav-item img{
  height: 20px;
  width: 20px;
}
.nav-item span{
  padding: 0 20px;
}
.sub-nav-list li {
  height: 30px;
  list-style-type: none;
  padding-left: 0px;
  cursor: pointer;
}

.icon-up {
  height: 15px;
  width: 15px;
  background-image: url('../assets/up.png');
  background-size: cover; 
  background-position: center;
}
.icon-down {
  height: 15px;
  width: 15px;
  background-image: url('../assets/down.png');
  background-size: cover; 
  background-position: center;
}

.firstList.active > .nav-item {

}

.nav-item:hover {
  color: rgb(235, 235, 241);
}

.sub-nav-list li.active {
  color: rgb(255, 51, 0);
}
</style>
