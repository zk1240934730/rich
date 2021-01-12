<template>
  <div id="setting">
    <div class="content-title">个人信息</div>
    <cell-group>
      <cell title="单元格" value="内容" />
      <cell title="单元格" value="内容" label="描述信息" />
    </cell-group>
  </div>
</template>

<script>
import { Cell, CellGroup } from "vant";
export default {
  name: "setting",
  components: { Cell, CellGroup },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped lang="scss">
#setting {
  min-height: 100vh;
  padding: 0.375rem 1.25rem 5.625rem;
  background-color: #f2f5fb;
  background-size: 100%;
  .content-title {
    font-family: PingFangSC-Semibold;
    font-size: 1rem;
    color: #5a6981;
    line-height: 1.1875rem;
    margin-bottom: .75rem;
    margin-top: 1.75rem;
  }
  .van-cell-group {
    border-radius: 5px;
    overflow: hidden;
  }
}
</style>