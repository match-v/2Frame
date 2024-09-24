<template>
  <div>
    <search-component
      :title="'搜索组件'"
      :fields="formFields"
      @submit="handleFormSubmit"
    />
    <div class="desc">
      <span>1.可传入组件title</span><br>
      <span>2.可传入表单类型【text】、【select】；标签展示文字及字段；搜索项宽度</span><br>
      <span>3.提交及重置</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchComponent from '../components/search.vue'; // 修改为实际路径

const formFields = ref([
  { name: 'course_id', label: '课程ID', type: 'text', width: '300px' },
  { name: 'course_id', label: '课程ID', type: 'text', width: '300px' },
  { name: 'course_id', label: '课程ID', type: 'text', width: '300px' },
  { name: 'course_id', label: '课程ID', type: 'text', width: '300px' },
  { name: 'course_id', label: '课程ID', type: 'text', width: '300px' },
  {
    name: 'course_system_name',
    label: '课程体系',
    type: 'select',
    options: [
      { value: '1', text: '同步' },
      { value: '2', text: '提升' },
    ],
    width: '300px'
  },
]);

function handleFormSubmit(formData) {
  console.log('Received form data:', formData);
  // 在这里处理表单提交的数据，例如发送到服务器或进行其他操作
}
</script>

<style scoped>
/* 添加样式，如果需要 */
</style>



