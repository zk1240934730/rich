<template>
    <van-overlay :show="show">
      <div class="dialog-body">
        <div class="closeIcon" @click="close"><van-icon name="cross" size="20" color="#5a6981"/></div>
        <div class="title">确认添加微信号</div>
        <div class="content">
          <div class="sub-title">
            <span class="wx-icon"></span><span>当前微信号:</span>
          </div>
          <div class="wechat-id">{{userInfo.wx_id}}</div>
        </div>
        <div class="tips">
          确认后，微信号将展示在邀请海报上,他人可通过海报与您联系。开启后，您可在设置中关闭
        </div>
        <div class="btn-active" @click="addWx">确认添加</div>
        <div class="btn-inactive"><router-link to="/editWxNum"><span>修改微信号</span></router-link></div>
      </div>
    </van-overlay>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props: {
        addWxPosterShow: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState(["userInfo"])
    },
    watch: {
       addWxPosterShow(v) {
           this.show = v
       }
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        close() {
            this.$parent.addWxPosterShow = false
        },
        addWx() {
            this.$emit("addWx")
        }
    }
}
</script>

<style scoped lang="scss">
.dialog-body {
  padding: 2.125rem 1.875rem 1.875rem;
  font-size: 0.75rem;
  line-height: 1.5;
      background-color: #fff;
    border: 0;
    border-radius: .1875rem;
    background-clip: padding-box;
        min-height: 19.5rem;
    border-radius: .5rem;
    text-align: center;
        width: 18.4375rem;
        position: absolute;
    width: 19.0625rem;
    outline: none;
    top: 46%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: .75rem;
  .closeIcon {
    right: 0;
    top: 0;
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    position: absolute;
  }
  .title {
    font-family: PingFangSC-Regular;
    font-size: 1.125rem;
    color: #222;
    letter-spacing: 0;
    line-height: 1.125rem;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .content {
    width: 14.6875rem;
    height: 5.25rem;
    background: rgba(90, 105, 129, 0.06);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.9375rem 0;
    margin-top: 1.25rem;
    .sub-title {
      font-family: PingFangSC-Regular;
      font-size: 1rem;
      color: #222;
      letter-spacing: 0;
    }
    .wechat-id {
      font-size: 1rem;
      color: #222;
      letter-spacing: 0;
    }
    .wx-icon {
      position: relative;
      top: .25rem;
      right: .25rem;
      display: inline-block;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      background: url("../assets/images/wx_blue.png") no-repeat 50%/contain;
    }
  }
  .tips {
        margin-top: 1.25rem;
    font-size: .875rem;
    color: #5a6981;
    text-align: justify;
    line-height: 1.3125rem;
  }
  .btn-active {
    width: 14.6875rem;
    height: 2.75rem;
    background: #fa5050;
    font-family: PingFangSC-Medium;
    font-size: .9375rem;
    color: #fff;
    letter-spacing: 0;
    text-align: center;
    line-height: 2.75rem;
    border-radius: 6.25rem;
    margin-top: 1.25rem;
  }
  .btn-inactive {
    font-family: PingFangSC-Regular;
    font-size: .9375rem;
    letter-spacing: 0;
    text-align: center;
    line-height: .9375rem;
    margin-top: 1.25rem;
    span {
      color: #fc514d;
    }
  }
}
</style>