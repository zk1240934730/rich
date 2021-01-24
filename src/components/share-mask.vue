<template>
  <div id="share-mask">
    <van-popup
      v-model="show"
      position="bottom"
      @close="close"
      :style="{
        borderTopLeftRadius: '.5rem',
        borderTopRightRadius: '.5rem',
      }"
    >
      <div class="popup-head flex-row" @click="close">
        <van-icon name="cross" color="#999" />
      </div>
      <div class="popup-title">请严格遵守以下规则</div>
      <div class="popup-body">
        <div class="rule-item" v-for="item in titleArr" :key="item.name">
          {{item.content}}
        </div>
        <div class="tip">{{desc.content}}</div>
        <div class="popup-btn" @click="shareImgsShow = true; $store.commit('SET_SHARE_TYPE', $store.state.shareType + 'Banner');$parent.shareMaskShow = false">{{btnText}}</div>
      </div>
      <!-- <van-button type="danger" size="large">我已了解，继续招募</van-button> -->
    </van-popup>
    <share-imgs :share-imgs-show="shareImgsShow"></share-imgs>
  </div>
</template>

<script>
import ShareImgs from './share-imgs.vue'
import {mapState} from 'vuex'
export default {
  components: {ShareImgs},
  props: {
    shareMaskShow: {
      type: Boolean,
      default: false
    },
    btnText: {
      type: String,
      default: ''
    }
  },
  watch: {
    shareMaskShow: {
      immediate: true,
      handler(v) {
        this.show = v
      }
    },
    shareType(v) {
      switch(v) {
        case 'borrow': this.getBorrowDesc(); break;
        case 'invite': this.getInviteDesc(); break;
      }
    }
  },
  computed: {
    ...mapState(["shareType"])
  },
  data() {
    return {
      show: false,
      shareImgsShow: false,
      desc: '',
      titleArr: []
    };
  },
  methods: {
    close() {
      this.$parent.shareMaskShow = false
    },
    getBorrowDesc() {
      this.$get("/api/borrowDesc").then(res => {
        let {content} = res.data
        this.desc = content.desc
        this.titleArr = content.title
      })
    },
    getInviteDesc() {
      this.$get("/api/inviteDesc").then(res => {
        let {content} = res.data
        this.desc = content.desc
        this.titleArr = content.title
      })
    }
  }
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