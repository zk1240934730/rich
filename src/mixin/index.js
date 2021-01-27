export default {
    data() {
        return {
            baseImgUrl: 'http://tuiyouqian.wudaojz.com',
            page: 1,
            pageSize: 10,
            initLoading: false,//初始加载
            hasMoreData: true,//是否有更多数据
            listData: [],
            tabIndex: 0
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        // 上拉加载数据
        infinite() {
            if (!this.hasMoreData) {
                this.$refs.myscroller && this.$refs.myscroller.finishInfinite(true);
                return
            }
            this.getListData()
            this.page++;
        },
        //获取列表数据
        getListData() {
            if (this.page == 1) {
                this.initLoading = true
                this.listData = []
            }
            this.$get(this.ajaxUrl, Object.assign({
                page: this.page,
                hideLoading: true
            }, this.params)).then(res => {
                let data = res.data.data
                if (data.length < this.pageSize) {
                    this.hasMoreData = false
                }
                this.formatData && typeof this.formatData == 'function' && this.formatData(data);
                // this.listData = this.page == 1 ? data : this.listData.concat(data);
            }).catch(() => { }).finally(() => {
                this.$refs.myscroller && this.$refs.myscroller.finishInfinite(true);
                this.initLoading = false
            })
        },
        //复制
        copy(el) {
            let clipboard = new this.clipboard("#" + el);
            clipboard.on("success", () => {
                this.$toast.success("复制成功");
                clipboard.destroy();
            });
            clipboard.on("error", () => {
                this.$toast.fail("复制失败");
            });
        },
        //路由延时跳转
        navigate(url, duration = 2000, cb) {
            setTimeout(() => {
                if (cb && typeof cb == 'function') cb();
                this.$router.push(url)
            }, duration)
        },
        /**
         * tab切换
         * @param {参数} item 
         * @param {字段名} itemKey 
         * @param {tab下标} index
         */
        changeTab(item, itemKey, index) {
            if (item == this.params[itemKey]) return
            this.params[itemKey] = item
            this.page = 1
            this.listData = []
            this.hasMoreData = true
            this.tabIndex = index
            this.$refs.myscroller && this.$refs.myscroller.finishInfinite(false);
        }
    }
}