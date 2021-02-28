<template>
  <div id="index">
    <!-- 头部用户信息 -->
    <div class="head flex-row">
      <div class="user-img">
        <van-image
          round
          width="3.125rem"
          height="3.125rem"
          :src="userInfo.avatar && userInfo.avatar.indexOf('http') == -1 ? baseImgUrl + userInfo.avatar : userInfo.avatar"
        />
        <img
          :src="
            require(`../../assets/images/vip/vip_${teamLevel.level || 1}.png`)
          "
          id="vip-level-img"
          alt=""
        />
      </div>
      <div class="user-info">
        <p class="name">{{ userInfo.mobile || "-" }}</p>
        <p class="phone">{{ userInfo.username || userInfo.nickname || "-" }}</p>
      </div>
    </div>
    <!-- tab操作 -->
    <div class="tabs flex-row">
      <div class="tabs-item flex-col" @click="navigate(item.link)" v-for="(item, index) in tabList" :key="index">
        <van-image
          round
          width="1.8175rem"
          height="1.8175rem"
          :src="item.src"
        />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <!-- 邀请信息与团队 -->
    <div class="invate-team">
      <router-link to="/inviteUsers">
        <div class="invate-team-card">
          <p class="title">邀请用户(人)</p>
          <p class="message">{{count || 0}}</p>
        </div>
      </router-link>
      <router-link to="/team">
        <div class="invate-team-card">
          <p class="title">团队(人)</p>
          <p class="message">{{teamUserCount || 0}}</p>
        </div>
      </router-link>
    </div>
    <!-- 累计信息 -->
    <div class="profit">
      <div class="top">
        <p class="top-title">累计收入(元)</p>
        <p class="top-center flex-row">
          <span class="top-total-money">{{utils.numberFormat(walletInfo.totalProfit, 2)}}</span>
          <router-link to="/records"
            ><span class="top-total-detail">详情</span></router-link
          >
        </p>
        <p class="top-income flex-row">
          <span>可提现<span class="num">{{utils.numberFormat(walletInfo.cashProfit, 2)}}</span>元</span>
          <span>今日收入<span class="num">{{utils.numberFormat(walletInfo.todayProfit, 2)}}</span>元</span>
        </p>
      </div>
      <div class="bottom">
        <div class="bottom-title flex-row">
          <div class="flex-row flex-col-center">
            <span>本月团队等级</span>
            <level-bg :level="teamLevel.level"></level-bg>
          </div>
          <router-link to="/teamLevel"
            ><span class="detail">详情</span></router-link
          >
        </div>
        <div class="month">
          {{ utils.getMonth() }}月总业绩(元)<span>{{utils.numberFormat(teamReward.teamProfit, 2)}}</span>
        </div>
        <!-- teamReward.teamLevel.lack_money -->
        <div class="rest">
          还差<span>{{ utils.numberFormat(teamLevel.lack_money, 2) }}</span
          >元可提升至下一等级
        </div>
      </div>
    </div>

    <!-- 图片轮播广告 -->
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerList" :key="item.id"
          ><van-image
            :src="baseImgUrl + item.image"
            alt="图片"
            width="100%"
            height="4.6875rem"
            @click="openUrl(item.url)"
        /></van-swipe-item>
      </van-swipe>
    </div>
    <!-- 规则 -->
    <div class="rules">
      <div class="title">奖励规则<router-link to="/rewardRules"><span class="right-detail">详情</span></router-link></div>
      <img :src="baseImgUrl + rewardRuleImage" alt="" />
      <img :src="baseImgUrl + wxFollowImage" alt="" />
    </div>
    <!-- 底部固定推广按钮 -->
    <div class="fixed-btns flex-row">
      <div class="f1" @click="shareMaskShow = true; $store.commit('SET_SHARE_TYPE', 'borrow');btnText='我已了解，继续推广'">信贷服务推广</div>
      <div class="f1" @click="shareMaskShow = true; $store.commit('SET_SHARE_TYPE', 'invite');btnText='我已了解，继续招募'">合伙人招募</div>
    </div>
    <share-mask :shareMaskShow="shareMaskShow" :btn-text="btnText"></share-mask>
    <notice :notice-show="noticeShow" :src="noticeImgSrc"></notice>
  </div>
</template>

<script>
import ShareMask from "../../components/share-mask";
import Notice from "../../components/notice"
import LevelBg from '../../components/level-bg';
import { mapState, mapActions } from "vuex";
import utils from "../../utils/index.js";
// import Notice from '../login/notice.vue';
export default {
  name: "index",
  components: { ShareMask, LevelBg, Notice },
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      utils,
      tabList: [
        {
          src: require("../../assets/images/index/material.png"),
          name: "发圈素材",
          link: "/spread",
        },
        {
          src: require("../../assets/images/index/coupon.png"),
          name: "商城",
          link: "",
        },
        {
          src: require("../../assets/images/index/settings.png"),
          name: "设置",
          link: "/setting",
        },
      ],
      bannerList: [], //
      walletInfo: {}, // 钱包信息
      noticeShow: false,
      noticeImgSrc: "",
      teamReward: {},
      teamLevel: {},
      shareMaskShow: false,
      btnText: '',
      teamUserCount: 0, //团队总用户
      count: 0, //邀请用户总数
      rewardRuleImage: '',//奖励规则图片
      wxFollowImage: '' //公众号图片
    };
  },
  methods: {
    ...mapActions(["GET_USER_INFO"]),
    //获取轮播
    getBanner() {
      this.$get("/api/banner").then((res) => {
        this.bannerList = res.data;
      });
    },
    // 获取用户钱包及收入
    getWallet() {
      this.$get("/api/wallet", {
        hideLoading: true
      }).then((res) => {
        this.walletInfo = res.data;
      });
    },
    //获取团队业绩汇总
    getTeamReward() {
      this.$get("/api/teamReward", {
        hideLoading: true
      }).then((res) => {
        this.teamReward = res.data;
        this.teamLevel = res.data.teamLevel
        this.$forceUpdate()
      });
    },
    //获取奖励规则图片
    getRwardRuleImage() {
      this.$get("/api/rewardRuleImage", {
        hideLoading: true
      }).then((res) => {
        this.rewardRuleImage = res.data.content;
      });
    },
    //获取奖励规则图片
    getWxFollowImage() {
      this.$get("/api/wxFollowImage", {
        hideLoading: true
      }).then((res) => {
        this.wxFollowImage = res.data.content;
      });
    },
    //获取团队总用户
    getTeamUser() {
      this.$get("/api/teamUser", {
        hideLoading: true
      }).then((res) => {
        this.teamUserCount = res.data.teamUserCount;
      });
    },
    //邀请用户人数
    getInviteUserCount() {
      // this.$get("/api/inviteUserCount", {
      this.$get("/api/applyCount", {
        hideLoading: true
      }).then((res) => {
        this.count = res.data.count
      });
    },
    navigate(url) {
      if(!url) {
        this.$toast("正在开发中")
        return
      }
      this.$router.push(url)
    },
    //打开轮播图跳转的链接
    openUrl(url) {
      window.location.href = url
    },
    notice() {
      let noticeId = localStorage.getItem("noticeId")
      // if(!noticeId) return;
      this.$get("/api/notice", {
        hideLoading: true
      }).then(res => {
        let data = res.data;
        if(data.id) {
          if(noticeId == data.id) return
          this.noticeImgSrc = data.image
          this.noticeShow = true
          localStorage.setItem("noticeId", data.id)
        }
      }).catch(err => {
        if(err.id) {
          if(noticeId == err.id) return
          this.noticeImgSrc = err.image
          this.noticeShow = true
          localStorage.setItem("noticeId", err.id)
        }
      })
    }
  },
  created() {
    this.getTeamReward();
    this.getBanner();
    this.getWallet();
    this.getRwardRuleImage()
    this.getWxFollowImage()
    this.getTeamUser()
    this.getInviteUserCount()
    this.GET_USER_INFO()

    setTimeout(() => {
      this.notice()
    }, 1000)
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
  #vip-level-img {
    position: absolute;
    bottom: 0.225rem;
    right: 0;
    width: 1.3125rem;
    height: 1.0625rem;
  }
  .head {
    padding-top: 1.25rem;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    // align-items: center;
    text-align: left;
    color: #fff;
    .user-img {
      position: relative;
    }
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
    margin-top: 1.3625rem;
    padding: 0 1.25rem;
    justify-content: space-between;
    &-item {
      justify-content: center;
      align-items: center;
      span {
        margin-top: 0.15rem;
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
        span {
          color: #fff;
        }
        .top-total-detail:last-child::after {
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
    border-radius: 0.3125rem;
    overflow: hidden;
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