<template>
  <div id="team">
      <div class="team-info" :style="stikyStyle" v-if="stikyStyle.position =='fixed'">
        <div class="team-title">
          <p>合伙人团队（人）</p>
          <p class="f1">本月团队总业绩（元）</p>
        </div>
        <div class="team-number">
          <p>{{teamUser.teamUserCount || 0}}</p>
          <p class="f1">{{utils.numberFormat(teamReward.teamMonthAllProfit)}}</p>
        </div>
        <div class="team-tips">
          <p>一级合伙人<span class="number">{{teamUser.teamUser1Count || 0}}人</span></p>
          <p class="f1">上月团队总业绩<span class="number">{{utils.numberFormat(teamReward.teamPreMonthAllProfit)}}元</span></p>
        </div>
    </div>
    <scroller :on-infinite="infinite" ref="myscroller" :noDataText="hasMoreData ? '' : '没有更多数据'" style="padding: 1.875rem 1.25rem 1.25rem">
      <div class="team-search" @click="searchShow = true">
        <van-icon name="search" size="20" />
        <span>请输入手机号搜索</span>
      </div>
      <h2>我的推荐人</h2>
      <div class="references">
        <div class="flex-row">
          <div class="references-user">
            <img :src="inviteUser.avatar && inviteUser.avatar.indexOf('http') == -1 ? baseImgUrl + inviteUser.avatar : inviteUser.avatar" alt="" />
            <img :src="require('../../assets/images/vip/vip_' + (inviteUser.level || 1) + '.png')" alt="" />
          </div>
          <div class="user-info">
            <p>{{inviteUser.username || inviteUser.nickname || inviteUser.mobile || '-'}}</p>
            <p>{{inviteUser.description || '-'}}</p>
          </div>
        </div>
        <div class="flex-row" style="align-items: center" :data-clipboard-text="userInfo.wx_id || userInfo.mobile" id="info_wx" @click="copy('info_wx')">
          <img class="right-wx" src="../../assets/images/wx.png" alt="" />
        </div>
      </div>
      <h2 class="flex-row flex-row-between">
        我的团队<van-button type="default" round plain size="mini" @click="type == 'all' ? type = 'yes' : type = 'all'">{{type == 'all' ? '查看有业绩下级' : '查看所有下级'}}</van-button
        >
      </h2>
      <div class="team-info" ref="teamInfo">
        <div class="team-title">
          <p>合伙人团队（人）</p>
          <p class="f1">本月团队总业绩（元）</p>
        </div>
        <div class="team-number">
          <p>{{teamUser.teamUserCount || 0}}</p>
          <p class="f1">{{utils.numberFormat(teamReward.teamMonthAllProfit)}}</p>
        </div>
        <div class="team-tips">
          <p>一级合伙人<span class="number">{{teamUser.teamUser1Count || 0}}人</span></p>
          <p class="f1">上月团队总业绩<span class="number">{{utils.numberFormat(teamReward.teamPreMonthAllProfit)}}元</span></p>
        </div>
      </div>
      <div class="content flex-col" style="background: #fff;margin-top: -0.575rem">
        <template class="team-item" v-for="item in showList" >
          <team-item :key="item.id" :detail-info="item"></team-item>
        </template>
        <div class="loading-empty flex-col flex-col-center">
          <no-data v-if="!initLoading && !showList.length"></no-data>
        </div>
      </div>
    </scroller>
    <search :search-show="searchShow" :all-data="allList"></search>
  </div>
</template>

<script>
import NoData from '../../components/empty-data.vue';
import utils from "../../utils/index.js";
import Search from './search'
import TeamItem from './components/team-item'
import { mapState } from 'vuex';
let interval = {}
export default {
  name: "team",
  components: {NoData, Search, TeamItem},
  data() {
    return {
      ajaxUrl: "/api/teamUserList",
      stikyStyle: { //吸顶属性
        position: 'relative',
        top: 0
      },
      searchShow: false,
      utils,
      teamUser: {},
      teamReward: {},
      teamLevel: {},
      inviteUser: {},
      allList: [], //所有业绩下级
      yesList: [], //有业绩下级
      showList: [], //展示的数据,默认所有
      isMounted: false, //初始化请求接口，后续走前端分页查询
      type: "all" //all 查看所有   yes  查看有业绩的下级
    };
  },
  watch: {
    type(v) {
      this.page = 1
      this.hasMoreData = true
      if(v == 'all') {
        this.showList = this.allList.slice(0, this.pageSize)
      }
      if(v == 'yes') {
        this.showList = this.yesList.slice(0, this.pageSize)
      }
      if(this.showList.length < this.pageSize) {
        this.hasMoreData = false
      }
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    // 上拉加载数据
    infinite() {
      if (!this.hasMoreData) {
        this.$refs.myscroller && this.$refs.myscroller.finishInfinite(true);
        return
      }
      if(this.isMounted) {
        this.page ++;
        this.pagination();
      } else {
        this.getListData()
      }
      this.isMounted = true
    },
    getListData() {
      if (this.page == 1) {
        this.initLoading = true
      }
      this.$get(this.ajaxUrl, {
        hideLoading: true
      }).then(res => {
        let data = res.data
        this.allList = data.yes.concat(data.no)
        this.showList = this.allList.slice(0, this.pageSize)
        if(this.showList.length < this.pageSize) {
          this.hasMoreData = false;
        }
        this.yesList = data.yes
      }).catch(() => { }).finally(() => {
        this.initLoading = false;
        this.$refs.myscroller.finishInfinite(true);
      })
    },
    //前端分页
    pagination() {
      let arr = this.allList.slice(this.pageSize * (this.page - 1 ), this.pageSize * this.page);
      this.showList = this.showList.concat(arr);
      this.$refs.myscroller.finishInfinite(true);
      if(arr.length < this.pageSize) {
        this.hasMoreData = false;
      }
    },
    //获取团队用户
    getTeamUser() {
      this.$get("/api/teamUser").then(res => {
        this.teamUser = res.data
      })
    },
    //团队总业绩
    getTeamReward() {
      this.$get("/api/teamReward").then(res => {
        this.teamReward = res.data
        this.teamLevel = this.teamReward.teamLevel
      })
    },
    myPromoter() {
      this.$get("/api/myPromoter").then(res => {
        this.inviteUser = res.data
      })
    }
  },
  beforeMount() {
    this.getTeamUser();
    this.getTeamReward();
    this.myPromoter();
  },
  mounted() {
    this.$refs.myscroller.finishInfinite(false);
    // this.getListData()
    //模拟stick  因为scroll组件关系才这么写的
    let dom = this.$refs.myscroller.$el.firstChild
    dom.addEventListener('touchmove', () => {
      const { y } = this.$refs.teamInfo.getBoundingClientRect();
      if(y <= 0) {
        this.$set(this.stikyStyle, 'position', 'fixed')
      } else {
        this.$set(this.stikyStyle, 'position', 'relative')
      }
    })
    dom.addEventListener('touchend', () => {
      if(interval.interval) {
        interval.count = 0
        clearInterval(interval.interval)
      }
      interval = {
        interval: setInterval(() => {
          const { y } = this.$refs.teamInfo.getBoundingClientRect();
          if(y <= 0) {
            this.$set(this.stikyStyle, 'position', 'fixed')
          } else {
            this.$set(this.stikyStyle, 'position', 'relative')
          }
          interval.count ++
          if(interval.count >= 10) {
            interval.count = 0
            clearInterval(interval.interval)
          }
        }, 100),
        count: 0
      }
    })
  }
};
</script>

<style lang="scss" scoped>
#team {
  width: 100%;
  height: 100%;
  padding: 1.875rem 1.25rem 1.25rem;
  background: url(../../assets/images/invite/bg.png) top no-repeat;
  background-size: 100%;
  .team-search {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.25rem;
    background: #fff;
    border-radius: 0.375rem;
    margin-bottom: 1.25rem;
    color: #838c9e;
    font-size: 0.9375rem;
    font-family: PingFangSC-Regular;
    line-height: 2.25rem;
    span {
      margin-left: 0.40625rem;
    }
  }
  h2 {
    font-family: PingFangSC-Semibold;
    margin-bottom: 0.78125rem;
    font-size: 1rem;
    color: #222;
    font-weight: 700;
    button {
      border: 1px solid rgba(90, 105, 129, 0.4);
      font-size: 0.75rem;
      color: #5a6981;
      padding: 0 0.5rem;
      font-weight: 400;
    }
  }
  .references {
    width: 20.9375rem;
    margin-bottom: 1.875rem;
    height: 3.125rem;
    background-image: linear-gradient(146deg, #ffebe7 1%, #fff9f9);
    border-radius: 1.84375rem;
    color: #222;
    position: relative;
    display: flex;
    justify-content: space-between;
    &-user {
      width: 3.125rem;
      height: 3.125rem;
      position: relative;
      > img:first-child {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      > img:last-child {
        width: 1.5125rem;
        height: 1.2625rem;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    .user-info {
      vertical-align: top;
      display: inline-block;
      width: 11.0625rem;
      height: 3.125rem;
      margin-left: 0.8125rem;
      overflow: hidden;
      > p:first-child {
        padding-top: 0.225rem;
        padding-bottom: 0.25rem;
        width: 100%;
        font-family: PingFangSC-Semibold;
        font-size: 0.875rem;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      > p:last-child {
        font-size: 0.75rem;
        font-weight: 400;
      }
    }
    .right-wx {
      width: 1.25rem;
      width: 1.25rem;
      margin-right: 1.25rem;
    }
  }
  .team-info {
    padding: 1rem 1.25rem 1.25rem;
    width: 20.9375rem;
    height: 7.2375rem;
    border-radius: 0.5rem 0.5rem 0 0;
    background: url(../../assets/images/team/team_bg.png) 50% no-repeat;
    background-size: 100%;
    position: relative;
    z-index: 1;
    > div {
      color: #fff;
      text-align: left;
      display: flex;
      > p:first-child {
        width: 8.75rem;
      }
    }
    .team-title {
      font-size: 0.8125rem;
    }
    .team-number {
      margin: 0.5rem 0;
      font-family: FDCfont-Bold;
      font-size: 1.25rem;
      line-height: 1.375rem;
    }
    .team-tips {
      font-size: 0.75rem;
      color: #ffebeb;
    }
  }
}
</style>