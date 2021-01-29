<template>
  <div id="records">
    <div class="head">
      <div class="title">可提现收入（元）</div>
      <div class="numBox">
        <div class="num">{{utils.numberFormat(walletInfo.cashProfit, 2)}}</div>
        <div class="btn disable">提现</div>
      </div>
      <div class="sh">
        <span class="num fdc">{{utils.numberFormat(walletInfo.checkProfit, 2)}}</span>元审核中（奖励需<span class="num fdc"
          >24</span
        >h审核后可提现）
      </div>
    </div>
    <div class="content">
      <div class="tabs">
        <div class="tab-item">收入明细</div>
        <div class="tab-item">提现记录</div>
      </div>
      <div class="f1" style="position: relative;">
        <scroller :on-infinite="infinite" ref="myscroller" :noDataText="listData.length ? '没有更多数据' : ''">
          <div class="income-item" v-for="item in listData" :key="item.id">
            <div class="flex-row flex-row-between">
              <span class="income-item-title">出师奖</span>
              <span class="income-item-right">+20.00</span>
            </div>
            <div class="income-item-bottom">
              <span>2020-12-28 14:53:59</span>
              <span>一级：JspaavnhZ</span>
            </div>
          </div>
          <div class="loading-empty flex-col flex-col-center">
            <no-data v-if="!initLoading && !listData.length" :btm-show="true" btn-text="信贷服务推广" @emitClick="emitClick"></no-data>
          </div>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
import NoData from '../../components/empty-data'
import utils from "../../utils/index.js";
export default {
  name: "records",
  components: {
    NoData,
  },
  data() {
    return {
      walletInfo: {},
      utils,
      ajaxUrl: "/api/profit"
    };
  },
  methods: {
    // 获取用户钱包及收入
    getWallet() {
      this.$get("/api/wallet").then((res) => {
        this.walletInfo = res.data;
      });
    },
  },
  beforeMount() {
    this.getWallet()
  }
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
    .income-item {
      border-bottom: 1px solid rgba(218,224,234,.5);
      padding: 1.25rem;
      &-title {
        font-weight: 700;
        font-size: .875rem;
        color: #101010;
        line-height: .875rem;
      }
      &-right {
        color: #fa5050;
        height: 100%;
        display: flex;
        align-items: center;
        align-content: center;
        margin-top: .0625rem;
        font-weight: 700;
      }
      &-bottom {
        font-size: .75rem;
        color: #5a6981;
        line-height: .75rem;
        margin-top: .225rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span:last-child {
          margin-left: .9375rem;
        }
      }
    }
  }
}
</style>