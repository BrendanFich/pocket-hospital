<template>
  <div class="cConfirm">
    <CustomerInfoCard @getDefualtCard="getDefualtCard"></CustomerInfoCard>
    <div v-if="regList.length > 0">
      <div class="paidTime">请选择挂号信息</div>
      <div
        v-for="(item, index) in regList"
        :key="index"
        class="orderCard"
        @click="select(item.hisOrdNum, item.visit_status)"
      >
        <div class="left">
          <img src="./img/orderIcon.png" alt />
          <div class="baseInfo">
            <div>
              <span class="name">{{ item.patName }}</span>
              <span class="num">{{ item.patCardNo }}</span>
            </div>
            <div class="item">
              <span class="key">日期</span>
              <span class="value">：{{ item.scheduleDate.split(" ")[0] }}</span>
            </div>
            <div class="item">
              <span class="key">时段</span>
              <span class="value"
                >：{{ timeFormat(item.beginTime) }}-{{
                  timeFormat(item.endTime)
                }}</span
              >
            </div>
            <div class="item">
              <span class="key">科室</span>
              <span class="value">：{{ item.deptName }}</span>
            </div>
            <div class="item">
              <span class="key">医生</span>
              <span class="value">：{{ item.doctorName }}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <span class="orange">{{ item.regFee / 100 }}元</span>
          <span
            :class="{
              green: item.visit_status === '挂号'
            }"
            >{{ item.visit_status }}</span
          >
        </div>
      </div>
    </div>
    <div v-else class="noInfo">无挂号信息</div>
    <!-- <mt-button class="confirmBtn" type="primary" @click="confirm"
      >就诊报到</mt-button
    > -->
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  name: 'cConfirm',
  components: {
    CustomerInfoCard: () => import('@/base/CustomerInfoCard/CustomerInfoCard')
  },
  data () {
    return {
      latitude: null,
      longitude: null,
      regList: [],
      visitCardNo: ''
    }
  },
  created () {
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        this.latitude = res.latitude
        this.longitude = res.longitude
      }
    })
  },
  watch: {
    visitCardNo (val) {
      this.getVisitingRegister(val)
    }
  },
  methods: {
    select (hisOrdNum, visitStatus) {
      if (visitStatus === '候诊') {
        this.$router.push({
          name: 'cQueue',
          params: { hisOrdNum }
        })
      } else if (visitStatus === '挂号') {
        this.$dialog
          .confirm({
            message: '是否确认报到'
          })
          .then(() => {
            this.getVisitingReport(hisOrdNum)
          })
          .catch(() => {
          })
      }
    },
    timeFormat (time) {
      return time
        .split(' ')[1]
        .split(':')
        .slice(0, 2)
        .join(':')
    },
    getVisitingRegister (cardNo) {
      this.$post('/api/pat/findVisitingRegister', { card_no: cardNo })
        .then(res => {
          this.regList = res.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getVisitingReport (hisOrdNum) {
      this.$post('/api/pat/visitingReport', { hisOrdNum })
        .then(res => {
          if (res.code === 0) {
            this.$toast('报到成功')
            this.$router.push({
              name: 'cQueue',
              params: { hisOrdNum }
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getDefualtCard (val) {
      this.visitCardNo = val.visitCardNo
    },
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
  @include main()
  .paidTime
    color: $color-word-grey
    font-size: 24px
    padding: 25px 30px
  .orderCard
    margin-bottom: 20px
    height: 170px
    background: $color-white
    padding: 30px 50px 30px 40px
    display: flex
    justify-content: space-between
    align-items: center
    .left
      display: flex
      justify-content: flex-start
      align-items: center
      img
        width: 43px
        margin-right: 30px
      .baseInfo
        font-size: 24px
        line-height: 36px
        .key
          color: $color-word-grey
        .value
          color: $color-value-grey
        .name
          color: #5adba3
          font-size: 26px
          font-weight: bold
          line-height: 50px
        .num
          font-size: 24px
          color: $color-title-grey
          display: inline-block
          margin-left: 12px
    .right
      display: flex
      flex-direction: column
      align-items: flex-end
      justify-content: center
      span
        color: $color-white
        font-size: 24px
        line-height: 30px
        padding: 3px 11px
        margin: 5px 0
        border-radius: 5px
        background: #f69343
      .orange
        background: #f69343
      .green
        background: #5adba3
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
  .noInfo
    color: #999
    font-size: 24px
    margin-top: 100px
    text-align: center
</style>
