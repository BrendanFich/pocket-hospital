<template>
  <div class="recharge">
    <CustomerInfoCard
      @visitName="getVisitName"
      @patIdNo="getPatIdNo"
      @inPatId="getinPatId"
    ></CustomerInfoCard>
    <div v-show="resOver">
      <div class="notice" v-if="isInpat">无该病人住院信息，无法预交费</div>
      <div v-else>
        <div class="tip">充值金额</div>
        <van-field v-model="number" type="number" label="缴纳金额(元)" clearable/>
        <div class="tip">或选择缴纳金额(元)</div>
        <div class="tagsContent">
          <div class="tag" @click="selectNumber(1000)">1000</div>
          <div class="tag" @click="selectNumber(3000)">3000</div>
          <div class="tag" @click="selectNumber(5000)">5000</div>
        </div>
        <van-button class="btn" type="primary" block @click="getWxConig">立即充值</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    CustomerInfoCard: () => import('@/base/CustomerInfoCard/CustomerInfoCard')
  },
  data () {
    return {
      regInfo: {},
      number: null,
      patIdNo: '',
      visitName: '',
      inPatId: '',
      isInpat: true,
      resOver: false
    }
  },
  methods: {
    getPatIdNo (val) {
      this.patIdNo = val
    },
    getVisitName (val) {
      this.visitName = val
    },
    getinPatId (val) {
      this.inPatId = val
    },
    selectNumber (number) {
      this.number = number
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
    getWxConig () {
      let money = Number(this.number)
      if (this.number === null || this.number === '') {
        this.$toast('请输入充值金额')
      } else if (money < 0.01) {
        this.$toast('至少充值0.01元')
      } else if (money > 20000) {
        this.$toast('每日最多充值2万')
      } else {
        this.$post('/api/invisit/payRecharge', {
          pat_name: this.visitName,
          id_card_no: this.patIdNo,
          pat_id: Number(this.inPatId),
          money: money * 100})
          .then(res => {
            this.pay(res.data.LedgerSn)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    pay (ledgerSn) {
      let self = this
      this.$post('/api/doctor/payComfirm', { ledgerSn })
        .then(res => {
          self.$wx.ready(function () {
            self.$wx.chooseWXPay({
              timestamp: res.data.timestamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.paySign,
              success: function (res) {
                self.$router.go(-1)
                self.$toast('充值成功')
              }
            })
          })
        })
        .catch(error => {
          console.log(error)
        })
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
.recharge
  @include page($color-page-background)
  .notice
    color: #999
    margin-top: 100px
    text-align: center
  .tip
    color: $color-word-grey
    font-size: 28px
    padding: 25px 30px
  .tagsContent
    margin: 0 auto
    display: flex
    justify-content: space-between
    align-items: center
    width: 720px
    .tag
      color: $color-primary
      padding: 20px 50px
      border-radius: 15px
      border: 1px solid $color-primary
      background: white
  .btn
    width: 720px
    margin: 0 auto
    margin-top: 38px
    border-radius: 15px
</style>
