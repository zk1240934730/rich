<template>
  <div id="index">
    <!-- 头部用户信息 -->
    <div class="head flex-row">
      <div class="user-img">
        <van-image
          round
          width="3.125rem"
          height="3.125rem"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="user-info">
        <p class="name">用户微信昵称</p>
        <p class="phone">用户第三方平台昵称或手机号</p>
      </div>
    </div>
    <!-- tab操作 -->
    <div class="tabs flex-row">
      <router-link
        :to="item.link"
        v-for="(item, index) in tabList"
        :key="index"
      >
        <div class="tabs-item flex-col">
          <van-image
            round
            width="1.4375rem"
            height="1.4375rem"
            :src="item.src"
          />
          <span>{{ item.name }}</span>
        </div></router-link
      >
    </div>
    <!-- 邀请信息与团队 -->
    <div class="invate-team">
      <router-link to="/inviteUsers">
        <div class="invate-team-card">
          <p class="title">邀请用户(人)</p>
          <p class="message">0</p>
        </div>
      </router-link>
      <router-link to="/team">
        <div class="invate-team-card">
          <p class="title">合伙人团队(人)</p>
          <p class="message">0</p>
        </div>
      </router-link>
    </div>
    <!-- 累计信息 -->
    <div class="profit">
      <div class="top">
        <p class="top-title">累计收入(元)</p>
        <p class="top-center flex-row">
          <span class="top-total-money">0.00</span>
          <span>详情</span>
        </p>
        <p class="top-income flex-row">
          <span>可提现<span class="num">0.00</span>元</span>
          <span>今日收入<span class="num">0.00</span>元</span>
        </p>
      </div>
      <div class="bottom">
        <div class="bottom-title flex-row">
          <div class="flex-row">
            <span>本月团队等级</span>
            <div class="bage-level"><span>等级一</span></div>
          </div>
          <span class="detail">详情</span>
        </div>
        <div class="month">1月总业绩(元)<span>0.00</span></div>
        <div class="rest">还差<span>10,000.00</span>元可提升至下一等级</div>
      </div>
    </div>

    <!-- 图片轮播广告 -->
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in 3" :key="item"
          ><img src="../../assets/images/index/index-banner.png" alt=""
        /></van-swipe-item>
      </van-swipe>
    </div>
    <!-- 规则 -->
    <div class="rules">
      <div class="title">奖励规则<span class="right-detail">详情</span></div>
      <img src="../../assets/images/index/rule_top.png" alt="" />
      <img src="../../assets/images/index/rule_btm.png" alt="" />
    </div>
    <!-- 底部固定推广按钮 -->
    <div class="fixed-btns flex-row">
      <div class="f1">信贷服务推广</div>
      <div class="f1">合伙人招募</div>
    </div>
    <share-mask></share-mask>
  </div>
</template>

<script>
import ShareMask from "../../components/share-mask.vue";
export default {
  name: "index",
  components: { ShareMask },
  data() {
    return {
      tabList: [
        {
          src: require("../../assets/images/index/material.png"),
          name: "发圈素材",
          link: "/spread",
        },
        {
          src: require("../../assets/images/index/coupon.png"),
          name: "助力券",
          link: "",
        },
        {
          src: require("../../assets/images/index/settings.png"),
          name: "设置",
          link: "/setting",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
#index {
  background: url(../../assets/images/index/index-top-bg.png) no-repeat top/100%
    12.0625rem;
  background-color: #f3f6fb;
  padding: 0.4375rem 1.25rem 6.5rem;
  color: #222;
  //   height: 100%;
  //   overflow-y: auto;
  padding-bottom: 4rem;
  .head {
    padding-top: 1.25rem;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    // align-items: center;
    text-align: left;
    color: #fff;
    .user-info {
      margin-left: 1rem;
      font-weight: 700;
      color: #fff;
      flex: 1;
      .name {
        font-size: 1rem;
        margin-top: 0.15625rem;
        line-height: 1.5rem;
      }
      .phone {
        font-size: 0.875rem;
        line-height: 0.875rem;
        margin-top: 0.3125rem;
      }
    }
  }
  .tabs {
    font-size: 0.75rem;
    color: #fff;
    margin-top: 1.5625rem;
    padding: 0 1.25rem;
    justify-content: space-between;
    &-item {
      justify-content: center;
      align-items: center;
      span {
        margin-top: 0.25rem;
        color: #fff;
      }
    }
  }
  .invate-team {
    color: #222;
    display: flex;
    justify-content: space-between;
    margin-top: 1.375rem;
    &-card {
      background: #fff;
      border: 0 solid rgba(216, 221, 225, 0.34);
      box-shadow: 0 0.0625rem 0.3125rem 0 rgba(234, 240, 255, 0.7);
      border-radius: 0.5rem;
      width: 10.28125rem;
      height: 4.75rem;
      padding: 1.25rem 1.25rem 0;
      position: relative;
      color: #222;
      &:after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-top: 0.25rem solid rgba(0, 0, 0, 0);
        border-bottom: 0.25rem solid rgba(0, 0, 0, 0);
        border-left: 0.3125rem solid #222;
        right: 1.25rem;
        top: 1.375rem;
      }
      .title {
        font-size: 0.8125rem;
        color: #222;
        line-height: 0.75rem;
        vertical-align: baseline;
      }
      .message {
        font-family: FDCfont-Bold;
        font-size: 1.375rem;
        line-height: 1.375rem;
        margin-top: 0.25rem;
      }
    }
  }
  .profit {
    margin-top: 0.75rem;
    border-radius: 0.5rem;
    overflow: hidden;
    .top {
      position: relative;
      height: 7.1875rem;
      background-image: url(../../assets/images/index/p-bg.png);
      background-repeat: no-repeat;
      background-size: 21.5625rem 7.8125rem;
      background-position: center -0.15625rem;
      color: #fff;
      padding: 1.25rem;
      box-shadow: 0 0.15625rem 0.3125rem 0 rgba(255, 179, 179, 0.6),
        inset 0 0.03125rem 0 0 #ffa3a3;
      z-index: 1;
      &-title {
        font-weight: 700;
        margin-top: 0.3125rem;
        font-size: 0.8125rem;
        line-height: 0.8125rem;
      }
      &-center {
        height: 2.4375rem;
        margin-top: 0.28125rem;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        .top-total-money {
          font-family: FDCfont-Bold;
          font-weight: 700;
          font-size: 1.875rem;
        }
        > span:last-child::after {
          content: "";
          display: inline-block;
          width: 0;
          height: 0;
          border-top: 0.25rem solid rgba(0, 0, 0, 0);
          border-bottom: 0.25rem solid rgba(0, 0, 0, 0);
          border-left: 0.3125rem solid #ffeaea;
          margin-left: 0.375rem;
          transform: translateY(-0.03125rem);
        }
      }
      .top-income {
        font-size: 0.75rem;
        line-height: 1rem;
        justify-content: space-between;
        margin-top: 0.46875rem;
        .num {
          font-family: FDCfont-Bold;
          font-size: 0.8125rem;
          margin-left: 0.375rem;
        }
      }
    }
    .bottom {
      height: 6.65625rem;
      background: #fff;
      padding: 1.40625rem 1.25rem 0;
      position: relative;
      &-title {
        align-items: center;
        justify-content: space-between;
        > div > span {
          opacity: 0.8;
          font-size: 0.875rem;
          color: #222;
          line-height: 0.875rem;
          font-weight: 700;
        }
        .bage-level {
          margin-left: 0.5rem;
          padding-left: 0.625rem;
          height: 1.0625rem;
          border-radius: 0.53125rem;
          position: relative;
          line-height: 1;
          > span {
            width: 3.5rem;
            padding-left: 1rem;
            height: 1rem;
            background-color: #ffe5cf;
            border-radius: 0 3.125rem 3.125rem 0;
            font-size: 0.6875rem;
            color: #7e4315;
            line-height: 1rem;
            &:after {
              content: "";
              position: absolute;
              width: 1.3125rem;
              height: 1.0625rem;
              background-repeat: no-repeat;
              background-size: 100%;
              top: 0;
              left: 0;
              background-image: url(data:image/png;base64,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);
            }
          }
        }
      }
      .detail {
        font-size: 0.75rem;
        color: #5a6981;
        &::after {
          content: "";
          display: inline-block;
          width: 0;
          height: 0;
          border-top: 0.25rem solid rgba(0, 0, 0, 0);
          border-bottom: 0.25rem solid rgba(0, 0, 0, 0);
          border-left: 0.3125rem solid #5a6981;
          margin-left: 0.375rem;
          transform: translateY(-0.03125rem);
        }
      }
      .month {
        margin-top: 0.71875rem;
        font-size: 0.8125rem;
        line-height: 0.8125rem;
        > span {
          font-family: FDCfont-Bold;
          font-size: 0.875rem;
          color: #fa5050;
          line-height: 1rem;
          margin-left: 0.4375rem;
          display: inline-block;
        }
      }
      .rest {
        margin-top: 0.4375rem;
        font-size: 0.75rem;
        color: #5a6981;
        line-height: 0.75rem;
      }
    }
  }
  .swiper {
    margin-top: 1rem;
    width: 100%;
    img {
      width: 100%;
      height: 4.6875rem;
      border-radius: 0.3125rem;
    }
  }
  .rules {
    margin-top: 1.75rem;
    .title {
      display: flex;
      justify-content: space-between;
      .right-detail {
        font-size: 0.75rem;
        color: #5a6981;
        &::after {
          content: "";
          display: inline-block;
          width: 0;
          height: 0;
          border-top: 0.25rem solid rgba(0, 0, 0, 0);
          border-bottom: 0.25rem solid rgba(0, 0, 0, 0);
          border-left: 0.3125rem solid #5a6981;
          margin-left: 0.375rem;
          transform: translateY(-0.03125rem);
        }
      }
    }
    img {
      width: 100%;
      height: auto;
      margin-top: 1.25rem;
    }
  }
  .fixed-btns {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 3.75rem;
    z-index: 10;
    > div {
      width: 50%;
      text-align: center;
      height: 4rem;
      line-height: 4rem;
      font-size: 1rem;
      color: #fff;
      font-weight: 700;
    }
    > div:first-child {
      background: #3961d5;
    }
    > div:last-child {
      background: #fa5050;
    }
  }

  @media only screen and (-webkit-device-pixel-ratio: 3) and (device-height: 812px) and (device-width: 375px) {
    .fixed-btns {
      height: calc(3.75rem + env(safe-area-inset-bottom));
      background-color: rgba(0, 0, 0, 0.4);
    }
    #index {
      padding-bottom: calc(3.75rem + env(safe-area-inset-bottom));
    }
  }
}
</style>