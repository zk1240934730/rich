<template>
    <div id="search-content" v-if="show">
        <div class="search-head">
            <search
                v-model="phone"
                show-action
                placeholder="请输入手机号搜索"
                @search="onSearch"
                @cancel="onCancle"
                clear-trigger="focus"
            />
        </div>
        <div class="f1" style="background: #fff" v-if="searchArr.length">
            <template v-for="item in searchArr">
                <team-item :detail-info="item" :key="item.id"></team-item>    
            </template> 
        </div>
        <div class="f1 loading-empty flex-col flex-col-center">
            <no-data v-if="!searchArr.length"></no-data>
        </div>  
    </div>
</template>

<script>
import { Search } from 'vant';
import TeamItem from './components/team-item'
import NoData from '../../components/empty-data.vue';
export default {
    components: { Search, TeamItem, NoData },
    props: {
        allData: {
            type: Array,
            default() {
                return []
            }
        },
        searchShow: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        searchShow(v) {
            this.show = v
        },
        phone(v) {
            if(!v) {
                this.searchArr = []
                return
            }
            this.searchArr = this.allData.filter(item => item.user_info.mobile.indexOf(v) != -1)
        }
    },
    data() {
        return {
            phone: '',
            searchArr: [],
            show: false
        }
    },
    methods: {
        onSearch() {},
        onCancle() {
            this.$parent.searchShow = false
        }
    }
}
</script>

<style scoped lang="scss">
#search-content {
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #f3f6fb;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    .search-head {
        padding: 1.875rem 1.25rem 0 1.25rem;
        .van-search {
            background: transparent;
            .van-search__content {
                background: #fff;
            }
        }
    }
}
</style>