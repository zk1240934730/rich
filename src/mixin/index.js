export default {
    data() {
        return {
            baseImgUrl: 'http://tuiyouqian.wudaojz.com'
        }
    },
    created() {
        
    },
    mounted() {
       
    },
    methods: {
        getData() {
            return this.$get(this.ajaxUrl, this.param).then(res => {
                console.log(res);
            }).catch(err => {
                console.error(err);
            }).finally(res => {
                this.listData = this.listData.concat(new Array(10))
                console.warn(res);
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
        navigate(url, duration = 2000, cb) {
            setTimeout(() => {
                if(cb && typeof cb == 'function') cb();
                this.$router.push(url)
            }, duration)
        }
    }
}