export default {
    data() {
        return {
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
        }
    }
}