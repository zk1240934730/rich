<template>
  <div id="setting">
    <div class="setting-title">个人信息</div>
    <ul class="setting-section">
      <li>
        <div>
          <span class="left">昵称</span
          ><span class="right">{{ userInfo.nickname || "-" }}</span>
        </div>
      </li>
      <li>
        <div>
          <span class="left">团队ID</span
          ><span class="right">{{ userInfo.team_id }}</span>
        </div>
      </li>
      <router-link to="/editWxNum"
        ><li>
          <div>
            <span class="left">微信号</span
            ><span class="right show">{{ userInfo.wx_id || "-" }}</span>
          </div>
          <p class="tip">您本人的联系方式，便于上下级推荐人与您沟通</p>
        </li>
      </router-link>
    </ul>
    <div class="setting-title">账号设置</div>
    <ul class="setting-section">
      <router-link to="/wxTip">
        <li>
          <div>
            <span class="left">微信号绑定</span
            ><span class="right show">{{
              userInfo.wx_id ? "已绑定" : "未绑定"
            }}</span>
          </div>
          <p class="tip">用于在微信中接收用户进度，奖励到账消息通知</p>
        </li>
      </router-link>
      <li>
        <div>
          <span class="left">海报添加微信号</span>
        </div>
        <p class="tip">用于在微信中接收用户进度，奖励到账消息通知</p>
        <div class="switch">
          <van-switch
            size="1.5875rem"
            v-model="checked"
            active-color="#28c34e"
            :disabled="!userInfo.wx_id"
            @change="switchChange"
            @click="switchClick"
            :loading="switchLoading"
          ></van-switch>
        </div>
      </li>
    </ul>
    <van-button
      class="van-btn"
      type="danger"
      round
      size="large"
      color="#fa5050"
      @click="loginOut"
      >退出登录</van-button
    >
    <van-overlay :show="show">
      <div class="dialog-body">
        <div class="closeIcon" @click="show = false"><van-icon name="cross" size="20" color="#5a6981"/></div>
        <div class="title">确认添加微信号</div>
        <div class="content">
          <div class="sub-title">
            <span class="wx-icon"></span><span>当前微信号:</span>
          </div>
          <div class="wechat-id">123456</div>
        </div>
        <div class="tips">
          确认后，微信号将展示在邀请海报上,他人可通过海报与您联系。开启后，您可在设置中关闭
        </div>
        <div class="btn-active" @click="addWx">确认添加</div>
        <div class="btn-inactive"><router-link to="/editWxNum"><span>修改微信号</span></router-link></div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Switch } from "vant";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "setting",
  components: { VanSwitch: Switch },
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      checked: true,
      switchLoading: false,
      show: false
    };
  },
  watch: {
    userInfo: {
      deep: true,
      immediate: true,
      handler(v) {
        this.checked = v.wx_poster == 1 ? true : false;
      },
    },
  },
  methods: {
    ...mapMutations(["SET_USER_INFO"]),
    ...mapActions(["GET_USER_INFO"]),
    switchChange(v) {
      if(v) {
        this.checked = false
        this.show = true
        return
      }
      this.switchLoading = true;
      this.$post("/api/wxPosterSet", {
        status: v ? 1 : 2,
      })
        .then(() => {
          this.switchLoading = false;
          this.GET_USER_INFO();
        })
        .catch(() => {}).finally(() => {
          this.show = false
        })
    },
    addWx() {
      this.switchChange(true)
    },
    switchClick() {
      if (!this.userInfo.wx_id) {
        this.$toast("请先绑定微信号！");
      }
    },
    //退出登录
    loginOut() {
      this.SET_USER_INFO({});
      this.$router.push("/login");
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
#setting {
  min-height: 100vh;
  padding: 0.375rem 1.25rem 5.625rem;
  background-color: #f2f5fb;
  background-size: 100%;
  .setting-title {
    margin-top: 1.75rem;
    font-family: PingFangSC-Semibold;
    font-size: 1rem;
    color: #5a6981;
    line-height: 1.1875rem;
    margin-bottom: 0.75rem;
  }
  .setting-section {
    background: #fff;
    border: 0 solid rgba(216, 221, 225, 0.34);
    box-shadow: 0 0.03125rem 0.15625rem 0 rgba(234, 240, 255, 0.7);
    border-radius: 0.375rem;
    padding: 0 0.9375rem;
    width: 20.9375rem;
    li {
      border-bottom: 1px solid #dae0ea;
      position: relative;
      display: flex;
      justify-content: center;
      flex-direction: column;
      // min-height: 3.4375rem;
      padding: 1.1735rem 0;
      &:last-child {
        border-bottom: none;
      }
      > div {
        display: flex;
        justify-content: space-between;
        span.left {
          font-family: PingFangSC-Regular;
          font-size: 0.875rem;
          color: #222;
          line-height: 1.1875rem;
        }
        span.right {
          max-width: 80%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-family: PingFangSC-Regular;
          font-size: 0.875rem;
          color: #5a6981;
          text-align: right;
          line-height: 1.1875rem;
          &.show::after {
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
      .tip {
        font-family: PingFangSC-Regular;
        font-size: 0.6875rem;
        color: #5a6981;
        line-height: 1.1875rem;
      }
      .switch {
        position: absolute;
        right: 0;
        top: 45%;
        transform: translateY(-50%);
      }
    }
  }
  .van-btn {
    position: fixed;
    bottom: 0.9375rem;
    left: 50%;
    transform: translateX(-50%);
    width: 19.6875rem;
  }
}
.dialog-body {
  padding: 2.125rem 1.875rem 1.875rem;
  font-size: 0.75rem;
  line-height: 1.5;
      background-color: #fff;
    border: 0;
    border-radius: .1875rem;
    background-clip: padding-box;
        min-height: 19.5rem;
    border-radius: .5rem;
    text-align: center;
        width: 18.4375rem;
        position: absolute;
    width: 19.0625rem;
    outline: none;
    top: 46%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: .75rem;
  .closeIcon {
    right: 0;
    top: 0;
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    position: absolute;
  }
  .title {
    font-family: PingFangSC-Regular;
    font-size: 1.125rem;
    color: #222;
    letter-spacing: 0;
    line-height: 1.125rem;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .content {
    width: 14.6875rem;
    height: 5.25rem;
    background: rgba(90, 105, 129, 0.06);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.9375rem 0;
    margin-top: 1.25rem;
    .sub-title {
      font-family: PingFangSC-Regular;
      font-size: 1rem;
      color: #222;
      letter-spacing: 0;
    }
    .wechat-id {
      font-size: 1rem;
      color: #222;
      letter-spacing: 0;
    }
    .wx-icon {
      position: relative;
      top: .25rem;
      right: .25rem;
      display: inline-block;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      background: url("../../assets/images/wx_blue.png") no-repeat 50%/contain;
    }
  }
  .tips {
        margin-top: 1.25rem;
    font-size: .875rem;
    color: #5a6981;
    text-align: justify;
    line-height: 1.3125rem;
  }
  .btn-active {
    width: 14.6875rem;
    height: 2.75rem;
    background: #fa5050;
    font-family: PingFangSC-Medium;
    font-size: .9375rem;
    color: #fff;
    letter-spacing: 0;
    text-align: center;
    line-height: 2.75rem;
    border-radius: 6.25rem;
    margin-top: 1.25rem;
  }
  .btn-inactive {
    font-family: PingFangSC-Regular;
    font-size: .9375rem;
    letter-spacing: 0;
    text-align: center;
    line-height: .9375rem;
    margin-top: 1.25rem;
    span {
      color: #fc514d;
    }
  }
}
</style>