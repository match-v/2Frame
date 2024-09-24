<template>
  <div class="overlay">
    <div class="modal">
      <h2>登录</h2>
      <form @submit.prevent="validateLogin">
        <div class="form-group">
          <label for="user_id">账号:</label>
          <input type="text" v-model="user_id" id="user_id" required>
        </div>
        <div class="form-group">
          <label for="password">密码:</label>
          <input type="password" v-model="password" id="password" required>
        </div>
        <button :class="{ disabled: !isFormValid }" :disabled="!isFormValid" type="submit">确认</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed} from 'vue';
const axios = require('axios');
import router from '@/router';

const user_id = ref('');
const password = ref('');

const isFormValid = computed(() => {
  return user_id.value.trim() !== '' && password.value.trim() !== '';
});

const validateLogin = async () => {
  try {
    const res = await axios.post('/api/login',{'user_id':user_id.value,'password':password.value})
    console.log('结果成功',res)
    localStorage.setItem('token',res.data.token)
    localStorage.setItem('user',res.data.user.username)
    alert('登录成功!')
    router.push('./course')
  } catch (error) {
    alert('登录失败：', error.message,'请检查用户名或密码错误～');
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 10px 0px #000;
  border-radius: 8px;
  width: 300px;
}
h2 {
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(192, 187, 187);
}
.form-group {
  margin-top: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

label {
  flex: 1;
  margin-right: 10px;
}

input[type=text], input[type=password] {
  flex: 2;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.disabled {
  background-color: #e2f7d8;
  cursor: not-allowed;
}

button:not(.disabled):hover {
  background-color: #45a049;
}
</style>
