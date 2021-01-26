<template>
  <div id="spread" class="flex-col">
    <div class="tabs">
      <div class="tab-item" :class="activeId ? '' : 'active'" @click="changeTab(null)">全部</div>
      <div class="tab-item" :class="activeId  == item.id ? 'active' : ''" v-for="item in cateList" :key="item.id" @click="changeTab(item.id)">{{item.name}}</div>
    </div>
    <div class="content f1">
      <scroller :on-infinite="infinite" ref="myscroller" :noDataText="listData.length ? '没有更多数据' : ''">
        <div class="list-item" v-for="item in listData" :key="item.id">
          <div class="time">
            <span class="date" v-if="!dateFormat(item.created_at).month">{{dateFormat(item.created_at).day}}</span>
            <span class="date" v-else style="color: #fa5050; font-size: .875rem;font-family: DXMfont-Regular;font-weight: 400"><span style="font-size: 1.125rem;font-weight: 600;color: #fa5050;font-family: DXMfont-Bold;">{{dateFormat(item.created_at).month}}</span>{{dateFormat(item.created_at).day}}月</span>
            <span class="time-text">{{dateFormat(item.created_at).hour}}</span>
          </div>
          <div class="center-content" v-html="item.content"></div>
          <div class="img-list">
            <img
              :src="_item"
              alt=""
              v-for="(_item, index) in item.images"
              :key="index + _item"
              @click="previewImg(item, index)"
            />
          </div>
          <div class="clipboard-btn" id="text-clipboard" :data-clipboard-text="item.content.replace(/<\/?.+?\/?>/g, '')" @click="copy('text-clipboard')">复制文案</div>
        </div>
        <div class="loading-empty flex-col flex-col-center">
          <no-data v-if="!initLoading && !listData.length"></no-data>
        </div>
      </scroller>
    </div>
    <van-image-preview v-model="show" :images="previewItem.images || []" @change="onChange" :startPosition="previewIndex"></van-image-preview>
    <div class="content-wrapper" v-if="show">
      <div class="content" v-html="previewItem.content"></div>
      <div class="clipboard-btn" id="preview-clipboard" :data-clipboard-text="previewItem.content.replace(/<\/?.+?\/?>/g, '')" @click="copy('preview-clipboard')">复制文案</div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import utils from '../../utils/index';
import NoData from '../../components/empty-data'
export default {
  name: "spread",
  components: {
    NoData,
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data() {
    return {
      listData: [],
      dateFormat: utils.dateFormat,
      cateList: [], //分类列表
      activeId: null, //选中的tab
      initLoading: false, //初始加载
      hasMoreData: true, //是否有更多数据
      page: 1,
      pageSize: 10,
      show: false, //图片预览
      previewIndex: 0, //图片预览当前下标
      previewItem: {} //当前预览的信息
    };
  },
  methods: {
    onChange(index) {
      this.index = index;
    },
    //获取分类列表
    getPostCateList() {
      this.$get("/api/postCateList", {
        hideLoading: true
      }).then(res => {
        this.cateList = res.data
      })
    },
    // 记载数据
    infinite() {
      if(!this.hasMoreData) {
        this.$refs.myscroller.finishInfinite(true);
        return
      }
      
      this.getPostList()
      this.page ++;
    },
    //获取列表数据
    getPostList() {
      if(this.page == 1) {
        this.initLoading = true
        this.listData = []
      }
      this.loading = true;
      this.$get("/api/postList", {
        cate_id: this.activeId,
        page: this.page,
        hideLoading: true
      }).then(res => {
        let data = res.data.data
        if(data.length < this.pageSize) {
          this.hasMoreData = false
        }
        data.forEach(item => {
          let arr = item.images.split(",")
          item.images = []
          arr.forEach(ele => {
            item.images.push(this.baseImgUrl + ele)
          })
        })
        this.listData = this.page == 1 ? data : this.listData.concat(data)
        console.log(this.listData)
      }).catch(() => {}).finally(() => {
        this.$refs.myscroller.finishInfinite(true);
        this.initLoading = false
      })
    },
    //tab切换
    changeTab(id) {
      if(id == this.activeId) return
      this.activeId = id
      this.page = 1
      this.getPostList()
    },
    previewImg(item, index) {
      this.previewItem = item
      this.previewIndex = index
      this.show = true
    }
  },
  beforeMount() {
    this.getPostCateList()
  },
  mounted() {
    this.$refs.myscroller.finishInfinite(false);
  }
};
</script>

<style scoped lang="scss">
#spread {
  height: 100vh;
  display: flex;
  background: #fff;
  flex-direction: column;
  .tabs {
    height: 3.75rem;
    display: flex;
    justify-content: space-between;
    color: #5a6981;
    flex-shrink: 0;
    padding: 0 3.75rem;
    border-bottom: 1px solid rgba(218, 224, 234, 0.5);
    .tab-item {
      padding-top: 2rem;
      font-size: 1rem;
      height: 100%;
      text-align: center;
      &.active {
        font-weight: 700;
        color: #222;
        position: relative;
        font-size: 1rem;
        &:after {
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
    overflow-y: auto;
    position: relative;
    .list-item {
      display: flex;
      flex-direction: column;
      padding: 0 1.25rem;

      margin-top: 2.5rem;
      &:first-child {
        margin-top: 1.875rem;
      }
      .time {
        font-size: 0.8125rem;
        color: #002d33;
        line-height: 1.15625rem;
        .date {
          font-size: 1.125rem;
          color: #fa5050;
          font-weight: 700;
        }
        .time-text {
          padding-left: 0.375rem;
          color: #5a6882;
        }
      }
      .center-content {
        margin-top: 0.8125rem;
        margin-bottom: 0.625rem;
        font-size: 0.9375rem;
        color: #222;
        line-height: 1.3125rem;
      }
      .img-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        img {
          width: 32%;
          margin-right: 0.6%;
          object-fit: cover;
          // width: 6.8125rem;
          height: 4.53125rem;
          background: red;
          margin-bottom: 0.135rem;
        }
      }
      .clipboard-btn {
        margin-top: 0.9375rem;
        width: 6.5625rem;
        height: 2.125rem;
        border: 1px solid #fa5050;
        border-radius: 1.0625rem;
        font-size: 0.8125rem;
        color: #fa5050;
        text-align: center;
        line-height: 2.125rem;
        font-weight: 700;
      }
    }
  }
}
.content-wrapper {
  width: 100%;
  padding: 1.25rem 0.9375rem 1.25rem;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  z-index: 3000;
  background: rgba(46, 46, 46, 0.8);
  .content {
    font-size: 0.875rem;
    line-height: 1.5625rem;
    color: #fff;
    margin-bottom: 1.25rem;
    text-align: left;
    width: 100%;
    
  }
  .clipboard-btn {
      height: 3.125rem;
      background: #fa5050;
      border-radius: 6.25rem;
      font-size: 1rem;
      color: #fff;
      text-align: center;
      line-height: 3.125rem;
      font-weight: 700;
    }
}
</style>