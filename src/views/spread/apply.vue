<template>
    <div id="apply">
        <div class="banner">
            <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2702410925,505441900&fm=26&gp=0.jpg" alt="">
        </div>
        <div class="top flex-col flex-col-center">
            <div class="title">最高额度可达(元)</div>
            <div class="money">{{numberFormat(500000, 2)}}</div>
            <div class="top-tip flex-row">
                <span>快速放贷</span>
                <span>利息低</span>
                <span>贷款期限长</span>
            </div>
        </div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="formInfo.real_name"
                name="real_name"
                label="真实姓名："
                placeholder="请输入申请人真实姓名"
                :rules="[{ required: true, message: '请输入申请人真实姓名' }]"
            />
            <van-field
                v-model="formInfo.card_number"
                name="card_number"
                label="身份证号："
                placeholder="申请人身份证号"
                :rules="[{ pattern: 
/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, required: true, message: '请输入正确的申请人身份证号' }]"
            />
            <van-field
                v-model="formInfo.mobile"
                type="number"
                name="mobile"
                label="手机号码："
                placeholder="申请人手机号"
                :rules="[{ pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, required: true, message: '请输入正确的申请人手机号' }]"
            />
            <van-field
                v-model="formInfo.address"
                name="address"
                type="select"
                label="城市选择："
                readonly
                placeholder="请选择城市"
                :rules="[{ required: true, message: '请选择城市' }]"
                right-icon="arrow"
                @click="popupShow = true"
            />
            <div class="choose">
                <div class="choose-title">请选择您满足的资质（多选）：</div>
                <div class="choose-content flex-row">
                    <span v-for="(item, index) in tags" @click="chooseTag(index)" :key="index" :class="item.selected ? 'active' : ''">{{item.name}}</span>
                </div>
            </div>

            <div style="margin: 16px;">
                <van-button color="#f0560f" block type="warning" native-type="submit">立即申请</van-button>
            </div>
        </van-form>
        <van-popup v-model="popupShow" position="bottom" >
            <van-area @cancel="popupShow = false" @confirm="confirm" title="" :area-list="areaList" value="110101" :columns-num="2"/>
        </van-popup>
    </div>    
</template>

<script>
import { Form, Field, Area } from 'vant';
import areaJson from '../../utils/area'
import util from '../../utils/index'

export default {
    name: "apply",
    components: { VanForm: Form, VanField: Field, VanArea: Area},
    data() {
        return {
            formInfo: {
                real_name: "",
                card_number: "",
                mobile: "",
                address: "",
                province: "",
                city: "",
                tags: [],
                user_id: "",
                openid: ""
            },
            popupShow: false,
            areaList: areaJson,
            numberFormat: util.numberFormat,
            tags: [
                {
                    name: '公积金',
                    selected: false
                },
                {
                    name: '保单',
                    selected: false
                },
                {
                    name: '房贷',
                    selected: false
                },
                {
                    name: '代发工资',
                    selected: false
                },
                {
                    name: '营业执照',
                    selected: false
                },
                {
                    name: '车贷',
                    selected: false
                },
                {
                    name: '全款房',
                    selected: false
                },
                {
                    name: '全款车',
                    selected: false
                },
                {
                    name: '按揭车',
                    selected: false
                },
                {
                    name: '无',
                    selected: false
                }
            ]
        }
    },
    methods: {
        onSubmit() {
            let filterArr = this.tags.filter(item => item.selected)
            if(!filterArr.length) {
                this.$toast("请至少选择一个资质")
                return
            }
            let arr = []
            filterArr.forEach(item => {
                arr.push(item.name)
            })
            this.formInfo.tags = arr.join(",")
            this.$post("/api/borrowApply", this.formInfo).then((res) => {
                this.$toast("提交成功")
                setTimeout(() => {
                    window.location.href = res.data.url
                }, 1000)
            })
        },
        confirm(e) {
            this.$set(this.formInfo, "province", e[0].name)
            this.$set(this.formInfo, "city", e[1].name)
            this.$set(this.formInfo, "address", e[0].name + e[1].name)
            this.popupShow = false
        },
        chooseTag(index) {
            this.tags[index].selected = !this.tags[index].selected
            this.$forceUpdate()
        }
    },
    mounted() {
        this.formInfo.user_id = this.$route.query.user_id
        let auth = this.$route.query.auth
        if(auth) {
            this.formInfo.openid = auth
        }
        if(auth || !util.isWeiXin()) return
        // window.location.href = window.location.origin + '/api/wxAuth?phone=' + this.phone + '&sms=' + this.code
        window.location.href = "http://tuiyouqian.wudaojz.com/api/applyAuth?user_id=" + this.formInfo.user_id
    }
}
</script>

<style lang="scss" scoped>
#apply{
    // height: 100%;
    width: 100%;
    background: #fff;
    .banner {
        width: 100%;
        height: 12.785rem;
        background: #e2e2e2;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .top {
        border-bottom: 1px solid #e2e2e2;
        padding: 1rem 0;
        .title {
            font-size: 0.875rem;
        }
        .money {
            font-size: 2.125rem;
            color: #f0560f;
            font-weight: bold;
        }
        .top-tip {
            span {
                padding: 0 0.785rem;
                position: relative;
                font-size: 0.785rem;
                color: #999;
            }
            span::after {
                content: "";
                position: absolute;
                width: 2px;
                height: 60%;
                background: #999;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
            span:last-child:after {
                display: none;
            }
        }
    }
    .choose {
        padding: 10px 16px;
        font-size: 14px;
        color: #646566;
        .choose-content {
            flex-wrap: wrap;
            margin-top: 0.575rem;
            span {
                margin-right: 0.375rem;
                margin-bottom: 0.5rem;
                padding: 0.275rem 0.375rem;
                border: 1px solid #e2e2e2;
                border-radius: 0.125rem;
                font-size: 0.785rem;
                transition: all linear .3s;
                &.active {
                    color: #fff;
                    background: #f0560f;
                }
            }
        }   
    }
}
</style>