/** 
    
*/
<template>
  <div id="login" full-screen>
    <img src="../../assets/images/login/notLoggedInBg.png" alt="北京图片" />
    <div class="current-account">
      <span>注册合伙人不收取任何费用</span>
    </div>
    <div class="login-button" @click="show = true"></div>
    <van-popup v-model="show">
      <div class="dialog-login">
        <div class="pass-login">
          <!-- 登录表单 -->
          <form action="">
            <div class="phone">
              <input type="tel" placeholder="请输入您的手机号码" />
            </div>
            <div class="password">
              <input class="f6" type="password" placeholder="请输入验证码" />
              <span class="f4">获取验证码</span>
            </div>
            <button class="submit-btn">免费注册/登录</button>
          </form>
          <!-- 前往第三方h5登录 -->
          <div class="h5-login">账号密码登录</div>
          <!-- 相关协议 -->
          <div class="form-aggrement">
              <span>同意 </span>
              <p class="f1"><span> 有钱花用户服务协议 </span>、<span> 隐私政策 </span> 和 <span> 用户信息授权协议 </span>；同时同意 <span> 百度用户协议 </span>、<span>隐私政策</span></p>
          </div>
        </div>
        <div class="close-btn" @click="show = false"></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style scoped lang="scss">
#login {
  background-color: #ff4d57;
  position: relative;
  .van-popup {
    overflow-y: initial;
  }
  img {
    width: 100%;
    height: auto;
  }
  .login-button {
    width: 14.4375rem;
    height: 3.375rem;
    background-image: url("../../assets/images/login/loginBtn.png");
    background-size: 100%;
    position: absolute;
    top: 22.0625rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .current-account {
    position: absolute;
    top: 19.9375rem;
    left: 50%;
    width: 100%;
    padding: 0 3.75rem;
    transform: translateX(-50%);
    font-size: 0.8125rem;
    color: #fff;
    display: flex;
    justify-content: center;
  }
  .dialog-login {
    width: 20.3125rem;
    height: 25.9475rem;
    background: url("../../assets/images/login/passBg.png") no-repeat;
    background-size: contain;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: left;
    .pass-login {
      margin: -0.625rem 1.25rem 0 1.25rem;
      font-size: 0.8125rem;
      line-height: 2.5rem;
      padding-left: 0.3125rem;
      padding-right: 0.3125rem;
      height: auto;
      form {
        padding-top: 10rem;
        > div {
          box-shadow: none;
          border: none;
          width: 100%;
          height: 2.625rem;
          background: #fff;
          border: 0.03125rem solid #fff;
          border-radius: 0.3125rem;
          margin: 0 auto 0.625rem;
          text-align: left;
          line-height: 2.625rem;
          padding-left: 0.625rem;
          display: flex;
          align-items: center;
          input {
            height: 1.5625rem;
          }
        }
        .password {
          input {
            border-right: 0.03125rem solid #aaabbb;
          }
          span {
            display: inline-block;
            text-align: center;
            margin-right: 0;
            font-size: 0.8125rem;
            font-weight: 400;
            color: #c30a22;
            background: rgba(0, 0, 0, 0);
            border: none;
            color: #3357ff;
          }
        }
        .submit-btn {
          width: 12.1875rem;
          height: 2.6875rem;
          background: -webkit-linear-gradient(86deg, #fbd781, #fff6e0);
          background: -o-linear-gradient(86deg, #fbd781, #fff6e0);
          background: linear-gradient(4deg, #fbd781, #fff6e0);
          box-shadow: -0.03125rem -0.03125rem 0 0 hsla(0, 0%, 100%, 0.74);
          font-size: 1.125rem;
          color: #d32121;
          font-weight: 700;
          border-radius: 1.5625rem;
          border: none;
          margin-top: 0.46875rem;
          margin-left: 50%;
          transform: translateX(-50%);
        }
      }
      .h5-login {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 50%);
        bottom: 5.3125rem;
        font-size: 0.8125rem;
        font-family: FZLanTingHeiS-R-GB;
        font-weight: 400;
        color: #c50300;
        line-height: 3.75rem;
        &::after {
          content: "";
          display: inline-block;
          width: 0;
          height: 0;
          border-top: 0.25rem solid rgba(0, 0, 0, 0);
          border-bottom: 0.25rem solid rgba(0, 0, 0, 0);
          border-left: 0.3125rem solid #c50300;
          margin-left: 0.1875rem;
        }
      }
      .form-aggrement {
              color: #fff;
            opacity: .8;
            font-size: 1.375rem;
            margin-top: 1.875rem;
            line-height: 1.4375rem;
            text-align: center;
            transform: scale(.5) translateX(-50%);
            width: 200%;
            transform-origin: center;
            margin-bottom: 1.09375rem;
            display: flex;
            line-height: 2.1rem;
            text-align: left;
      }
    }
    .close-btn {
      height: 2.75rem;
      width: 2.75rem;
      background-image: url(data:image/png;base64,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);
      bottom: -3.75rem;
      background-size: 100% auto;
      left: 50%;
      position: absolute;
      transform: translate(-50%);
    }
  }
}
</style>