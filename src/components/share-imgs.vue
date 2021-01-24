<template>
  <van-overlay :show="show" :z-index="2007">
    <div class="close-icon" @click="close">
      <van-icon name="cross" color="#fff" />
    </div>
    <div class="overlay-content flex-col">
      <div class="overlay-tips">推广有钱花<br />截屏或复制链接分享给好友</div>
      <!-- <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" >
            
          </div>
        </div>
      </div> -->
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="(item,index) in imgList" :key="index">
          <img
              :src="baseImgUrl + item.image"
              alt=""
            />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div
        class="clipboard"
        :data-clipboard-text="imgList[activeIndex] && imgList[activeIndex].url + activeIndex"
        id="express_info_right"
        @click="copy('express_info_right')"
      >
        复制链接
      </div>
      <div class="my-code flex-row">
        <div>我的邀请码：{{userInfo.invite_code}}</div>
        <div id="my-code-clipboard" class="my-code-clipboard" :data-clipboard-text="userInfo.invite_code" @click="copy('my-code-clipboard')"></div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import { directive } from 'vue-awesome-swiper'
import { mapState } from 'vuex'
export default {
  name: 'carrousel',
  directives: {
    swiper: directive
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      },
      ...mapState(["userInfo", "shareType"])
    },
  props: {
    shareImgsShow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    shareImgsShow: {
      immediate: true,
      handler(v) {
        this.show = v;
      },
    },
    shareType(v) {
      switch(v) {
        case 'borrowBanner': this.getBorrowBanner(); break;
        case 'inviteBanner': this.getInveteBanner(); break;
      }
    }
  },
  data() {
    return {
      show: false,
      imgList: [],
      activeIndex: 0,
      swiperOptions: {
        slidesPerView: 1,
        // centeredSlides: true,
        spaceBetween: 30,
        initialSlide: 0,
        on: {
          slideChangeTransitionEnd: (e) =>{
            this.activeIndex = e.activeIndex//切换结束时，告诉我现在是第几个slide
          }
        }
      },
    };
  },
  methods: {
    //关闭遮罩层
    close() {
      this.$parent.shareImgsShow = false;
    },
    //获取轮播图
    getBorrowBanner() {
      console.error("???")
      this.$get("/api/borrowBanner").then(res => {
        this.imgList = res.data
      })
    },
    getInveteBanner() {
      this.$get("/api/inveteBanner").then(res => {
        this.imgList = res.data
      })
    }
  },
  mounted() {
    // this.swiper.slideTo(3, 1000, false)
  }
  // mounted() {
  //   // new Swiper(".swiper-container", {
  //   //   slidesPerView: 4,
  //   //   centeredSlides: true,
  //   //   spaceBetween: 30
  //   // });
  // }
};
</script>

<style scoped lang="scss">
.swiper-slide {
  width: 100%!important;
}
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
      // margin-right: 1rem;
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
  margin: 1.875rem auto 0.3125rem;
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
    margin-left: 0.2rem;
  }
}
</style>