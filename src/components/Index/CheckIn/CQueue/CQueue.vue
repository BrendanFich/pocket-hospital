<template>
  <div class="cQueue">
    <CustomerInfoCard></CustomerInfoCard>
    <div class="orderInfo">
      <ul>
        <li>
          <span class="key">院区</span>
          <span class="value">{{registerInfo.hostpitalName}}</span>
        </li>
        <li>
          <span class="key">科室</span>
          <span class="value">{{registerInfo.deptName}}</span>
        </li>
        <li>
          <span class="key">医生</span>
          <span class="value">{{registerInfo.doctorName}}</span>
        </li>
        <li>
          <span class="key">就诊日期</span>
          <span class="value">{{registerInfo.scheduleDate}}</span>
        </li>
        <li>
          <span class="key">时间段</span>
          <span class="value">{{registerInfo.beginTime}} - {{registerInfo.endTime}}</span>
        </li>
        <li>
          <span class="key">诊查费</span>
          <span class="value">{{registerInfo.regFee}}元</span>
        </li>
        <li>
          <span class="key">报到时间</span>
          <span class="value"></span>
        </li>
      </ul>
    </div>
    <div class="queueBefore">
      <span class="key">前方还有</span>
      <span class="value"></span>
    </div>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  name: 'cQueue',
  components: { CustomerInfoCard: () => import('@/base/CustomerInfoCard/CustomerInfoCard') },
  data () {
    return {
      registerInfo: []
    }
  },
  methods: {
    confirm () {
      this.$router.push({ path: '/payOnline', name: 'payOnline' })
    }
  },
  created () {
    util.http.post('/api/pat/findRegisterInfo', {hisOrdNum: this.$route.params.hisOrdNum}).then(res => {
      this.registerInfo = res.data.Records
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.cQueue
  @include page($color-page-background)
  .orderInfo
    margin-top: 22px
    background: $color-white
  .orderInfo ul > li ,.queueBefore
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
      color: $color-value-grey
      font-size: 30px
  .queueBefore
    margin-top: 85px
    background: $color-white
</style>
