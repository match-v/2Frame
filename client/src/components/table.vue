<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th v-for="(key, index) in columnKeys" :key="index" :style="{ width: columnWidths[key] || 'auto' }">
            {{ keyMap[key] || key }}
          </th>
          <th v-if="showActions && data.length !== 0">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="data.length === 0">
          <td :colspan="columnKeys.length + (showActions ? 1 : 0)" class="no-data-message">暂无数据</td>
        </tr>
        <tr v-else v-for="(row, rowIndex) in data" :key="rowIndex">
          <td v-for="key in columnKeys" :key="key">{{ row[key] }}</td>
          <td v-if="showActions">
            <button @click="onView(row)">查看</button>
            <button @click="onEdit(row)">编辑</button>
            <button @click="onDelete(row)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {computed,defineProps, defineEmits } from 'vue';

const props = defineProps({
  container: Object,
  data: Array,
  options: {
    type: Object,
    default: () => ({
      showActions: true,//展示操作列
      columnWidths: {},//列宽配置
      keyMap: {}//健值映射
    })
  }
});
const emit = defineEmits(['view', 'edit', 'delete'])


const showActions = computed(() => props.options.showActions !== undefined ? props.options.showActions : true);
const columnWidths = computed(() => props.options.columnWidths || {});
const keyMap = computed(() => props.options.keyMap || {});

const onView = (row) => {
  emit('view',row)
}
const onEdit = (row) => {
  emit('edit',row)
}
const onDelete = (row) => {
  emit('delete',row)
}

const columnKeys = computed(() => {
  if (props.data.length > 0) {
    return Object.keys(props.data[0]);
  }
  return [];
});
</script>

<style scoped>
/* 添加一些简单的样式 */
table {
  width: 100%;
  position: relative;
  right: 10px;
  margin-top: 20px;
  border: solid 1px rgb(49, 66, 72);
  /* 一定要加这个属性才能实现自定义布局，否则会按内容自动设置列宽 */
  table-layout: fixed;
  width: 100%;
  overflow: auto;
  text-align: left;
}

th, td {
  overflow-x: auto;
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}
.no-data-message {
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #999;
}
</style>
