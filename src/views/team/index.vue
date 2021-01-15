<template>
  <div id="team">
    <div class="team-search">
      <van-icon name="search" size="20" />
      <span>请输入手机号搜索</span>
    </div>
    <h2>我的推荐人</h2>
    <div class="references"></div>
    <h2>我的团队</h2>
  </div>
</template>

<script>
export default {
  name: "team",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#team {
  width: 100%;
  height: 100%;
  padding: 1.875rem 1.25rem 1.25rem;
  background: url(../../assets/images/invite/bg.png) top no-repeat;
  background-size: 100%;
  .team-search {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.25rem;
    background: #fff;
    border-radius: 0.375rem;
    margin-bottom: 1.25rem;
    color: #838c9e;
    font-size: 0.9375rem;
    font-family: PingFangSC-Regular;
    line-height: 2.25rem;
    span {
      margin-left: 0.40625rem;
    }
  }
  h2 {
    font-family: PingFangSC-Semibold;
    margin-bottom: 0.78125rem;
    font-size: 1rem;
    color: #222;
    font-weight: 700;
  }
  .references {
    width: 20.9375rem;
    margin-bottom: 1.875rem;
    height: 3.125rem;
    background-image: linear-gradient(146deg, #ffebe7 1%, #fff9f9);
    border-radius: 1.84375rem;
    color: #222;
    position: relative;
  }
}
</style>