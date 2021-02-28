<template>
  <van-overlay :show="show" @click="close" :z-index="999">
    <div class="wrapper flex-col flex-col-center flex-row-center" @click.stop>
      <div class="content">
        <img :src="baseImgUrl + src" />
      </div>
      <van-icon name="close" color="#fff" size="30" @click="close"/>
    </div>
  </van-overlay>
</template>

<script>
export default {
  props: {
    noticeShow: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
    };
  },
  watch: {
    noticeShow(v) {
      this.show = v;
    },
  },
  methods: {
    close() {
      this.$parent.noticeShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  .content  {
      margin-bottom: 0.5rem;
      width: 20.3125rem;
      background: #fff;
      height: 25.3125rem;
      overflow: hidden;
      border-radius: .1rem;
      img {
        width: 100%;
        height: auto;
      }
  }
}
</style>