<template>
  <div class="price-range-container">
    <div class="price-range">
      <div 
        class="slider-track" 
        :style="{
          '--min-percent': minPercent,
          '--max-percent': maxPercent
        }"
      ></div>
      
      <!-- Минимальный слайдер -->
      <input 
        type="range" 
        class="slider slider-min" 
        :value="localMin"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        @input="handleMinInput"
      >
      
      <!-- Максимальный слайдер -->
      <input 
        type="range" 
        class="slider slider-max" 
        :value="localMax"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        @input="handleMaxInput"
      >
      
      <!-- Текущие значения -->
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  // Диапазон слайдера
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 300
  },
  // Начальные значения
  minValue: {
    type: Number,
    default: 100
  },
  maxValue: {
    type: Number,
    default: 200
  },
  // Шаг изменения
  step: {
    type: Number,
    default: 5
  },
  // Настройки отображения
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  }
})

const emit = defineEmits([
  'update:minValue',
  'update:maxValue',
  'change'
])

// Функция округления до ближайшего шага
const roundToStep = (value) => {
  return Math.round(value / props.step) * props.step
}

// Локальные значения
const localMin = ref(roundToStep(props.minValue))
const localMax = ref(roundToStep(props.maxValue))

// Вычисляем проценты для CSS
const minPercent = computed(() => {
  const range = props.max - props.min
  return range > 0 ? ((localMin.value - props.min) / range) * 100 : 0
})

const maxPercent = computed(() => {
  const range = props.max - props.min
  return range > 0 ? ((localMax.value - props.min) / range) * 100 : 0
})

// Форматирование значения для отображения
const formatValue = (value) => {
  return `${props.prefix}${value}${props.suffix}`
}

// Обработка изменения минимального значения
const handleMinInput = (event) => {
  let value = parseInt(event.target.value)
  value = roundToStep(value)
  
  // Не позволяем min быть больше max
  if (value > localMax.value) {
    value = localMax.value
  }
  
  localMin.value = value
  emitUpdate()
}

// Обработка изменения максимального значения
const handleMaxInput = (event) => {
  let value = parseInt(event.target.value)
  value = roundToStep(value)
  
  // Не позволяем max быть меньше min
  if (value < localMin.value) {
    value = localMin.value
  }
  
  localMax.value = value
  emitUpdate()
}

// Эмит обновлений
const emitUpdate = () => {
  emit('update:minValue', localMin.value)
  emit('update:maxValue', localMax.value)
  emit('change', {
    min: localMin.value,
    max: localMax.value
  })
}

// Реактивность на изменение пропсов извне
watch(() => props.minValue, (newValue) => {
  const rounded = roundToStep(newValue)
  localMin.value = rounded
})

watch(() => props.maxValue, (newValue) => {
  const rounded = roundToStep(newValue)
  localMax.value = rounded
})
</script>

<style scoped>


.price-range-container {
  width: 100%;
  padding: 20px;
}

.price-range {
  position: relative;
  margin: 10px 0;
}
/* линия слайдера */
.slider-track {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 19px;
  background: linear-gradient(90deg, 
    #e0e0e0 0%, 
    #e0e0e0 calc((var(--min-percent) * 1%)),
    #000000 calc((var(--min-percent) * 1%)),
    #000000 calc((var(--max-percent) * 1%)),
    #e0e0e0 calc((var(--max-percent) * 1%)),
    #e0e0e0 100%);
  border-radius: 25px;
  z-index: 1;
}

.slider {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 0;
  appearance: none;
  background: transparent;
  pointer-events: none;
  z-index: 2;
}
/* кружки  */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: all;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 2px solid #3a86ff;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: all;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider-min {
  z-index: 3;
}

.price-values {
  position: absolute;
  top: -35px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: 'Arial', sans-serif;
  pointer-events: none;
  
}

.price-min, .price-max {
  background: #3a86ff;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
}
</style>