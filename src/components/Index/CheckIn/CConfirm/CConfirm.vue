<template>
  <div class="cConfirm">
    <CustomerInfoCard></CustomerInfoCard>
    <mt-button class="confirmBtn" type="primary" @click="confirm">就诊报到</mt-button>
  </div>
</template>

<script>
import CustomerInfoCard from '@/base/CustomerInfoCard/CustomerInfoCard'
import wx from 'weixin-js-sdk'
import util from '@/assets/js/util'
export default {
  name: 'cConfirm',
  components: { CustomerInfoCard },
  data () {
    return {
      latitude: null,
      longitude: null,
      registerInfo: {}
    }
  },
  created () {
    util.http
      .post('/api/pat/findVisitingRegister')
      .then(res => {
        console.log(res)
        this.registerInfo = res.data.Records
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
      <div>
        <p>就诊日期：${this.registerInfo.scheduleDate}</p>
        <p>就诊时间：${this.registerInfo.beginTime} - ${this.registerInfo.beginTime}</p>
        <p>就诊科室：${this.registerInfo.deptName}</p>
        <p>就诊医生：${this.registerInfo.doctorName}</p>
      </div>
      `
      } else {
        text = `<div>请先预约挂号</div>`
      }
      this.$messagebox.confirm(text).then(action => {
        if (this.registerInfo.hisOrdNum) {
          util.http
            .post('/api/pat/visitingReport')
            .then(res => {
              console.log(res)
              if (res.code !== 0) {
                self.$toast({ message: res.msg, duration: 1500, className: 'toast' })
              } else {
                self.$router.push({name: 'cQueue', params: {hisOrdNum: this.registerInfo.hisOrdNum}})
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
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
