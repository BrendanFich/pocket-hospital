<template>
  <div class="examination">
    <mt-cell class="cell" is-link v-for="(item, index) in pacsList" :key="index" @click="getLisInfo">
      <div slot="title" class="content">
        <div class="date">
          <span class="key">开单日期：</span>
          <span class="value">{{item.reportTime}}</span>
        </div>
        <div class="number">
          <span class="key">化验编号：</span>
          <span class="value">{{item.checkId}}</span>
        </div>
        <div class="name">
          <span class="key">化验名称：</span>
          <span class="value highlight">{{item.checkName}}</span>
        </div>
      </div>
      <img slot="icon" src="@/assets/img/pacsList.png" />
    </mt-cell>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  name: 'examination',
  data () {
    return {
      pacsList: []
    }
  },
  created () {
    this.getPacsList()
  },
  methods: {
    getPacsList () {
      util.http
        .post('/api/report/getPacsList', {
          patCardNo: '1000259326',
          beginDate: '2016-03-01',
          endDate: '2017-04-01',
          patCardType: '1'
        })
        .then(res => {
          console.log(res)
          this.pacsList = res.data.Records.Records
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
.examination {
  background: #f2f2f2;
  height: 100vh;
  .cell {
    border-bottom: 1px solid #f2f2f2;
    .content {
      width: 450px;
      padding: 37px 0 37px 50px;
      height: 105px;
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
