<template>
    <div id="notice" v-html="notice.content"></div>
</template>
<script>
export default {
    name: 'notice',
    data() {
        return {
            notice: {}
        }
    },
    mounted() {
        this.notice = JSON.parse(this.$route.query.notice)
    }
}
</script>