<template>
  <div class="otherReports">
    <img class="noData" src="./img/noData.png" />
  </div>
</template>

<script>
export default {
  name: 'otherReports',
  data () {
    return {}
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.otherReports
  @include page($color-page-background)
  .noData
    width: 366px
    margin: 100px 200px
  .cell
    border-bottom: 1px solid $color-border
    .content
      padding: 37px 0 37px 50px
      font-size: 24px
      line-height: 34px
      color: $color-title-black
      .value
        color: $color-word-grey
      .highlight
        color: $color-primary
    img
      width: 70px
      margin-left: 60px
    /deep/ .mint-cell-allow-right::after
      width: 15px
      height: 15px
      margin-right: 60px
    /deep/ .mint-cell-wrapper
      padding: 0
  /deep/ .mint-cell-title
    display: flex
    justify-content: flex-start
    align-items: center
</style>
