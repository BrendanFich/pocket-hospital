<template>
  <div class="report">
      <mt-cell class="cell" is-link to="/bodyExam">
        <div slot="title" class="content">
          <div class="title">检验报告</div>
          <div class="description">查看最近或历史检验报告</div>
        </div>
        <img slot="icon" src="@/assets/img/报告 (1) 拷贝.png" width="70" height="83" />
      </mt-cell>
      <mt-cell class="cell" is-link to='/examination'>
        <div slot="title" class="content">
          <div class="title">检查报告</div>
          <div class="description">查看最近或历史检查报告</div>
        </div>
        <img slot="icon" src="@/assets/img/报告1 拷贝.png" width="70" height="83" />
      </mt-cell>
      <mt-cell class="cell" is-link to='/otherReport'>
        <div slot="title" class="content">
          <div class="title">其他报告</div>
          <div class="description">查看其他报告</div>
        </div>
        <img slot="icon" src="@/assets/img/报告 (2) 拷贝.png" width="70" height="83" />
      </mt-cell>
  </div>
</template>

<script>
export default {
  name: 'Report',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.report {
  background: #f2f2f2;
  height: 100vh;
  .cell {
    border-bottom: 1px solid #f2f2f2;
    .content {
      padding: 60px 0 52px 24px;
      .title {
        font-size: 30px;
        line-height: 42px;
        color: #333333;
      }
      .description {
        font-size: 24px;
        line-height: 34px;
        color: #cccccc;
      }
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
