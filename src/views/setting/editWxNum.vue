<template>
  <div id="edit-wx">
    <div class="edit-content">
      <div class="title">修改本人微信号</div>
      <div class="des">微信号便于您与上下级推荐人沟通联系，获得/提供辅导帮助，请填写正确账号</div>
      <div class="input-box">
        <input type="text" v-model="userInfo.wx_id">
        <van-icon name="clear" color="#5a6981" class="clear-btn" @click="clear"/>
      </div>
      <div class="tips">{{errorTip}}</div>
    </div>
    <van-button class="van-btn" type="danger" round size="large" color="#fa5050" @click="edit"
      >修改</van-button
    >
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
// import utils from '../../utils/index'
export default {
  name: "editWxNum",
  computed: {
    ...mapState(["userInfo"])
  },
  data() {
    return {
      checked: true,
      errorTip: ""
    };
  },
  methods: {
    ...mapActions(["GET_USER_INFO"]),
    edit() {
      if(!this.userInfo.wx_id) {
        this.$toast("请输入微信号")
        return
      }
      // if(!utils.checkWxNum(this.userInfo.wx_id)) {
      if(this.userInfo.wx_id.length < 6){
        this.errorTip = "输入微信号为6-20位数字、字母、下划线、减号或组合文本"
        return
      }
      this.errorTip = ""
      this.$post("/api/wxEdit", {
        wx_id: this.userInfo.wx_id
      }).then(res => {
        this.$toast(res.msg)
        setTimeout(() => {
          this.GET_USER_INFO()
          this.$router.go(-1)
        }, 2000);
      })
    },
    clear() {
      this.userInfo.wx_id = ""
      this.errorTip = ""
    }
  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
#edit-wx {
  background-image: url(../../assets/images/setting/edit-wx-bg.png);
  background-size: 100%;
  padding: 2.5rem 1.25rem 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-color: #f3f6fb;
  .edit-content {
    background: #fff;
    border: .03125rem solid #f3f3f3;
    box-shadow: 0 0.0625rem 0.6875rem 0 rgba(77,121,250,.08);
    border-radius: .375rem;
    padding: 1.875rem 1.25rem .375rem;
    min-height: 13.9375rem;
    margin-bottom: 2.5rem;
    .title {
      font-size: 1.375rem;
      line-height: 1.375rem;
      font-weight: 700;
    }
    .des {
      font-size: .75rem;
      color: #5a6981;
      line-height: 1.125rem;
      margin-top: .625rem;
      margin-bottom: 2.5rem;
    }
    input {
          border: none;
      outline: none;
      border-radius: 0;
      padding-left: .375rem;
      font-size: 1rem;
      color: #5a6981;
      width: 100%;
      padding: 0 .375rem .6875rem;
      border-bottom: 1px solid #dae0ea;
      background-color: rgba(0,0,0,0);
    }
    .input-box {
      position: relative;
    }
    .tips {
      font-family: PingFangSC-Regular;
      font-size: .75rem;
      color: #fc514d;
      letter-spacing: -.05625rem;
    }
    .clear-btn {
          width: 1rem;
      height: 1rem;
      background-size: .9375rem .9375rem;
      position: absolute;
      top: 50%;
      transform: translateY(-90%);
      right: 0;

    }
  }
}
</style>