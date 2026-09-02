<template>

        <div class="">

<div class="mt-3 d-flex justify-content-between  "  >
    <div class="d-flex align-items-center">
        <input @click="Filter('Estée Lauder') ;sendTags()" class="form-check-input me-1" type="checkbox"  value="" id="firstCheckbox">
        <label class="form-check-label" for="firstCheckbox">Estée Lauder</label>
    </div>
    <div class="textColVo">{{ obj.Estée_Lauder  }}</div>
</div>

<div class="mt-3 d-flex justify-content-between  "  >
    <div class="d-flex align-items-center">
        <input @click="Filter('Chanel')" class="form-check-input me-1" type="checkbox"  value="" id="firstCheckboxTwo">
        <label class="form-check-label" for="firstCheckboxTwo">Chanel</label>
    </div>
    <div class="textColVo">{{ obj.Chanel  }}</div>
</div>

<div class="mt-3 d-flex justify-content-between  "  >
    <div class="d-flex align-items-center">
        <input @click="Filter('Dior')"  class="form-check-input me-1" type="checkbox"  value="" id="firstCheckboxFour">
        <label class="form-check-label" for="firstCheckboxFour">Dior</label>
    </div>
    <div class="textColVo">{{ obj.Dior  }}</div>
</div>

<div class="mt-3 d-flex justify-content-between  "  >
    <div class="d-flex align-items-center">
        <input @click="Filter('Tom Ford')" class="form-check-input me-1" type="checkbox"  value="" id="firstCheckboxTree">
        <label class="form-check-label" for="firstCheckboxTree">Tom Ford</label>
    </div>
    <div class="textColVo">{{ obj.Tom_Ford }}</div>
</div>

<div class="mt-3 d-flex justify-content-between  "  >
    <div class="d-flex align-items-center">
        <input @click="Filter('La Mer')" class="form-check-input me-1" type="checkbox"  value="" id="firstCheckboxFive">
        <label class="form-check-label" for="firstCheckboxFive">
La Mer</label>
    </div>
    <div class="textColVo">{{ obj.La_Mer }}</div>
</div>
        </div>

</template>

<script setup>

import { inject, ref, computed, watch, defineProps } from 'vue'
import App from './App.vue'

const items = inject('items')

const props = defineProps({
  AllTitle: {
    type: Array,
    required: true
  }
})

const obj = computed(() => ({

    Dior : props.AllTitle.filter(item => item.brand === 'Dior').length,
    Chanel: props.AllTitle.filter(item => item.brand === 'Chanel').length,
    La_Mer:   props.AllTitle.filter(item => item.brand === 'La Mer').length,
    Estée_Lauder:  props.AllTitle.filter(item => item.brand === 'Estée Lauder').length,
    Tom_Ford:  props.AllTitle.filter(item => item.brand === 'Tom Ford').length,

}))



function Filter(Brand){
    if(!filters.value.includes(Brand)){
        filters.value.push(Brand)
    }else{
        filters.value.indexOf(Brand)
        filters.value.splice(filters.value.indexOf(Brand),1)
    }
}

const filters = ref([])

const emit = defineEmits(['update-filters'])



watch(
  () => filters.value,
  
  (filters) => {
    emit('update-filters', filters)
  },
  { deep: true } 
)
</script>