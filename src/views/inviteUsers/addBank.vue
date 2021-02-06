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
                type="number"
                placeholder="请输入身份证号"
                :rules="[{ required: true, message: '请输入身份证号' }]"
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
            actions: [{ name: '工商银行' }, { name: '建设银行' }, { name: '招商银行' }],
            bankInfo: {
                type: 'bank',
                account: "",
                bank_name: "",
                identity_card: "",
                real_name: ""
            }
        }
    },
    methods: {
        onSelect(item) {
            this.show = false;
            this.bankType = item.name;
        },
        onSubmit() {
            this.$post("/api/addAccount", {
                type: this.bankInfo.type,
                account: this.bankInfo.account,
                bank_name: this.bankInfo.bank_name,
                identity_card: this.bankInfo.identity_card,
                real_name: this.bankInfo.real_name
            }).then(() => {
                this.$toast("绑定成功")
                this.navigate("/cashOut", 1000)
            })
        },
        getBankInfo() {
            this.$get("/api/account", {
                type: this.bankInfo.type
            }).then(res => {
                Object.assign(this.bankInfo, res.data)
                console.log(this.bankInfo)
            })
        }
    },
    beforeMount() {
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