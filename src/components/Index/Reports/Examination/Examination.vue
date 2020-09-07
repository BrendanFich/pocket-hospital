<template>
  <div class="examination">
    <mt-cell class="cell" is-link v-for="(item, index) in pacsList" :key="index" @click.native="linkeTo(item.checkId)">
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
    <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
  </div>
</template>

<script>
export default {
  name: 'examination',
  data () {
    return {
      pacsList: [],
      isShowNoData: false
    }
  },
  created () {
    this.getPatInfo()
  },
  methods: {
    getPatInfo () {
      this.$post('/api/user/vx_info').then(res => {
        this.getPacsList(res.data.info.visitCardNo)
      })
    },
    getPacsList (patCardNo) {
      this.$post('/api/report/getPacsList', {
        patCardNo, // 1000259326
        page: 1,
        size: 10
      })
        .then(res => {
          this.pacsList = res.data
          if (res.data.length === 0) {
            this.isShowNoData = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    linkeTo (checkId) {
      this.$router.push({name: 'reportDetail', params: {checkId, inspectId: '$'}})
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.examination
  @include main()
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
    &:last-child
      margin-bottom: 98px
  /deep/ .mint-cell-title
    display: flex
    justify-content: flex-start
    align-items: center
</style>
