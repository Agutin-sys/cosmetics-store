<template>


<div class="d-flex p-2">

    <div class="col-3  border-end p-2 ">

        <div class="d-flex justify-content-between ">
            <div class="fs-5">Filters</div>
            <div class=""><button @click=" () => { isPressed = false; isPressedo = false; isPressede = false; isPressedw = false; ResetFilters()}" class="buttonCast">Reset all filters</button></div>
        </div>
        <div class="p-1"><hr></div>

        <!-- <div class="d-flex justify-content-between">
<input v-model="minPrice" class="w-25 border buttonCastTwo  " placeholder="edit me" />
<input v-model="maxPrice" class="w-25 border buttonCastTwo  " placeholder="edit me" />
        </div> -->
        <div class="">Price Range</div>
                <div class="">
           <PriceRange
        :min="0"
        :max="300"
        :min-value="minPrice"
        :max-value="maxPrice"
        prefix="$"
        :step="5"
        @update:min-value="minPrice = $event"
        @update:max-value="maxPrice = $event"
        @change="handlePriceChange"
      />
        </div>
        

        <div class="d-flex justify-content-between">
            <div class="">{{ minPrice }}$</div>
            <div class="">{{ maxPrice }}$</div>
        </div>

        <div class="TextB mt-2">Quick Select:</div>



        <div class="d-flex flex-wrap  mt-1 p-2">
            <div class="col-6"><button 
 @click="() => { isPressed = !isPressed; isPressedo = false; isPressedw = false; isPressede = false; setUnder(0,50) }"
    :class="{ 'bg-secondary text-white': isPressed, 'bg-light': !isPressed }"
    class=" buttonCastTwo"
 >Under $50</button></div>
            <div class="col-6"><button
@click="() => { isPressedo = !isPressedo; isPressed = false; isPressedw = false; isPressede = false; setUnder(50,100) }"
    :class="{ 'bg-secondary text-white': isPressedo, 'bg-light': !isPressedo }"
class=" buttonCastTwo"
                >$50-$100</button></div>
            <div class="col-6 mt-2"><button     
@click="() => { isPressedw = !isPressedw; isPressed = false; isPressedo = false; isPressede = false; setUnder(100,150) }"
    :class="{ 'bg-secondary text-white': isPressedw, 'bg-light': !isPressedw }"
class=" buttonCastTwo"
                >$100-$150</button></div>
            <div class="col-6 mt-2"><button 
@click="() => { isPressede = !isPressede; isPressed = false; isPressedo = false; isPressedw = false; setUnder(150,300) }"
    :class="{ 'bg-secondary text-white': isPressede, 'bg-light': !isPressede }"
class=" buttonCastTwo"
                >$150+</button></div>
        </div>

          <div class="p-1"><hr></div>

        <div class="">
            Luxury Brands 
        </div>

        <div class="">
              <FiltersBlog :AllTitle="AllTitle" @update-filters="updateFilters" />
        </div>

    </div>
    <div class="col-9 d-flex container flex-wrap  ">

        <div class="mt-1 mb-3">
            <div class="fs-3"><b>Luxury Beauty Products</b></div>
            <div class="text-body-tertiary">Showing 15 products</div>
        </div>

        <div class="d-flex flex-wrap container flex-wrap gap-3 " v-auto-animate>
            <Card
        v-for="item in filteredItems"
        :key="item.id"
        :brand="item.brand"
        :title="item.title"
        :description="item.description"
        :price="item.price"
        :category="item.category"
        :imgUrl="item.imgUrl"
            />

        <div class="d-flex justify-content-center container" v-if="filteredItems.length <= 0 ">
            <div class="text-center">
                <div class=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></div>
                <div class="">Ничего не найдено</div>
                <div class="mt-1">Попробуйте ослабить или сбросить фильтр</div>
                <div class="mt-5"><button @click=" () => { isPressed = false; isPressedo = false; isPressede = false; isPressedw = false; ResetFilters()}" class="buttonCast">Reset Filters</button></div>
           </div>
           
        </div>
</div>
    </div>
</div>




</template>

<script setup>
import { onMounted, provide, ref, computed, watch } from 'vue';
import Card from './Card.vue';
import FiltersBlog from './FiltersBlog.vue';
import axios from 'axios';
import PriceRange from './PriceRange.vue';


const minPrice = ref(0)
const maxPrice = ref(300)

const items = ref([])  // скаченная с бека информация
const AllTitle = ref([]) //  передаем в фильтр

const filters = ref([])

const receivedTags = ref([])

const updateFilters = (newFilters) => {
  filters.value = newFilters
}




const ResetFilters = () => {
    minPrice.value = 0;
    maxPrice.value = 300;
    filters.value = [];
    const checkbox = document.getElementById('firstCheckboxFive')
    const firstCheckboxTree = document.getElementById('firstCheckboxTree')
    const firstCheckboxFour = document.getElementById('firstCheckboxFour')
    const firstCheckboxTwo = document.getElementById('firstCheckboxTwo')
    const firstCheckbox = document.getElementById('firstCheckbox')
    checkbox.checked = false,
    firstCheckboxTree.checked = false,
    firstCheckboxFour.checked = false,
    firstCheckboxTwo.checked = false,
    firstCheckbox.checked = false
}

const setUnder = (minPrices,maxPrices) => {
    if(minPrice.value == minPrices && maxPrice.value == maxPrices){
        minPrice.value = 0
        maxPrice.value = 300
    }else{
        minPrice.value = minPrices
        maxPrice.value = maxPrices
    }
}

const TestfetchItems = async () => {
try{

  const params = {
    sortBy: '',
  }
    params.brand = filters.value;
    
  const { data } = await axios.get(
    `https://2c0c2b705f18f99a.mokky.dev/cosmetics`,{
      params
    })
    
   items.value = data.map((obj) => ({
    ...obj,
   }))


}catch(e){
    console.log(e);
    }
}

const fetchItems = async () => {
    try{
        const { data } = await axios.get('https://2c0c2b705f18f99a.mokky.dev/cosmetics')
        items.value = data
        AllTitle.value = data
    }catch(error){
        console.log(error);
    }
    
}

provide('items', items)

onMounted( async () => {
    await fetchItems();
    await TestfetchItems();
})

watch(
    () => filters.value,
    (filters) => {TestfetchItems()},
    { deep: true }
)


const filteredItems = computed(() => {
  return items.value.filter(item => {
    const price = parseFloat(item.price) || 0
    return price >= minPrice.value && price <= maxPrice.value 
  })
})

</script>

<style>


    bg{
        background-color: #A5A5A5
    }

.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
}

.image-zoom {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.image-zoom:hover {
  transform: scale(1.03);
}

.buttonCast{
    border:  1px  rgb(185, 185, 185) solid ;
    background-color: white;
    border-radius: 10px;
    padding: 3px;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 600;
}

.buttonCastTwo{
    border:  1px  rgb(185, 185, 185) solid ;
    background-color: white;
    border-radius: 10px;
    padding: 3px;
    font-weight: 600;
    width: 90%;
}
.TextB{
    font-weight: 600;
}

.textColVo{
    background-color: rgb(223, 223, 223);
    border-radius: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-right: 10px;
    padding-left: 10px;
}

</style>