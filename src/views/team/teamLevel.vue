<template>
  <div id="team-level">
    <div class="level-month">
      <div class="h2">本月团队等级<span>等级一</span></div>
      <div class="level-month-content">
        <div class="level-month-total">
          <p>1月总业绩(元)</p>
          <p>0.00</p>
        </div>
        <div class="level-month-info">
          <div class="level-month-type flex-row">
            <div class="f1">
              <p>个人业绩(元)</p>
              <p>0.00</p>
            </div>
            <div class="f1">
              <p>团队业绩(元)</p>
              <p>0.00</p>
            </div>
          </div>
          <div class="level-month-tips">还差10,000.00元可晋升V2</div>
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
            <span class="f1">分佣比例</span>
          </div>
          <div class="tr flex-row" v-for="item in 10" :key="item">
            <span class="f1">m&gt;1万</span>
            <span class="f1">V1</span>
            <span class="f1">10%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "teamLevel",
  data() {
    return {};
  },
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
      span {
        width: 3.5rem;
        padding-left: 1rem;
        padding-right: 0.2rem;
        height: 1rem;
        background-color: #ffe5cf;
        border-radius: 0 3.125rem 3.125rem 0;
        font-size: 0.6875rem;
        color: #7e4315;
        line-height: 1rem;
        position: relative;
        margin-left: 0.8rem;
        &:after {
          content: "";
          position: absolute;
          width: 1.3125rem;
          height: 1.0625rem;
          background-repeat: no-repeat;
          background-size: 100%;
          top: 0;
          left: -0.5rem;
          background-image: url(data:image/png;base64,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);
        }
      }
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