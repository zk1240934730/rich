<template>
  <div id="team">
    <div class="team-search">
      <van-icon name="search" size="20" />
      <span>请输入手机号搜索</span>
    </div>
    <h2>我的推荐人</h2>
    <div class="references">
      <div class="flex-row">
        <div class="references-user">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
          <img src="../../assets/images/vip/vip_1.png" alt="" />
        </div>
        <div class="user-info">
          <p>Safe～项目对接</p>
          <p>平安综金专员</p>
        </div>
      </div>
      <div class="flex-row" style="align-items: center">
        <img class="right-wx" src="../../assets/images/wx.png" alt="" />
      </div>
    </div>
    <h2 class="flex-row flex-row-between">
      我的团队<van-button type="default" round plain size="mini"
        >查看有业绩下级</van-button
      >
    </h2>
    <div class="team-info">
      <div class="team-title">
        <p>合伙人团队（人）</p>
        <p class="f1">本月团队总业绩（元）</p>
      </div>
      <div class="team-number">
        <p>0</p>
        <p class="f1">0.00</p>
      </div>
      <div class="team-tips">
        <p>一级合伙人<span class="number">0人</span></p>
        <p class="f1">上月团队总业绩<span class="number">0.00元</span></p>
      </div>
      <no-data></no-data>
    </div>
  </div>
</template>

<script>
import NoData from '../../components/empty-data.vue'
export default {
  name: "team",
  components: {NoData},
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
    button {
      border: 1px solid rgba(90, 105, 129, 0.4);
      font-size: 0.75rem;
      color: #5a6981;
      padding: 0 0.5rem;
      font-weight: 400;
    }
  }
  .references {
    width: 20.9375rem;
    margin-bottom: 1.875rem;
    height: 3.125rem;
    background-image: linear-gradient(146deg, #ffebe7 1%, #fff9f9);
    border-radius: 1.84375rem;
    color: #222;
    position: relative;
    display: flex;
    justify-content: space-between;
    &-user {
      width: 3.125rem;
      height: 3.125rem;
      position: relative;
      > img:first-child {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      > img:last-child {
        width: 1.5125rem;
        height: 1.2625rem;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    .user-info {
      vertical-align: top;
      display: inline-block;
      width: 11.0625rem;
      height: 3.125rem;
      margin-left: 0.8125rem;
      overflow: hidden;
      > p:first-child {
        padding-top: 0.625rem;
        padding-bottom: 0.25rem;
        width: 100%;
        font-family: PingFangSC-Semibold;
        font-size: 0.875rem;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      > p:last-child {
        font-size: 0.75rem;
        font-weight: 400;
      }
    }
    .right-wx {
      width: 1.25rem;
      width: 1.25rem;
      margin-right: 1.25rem;
    }
  }
  .team-info {
    padding: 1.25rem;
    width: 20.9375rem;
    height: 7.2375rem;
    border-radius: 0.5rem 0.5rem 0 0;
    background: url(../../assets/images/team/team_bg.png) 50% no-repeat;
    background-size: 100%;
    position: relative;
    z-index: 1;
    > div {
      color: #fff;
      text-align: left;
      display: flex;
      > p:first-child {
        width: 8.75rem;
      }
    }
    .team-title {
      font-size: 0.8125rem;
    }
    .team-number {
      margin: 0.5rem 0 0.75rem;
      font-family: FDCfont-Bold;
      font-size: 1.25rem;
      line-height: 1.375rem;
    }
    .team-tips {
      font-size: 0.75rem;
      color: #ffebeb;
    }
  }
}
</style>