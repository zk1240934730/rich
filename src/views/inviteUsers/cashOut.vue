<template>
    <div id="cash-out" class="flex-col">
        <div class="bank flex-row">
            <span>到账银行卡</span>
            <router-link to="/addBank" class="f1">
                <div class="f1 flex-row flex-row-between flex-col-center">
                    <template v-if="bankInfo.bank_name">
                        <span>{{bankInfo.bank_name}}({{bankInfo.account.substring(bankInfo.account.length - 4)}})</span>
                        <van-icon name="arrow" />
                    </template>
                    <template v-else>
                        <span>立即添加</span>
                        <van-icon name="plus" />
                    </template>
                </div>
            </router-link>
        </div>
        <div class="cash-content f1">
            <div class="title">提现金额</div>
            <div class="money-input flex-row">
                <span>¥</span><input type="number" v-model="money">
            </div>
        </div>
        <van-button
            class="van-btn"
            type="primary"
            round
            size="normal"
            @click="cashOut"
            >立即提现</van-button
        >
    </div>
</template>

<script>
export default {
    data() {
        return {
            bankInfo: {
                type: 'bank',
                account: "",
                bank_name: "",
                identity_card: "",
                real_name: ""
            },
            money: ''
        }
    },
    methods: {
        getBankInfo() {
            this.$get("/api/account", {
                type: this.bankInfo.type
            }).then(res => {
                Object.assign(this.bankInfo, res.data)
            })
        },
        cashOut() {
            if(!this.money) {
                this.$toast("请输入提现金额")
                return
            }
            this.$post("/api/applyCash", {
                account_type: this.bankInfo.type,
                money: this.money
            }).then(() => {
                this.$toast("申请提现成功，等待审核")
                this.navigate("/records")
            })
        }
    },
    beforeMount() {
        this.getBankInfo()
    }
}
</script>

<style lang="scss" scoped>
#cash-out {
    height: 100%;
    width: 100%;
}
.bank {
    padding: 2rem 1.5rem;
    font-size: 0.875rem;
    > span {
        margin-right: 0.5rem;
    }
    div {
        color: #333;
    }
}
.cash-content {
    background-color: #fff;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    padding: 2rem;
    .title {
        font-size: 0.875rem;
    }
    .money-input {
        font-size: 1.5rem;
        font-weight: 700;
        margin-top: 0.25rem;
        span {
            margin-right: 0.5rem;
        }
    }
}
.van-btn {
    position: fixed;
    bottom: 0.9375rem;
    left: 50%;
    transform: translateX(-50%);
    width: 19.6875rem;
  }
</style>