<template>
  <div>
    <search-component
      :title="'课程信息'"
      :fields="formFields"
      @submit="handleFormSubmit"
      @addData="handleAdd"
    />
    <div>
      <table-component 
      :data="tableData"
      :options="tableOptions"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
    />
    </div>
    <popup-component :visible="isPopupVisible" :title="title" @confirm="handleConfirm" @closePopup="handleColse"  :formData="formData"/>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import SearchComponent from '../components/search.vue'; // 修改为实际路径
import TableComponent from '../components/table.vue';
import PopupComponent from '../components/popup.vue'
import { useRouter} from 'vue-router'
import {getRequestListView} from '../utils'
import { showToast } from '../components/toastPlugin';

const router = useRouter()
const axios = require('axios');

const formFields = ref([
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
const title = ref('')
const isPopupVisible = ref(false);

const handleFormSubmit = async(data) => {
  try {
    const params = {
      'course_id': data ? data.course_id : '',
      'course_system_name': data ? data.course_system_name : '',
    }
    const res = await getRequestListView('list/view',params)
    console.log(res)
    res.forEach((item,index,arr)=>{
      arr[index].course_system_name = item.course_system_name === 1 ? '同步': '提升'
    })
    tableData.value = res
  } catch (error) {
    console.log(error);
  }
}
function handleAdd(){
  formData.value.fields.forEach(field => {
    field.value = '';
  });
  formData.value.id = ''
  title.value = '新建'
  isPopupVisible.value = true;
}

const tableData = ref([
  // {course_id: "course_2898fe7739d32de2372d4e41cf017ba3",course_name: "高一高二配置同样课程",course_system_name: "同步",course_type_name: "非课改",grade_name: "高中",subject_name: "数学",semester_name: "下学期"},
  // {course_id: "course_dfc096f47d9578b9c1ddfe0fce739968",course_name: "ywb新课改",course_system_name: "提升",course_type_name: "课改",grade_name: "初中",subject_name: "英语",semester_name: "上学期",},
  // {course_id: "course_de17911f7eba487e16481ba11bcdc173",course_name: "ywb同步历史",course_system_name: "同步",course_type_name: "课改", grade_name: "小学",subject_name: "语文", semester_name: "上学期"},
]);
const tableOptions = ref({
  showActions: true,
  columnWidths: { course_id: '100px', course_system_name: '80px',course_type_name: '80px',subject_name:'50px',grade_name:'50px' },
  keyMap: { course_id: 'ID', course_name: '课程名称', course_system_name: '课程体系' ,course_type_name:'课程类型',grade_name:'年级',subject_name:'学科',semester_name:'学期'}
});

const formData = ref({
  course_id: '',
  fields: [
    { label: '课程名称', value: '', placeholder: '请输入课程名称', type: 'text' },
    { label: '课程体系', value: '', options: ['同步', '提升'], type: 'radio' },
    { label: '课程类型', value: '', options: ['课改', '非课改'], type: 'radio' },
    { label: '年级', value: '', options: ['初中', '高中', '小学','高中'], type: 'multi' },
    { label: '学科', value: '', options: ['语文', '数学', '英语','政治','历史','地理'], type: 'multi' },
    { label: '学期', value: '', options: ['上学期', '下学期','一模','二模'], type: 'multi' }
  ]
});

const handleView = (row) => {
  console.log('查看:', row.course_id);
  router.push({path:'/detail',query:{course_id:row.course_id}})
  //这里和编辑一样的效果，暂时不写
};

const handleEdit = (row) => {
  formData.value.course_id = row.course_id
  formData.value.fields.forEach(field => {
      switch (field.label) {
        case '课程名称':
          field.value = row.course_name;
          break;
        case '课程体系':
          field.value = row.course_system_name;
          break;
        case '课程类型':
          field.value = row.course_type_name;
          break;
        case '年级':
          field.value = row.grade_name;
          break;
        case '学科':
          field.value = row.subject_name;
          break;
        case '学期':
          field.value = row.semester_name;
          break;
      }
    })
  title.value = '编辑'
  isPopupVisible.value = true;
};

const transformData = (data) => {
  const result = {};
  // 遍历fields数组，根据label和value填充result对象
  data.fields.forEach(field => {
    switch (field.label) {
      case '课程名称':
        result.course_name = field.value;
        break;
      case '课程体系':
        result.course_system_name = field.value === '同步' ? 1 : 2;
        break;
      case '课程类型':
        result.course_type_name = field.value;
        break;
      case '年级':
        result.grade_name = field.value;
        break;
      case '学科':
        result.subject_name = field.value;
        break;
      case '学期':
        result.semester_name = field.value;
        break;
      default:
        break;
    }
  });
  return result;
}

const handleDelete = async(row) => {
  console.log('删除:', row.course_id);
  //删除数据接口
  try {
    const res = await axios.post('/api/list/delete',{'course_id':row.course_id})
    showToast({ message: '删除成功', type: 'success' });
    console.log(res)
  } catch (error) {
    showToast({ message: '删除失败', type: 'error' });
    console.log(error);
  }
};

const handleConfirm = async(value) => {
  const result = transformData(value)
  if(title.value === '新建'){
    result.course_id = `course_${Date.now()}`
    //新建提交接口
    try {
      const res = await axios.post('/api/list/add',result)
      console.log('添加成功',res)
      showToast({ message: '添加成功', type: 'success' });
    } catch (error) {
      showToast({ message: '添加失败', type: 'error' });
    }
  }else{
    result.course_id = formData.value.course_id
    //编辑提交接口
    try {
      const res = await axios.post('/api/list/edit',result)
      console.log(res)
      showToast({ message: '编辑成功', type: 'success' });
    } catch (error) {
      showToast({ message: '编辑失败', type: 'error' });
      console.log( error);
    }
  }
  console.log('用户输入:', result); 
  handleColse()
  handleFormSubmit()
}
const handleColse = () => {
  isPopupVisible.value = false
}

onMounted(()=>{
  handleFormSubmit()
})
</script>

<style scoped>
/* 父组件样式 */
</style>

