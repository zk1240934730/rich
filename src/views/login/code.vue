<template>
  <div id="code">
    <div class="top-tips flex-row flex-col-center">
      <van-icon name="sign" size="30" />
      <div>
        推小花合伙人注册<span>零费用</span>，如果违规收费情况，可在【推小花】公众号投诉举报
      </div>
    </div>
    <div class="code-content">
      <div>
        <input placeholder="请输入邀请码" v-model="invite_code"/>
        <p class="tips">邀请码可从邀请人处获得</p>
      </div>
      <div>
        <input placeholder="请输入微信号" v-model="wx_id"/>
        <p class="tips" :style="{color: errorTip ? 'red': ''}">
          {{errorTip ? errorTip : '微信号便于您与上下级推荐人沟通联系，获得/提供辅导帮助，请填写正确账号'}}
        </p>
      </div>
    </div>
    <van-button
      class="van-btn"
      type="danger"
      round
      size="large"
      color="#fa5050"
      @click="confirm"
      >确定
    </van-button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
        invite_code: "",
        errorTip: "",
        wx_id: ''
    };
  },
  methods: {
      ...mapActions(["GET_USER_INFO"]),
      async confirm() {
          if(!this.invite_code) {
            this.$toast("请填写邀请码")
            return
          }
          try {
            await this.bindCode()
            if(this.wx_id) {
                await this.bindWx()
                await this.$post("/api/wxEdit", {
                    wx_id: this.wx_id
                })
            }
            this.$toast("绑定成功")
            await this.GET_USER_INFO()
            this.navigate("/index", 0)
          } catch (e){
              console.log(e)
          }
      },
      bindCode() {
          return this.$post("/api/inviteCode", {
            invite_code: this.invite_code
          })
      },
      bindWx() {
        return new Promise((resolve, reject) => {
            if(this.wx_id.length < 6) {
                this.errorTip = "输入微信号为6-20位数字、字母、下划线、减号或组合文本"
                reject("微信号格式错误")
                return
            }
            this.errorTip = ""
            resolve()
        })
        
      }
  },
  mounted() {
    //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    //   userInfo.invite_code = ""
    //   localStorage.setItem("userInfo", JSON.stringify(userInfo))
  }
};
</script>

<style lang="scss" scoped>
#code {
  width: 100%;
  height: 100%;
  padding: 2rem;
}
.top-tips {
  background: #c1e9e3;
  border-radius: 0.5rem;
  padding: 0.4rem 0.75rem;
  font-size: 0.785rem;
  color: #14534a;
  > div {
    margin-left: 0.5rem;
  }
}
.code-content {
  margin-top: 0.785rem;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem 0.785rem;
  margin-bottom: 2.5rem;
  div {
    margin-bottom: 1.5rem;
  }
  input {
    border-bottom: 1px solid #e2e2e2;
    width: 100%;
    height: 2rem;
    position: relative;
    &::before {
      width: 1px;
      height: 1rem;
      position: absolute;
      left: 0;
      background: #999;
    }
  }
  .tips {
    font-size: 0.775rem;
    margin-top: 0.5rem;
  }
}
</style>