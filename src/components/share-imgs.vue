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
        <swiper-slide v-for="(item, index) in imgList" :key="index">
          <img
            :src="
              item.image && item.image.indexOf('http') == -1
                ? baseImgUrl + item.image
                : item.image
            "
            alt=""
          />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div
        class="clipboard"
        :data-clipboard-text="
          imgList[activeIndex] && imgList[activeIndex].url + activeIndex
        "
        id="express_info_right"
        @click="copy('express_info_right')"
      >
        复制链接
      </div>
      <div class="my-code flex-row">
        <div>我的邀请码：{{ userInfo.invite_code }}</div>
        <div
          id="my-code-clipboard"
          class="my-code-clipboard"
          :data-clipboard-text="userInfo.invite_code"
          @click="copy('my-code-clipboard')"
        ></div>
      </div>
      <div class="footer-wrapper" v-if="userInfo.wx_poster == 2">
        <img src="../assets/images/wx_blue.png" class="wx-icon" />
        <span>海报添加您的微信号，方便下级联系</span>
        <span class="add-btn" @click="addWxPosterShow = true">添加微信</span>
      </div>
    </div>
    <add-wx-poster :addWxPosterShow="addWxPosterShow" @addWx="addWx"></add-wx-poster>
  </van-overlay>
</template>

<script>
import { directive } from "vue-awesome-swiper";
import { mapState, mapActions } from "vuex";
import AddWxPoster from './add-wx-poster'
export default {
  name: "carrousel",
  components: {AddWxPoster},
  directives: {
    swiper: directive,
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
    ...mapState(["userInfo", "shareType"]),
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
      switch (v) {
        case "borrowBanner":
          this.getBorrowBanner();
          break;
        case "inviteBanner":
          this.getInveteBanner();
          break;
      }
    },
  },
  data() {
    return {
      show: false,
      addWxPosterShow: false,
      imgList: [],
      activeIndex: 0,
      swiperOptions: {
        slidesPerView: 1,
        // centeredSlides: true,
        spaceBetween: 30,
        initialSlide: 0,
        on: {
          slideChangeTransitionEnd: (e) => {
            this.activeIndex = e.activeIndex; //切换结束时，告诉我现在是第几个slide
          },
        },
      },
    };
  },
  methods: {
    ...mapActions(["GET_USER_INFO"]),
    //关闭遮罩层
    close() {
      this.$parent.shareImgsShow = false;
    },
    //获取轮播图
    getBorrowBanner() {
      this.$get("/api/borrowBanner").then((res) => {
        this.imgList = res.data;
      });
    },
    getInveteBanner() {
      this.$get("/api/inveteBanner").then((res) => {
        this.imgList = res.data;
      });
    },
    addWx() {
      this.$post("/api/wxPosterSet", {
        status: 1,
      })
        .then(() => {
          this.GET_USER_INFO();
          switch (this.shareType) {
            case "borrowBanner":
              this.getBorrowBanner();
              break;
            case "inviteBanner":
              this.getInveteBanner();
              break;
          }
        })
        .catch(() => {}).finally(() => {
          this.addWxPosterShow = false
        })
    }
  },
  mounted() {
    // this.swiper.slideTo(3, 1000, false)
  },
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
  width: 100% !important;
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
        background: #e2e2e2;
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
.footer-wrapper {
  position: fixed;
  z-index: 100;
  bottom: 0;
  width: 100%;
  height: 3.4375rem;
  background: #fff;
  border-radius: .5rem .5rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: .875rem;
  color: #222;
  letter-spacing: 0;
  img {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: .25rem;
  }
  .add-btn {
    display: inline-block;
    width: 5rem;
    height: 1.875rem;
    text-align: center;
    line-height: 1.875rem;
    border: 1px solid #fa5050;
    border-radius: 2.3125rem;
    font-family: PingFangSC-Medium;
    font-size: .875rem;
    color: #fa5050;
    letter-spacing: 0;
    margin-left: 1.0625rem;
  }
}
</style>