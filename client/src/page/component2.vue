<template>
  <div>
    <my-carousel 
      :images="imageList" 
      :interval="3000"
      :customStyle="{ width: '250px', height: '250px' }"
      :showControls="true"
      :showIndicators="true"
      :onSlideChange="handleSlideChange"
    />
  </div>
  <div class="desc">
    <span>1.可传入图片列表</span><br>
    <span>2.设置自动轮播间隔/轮播图宽高/显示上一张下一张按钮/显示indictor</span><br>
    <span>3.点击事件拿到图片索引</span>
  </div>
</template>
<script setup>
import MyCarousel from '../components/carousel.vue'

const imageList = [
  require('@/assets/apps.png'),
  require('@/assets/clock.png'),
  require('@/assets/heart.png'),
  require('@/assets/search.png'),
  require('@/assets/settings.png')
]

const handleSlideChange = (currentIndex) => {
  console.log('当前索引:', currentIndex);
};
</script>
<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.desc {
  display: block;
}
</style>