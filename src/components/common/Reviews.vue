<template>
  <div class="review">
    <div class="write">
      <textarea name="" id="review" rows="6" style="padding:5px" autofocus="autofocus"></textarea><br>
      <button class="btn" @click="textClick">发表评论</button>
    </div>
    <div>
      <div class="comment" :key="key">
        <ul>
          <li v-for="(item, index) in data.comments" :key="index">
            <div class="imgs">
              <img v-lazy="item.user.avatarUrl" alt="">
            </div>
            <div class="mess">
              <span class="name">{{item.user.nickname}}</span>：
              <span class="content">{{item.content}}</span>
              <p class="time">{{format(item.time)}}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="demo-pagination-block">
        <el-pagination v-model:currentPage="currentPage3" :page-size="10" layout="prev, pager, next, jumper" :total="data.total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>

</template>


<script>
import { ref, reactive, watch } from "vue";
import { getReviews } from "network/musiclistdetail.js";
import { useRoute, useRouter } from "vue-router";
import { format } from "assets/js/common.js";

export default {
  name: "Reviews",
  props: {
    comments: Object,
  },
  setup(props, context) {
    //  console.log(props);
    const data = reactive({
      comments: [],
      total: 0,
    });
    let key = ref(0);
    watch(
      () => props.comments,
      (newValue) => {
        data.comments = newValue.comments;
        data.total = newValue.total;
        key.value++;
        // console.log(data.comments);
      }
    );

    const handleSizeChange = (val) => {
      // console.log(val);
      context.emit("getPageReivew", val);
    };
    const handleCurrentChange = (val) => {
      context.emit("getPageReivew", val);
    };

    //获取评论信息
    const getReviewsData = (config) => {
      getReviews(config).then((res) => {
        data.comment = res.data.comments;
        data.total = res.data.total;
        context.emit("totalNum", data.total);
        // console.log(data.comment);
      });
    };

    // getReviewsData(config);
    //发表评论
    const textClick = () => {
      let dom = document.getElementById("review");
      let text = dom.value;
      console.log(text);
      dom.value = "";
      
    };

    return {
      currentPage3: ref(1),
      handleSizeChange,
      handleCurrentChange,
      data,
      format,
      key,
      textClick,
    };
  },
};
</script>

<style lang="less" scoped>
.review {
  .write {
    margin-bottom: 20px;
    padding: 10px;
    textarea {
      width: 100%;
    }
    .btn {
      background-color: white;
      margin-top: 10px;
      width: 100px;
      height: 30px;
    }
  }
  .comment {
    ul li {
      height: 90px;
      padding: 10px 20px;
      border-bottom: 1px solid rgb(211, 211, 211);
      display: flex;
      .imgs {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .mess {
        float: left;
        padding-top: 5px;
        padding-left: 20px;
        text-align: left;
        width: 93%;
        height: 70px;
        overflow: hidden;
        .name {
          color: blue;
        }
        .content {
          // display: inline-block;
          text-align: left;
          font-size: 15px;

          // width: 70%;
          // height: 50px;
          // overflow: hidden;
        }
        .time {
          margin-top: 10px;
          text-align: left;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
