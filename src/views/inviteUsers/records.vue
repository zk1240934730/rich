<template>
  <div id="records">
    <div class="head">
      <div class="title">可提现收入（元）</div>
      <div class="numBox">
        <div class="num">0.00</div>
        <div class="btn disable">提现</div>
      </div>
      <div class="sh">
        <span class="num fdc">0.00</span>元审核中（奖励需<span class="num fdc"
          >24</span
        >h审核后可提现）
      </div>
    </div>
    <div class="content">
      <div class="tabs">
        <div class="tab-item active">收入明细</div>
        <div class="tab-item">提现记录</div>
      </div>
      <list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        style="flex: 1; overflow-y: auto"
      >
        <div class="no-data" v-for="item in 10" :key="item">
          <img src="../../assets/images/noData.png" alt="" />
          <p>没有记录</p>
        </div>
      </list>
    </div>
  </div>
</template>

<script>
import { List, ImagePreview } from "vant";
export default {
  name: "records",
  components: {
    List,
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data() {
    return {
      loading: false,
      finished: true,
    };
  },
  methods: {
    onLoad() {},
  },
};
</script>

<style lang="scss" scoped>
#records {
  background-color: #f2f5fb;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .head {
    flex-shrink: 0;
    width: 100%;
    height: 8.59375rem;
    background-image: url(../../assets/images/invite/inBg.png);
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 0 -0.15625rem;
    color: #fff;
    padding: 1.2625rem 1.25rem 0;
    box-sizing: border-box;
    .title {
      font-size: 0.875rem;
    }
    .numBox {
      display: flex;
      justify-content: space-between;
      .num {
        font-family: FDCfont-Bold;
        font-size: 2.25rem;
        color: #fff;
      }
      .btn {
        height: 1.6875rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8125rem;
        font-weight: 700;
        text-align: center;
        background: #fff;
        color: #fa5050;
        width: 4.25rem;
        border-radius: 0.84375rem;
        margin-top: 0.46875rem;
        line-height: 1.6875rem;
        &.disable {
          background: #d0d3d9;
          color: #fff;
        }
      }
    }
    .sh {
      opacity: 0.8;
      font-size: 0.6875rem;
      color: #fff;
      line-height: 0.6875rem;
      margin-top: 0.5625rem;
    }
  }
  .content {
    width: 20.9375rem;
    flex-grow: 1;
    margin: 0 auto;
    box-shadow: 0 0.5625rem 0.9375rem 0 rgba(159, 163, 175, 0.08);
    border-radius: 0.5rem;
    margin-top: 0.3125rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: #fff;
    .tabs {
      height: 3.125rem;
      background: #fff;
      border: 0.03125rem solid rgba(216, 221, 225, 0.2);
      box-shadow: 0 0.125rem 0.625rem 0 rgba(255, 215, 215, 0.33);
      border-radius: 0.5rem 0.5rem 0 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      justify-content: space-between;
      color: #5a6981;
      padding: 0 3.4375rem;
      flex-shrink: 0;
      z-index: 1;
      .tab-item {
        line-height: 3.125rem;
        font-size: 0.875rem;
        height: 100%;
        &.active {
          font-weight: 700;
          color: #fa5050;
          position: relative;
          &:after {
            position: absolute;
            content: "";
            display: block;
            height: 0.25rem;
            width: 2.1875rem;
            bottom: 0;
            background: #fa5050;
            left: 50%;
            transform: translateX(-50%);
          }
        }
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
    }
  }
}
</style>