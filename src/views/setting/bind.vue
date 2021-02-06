<template>
    <div id="bind">
        <img class="logo" src="../../assets/logo.png" />
        <div class="title">账号绑定</div>
        <div class="tips" v-if="!userInfo.wx_is_bind">您的推小花账号将与微信账号绑定，可实时接受额度变动、还款提醒等消息</div>
        <div class="tips" v-else>您的推小花账号（{{userInfo.username}}）已与当前微信账号（{{userInfo.nickname}}）绑定。你可以通过推小花公众号实时接收邀请成功、奖励到账提醒等消息。</div>
        <div class="content flex-row flex-row-around flex-col-center">
            <div class="content-left flex-col flex-row-center flex-col-center">
                <img class="user-avatar" :src="userInfo.avatar && userInfo.avatar.indexOf('http') == -1 ? baseImgUrl + userInfo.avatar : userInfo.avatar" alt="">
                <p>推小花账号</p>
                <span>{{userInfo.username || "-"}}</span>
            </div>
            <div class="content-center">
                <img :src="require('../../assets/images/setting/' + (userInfo.wx_is_bind ? '' : 'un-') + 'bind.png')" alt="">
            </div>
            <div class="content-right flex-col flex-row-center flex-col-center">
                <img class="user-avatar" :src="userInfo.avatar && userInfo.avatar.indexOf('http') == -1 ? baseImgUrl + userInfo.avatar : userInfo.avatar" alt="">
                <p>微信昵称</p>
                <span>{{userInfo.nickname}}</span>
            </div>
        </div>
        <div class="fixed-btn">
            <van-button
                class="van-btn"
                type="danger"
                round
                size="large"
                color="#fa5050"
                @click="btnConfirm"
                >{{userInfo.wx_is_bind == 1 ? '我知道了' : '一键绑定'}}</van-button>
            <div class="no-bind" v-if="userInfo.wx_is_bind == 1" @click="cancleBind">解除当前绑定</div>
            <div class="no-bind" v-else @click="navigateBack">暂不绑定</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'bind',
    computed: {
        ...mapState(["userInfo"])
    },
    data() {
        return {

        }
    },
    methods: {
        ...mapActions(["GET_USER_INFO"]),
        cancleBind() {
            this.$dialog.confirm({
                title: '',
                message: '解绑后将不能为您提供消息提醒等便捷服务，是否确认解绑？',
                theme: 'round-button',
                confirmButtonText: '解绑',
            }).then(() => {
                // on close
                console.log('122')
                this.wxBind()
            }).catch(() => {});
        },
        //绑定/解绑
        wxBind() {
            this.$post("/api/wxBind", {
                bind: this.userInfo.wx_is_bind == 1 ? 0 : 1,
            })
            .then(() => {
                this.$toast(this.userInfo.wx_is_bind == 1 ? "解绑成功" : '绑定成功')
                this.GET_USER_INFO();
            })
            .catch(() => {}).finally(() => {
            })
        },
        btnConfirm() {
            this.userInfo.wx_is_bind == 1 ? this.navigateBack() : this.wxBind()
        },
        navigateBack() {
            this.$router.push("/setting")
        }
    }
}
</script>

<style scoped lang="scss">
    #bind {
        width: 100%;
        height: 100%;
        padding: 3.375rem 1.25rem 5.625rem;
        background-color: #f2f5fb;
        background-size: 100%;
        .logo {
            width: 2.575rem;
            height: auto;
        }
        .title {
            font-size: 1.875rem;
        }
        .tips {
            font-family: PingFangSC-Regular;
            font-size: 0.7875rem;
            color: #5a6981;
            line-height: 1.1875rem;
            margin-top: 1.675rem;
        }
        .content {
            border-radius: 0.5rem;
            background: #fff;
            padding: 1.875rem;
            margin-top:1rem;
            img.user-avatar {
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                background-color: #e2e2e2;
                margin-bottom: .785rem;
            }
            &-center img {
                width: 2.375rem;
                height: auto;
            }
            > div {
                p {
                    font-size: 0.7875rem;
                    color: #5a6981;
                    margin-bottom: .285rem;
                }
                span {
                    font-size: 1.275rem;
                    font-weight: 700;
                }
            }
        }
        .fixed-btn {
            position: fixed;
            bottom: 0.9375rem;
            left: 50%;
            transform: translateX(-50%);
            width: 19.6875rem;
            .no-bind {
                font-size: 0.8875rem;
                color: #5a6981;
                margin-top: 1rem;
                width: 100%;
                text-align: center;
            }
        }
    }
</style>