<template>
  <div id="invite-users">
    <div class="tabs">
      <div class="tab-item" :class="tabIndex == index ? 'active' : ''" @click="changeTab(item.status, 'status', index)" v-for="(item, index) in tabList" :key="item.status">{{item.name}}</div>
    </div>
    <div class="content flex-col">
      <scroller :on-infinite="infinite" ref="myscroller" :noDataText="listData.length ? '没有更多数据' : ''">
        <template v-for="item in inviteUserRemark">
          <div class="tips" :key="item.name" v-if="item.name == tabList[tabIndex].name && tabIndex != 0">
            <!-- 全部 -->
            <template v-if="tabIndex == 0">
              <div class="tips-title flex-row">
                <span>{{item.content.remark.name}}</span>
                <router-link to="/orderList"><span>查看订单</span></router-link>
              </div>
              <div class="remind">
                {{item.content.remark.content}}
              </div>
            </template>
            <!-- 待申请 待借款 已借款 -->
            <template v-if="tabIndex == 1 || tabIndex == 2 || tabIndex == 3">
              <div class="tips-title">
                <template v-if="tabIndex != 3">
                  <span>{{item.content.status.name}}：</span>
                  <p style="display: inline">{{item.content.status.content}}</p>
                </template>
                <template v-else>
                  <span>{{item.content.status.name}}：</span>
                  <p style="display: inline">{{item.content.status.content}}</p>
                  <router-link to="/records"><span style="float: right">收入记录</span></router-link>
                </template>
              </div>
              <div class="tips-title" style="margin-top: .3125rem;">
                <span>{{item.content.remark.name}}：</span>
                <p style="display: inline">{{item.content.remark.content}}</p>
              </div>
            </template>
            <!-- 失效用户 -->
            <template v-if="tabIndex == 4">
              <div class="error-tip">{{item.content.remark.content}}</div>
            </template>
          </div>
        </template>
        <div class="user-item flex-row" v-for="item in listData" :key="item.id">
          <img :src="item.avatar && item.avatar.indexOf('http') == -1 ? baseImgUrl + item.avatar : item.avatar" alt="">
          <div class="f1">
            <div class="user-item-top flex-row flex-row-between flex-col-center">
              <span class="f2">{{item.mobile}}</span>
              <span class="f1">{{item.status | statusFormat}}</span>
            </div>
            <div class="user-item-btm flex-row flex-row-between flex-col-center">
              <span>{{item.nickname}}</span>
              <span>{{item.created_at}}</span>
            </div>
          </div>
        </div>
        <div class="loading-empty flex-col flex-col-center">
          <no-data v-if="!initLoading && !listData.length" :btm-show="true" btn-text="信贷服务推广" @emitClick="emitClick"></no-data>
        </div>
      </scroller>
    </div>
    <share-mask :shareMaskShow="shareMaskShow" btn-text="我已了解，继续推广"></share-mask>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import NoData from '../../components/empty-data'
import ShareMask from '../../components/share-mask'
export default {
  name: "inviteUsers",
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
    NoData,
    ShareMask
  },
  data() {
    return {
      params: {
        status: 0
      },
      shareMaskShow: false,
      // ajaxUrl: '/api/inviteUserList',
      ajaxUrl: '/api/applyList',
      tabList: [
        {
          name: '全部',
          status: null
        },
        {
          name: '待申请',
          status: 1
        },
        {
          name: '待借款',
          status: 2
        },
        {
          name: '已借款',
          status: 3
        },
        {
          name: '无效用户',
          status: 4
        }
      ],
      inviteUserRemark: []
    };
  },
  filters: {
    statusFormat(status) {
      let arr = ["", "待申请", "待借款", "已借款", "已过有效期"]
      return arr[status];
    }
  },
  methods: {
    //获取文案
    getInviteUserRemark() {
      this.$get("/api/inviteUserRemark", {
        hideLoading: true
      }).then(res => {
        this.inviteUserRemark = res.data
      })
    },
    //提供给子组件调用
    emitClick() {
      this.shareMaskShow = true; 
      this.$store.commit('SET_SHARE_TYPE', 'borrow')
    }
  },
  beforeMount() {
    this.getInviteUserRemark()
  },  
  mounted() {
    this.$refs.myscroller.finishInfinite(false);
  }
};
</script>

<style lang="scss" scoped>
#invite-users {
  background: url(../../assets/images/invite/bg.png) no-repeat;
  background-color: #f3f6fb;
  background-size: 100%;
  padding: 0 1.25rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .tabs {
    height: 3.75rem;
    display: flex;
    justify-content: space-between;
    color: #5a6981;
    flex-shrink: 0;
    padding: 0 0.625rem;
    .tab-item {
      padding-top: 2.0625rem;
      font-size: 0.8125rem;
      height: 100%;
      text-align: center;
      &.active {
        font-weight: 700;
        color: #222;
        position: relative;
        font-size: 1rem;
        &::after {
          position: absolute;
          content: "";
          display: block;
          height: 0.1875rem;
          width: 0.9375rem;
          bottom: 0;
          background: #fa5050;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
  .content {
    margin: 1.25rem 0 0;
    flex: 1;
    border: 0 solid rgba(216, 221, 225, 0.34);
    box-shadow: 0 0.03125rem 0.15625rem 0 rgba(234, 240, 255, 0.7);
    border-radius: 0.5rem 0.5rem 0 0;
    overflow: hidden;
    position: relative;
    background-color: #fff;
    .tips {
      font-size: 0.75rem;
      color: #222;
      line-height: 1.1875rem;
      background: #fff7f7;
      margin: 1.25rem 1.25rem 0;
      padding: 0.9375rem;
      color: #101010;
      font-size: 0.75rem;
      line-height: 1.09375rem;
      position: relative;
      &-title {
        justify-content: space-between;
        span:first-child {
          font-weight: 700;
        }
        span:last-child {
          color: #fa5050;
          font-size: 0.75rem;
          &::after {
            content: "";
            display: inline-block;
            width: 0;
            height: 0;
            border-top: 0.25rem solid rgba(0, 0, 0, 0);
            border-bottom: 0.25rem solid rgba(0, 0, 0, 0);
            border-left: 0.3125rem solid #fa5050;
            margin-left: 0.375rem;
            transform: translateY(-0.03125rem);
          }
        }
      }
    }
    .remind {
      margin-top: 0.3125rem;
    }
    .error-tip {
      font-size: 0.75rem;
      color: #fa5050;
    }
    .user-item {
      padding: 1.25rem 0;
      border-bottom: 1px solid rgba(218,224,234,.5);
      color: #5a6981;
      margin: 0 1.25rem;
      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-right: 0.5rem;
      }
      > div {
        overflow: hidden;
      }
      .user-item-top {
        width: 100%;
        overflow: hidden;
        span:first-child {
          height: 1rem;
          line-height: 1rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: .875rem;
          font-weight: 700;
        }
        span:last-child {
          text-align: right;
        }
      }
      .user-item-btm {
        margin-top: .4375rem;
        font-size: .75rem;
      }
    }
  }
}
</style>