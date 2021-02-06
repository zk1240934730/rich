<template>
  <div id="wx-tip">
    <div class="head">
      <p>请在微信中打开此页面</p>
      <p>完成账号绑定</p>
    </div>
    <div class="main">
      <div class="title">如何绑定?</div>
      <div class="content">
        <div class="content-title">1.关注「推小花」公众号</div>
        <div class="content-main1">
          <div class="left">
            <img src="../../assets/images/setting/qrcode.jpg" alt="" />
          </div>
          <div class="right">
            <p>·微信内搜索「推小花」；</p>
            <p>·或截图保存二维码，微信内识别打开。</p>
          </div>
        </div>
        <div class="content-title">
          2.点击公众号菜单个人中心，首页右上角设置
        </div>
        <div class="content-main2">
          <img src="../../assets/images/setting/text.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "wxTip",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped lang="scss">
#wx-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(../../assets/images/setting/wx-tip-bg.png) no-repeat;
  background-size: 6.875rem 9.3125rem;
  background-color: #f3f6fb;
  height: 100vh;
  .head {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 3.125rem;
    margin-top: 3.21875rem;
    font-size: 1.125rem;
    color: #222;
    text-align: center;
    line-height: 1.375rem;
  }
  .main {
    width: 20.9375rem;
    height: 23.875rem;
    background: #fff;
    border: 0.03125rem solid rgba(216, 221, 225, 0.34);
    box-shadow: 0 0.03125rem 0.15625rem 0 rgba(234, 240, 255, 0.7);
    border-radius: 0.375rem;
    margin-top: 2.65625rem;
    .title {
      width: 100%;
      height: 2.8125rem;
      font-family: PingFangSC-Medium;
      font-size: 1rem;
      color: #394259;
      text-align: center;
      line-height: 2.8125rem;
      border-radius: 0.375rem 0.375rem 0 0;
      background-image: linear-gradient(-82deg, #fffcfc 4%, #fff6f6);
    }
    .content {
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      &-title {
        font-family: PingFangSC-Medium;
        font-size: 0.875rem;
        color: #394259;
      }
      &-main1 {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.625rem 0.9375rem 1.875rem;
        .left {
          width: 4.6875rem;
          height: 4.6875rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .right {
          width: 11.125rem;
          height: 3.5rem;
          line-height: 1.25rem;
          font-family: PingFangSC-Regular;
          font-size: 0.8125rem;
          color: #5a6981;
        }
      }
      &-main2 {
        width: 100%;
        height: 10.9375rem;
        margin-top: 0.3125rem;
        img {
          width: 100%;
          height: 87%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>