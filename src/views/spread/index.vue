<template>
  <div id="spread" class="flex-col">
    <div class="tabs">
      <div class="tab-item active">全部</div>
      <div class="tab-item">推广</div>
      <div class="tab-item">招募</div>
      <div class="tab-item">其他</div>
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
  </div>
</template>

<script>
import { List } from "vant";
export default {
  name: "spread",
  components: {
    List,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  },
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
        margin-top: .9375rem;
        width: 6.5625rem;
    height: 2.125rem;
    border: 1px solid #fa5050;
    border-radius: 1.0625rem;
    font-size: .8125rem;
    color: #fa5050;
    text-align: center;
    line-height: 2.125rem;
    font-weight: 700;

      }
    }
  }
}
</style>