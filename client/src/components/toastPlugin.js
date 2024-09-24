import { createApp } from 'vue';
import ToastComponent from './toast.vue';

const ToastConstructor = createApp(ToastComponent);

let instance;

function initInstance() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  instance = ToastConstructor.mount(container);
}

function showToast({ message, type = 'success' }) {
  if (!instance) {
    initInstance();
  }
  instance.show(message, type);
}

export default {
  install(app) {
    app.config.globalProperties.$showToast = showToast;
  }
};

export { showToast };
