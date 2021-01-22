<template>
  <div id="invite-users">
    <div data-v-4bdd4575="" class="tabs">
      <div data-v-4bdd4575="" class="tab-item active">全部</div>
      <div data-v-4bdd4575="" class="tab-item">待申请</div>
      <div data-v-4bdd4575="" class="tab-item">待借款</div>
      <div data-v-4bdd4575="" class="tab-item">已借款</div>
      <div data-v-4bdd4575="" class="tab-item">无效用户</div>
    </div>
    <div class="content flex-col">
      <div class="tips">
        <div class="tips-title flex-row">
          <span>温馨提示</span>
          <router-link to="/orderList"><span>查看订单</span></router-link>
        </div>
        <div class="remind">
          未获得有钱花额度的用户，可申请其他产品，您可查看订单查看对应奖励。
        </div>
        <div class="error-tip">
          由于用户不符合奖励规则，您无法获得邀请奖励。
        </div>
      </div>
      <pull-refresh v-model="refreshing" @refresh="onRefresh" style="flex: 1; overflow-y: auto">
        <list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
          <div v-for="item in listData" :key="item" style="height: 100px;background: grey;border-bottom: 1px solid skyblue">{{item}}</div>
          <div class="loading"></div>
          <div class="no-data" v-if="!listData.length">
            <img src="../../assets/images/noData.png" alt="" />
            <p>没有用户记录</p>
            <p>立即推广，得现金奖励</p>
            <van-button type="danger" round>信贷服务推广</van-button>
          </div>
        </list>
      </pull-refresh>
    </div>
  </div>
</template>

<script>
import { List, ImagePreview, PullRefresh } from "vant";
export default {
  name: "inviteUsers",
  components: {
    List,
    PullRefresh,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      listData: [],
      param: {
        page: 1,
        pageSize: 10
      },
      ajaxUrl: '/api/class_homework/v2StudentList'
    };
  },
  methods: {
    onLoad() {
      console.log("load")
    },
    onRefresh() {}
  },
  async mounted() {
    await this.getData()
    console.log(this.listData)
  }
};
</script>

<style lang="scss" scoped>
#invite-users {
  background: url(../../assets/images/invite/bg.png) no-repeat;
  background-color: #f3f6fb;
  background-size: 100%;
  padding: 0 1.25rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .tabs {
    height: 3.75rem;
    display: flex;
    justify-content: space-between;
    color: #5a6981;
    flex-shrink: 0;
    padding: 0 0.625rem;
    .tab-item {
      padding-top: 2.0625rem;
      font-size: 0.8125rem;
      height: 100%;
      text-align: center;
      &.active {
        font-weight: 700;
        color: #222;
        position: relative;
        font-size: 1rem;
        &::after {
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
    margin: 1.25rem 0 0;
    flex: 1;
    border: 0 solid rgba(216, 221, 225, 0.34);
    box-shadow: 0 0.03125rem 0.15625rem 0 rgba(234, 240, 255, 0.7);
    border-radius: 0.5rem 0.5rem 0 0;
    overflow: hidden;
    position: relative;
    background-color: #fff;
    .tips {
      font-size: 0.75rem;
      color: #222;
      line-height: 1.1875rem;
      background: #fff7f7;
      margin: 1.25rem 1.25rem 0;
      padding: 0.9375rem;
      color: #101010;
      font-size: 0.75rem;
      line-height: 1.09375rem;
      position: relative;
      &-title {
        justify-content: space-between;
        span:first-child {
          font-weight: 700;
        }
        span:last-child {
          color: #fa5050;
          font-size: 0.75rem;
          &::after {
            content: "";
            display: inline-block;
            width: 0;
            height: 0;
            border-top: 0.25rem solid rgba(0, 0, 0, 0);
            border-bottom: 0.25rem solid rgba(0, 0, 0, 0);
            border-left: 0.3125rem solid #fa5050;
            margin-left: 0.375rem;
            transform: translateY(-0.03125rem);
          }
        }
      }
    }
    .remind {
      margin-top: 0.3125rem;
    }
    .error-tip {
      font-size: 0.75rem;
      color: #fa5050;
    }
  }
  .no-data {
    display: flex;
    flex-direction: column;
    width: 100%;
    img {
      margin: 3.75rem auto 0.1875rem;
      width: 5.5rem;
      height: 5.5rem;
    }
    p {
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 0.8125rem;
      color: #868e9e;
      line-height: 1.25rem;
    }
    button {
      margin: 1.875rem auto 0;
      width: 18.4375rem;
      font-size: 1rem;
      color: #fff;
      font-weight: 700;
      background: #fa5050;
      border-color: #fa5050;
    }
  }
}
</style>