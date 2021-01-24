<template>
  <div id="spread" class="flex-col">
    <div class="tabs">
      <div class="tab-item" :class="activeId ? '' : 'active'" @click="changeTab(null)">全部</div>
      <div class="tab-item" :class="activeId  == item.id ? 'active' : ''" v-for="item in cateList" :key="item.id" @click="changeTab(item.id)">{{item.name}}</div>
    </div>
    <div class="content f1">
      <list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="list-item">
          <div class="time">
            <span class="date">今天</span>
            <span class="time-text">1小时前</span>
          </div>
          <div class="center-content">
            <p>💞今天的喜报来啦！</p>
            <p>🚀7分钟，大额授信20万，坐等佣金5000元</p>
            <p>💸仅用12分钟，佣金到账2500元，就是这么快。</p>
            <p>🔥授信快，佣金高，马上推起来</p>
          </div>
          <div class="img-list">
            <img
              src="../../assets/logo.png"
              alt=""
              v-for="item in 7"
              :key="item"
            />
          </div>
          <div class="clipboard-btn">复制文案</div>
        </div>
      </list>
    </div>
    <van-image-preview v-model="show" :images="images" @change="onChange">
      <!-- <template v-slot:index>第{{ index }}页</template> -->
    </van-image-preview>
    <div class="content-wrapper" v-if="show">
      <div data-v-c9a09132="" class="content">
        <p>又一波放款佣金图来啦😜</p>
        <p>🌹6分钟佣金到账😉</p>
        <p>放款40000元🚀🚀</p>
        <p>💪直推收益1000元</p>
        <p>❤️赶快推起来，越推越有钱~</p>
      </div>
      <div data-v-c9a09132="" class="clipboard-btn">复制文案</div>
    </div>
  </div>
</template>

<script>
import { List, ImagePreview } from "vant";

export default {
  name: "spread",
  components: {
    List,
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data() {
    return {
      list: [],
      cateList: [], //分类列表
      activeId: null, //选中的tab
      loading: false,
      finished: false,
      show: true, //图片预览
      index: 0, //图片预览当前下标
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
      ],
    };
  },
  methods: {
    onChange(index) {
      this.index = index;
    },
    //获取分类列表
    getPostCateList() {
      this.$get("/api/postCateList").then(res => {
        this.cateList = res.data
      })
    },
    //tab切换
    getPostList() {
      this.$get("/api/postList", {
        cate_id: this.activeId,
        page: this.page
      }).then(res => {
        this.list = res.data
      })
    },
    changeTab(id) {
      if(id == this.activeId) return
      this.activeId = id
      this.getPostList()
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
  },
  beforeMount() {
    this.getPostCateList()
    this.getPostList()
  }
};
</script>

<style scoped lang="scss">
#spread {
  height: 100vh;
  display: flex;
  background: #fff;
  flex-direction: column;
  .tabs {
    height: 3.75rem;
    display: flex;
    justify-content: space-between;
    color: #5a6981;
    flex-shrink: 0;
    padding: 0 3.75rem;
    border-bottom: 1px solid rgba(218, 224, 234, 0.5);
    .tab-item {
      padding-top: 2rem;
      font-size: 1rem;
      height: 100%;
      text-align: center;
      &.active {
        font-weight: 700;
        color: #222;
        position: relative;
        font-size: 1rem;
        &:after {
          position: absolute;
          content: "";
          display: block;
          height: 0.1875rem;
          width: 0.9375rem;
          bottom: 0;
          background: #fa5050;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
  .content {
    overflow-y: auto;
    padding-top: 1.875rem;
    .list-item {
      display: flex;
      flex-direction: column;
      padding: 0 1.25rem;
      .time {
        font-size: 0.8125rem;
        color: #002d33;
        line-height: 1.15625rem;
        .date {
          font-size: 1.125rem;
          color: #fa5050;
          font-weight: 700;
        }
        .time-text {
          padding-left: 0.375rem;
          color: #5a6882;
        }
      }
      .center-content {
        margin-top: 0.8125rem;
        margin-bottom: 0.625rem;
        font-size: 0.9375rem;
        color: #222;
        line-height: 1.3125rem;
      }
      .img-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        img {
          width: 32%;
          margin-right: 0.6%;
          object-fit: cover;
          // width: 6.8125rem;
          height: 4.53125rem;
          background: red;
          margin-bottom: 0.135rem;
        }
      }
      .clipboard-btn {
        margin-top: 0.9375rem;
        width: 6.5625rem;
        height: 2.125rem;
        border: 1px solid #fa5050;
        border-radius: 1.0625rem;
        font-size: 0.8125rem;
        color: #fa5050;
        text-align: center;
        line-height: 2.125rem;
        font-weight: 700;
      }
    }
  }
}
.content-wrapper {
  width: 100%;
  padding: 1.25rem 0.9375rem 1.25rem;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  z-index: 2005;
  background: rgba(46, 46, 46, 0.8);
  .content {
    font-size: 0.875rem;
    line-height: 1.5625rem;
    color: #fff;
    margin-bottom: 1.25rem;
    text-align: left;
    width: 100%;
    
  }
  .clipboard-btn {
      height: 3.125rem;
      background: #fa5050;
      border-radius: 6.25rem;
      font-size: 1rem;
      color: #fff;
      text-align: center;
      line-height: 3.125rem;
      font-weight: 700;
    }
}
</style>