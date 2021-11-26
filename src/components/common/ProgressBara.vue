<template>

  <div :class="$style['container']">
    <div ref="content" :class="$style['content-bg']" :style="{ height: `${height}px`, borderRadius: `${height / 2}px`, backgroundColor: backgroundColor }" @click="click">
      <div :class="$style['content']" :style="{
          width: `${data}%`,
          height: `${height}px`,
          borderRadius: `${height / 2}px`,
          backgroundColor: color
        }"></div>
      <div ref="point" :class="$style['point']" :style="{
          width: `${height * 3}px`,
          height: `${height * 3}px`,
          marginTop: `-${height * 2}px`,
          marginLeft: `${data}%`,
          backgroundColor: color
        }" @mousedown="mousedown"></div>
    </div>
  </div>

</template>
<script>
import { reactive, computed, onMounted, ref } from "vue";

export default {
  //props:['max', 'min', 'step'],
  props: {
    data: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: false,
      default: 4,
    },
    color: {
      type: String,
      required: false,
      default: "#fff",
    },
    backgroundColor: {
      type: String,
      required: false,
      default: "#aaa",
    },
  },
  setup(props, context) {
    const state = reactive({
      num: 0,
    });
    const content = ref(null);
    const point = ref(null);

    const origin = computed(() => {
      return getElementLeft(content);
    });
    const width = computed(() => {
      return content.offsetWidth;
    });

    onMounted(() => {
      document.body.addEventListener("mouseup", mouseup);
    });

    return {
      state,
      content,
      origin,
      width,
      point,
    };
  },

  methods: {
    getElementLeft(element) {
      var actualTop = element.offsetLeft; // 这是获取元素距父元素顶部的距离
      var current = element.offsetParent; // 这是获取父元素
      while (current !== null) {
        // 当它上面有元素时就继续执行
        actualTop += current.offsetLeft; // 这是获取父元素距它的父元素顶部的距离累加起来
        current = current.offsetParent; // 继续找父元素
      }
      return actualTop;
    },
    click(e) {
      this.$emit("change", Math.ceil(((e.clientX - origin) / width) * 100));
    },
    mousedown(e) {
      document.body.addEventListener("mousemove", mousemove);
      point.style.visibility = "visible";
      this.draging = true;
    },
    mouseup(e) {
      if (!this.draging) {
        return;
      }
      this.draging = false;
      this.$refs.point.style.visibility = "hidden";
      document.body.removeEventListener("mousemove", mousemove);
    },
    mousemove(e) {
      if (
        this.draging &&
        e.clientX >= origin &&
        e.clientX <= origin + width
      ) {
        const diff = (e.clientX - origin) / width;
        this.$emit(
          "change",
          Math.ceil(diff * 100) >= 100 ? 100 : Math.ceil(diff * 100)
        );
      }
    },
  },
};
</script>


<style lang="less" scoped>
.container {
  width: 100%;
  cursor: pointer;
  .content-bg {
    width: 100%;
    // background-color: #aaa;
    &:hover {
      .point {
        visibility: visible !important;
      }
    }
    .content {
      // background-color: #fff;
    }
    .point {
      transform: translateX(-50%);
      visibility: hidden;
      border-radius: 50%;
      // background-color: #fff;
    }
  }
}
</style>
S