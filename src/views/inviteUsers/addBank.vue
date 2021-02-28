<template>
    <div id="add-bak">
        <van-form @submit="onSubmit">
            <field
                v-model="bankInfo.real_name"
                name="持卡人姓名"
                label="持卡人姓名"
                placeholder="请输入持卡人姓名"
                :rules="[{ required: true, message: '请输入持卡人姓名' }]"
            />
            <field
                v-model="bankInfo.mobile"
                type="number"
                name="mobile"
                label="手机号码："
                placeholder="请输入手机号"
                :rules="[{ pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, required: true, message: '请输入正确的手机号' }]"
            />
            <field
                v-model="bankInfo.bank_name"
                name="所属银行"
                label="所属银行"
                readonly
                :right-icon="actionShow ? 'arrow-up' : 'arrow-down'"
                placeholder="请选择所属银行"
                :rules="[{ required: true, message: '请选择所属银行' }]"
                @click="actionShow = true"
            />
            <field
                v-model="bankInfo.account"
                label="银行卡号"
                type="number"
                placeholder="请输入银行卡号"
                :rules="[{ required: true, message: '请输入银行卡号' }]"
            />
            <!-- <field
                v-model="bankAddress"
                label="开户行地址"
                placeholder="请输入开户行地址"
                :rules="[{ required: true, message: '请输入开户行地址' }]"
            /> -->
            <field
                v-model="bankInfo.identity_card"
                label="身份证号"
                placeholder="请输入身份证号"
                :rules="[{ pattern: 
/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, required: true, message: '请输入正确的身份证号' }]"
            />
            <div class="fixed-btn">
                <van-button round block type="primary" native-type="submit">立即绑定</van-button>
            </div>
        </van-form>
        <action-sheet 
            v-model="actionShow" 
            :actions="actions" 
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
            @cancel="actionShow = false"
        />
    </div>
</template>

<script>
import { Form, Field, ActionSheet } from 'vant'

export default {
    components: { VanForm: Form, Field, ActionSheet },
    data() {
        return {
            actionShow: false,
            actions: [],
            bankInfo: {
                type: 'bank',
                account: "",
                bank_name: "",
                identity_card: "",
                real_name: "",
                mobile: "",
                id: ""
            }
        }
    },
    methods: {
        onSelect(item) {
            this.show = false;
            this.bankInfo.bank_name = item.name;
        },
        onSubmit() {
            this.$post("/api/addAccount", this.bankInfo).then(() => {
                this.$toast("绑定成功")
                this.navigate("/cashOut", 1000)
            })
        },
        getBankInfo() {
            this.$get("/api/account", {
                type: this.bankInfo.type
            }).then(res => {
                let data = res.data
                if(Object.prototype.toString.apply(data).toLowerCase().indexOf('array') != -1) {
                    Object.assign(this.bankInfo, data[0])
                    return
                }
                Object.assign(this.bankInfo, data)
            })
        },
        getBank() {
            this.$get("/api/bank").then(res => {
                this.actions = res.data || this.actions
            })
        }
    },
    beforeMount() {
        this.getBank()
        this.getBankInfo()
    }
}
</script>

<style lang="scss" scoped>
.fixed-btn {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 1.5rem;
    width: 85%;
}
</style>