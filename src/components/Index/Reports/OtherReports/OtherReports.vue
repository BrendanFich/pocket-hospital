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

<style lang="scss" scoped>
.otherReports {
  background: #f2f2f2;
  height: 100vh;
  .noData {
        width: 366px;
        margin: 100px 200px;
      }
  .cell {
    border-bottom: 1px solid #f2f2f2;
    .content {
      padding: 37px 0 37px 50px;
      font-size: 24px;
      line-height: 34px;
      color: #333333;
      .value{
        color: #999999;
      }
      .highlight{
        color: #09CF74;
      }
    }
    img{
      width: 70px;
      margin-left: 60px;
    }
    /deep/ .mint-cell-allow-right::after {
      width: 15px;
      height: 15px;
      margin-right: 60px;
    }
    /deep/ .mint-cell-wrapper {
      padding: 0;
    }
  }
  /deep/ .mint-cell-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
