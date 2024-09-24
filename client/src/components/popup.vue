<template>
  <div v-if="visible" class="overlay" @click.self="closePopup">
    <div class="popup">
      <header class="popup-header">
        <span>{{ title }}</span>
        <button class="close-btn" @click="closePopup">X</button>
      </header>
      <main class="popup-content">
        <div v-for="(field, index) in formData.fields" :key="index">
          <label :for="'field' + index">{{ field.label }}:</label>  
          <!-- 根据字段类型渲染不同的输入控件 -->
          <input v-if="field.type === 'text'" 
                 type="text" 
                 :id="'field' + index"
                 v-model="field.value" 
                 :placeholder="field.placeholder"/>
                 
          <select v-else-if="field.type === 'multi'" 
                  :id="'field' + index" 
                  v-model="field.value"
                  style="width: 150px;">
            <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
          </select>
          
          <div v-else-if="field.type === 'radio'">
            <label v-for="option in field.options" :key="option">
              <input type="radio" 
                     :name="'field' + index" 
                     :value="option" 
                     v-model="field.value"/> {{ option }}
              </label>
          </div>
        </div>
      </main>
      
      <footer class="popup-footer">
        <button @click="cancel">取消</button>
        <button @click="confirm">确认</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '新增'
  },
  formData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['closePopup', 'confirm']);

function closePopup() {
  emit('closePopup', false);
}

function cancel() {
  closePopup();
}

function confirm() {
  emit('confirm', JSON.parse(JSON.stringify(props.formData))); // 深拷贝避免直接修改
}
</script>


<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.popup {
  width: 400px;
  min-height: 100%;
  background-color: white;
  padding: 20px;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.popup-header {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
}

.close-btn {
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
}

.popup-content {
  margin-top: 20px;
}
.popup-content div{
  height: 50px;
  display: flex;
  align-items: flex-end;
}
label {
  padding-right: 10px;
}
.popup-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>
