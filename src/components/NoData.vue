<template>
  <div class="noData">
    <img
      class="hiddenImg"
      :class="{showImg: data.length === 0}"
      src="@/assets/img/暂无数据.png"
      alt
    />
  </div>
</template>

<script>
export default {
  name: 'NoData',
  data () {
    return {}
  },
  props: ['data']
}
</script>
<style lang="scss" scoped>
.noData {
  .hiddenImg {
    display: none;
    text-align: center;
    width: 366px;
    margin: 0 auto;
    padding: 50px 0 0 45px;
  }
  .showImg {
    display: block;
  }
}
</style>
