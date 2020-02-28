<template>
  <div class="outCount">
    <CustomerInfoCard
      @visitName="getVisitName"
      @patIdNo="getPatIdNo"
    ></CustomerInfoCard>
    <div v-show="resOver">
      <div class="notice" v-if="isInpat">暂无该病人住院信息</div>
      <div v-else>
        <div class="showBalance">
          <ul>
            <li>住院号：{{ inPatInfo && inPatInfo.CardNo }}</li>
            <li>住院天数：{{ inPatInfo && inHosDays(inPatInfo.AdmitDT) }}</li>
            <li>入院日时间：{{ inPatInfo && inPatInfo.AdmitDT }}</li>
          </ul>
        </div>
        <div class="summary">
          <ul>
            <li>预交总金额：{{ inPatInfo && inPatInfo.DepositTotal }}</li>
            <li>总金额：{{ inPatInfo && inPatInfo.CostTotal }}</li>
            <li>预交金金额：{{ inPatInfo && inPatInfo.CostLeft }}</li>
          </ul>
        </div>
        <van-button class="btn" type="primary" block @click="recharge"
          >预交金缴纳</van-button
        >
      </div>
    </div>

  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  components: {
    CustomerInfoCard: () => import('@/base/CustomerInfoCard/CustomerInfoCard')
  },
  data () {
    return {
      inPatInfo: null,
      patIdNo: '',
      visitName: '',
      isInpat: true,
      resOver: false
    }
  },
  computed: {},
  methods: {
    inHosDays (AdmitDT) {
      return dayjs().diff(dayjs(AdmitDT), 'days')
    },
    recharge () {
      this.$router.push('/inHosp/recharge')
    },
    getInPatInfo (patName, idCardNo) {
      this.$post('/api/invisit/getInPatInfo', {
        pat_name: patName,
        id_card_no: idCardNo
      })
        .then(res => {
          this.resOver = true
          this.inPatInfo = res.data
          if (res.data.CardNo) {
            this.isInpat = false
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getPatIdNo (val) {
      this.patIdNo = val
    },
    getVisitName (val) {
      this.visitName = val
    }
  },
  watch: {
    patIdNo () {
      this.getInPatInfo(this.visitName, this.patIdNo)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.outCount
  @include page($color-page-background)
  .notice
    color: #999
    font-size: 24px
    margin-top: 100px
    text-align: center
  .summary, .showBalance
    background: url("img/allTotalBg.png") no-repeat
    width: 720px
    background-size: 100% 100%
    color: $color-white
    margin: 0 auto
    margin-top: 28px
    border-radius: 15px
    ul
      padding: 40px
      display: flex
      flex-wrap: wrap
      align-items: center
      li
        padding-right: 10px
        min-width: 310px
        height: 78px
        line-height: 78px
        font-size: 30px
        &:last-child
          width: 100%
  .btn
    width: 720px
    margin: 0 auto
    margin-top: 38px
    border-radius: 15px
</style>
