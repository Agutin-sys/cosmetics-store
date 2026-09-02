<template>

<div class="w-25 border " style="max-width: 223px; min-width: 220px;">

<div class=" text-wrap  ">
  <div class="image-container image-wrapper" style="height: 240px;">
    <img 
      :src="imgUrl" 
      class="image-zoom">
</div>
            <div class=" pb-4 p-3 mt-3">
                <div class=""><span>{{ brand }}</span></div>
                <div class=""><b><span>{{ title }}</span></b></div>
                <div class=""><span class="text-body-tertiary">{{ description }}</span>
            </div>
            <div class="d-flex mt-2 justify-content-between">
                <div class=""><b>{{ price }}$</b></div>
                <div class="">{{ category }}</div>
            </div>
               </div>
            </div>
        </div>
</template>

<script setup>

defineProps({

    brand: String,
    title: String,
    description: String,
    price: String,
    category: String,
    imgUrl: String,

})


</script>