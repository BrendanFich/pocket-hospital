<template>
  <div class="cConfirm">
    <CustomerInfoCard></CustomerInfoCard>
    <mt-button class="confirmBtn" type="primary" @click="confirm"
      >就诊报到</mt-button
    >
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  name: 'cConfirm',
  components: { CustomerInfoCard: () => import('@/base/CustomerInfoCard/CustomerInfoCard') },
  data () {
    return {
      latitude: null,
      longitude: null,
      registerInfo: {}
    }
  },
  created () {
    this.$post('/api/pat/findVisitingRegister')
      .then(res => {
        console.log(res)
        this.registerInfo = res.data.Records[0]
      })
      .catch(error => {
        console.log(error)
      })
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        this.latitude = res.latitude
        this.longitude = res.longitude
      }
    })
  },
  methods: {
    confirm () {
      let self = this
      let text
      if (this.registerInfo.hisOrdNum) {
        text = `
        <span>就诊日期：${this.registerInfo.scheduleDate.split(' ')[0]}</span>
        <span>就诊时间：${this.registerInfo.beginTime.split(' ')[1]} - ${
  this.registerInfo.endTime.split(' ')[1]
}</span>
        <span>就诊科室：${this.registerInfo.deptName}</span>
        <span>就诊医生：${this.registerInfo.doctorName}</span>
      `
      } else {
        text = `<div>请先预约挂号</div>`
      }
      this.$dialog
        .confirm({
          title: '确认就诊信息',
          message: text
        })
        .then(() => {
          if (this.registerInfo.hisOrdNum) {
            this.$post('/api/pat/visitingReport', {
              hisOrdNum: this.registerInfo.hisOrdNum
            })
              .then(res => {
                console.log(res)
                if (res.code !== 0) {
                  self.$toast({
                    message: res.msg,
                    duration: 1500,
                    className: 'toast'
                  })
                } else {
                  self.$router.push({
                    name: 'cQueue',
                    params: { hisOrdNum: this.registerInfo.hisOrdNum }
                  })
                }
              })
              .catch(error => {
                console.log(error)
              })
          }
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.cConfirm
  @include page($color-page-background)
  .orderInfo
    margin-top: 22px
    background: $color-white
    ul > li
      height: 88px
      padding: 0 54px 0 43px
      display: flex
      justify-content: space-between
      align-items: center
      border-bottom: 1px solid $color-border
      .key
        color: $color-title-black
        font-size: 30px
        font-weight: bold
      .value
        color: #666666
        font-size: 30px
  .confirmBtn
    margin: 0 12.5px
    margin-top: 92px
    width: 725px
    height: 80px
    background: $color-primary
    font-size: 30px
</style>
