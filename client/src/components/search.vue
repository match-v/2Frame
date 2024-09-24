<template>
  <div :style="{ width: componentWidth }" class="search-component">
    <h2>{{ title }}</h2><br><br>
    <form @submit.prevent="handleSubmit">
      <div v-for="(field, index) in fields" :key="index" class="field-group" :style="{ width: field.width || defaultFieldWidth }">
        <label :for="field.name">{{ field.label }}:</label>
        <div v-if="field.type === 'select'">
          <select v-model="formData[field.name]" :id="field.name" style="width: 200px;">
            <option value="" disabled>请选择</option>
            <option v-for="option in field.options" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div v-else>
          <input type="text" v-model="formData[field.name]" :id="field.name" />
        </div>
      </div>
      <div class="button-group">
        <button type="submit">搜索</button>
        <button type="button" @click="resetForm">重置</button>
        <button type="button" @click="addData">新建</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, watchEffect, defineEmits } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  title: {
    type: String,
    required: true,
  },
  fields: {
    type: Array,
    required: true,
    validator(value) {
      return value.every(field => 
        typeof field.name === 'string' &&
        typeof field.label === 'string' &&
        (field.type === 'select'
          ? Array.isArray(field.options) && field.options.every(option => typeof option.value !== 'undefined' && typeof option.text === 'string')
          : field.type === 'text') &&
        (!field.width || typeof field.width === 'string')
      );
    }
  },
  defaultFieldWidth: {
    type: String,
    default: '200px',
  }
});

const emit = defineEmits(['submit','addData'])

const formData = ref({})

watchEffect(() => {
  formData.value = props.fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});
});

const componentWidth = computed(() => props.width);

function handleSubmit() {
  emit('submit', formData.value);
}

function resetForm() {
  formData.value = props.fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});
}

function addData(){
  emit('addData')
}
</script>

<style scoped>
.search-component {
  border: 1px solid #ccc;
  position: relative;
  right: 10px;
  border-radius: 5px;
}
h2 {
  float: left;
  font-size: 18px;
}
form {
  display: flex;
  flex-wrap: wrap;
}

.field-group {
  display: flex;
  align-items: center;
  vertical-align: top;
  margin-right: 15px;
  margin-bottom: 15px;
}

.field-group label {
  width: 100px;
  display: block;
  margin-bottom: 5px;
}

.field-group input,
.field-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.button-group {
  clear: both;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

button {
  margin-right: 10px;
}
</style>
