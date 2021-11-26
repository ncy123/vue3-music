<template>
  <div class="title w">
    <div class="menu-title">{{names}}：</div>
    <ul>
      <li v-for="(item, index) in titles" :key="index" @click="btnClick(index)" :class="{chice: index == curIndex}">{{item}}</li>
    </ul>
  </div>

</template>


<script setup>
import { ref, reactive, defineProps, defineEmits } from "vue";

const curIndex = ref(0);

const props = defineProps({
  titles: Array,
  names: String
});

//console.log(props)

const emit = defineEmits(["titleClick"])

const btnClick = (index) => {
    curIndex.value = index;
    emit('titleClick', index)
};
</script>


<style lang="less" scoped>
.title {
  height: 60px;
  line-height: 60px;
  .menu-title{ 
    float: left;
    padding-left:40px;
    font-weight: 700;
  }
  ul {
    li {    
    float: left;
    padding:0 15px;
    font-size: 16px;
    :first-child {
      font-weight: 700;
    }
  }
  }
  .chice {
    color: red;
  }
}
</style>