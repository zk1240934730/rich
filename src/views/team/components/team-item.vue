<template>
    <div class="team-item">
        <div class="team-item-top flex-row">
            <div class="team-item-top-img">
                <img :src="detailInfo.user_info.avatar && detailInfo.user_info.avatar.indexOf('http') == -1 ? baseImgUrl + detailInfo.user_info.avatar : detailInfo.user_info.avatar" alt="">
                <!-- <img :src="require('../../assets/images/vip/vip_'+ item.team_level.level +'.png')" alt=""> -->
                <img :src="baseImgUrl + detailInfo.team_level.level_icon" alt="">
            </div>
            <div class="team-item-top-right f1 flex-row flex-row-between flex-col-center">
                <div class="f1 flex-col">
                <span>{{detailInfo.user_info.nickname}}</span>
                <span>{{detailInfo.user_info.mobile || detailInfo.user_info.wx_id}}</span>
                </div>
                <img src="../../../assets/images/wx.png" alt="" :data-clipboard-text="detailInfo.user_info.wx_id || detailInfo.user_info.mobile" :id="'info_wx_' + detailInfo.id" @click="copy('info_wx_' + detailInfo.id)">
            </div>
        </div>
        <div class="team-item-btm">
            <div class="flex-row">
                <span>个人业绩：{{utils.numberFormat(detailInfo.user_profit, 2)}}元</span>
                <span>团队业绩：{{utils.numberFormat(detailInfo.team_profit, 2)}}元</span>
            </div>
            <div>加入时间：{{detailInfo.user_info.created_at}}</div>
            <div>团队人数：{{detailInfo.team_count}}</div>
        </div>
    </div>
</template>

<script>
import utils from "../../../utils/index.js";
export default {
    props: {
        detailInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            utils
        }
    }
}
</script>

<style scoped lang="scss">
.team-item {
    width: 18.4375rem;
    overflow: hidden;
    margin: 1.25rem auto 0;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid rgba(218,224,234,.5);
    &-top {
      height: 2.5rem;
      &-img {
        width: 2.5rem;
        height: 2.5rem;
        position: relative;
        img:first-child {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        img:last-child {
          position: absolute;
          bottom: 0;
          right: -.125rem;
          width: 1.3125rem;
          height: 1.0625rem;
        }
      }
      &-right {
        margin-left: .8125rem;
        img {
          width: 1.25rem;
          height: 1.25rem;
          margin-right: .3125rem;
        }
        > div {
          overflow: hidden;
          padding-bottom: .25rem;
          font-size: .75rem;
          font-weight: 400;
          color: #333;
          > span:first-child {
            width: 100%;
            font-family: PingFangSC-Semibold;
            font-size: .875rem;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    &-btm {
      width: 100%;
      margin-top: .875rem;
      background-image: linear-gradient(103deg,rgba(251,234,222,.3),rgba(255,247,240,.3) 99%);
      border-left: .125rem solid #ffe9db;
      padding: .875rem 0 .75rem .75rem;
      > div:first-child {
        font-family: PingFangSC-Medium;
        font-size: .8125rem;
        color: #222;
        text-align: left;
        font-weight: 700;
        margin-bottom: .625rem;
        display: flex;
        justify-content: space-between;
      }
      div {
        font-family: FDCfont-Regular;
        font-size: .6875rem;
        color: #5a6981;
        letter-spacing: 0;
        line-height: 1.0625rem;
      }
    }
  }
</style>