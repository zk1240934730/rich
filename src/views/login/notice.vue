<template>
    <div id="notice">
        <div v-html="notice.content"></div>
        <p class="update-time">{{notice.updated_at || '2020-09-08 20:00:00'}}</p>
    </div>
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
<style scoped lang="scss">
#notice {
    .update-time {
        font-size: 0.985rem;
        color: #333;
        text-align: right;
        padding: 0.2rem 0.785rem;
    }
}
</style>