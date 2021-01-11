<template>
  <div id="share-mask">
    <van-popup
      v-model="show"
      position="bottom"
      :style="{

        borderTopLeftRadius: '.5rem',
        borderTopRightRadius: '.5rem',
      }"
    >
      <div class="popup-head flex-row">
        <van-icon name="cross" color="#999" />
      </div>
      <div class="popup-title">请严格遵守以下规则</div>
      <div class="popup-body">
        <div class="rule-item">
          1. 平台所有服务零费用，不允许任何人员以任何形式收取任何费用。
        </div>
        <div class="rule-item">
          2.
          请对您邀请的合伙人进行合规培训，如下级出现违规，可能会影响您的正常推广。
        </div>
        <div class="tip">
          平台会不定期对用户进行回访，并开通投诉通道，如发现有合伙人存在上述违规行为，平台有权对相应合伙人进行追责
        </div>
        <div class="popup-btn">我已了解，继续招募</div>
      </div>
      <!-- <van-button type="danger" size="large">我已了解，继续招募</van-button> -->
    </van-popup>
    <share-imgs></share-imgs>
  </div>
</template>

<script>
import ShareImgs from './share-imgs.vue'
export default {
  components: {ShareImgs},
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style scoped lang="scss">
#share-mask {
  .popup-head {
    justify-content: flex-end;
    align-items: center;
    height: 2.8125rem;
    padding-right: 0.75rem;
  }
  .popup-title {
    font-family: PingFangSC-Regular;
    font-size: 1.375rem;
    color: #222;
    letter-spacing: 0;
    font-weight: 400;
    padding: 0.0675rem 0 0 1.875rem;
  }
  .popup-body {
    font-size: 0.75rem;
    line-height: 1.5;
    padding: 1.4375rem 1.875rem 1.25rem 1.875rem;
    .rule-item {
      font-family: PingFangSC-Regular;
      font-size: 0.875rem;
      color: #000;
      letter-spacing: 0;
      line-height: 1.5rem;
    }
    .tip {
      font-family: PingFangSC-Regular;
      font-size: 0.8125rem;
      color: #5a6981;
      letter-spacing: 0;
      line-height: 1.25rem;
      margin-top: 0.9375rem;
      margin-bottom: 2.5rem;
    }
  }
  .popup-btn {
    width: 19.6875rem;
    height: 3.125rem;
    background: #fa5050;
    border-radius: 6.25rem;
    font-family: PingFangSC-Medium;
    font-size: 1rem;
    color: #fff;
    letter-spacing: -.024063rem;
    text-align: center;
    line-height: 3.125rem;
    margin: 0 auto;
  }
}
</style>