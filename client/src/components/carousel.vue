<template>
  <div class="carousel" :style="customStyle">
    <!-- <div class="carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }"> -->
    <div class="carousel-inner" :style="carouselStyle">
      <div 
        class="carousel-item"
        v-for="(image,index) in images"
        :key="index"
      >
        <img :src="image" alt="" />
      </div>
    </div>
    <button 
      v-if="showControls" 
      class="carousel-control prev" 
      @click="prevSlide"
    >《</button>
    <button 
      v-if="showControls" 
      class="carousel-control next" 
      @click="nextSlide"
    >》</button>
    <div v-if="showIndicators" class="carousel-indicators">
      <span 
        v-for="(image, index) in images" 
        :key="index" 
        :class="{ active: currentIndex === index }" 
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, defineProps, computed } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  interval: {
    type: Number,
    default: 3000 
  },
  customStyle: {
    type: Object,
    default: () => ({})
  },
  showControls: {
    type: Boolean,
    default: false
  },
  showIndicators: {
    type: Boolean,
    default: false
  },
  onSlideChange: {
    type: Function,
    default: null
  }
});

const currentIndex = ref(0);
const transitionEnabled = ref(true)
let timer = null;

const startAutoSlide = () => {
  stopAutoSlide(); 
  timer = setInterval(() => {
    nextSlide();
  }, props.interval);
};

const stopAutoSlide = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};


const nextSlide = () => {
  if (currentIndex.value === props.images.length - 1) {
    transitionEnabled.value = false; // 禁用过渡
    currentIndex.value = 0; // 切换到第一张
    setTimeout(() => {
      transitionEnabled.value = true; // 恢复过渡
    }, 50); // 短暂延迟以确保 DOM 更新
  } else {
    currentIndex.value++;
  }
};

const prevSlide = () => {
    if (currentIndex.value === 0) {
    transitionEnabled.value = false; // 禁用过渡
    currentIndex.value = props.images.length - 1; // 切换到最后一张
    setTimeout(() => {
      transitionEnabled.value = true; // 恢复过渡
    }, 50); // 短暂延迟以确保 DOM 更新
  } else {
    currentIndex.value--;
  }
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

const carouselStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
  transition: transitionEnabled.value ? 'transform 0.5s ease-in-out' : 'none'
}));

watch(currentIndex, (newValue) => {
  if (props.onSlideChange) {
    props.onSlideChange(newValue);
  }
});

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  background-color: rgb(71, 55, 77);
}

.carousel-inner {
  display: flex;
  /* transition: transform 0.5s ease-in-out; */
}

.carousel-item {
  min-width: 100%;
  box-sizing: border-box;
}

.carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 2;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.carousel-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
}

.carousel-indicators span {
  display: block;
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
}

.carousel-indicators .active {
  background-color: rgb(240, 232, 232);
}
</style>
