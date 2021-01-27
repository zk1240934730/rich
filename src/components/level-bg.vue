<template>
    <div id="bage-level">
        <img :src="require(`../assets/images/vip/vip_${level || 1}.png`)" alt="">
        <span>等级{{level | numberToString}}</span>
    </div>
</template>
<script>
export default {
    props: {
        level: {
            type: [String, Number],
            default: 1
        }
    },
    filters: {
        numberToString(value) {
        const arr = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
        return arr[value]
        }
    },
}
</script>
<style lang="scss" scoped>
#bage-level {
    margin-left: 0.5rem;
    padding-left: 0.625rem;
    height: 1.0625rem;
    border-radius: 0.53125rem;
    position: relative;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    img {
    width: 1.3125rem;
    height: 1.0625rem;
    position: relative;
    z-index: 1;
    }
    > span {
    flex: 1;
    width: 3.5rem;
    height: 100%;
    line-height: 1.0625rem;
    padding-left: 1rem;
    margin-left: -0.7rem;
    background-color: #ffe5cf;
    border-radius: 0 3.125rem 3.125rem 0;
    font-size: 0.6875rem;
    color: #7e4315;
    }
}
</style>