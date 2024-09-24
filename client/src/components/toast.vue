<template>
  <transition name="fade">
    <div v-if="visible" class="toast" :class="typeClass">{{ message }}</div>
  </transition>
</template>

<script setup>
import { ref, computed, defineExpose } from 'vue';


const visible = ref(false);
const message = ref('');
const type = ref('success'); // 默认类型为 success

const typeClass = computed(() => {
  return `toast-${type.value}`;
});

function show(toastMessage, toastType = 'success') {
  message.value = toastMessage;
  type.value = toastType;
  visible.value = true;

  setTimeout(() => {
    visible.value = false;
  }, 3000); // 显示3秒后自动消失
}

// 将 show 方法挂载到实例上，以便外部可以调用
defineExpose({ show });
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px; /* 改变位置到页面顶部 */
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 5px;
  z-index: 1000;
}

.toast-success {
  background-color: rgb(162, 240, 162);
}

.toast-error {
  background-color: rgb(241, 136, 136);
}

/* 添加淡入淡出效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>



