<template>
  <!-- 检验报告 -->
  <div class="bodyExam">
    <mt-cell class="cell" is-link v-for="(item, index) in lisList" :key="index" @click="getLisInfo">
      <div slot="title" class="content">
        <div class="date">
          <span class="key">开单日期：</span>
          <span class="value">{{item.reportTime}}</span>
        </div>
        <div class="number">
          <span class="key">化验编号：</span>
          <span class="value">{{item.inspectId}}</span>
        </div>
        <div class="name">
          <span class="key">化验名称：</span>
          <span class="value highlight">{{item.inspectName}}</span>
        </div>
      </div>
      <img slot="icon" src="@/assets/img/报告 (1) 拷贝.png" />
    </mt-cell>
  </div>
</template>

<script>
import util from '@/utils/util'

export default {
  name: 'bodyExam',
  data () {
    return {
      lisList: []
    }
  },
  created () {
    this.getLisList()
  },
  methods: {
    getLisList () {
      util.http
        .post('/api/report/getLisList', {
          patCardNo: '1000259326',
          beginDate: '2016-03-01',
          endDate: '2017-04-01',
          patCardType: '1'
        })
        .then(res => {
          console.log(res)
          this.lisList = res.data.Records.Records
        })
        .catch(error => {
          console.log(error)
        })
    },
    getLisInfo () {
    }
  }
}
</script>

<style lang="scss" scoped>
.bodyExam {
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
