<template>
  <div id="reward-rules">
    <div class="title">{{ rulesInfo.name }}</div>
    <div v-html="rulesInfo.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rulesInfo: {},
    };
  },
  methods: {
    //获取奖励规则
    getRewardRuleDetail() {
      this.$get("/api/rewardRuleDetail").then((res) => {
        this.rulesInfo = res.data;
      });
    },
  },
  created() {
    this.getRewardRuleDetail();
  },
};
</script>

<style scoped lang="scss">
#reward-rules {
  padding: 0 1.875rem 1.875rem;
  font-size: 0.875rem;
  color: #394259;
  text-align: justify;
  line-height: 1.3125rem;
  .title {
      margin-top: 1.875rem;
    padding-left: 1.875rem;
    padding-bottom: 1.625rem;
    padding-right: 1.875rem;
    font-size: 1.0625rem;
    color: #1a1a1a;
    text-align: center;
    line-height: .94117647;
    font-weight: 700;
  }
}
</style>