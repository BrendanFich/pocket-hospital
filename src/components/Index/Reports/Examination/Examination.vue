<template>
  <div class="examination">
    <mt-cell class="cell" is-link v-for="(item, index) in pacsList" :key="index" @click.native="getLisInfo(item.checkId)">
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
      <img slot="icon" src="./img/pacsList.png" />
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
          this.pacsList = res.data.Records
        })
        .catch(error => {
          console.log(error)
        })
    },
    getLisInfo (checkId) {
      util.http
        .post('/api/report/getPacsInfo', {
          patCardType: '1',
          patCardNo: '1000259326',
          checkId: '1153173'
        })
        .then(res => {
          console.log(res)
          let text = `
          <div>
            <p>化验编号: ${res.data.Records[0].checkId}</p>
            <p>化验类型: ${res.data.Records[0].checkMethod}</p>
            <p>化验名称：${res.data.Records[0].checkName}</p>
            <p>门诊名称：${res.data.Records[0].deptName}</p>
          </div>
          `
          this.$messagebox('提示', text)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.examination
  @include page($color-page-background)
  .cell
    border-bottom: 1px solid $color-border
    .content
      width: 450px
      padding: 37px 0 37px 50px
      height: 105px
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
