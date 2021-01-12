<template>
  <div id="setting">
    <div class="setting-title">个人信息</div>
    <ul class="setting-section">
      <li>
        <div>
          <span class="left">昵称</span><span class="right">出入懵懂</span>
        </div>
      </li>
      <li>
        <div>
          <span class="left">团队ID</span><span class="right">13363</span>
        </div>
      </li>
      <router-link to="/editWxNum"
        ><li>
          <div>
            <span class="left">微信号</span
            ><span class="right show">zk1240934730</span>
          </div>
          <p class="tip">您本人的联系方式，便于上下级推荐人与您沟通</p>
        </li>
      </router-link>
    </ul>
    <div class="setting-title">账号设置</div>
    <ul class="setting-section">
      <li>
        <div>
          <span class="left">微信号绑定</span
          ><span class="right show">已绑定</span>
        </div>
        <p class="tip">用于在微信中接收用户进度，奖励到账消息通知</p>
      </li>
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
          ></van-switch>
        </div>
      </li>
    </ul>
    <van-button class="van-btn" type="danger" round size="large" color="#fa5050"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { Switch } from "vant";
export default {
  name: "setting",
  components: { VanSwitch: Switch },
  data() {
    return {
      checked: true,
    };
  },
  methods: {},
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
</style>