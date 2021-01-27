<template>
  <div id="no-data">
    <img src="../assets/images/noData.png" alt="" />
    <template v-if="btmShow">
      <p>没有用户记录</p>
      <p>立即推广，得现金奖励</p>
      <van-button type="danger" round @click="show">{{btnText}}</van-button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    btnText: {
      type: String,
      default: ""
    },
    btmShow: {
      type: Boolean,
      default: false 
    }
  },
  data() {
    return {
    };
  },
  methods: {
    // 调用父组件的方法
    show() {
      this.$emit("emitClick")
    }
  }
};
</script>

<style scoped lang="scss">
#no-data {
  display: flex;
  flex-direction: column;
  width: 100%;
  img {
    margin: 3.75rem auto 0.1875rem;
    width: 5.5rem;
    height: 5.5rem;
  }
  p {
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 0.8125rem;
    color: #868e9e;
    line-height: 1.25rem;
  }
  button {
    margin: 1.875rem auto 0;
    width: 18.4375rem;
    font-size: 1rem;
    color: #fff;
    font-weight: 700;
    background: #fa5050;
    border-color: #fa5050;
  }
}
</style>