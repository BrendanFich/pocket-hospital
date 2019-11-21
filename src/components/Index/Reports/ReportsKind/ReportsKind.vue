<template>
  <div class="reportsKind">
      <mt-cell class="cell" is-link to="/reports/bodyExam">
        <div slot="title" class="content">
          <div class="title">检验报告</div>
          <div class="description">查看最近或历史检验报告</div>
        </div>
        <img slot="icon" src="./img/lisList.png" />
      </mt-cell>
      <mt-cell class="cell" is-link to='/reports/examination'>
        <div slot="title" class="content">
          <div class="title">检查报告</div>
          <div class="description">查看最近或历史检查报告</div>
        </div>
        <img slot="icon" src="./img/pacsList.png" />
      </mt-cell>
      <mt-cell class="cell" is-link to='/reports/otherReports'>
        <div slot="title" class="content">
          <div class="title">其他报告</div>
          <div class="description">查看其他报告</div>
        </div>
        <img slot="icon" src="./img/otherReports.png" />
      </mt-cell>
  </div>
</template>

<script>
export default {
  name: 'reportsKind',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.reportsKind
  @include page($color-page-background)
  .cell
    border-bottom: 1px solid $color-border
    .content
      padding: 60px 0 52px 24px
      .title
        font-size: 30px
        line-height: 42px
        color: $color-title-black
      .description
        font-size: 24px
        line-height: 34px
        color: $color-title-grey
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
