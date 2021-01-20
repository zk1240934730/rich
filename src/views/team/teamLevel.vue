<template>
  <div id="team-level">
      <div class="level-month"></div>
  </div>
</template>

<script>
export default {
  name: "teamLevel",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#team-level {
    position: relative;
    min-height: 100vh;
    height: auto;
    padding: 1.875rem 1.25rem 3.125rem;
    background: url(../../assets/images/setting/edit-wx-bg.png) top no-repeat;
    background-size: 100%;
    background-color: #f3f6fb;
    overflow: hidden;
    color: #222;
}
</style>