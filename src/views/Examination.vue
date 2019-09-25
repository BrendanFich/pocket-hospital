<template>
  <div class="examination">
    <mt-cell class="cell" is-link>
      <div slot="title" class="content">
        <div class="date">
          <span class="key">开单日期：</span>
          <span class="value">2019-08-28 11:30</span>
        </div>
        <div class="number">
          <span class="key">化验编号：</span>
          <span class="value">2019082854321</span>
        </div>
        <div class="name">
          <span class="key">化验名称：</span>
          <span class="value highlight">肩部异物切片</span>
        </div>
      </div>
      <img slot="icon" src="@/assets/img/报告1 拷贝.png" />
    </mt-cell>
  </div>
</template>

<script>
export default {
  name: 'Examination',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.examination {
  background: #f2f2f2;
  height: 100vh;
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
    }
    /deep/ .mint-cell-allow-right::after {
      width: 15px;
      height: 15px;
      margin-right: 60px;
    }
    /deep/ .mint-cell-wrapper {
      padding: 0 60px;
    }
  }
  /deep/ .mint-cell-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
