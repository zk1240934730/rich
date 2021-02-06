<template>
  <div id="team-level">
    <div class="level-month">
      <div class="h2">本月团队等级<level-bg :level="teamLevel.level"></level-bg></div>
      <div class="level-month-content">
        <div class="level-month-total">
          <p>{{utils.getMonth()}}月总业绩(元)</p>
          <p>{{utils.numberFormat(teamReward.teamAllProfit, 2)}}</p>
        </div>
        <div class="level-month-info">
          <div class="level-month-type flex-row">
            <div class="f1">
              <p>个人业绩(元)</p>
              <p>{{utils.numberFormat(teamReward.userProfit, 2)}}</p>
            </div>
            <div class="f1">
              <p>团队业绩(元)</p>
              <p>{{utils.numberFormat(teamReward.teamAllProfit, 2)}}</p>
            </div>
          </div>
          <div class="level-month-tips">还差{{utils.numberFormat(teamLevel.lack_money, 2)}}元可晋升{{teamLevel.next_level && teamLevel.next_level.level_name}}</div>
        </div>
      </div>
    </div>
    <div class="level-rule">
      <div class="h2">等级规则</div>
      <div class="level-rule-content">
        <div class="tips">
          每月团队等级根据当月总业绩按照下表确定得出。总业绩越高，团队等级越高。
        </div>
        <div class="rules-table">
          <div class="tr th flex-row">
            <span class="f1">月总业绩m(元)</span>
            <span class="f1">团队等级</span>
            <span class="f1">奖励系数</span>
          </div>
          <div class="tr flex-row" v-for="item in teamLevelList" :key="item.id">
            <span class="f1">{{item.level_desc}}</span>
            <span class="f1">{{item.level_name}}</span>
            <span class="f1">{{item.rate}}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LevelBg from '../../components/level-bg.vue';
import utils from "../../utils/index.js";
export default {
  name: "teamLevel",
  components: {LevelBg},
  data() {
    return {
      utils,
      teamLevelList: [],
      teamReward: {},
      teamLevel: {}
    };
  },
  methods: {
    //获取团队等级介绍
    getTeamLevel() {
      this.$get("/api/teamLevel").then(res => {
        this.teamLevelList = res.data
      })
    },
    //获取团队业绩汇总
    getTeamReward() {
      this.$get("/api/teamReward").then((res) => {
        this.teamReward = res.data;
        this.teamLevel = res.data.teamLevel
        // this.$forceUpdate()
        console.log(res)
      });
    },
  },
  beforeMount() {
    this.getTeamReward()
    this.getTeamLevel()
  }
};
</script>

<style lang="scss" scoped>
#team-level {
  position: relative;
  min-height: 100vh;
  height: auto;
  padding: 1.875rem 1.25rem 3.125rem;
  background: url(../../assets/images/setting/edit-wx-bg.png) top no-repeat;
  background-size: 100%;
  background-color: #f3f6fb;
  overflow: hidden;
  color: #222;
  .level-month {
    position: relative;
    width: 20.9375rem;
    .h2 {
      font-family: PingFangSC-Semibold;
      font-weight: 700;
      font-size: 1rem;
      display: flex;
      align-items: center;
    }
    &-content {
      margin-top: 1rem;
      background: #fff;
      border-radius: 0.5rem;
    }
    &-total {
      padding: 1.125rem 1.25rem 0;
      width: 100%;
      height: 5.75rem;
      background: url(../../assets/images/team/my_income.png) 50% no-repeat;
      background-size: 21.5625rem 6.25rem;
      font-weight: 700;
      font-size: 0.8125rem;
      color: #fff;
      line-height: 0.8125rem;
      font-family: FDCfont-Bold;
      p:last-child {
        margin-top: 0.3125rem;
        font-size: 1.875rem;
        line-height: 1.9375rem;
        font-family: FDCfont-Bold;
      }
    }
    &-info {
      padding: 0 1.25rem;
      height: 7.1875rem;
      overflow: hidden;
      .level-month-type {
        margin-top: 1.0625rem;
        div {
          p:first-child {
            font-family: PingFangSC-Regular;
            font-size: 0.8125rem;
            line-height: 0.8125rem;
            margin-bottom: 0.375rem;
          }
          p:last-child {
            font-family: FDCfont-Bold;
            font-size: 1.25rem;
            color: #fa5050;
            line-height: 1.5rem;
          }
        }
      }
    }
    &-tips {
      margin-top: 0.575rem;
      width: 100%;
      height: 1.8125rem;
      line-height: 1.8125rem;
      text-align: center;
      padding-left: 0.625rem;
      background-image: linear-gradient(
        158deg,
        rgba(255, 235, 224, 0.7),
        rgba(253, 223, 209, 0.7)
      );
      border-radius: 0.90625rem;
      font-family: FDCfont-Regular;
      font-size: 0.75rem;
      color: #5a6981;
    }
  }
  .level-rule {
    margin-top: 1.75rem;
    .h2 {
      font-family: PingFangSC-Semibold;
      font-weight: 700;
      font-size: 1rem;
    }
    &-content {
      margin-top: 1rem;
      width: 20.9375rem;
      height: 35.5rem;
      border-radius: 0.5rem;
      background: #fff;
      padding: 1.5rem 1.25rem;
      .tips {
        font-family: PingFangSC-Regular;
        font-size: 0.8125rem;
        line-height: 1.15625rem;
      }
      .rules-table {
        margin-top: 1.0625rem;
        border: 1px solid #fae6d7;
        border-radius: 0.25rem;
        background: #fffbf9;
        overflow: hidden;
        .tr {
          width: 100%;
          border-bottom: 1px solid #fae6d7;
          text-align: center;
          line-height: 2.6875rem;
          
          font-size: 0.75rem;
          color: #101010;
          span {
            border-right: 1px solid #fae6d7;
            &:last-child {
              border-right: none;
            }
          }
          
          &.th {
            height: 2.25rem;
            background: #fef8f4;
            font-family: FDCfont-Bold;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>