<template>

  <div class="demo-pagination-block page">
    <el-pagination v-model:currentPage="currentPage3" 
    :page-size="100" layout="prev, pager, next, jumper" :total="1000" @size-change="handleSizeChange" @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>

</template>

<script setup>
import { ref, reactive, defineProps, defineEmits } from "vue";

const currentPage3 = ref(1);
const emit = defineEmits(['playlistpageClick'])

const handleSizeChange = (val) => {
  console.log(`${val} items per page`);
};

const handleCurrentChange = (val) => {
 // console.log(`current page: ${val}`);
  emit('playlistpageClick', val)
};
</script>
<style lang="less" scoped >
.page {
  margin: 20px 0;
}
</style>