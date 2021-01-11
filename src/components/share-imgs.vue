<template>
  <van-overlay :show="show">
    <div class="close-icon" @click="show = false">
      <van-icon name="cross" color="#fff" />
    </div>
    <div class="overlay-content flex-col">
      <div class="overlay-tips">推广有钱花<br />截屏或复制链接分享给好友</div>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img
              src="https://mgminvitedonline.bj.bcebos.com/mgminvitedonline/adzfefttmqwkno_tg10.png?imgVersion=1610349278578"
              alt=""
            />
          </div>
          <div class="swiper-slide">
            <img
              src="https://mgminvitedonline.bj.bcebos.com/mgminvitedonline/adzfefttmqwkno_tg11.png?imgVersion=1610349278578"
              alt=""
            />
          </div>
          <div class="swiper-slide">
            <img
              src="https://mgminvitedonline.bj.bcebos.com/mgminvitedonline/adzfefttmqwkno_tg12.png?imgVersion=1610349278578"
              alt=""
            />
          </div>
        </div>
      </div>
      <div
        class="clipboard"
        data-clipboard-text="测试"
        id="express_info_right"
        @click="copy"
      >
        复制链接
      </div>
      <div class="my-code flex-row">
        <span>我的邀请码：adzfefttmqwkno </span>
        <div class="my-code-clipboard"></div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
export default {
  data() {
    return {
      show: true,
    };
  },
  methods: {
      copy(){
        let clipboard = new this.clipboard("#express_info_right");
        clipboard.on('success', () => {
            this.$toast.success('复制成功');
            clipboard.destroy();
        });
        clipboard.on('error', () => {
            this.$toast.fail('复制失败');
        });
    }
  },
  mounted() {
    new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 20,
    });
  },
};
</script>

<style scoped lang="scss">
.close-icon {
  position: absolute;
  height: 1.09375rem;
  width: 1.09375rem;
  background-repeat: no-repeat;
  background-size: 100%;
  right: 1.09375rem;
  top: 1.71875rem;
}
.overlay-content {
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .overlay-tips {
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #fff;
    letter-spacing: 0;
    text-align: center;
    line-height: 1.5rem;
    position: relative;
  }
}
.swiper-container {
  height: auto;
  width: 13.125rem;
  overflow: inherit;
  .swiper-wrapper {
    .swiper-slide {
      width: 100%;
      height: auto;
      text-align: center;
      img {
        display: block;
        width: 13.125rem;
        height: 21.09375rem;
        border-radius: 0.3125rem;
        margin: 0 auto;
        position: static;
        margin-top: 1.25rem;
        background: red;
      }
    }
  }
}
.clipboard {
  width: 8.125rem;
  height: 2.125rem;
  background: #fa5050;
  border-radius: 2.125rem;
  font-family: PingFangSC-Medium;
  line-height: 2.125rem;
  font-size: 0.8125rem;
  text-align: center;
  color: #fff !important;
  margin: 1.875rem auto -0.3125rem;
}
.my-code {
  margin-top: 0.3125rem;
  font-family: PingFangSC-Regular;
  font-size: 0.875rem;
  color: #fff;
  letter-spacing: 0;
  text-align: center;
  height: 1.4375rem;
  align-items: center;
  &-clipboard {
    width: 2.875rem;
    height: 1.4375rem;
    background: url(../assets/images/components/copy_btn.png) no-repeat 50% /
      contain;
    position: relative;
    top: 0.3125rem;
    margin-left: 0.2rem;
  }
}
</style>