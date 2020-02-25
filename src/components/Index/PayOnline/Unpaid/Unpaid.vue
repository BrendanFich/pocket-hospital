<template>
  <div class="list-content" id="list-content">
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      :offset="10"
    >
      <div class="list-item" v-for="(item, index) in unpaidList" :key="index">
        <mt-cell @click.native="linkTo(
          item.PatCardNo,
          item.outPatId,
          item.ledgerSn,
          item.trade_type,
          item.paymentStatus,
          item.remarks,
          item.paymentFee,
          item.original_fee,
          item.medical_insurance_fee)">
          <div class="leftInfo">
            <div class="name">{{ item.patName }}</div>
            <div class="patCardNo">{{ item.PatCardNo }}</div>
            <div class="serial_number">
              订单号：
              <span class="value">{{ item.outPatId }}</span>
            </div>
            <div class="department">
              开单科室：
              <span class="value">{{ item.paymentDeptName }}</span>
            </div>
            <div class="department">
              类型：
              <span class="value">{{ item.trade_type }}</span>
            </div>
          </div>
          <div class="rightInfo">
            <span class="tag" :class="{green: item.paymentStatus === '1', orange: item.paymentStatus === '0'}">{{ statusWord(item.paymentStatus) }}</span>
            <span class="price">{{ item.paymentFee/100 }}元</span>
            <div class="date">{{ item.paymentDate.split(' ')[0] }}</div>
          </div>
        </mt-cell>
      </div>
    </van-list>
    <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
  </div>
</template>

<script>
export default {
  name: 'paid',
  data () {
    return {
      unpaidList: [],
      page: 1,
      loading: false,
      finished: false,
      isLoading: false,
      isShowNoData: false,
      dialogShow: false,
      detailInfo: {}
    }
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('list-content').style.height =
      winHeight + 'px'
  },
  computed: {
    confirmButtonText () {
      if (this.detailInfo.paymentStatus === '0') {
        return '确认支付'
      } else {
        return '确认'
      }
    }
  },
  methods: {
    confirm () {
      if (this.detailInfo.paymentStatus === '0') {
        this.pay()
      }
    },
    statusWord (paymentStatus) {
      switch (paymentStatus) {
        case '1' :
          return '已支付'
        case '0' :
          return '未支付'
        case '2' :
          return '退款中'
        case '-2' :
          return '已退款'
        case '-1' :
          return '已完成'
      }
    },
    getUnpaidList () {
      this.$post('/api/doctor/payInfoList', {
        page: this.page,
        size: 10
      })
        .then(res => {
          this.unpaidList = [...this.unpaidList, ...res.data]
          if (this.unpaidList.length === 0) {
            this.isShowNoData = true
          }
          this.loading = false
          if (res.page.totalPage <= res.page.currentPage) {
            this.finished = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    onLoad () {
      this.page += 1
      this.getUnpaidList()
    },
    linkTo (patCardNo, hisOrdNum, ledgerSn, tradeType, paymentStatus, remarks, paymentFee, originalFee, medicalInsuranceFee) {
      console.log(paymentStatus)
      if (tradeType === '挂号收费') {
        this.$router.push({name: 'regOrderItem', params: {hisOrdNum, ledgerSn}})
      }
      if (tradeType === '门诊收费') {
        if (paymentStatus === '0') {
          this.$router.push({name: 'unpayItem', params: {patCardNo, hisOrdNum}})
        } else {
          this.$router.push({name: 'paidItem', params: {ledgerSn}})
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.list-content
  overflow-y: scroll // 很重要
  -webkit-overflow-scrolling : touch // 解决view滑动速度慢或者卡顿问题
  &::-webkit-scrollbar
    display: none
>>>.mint-cell-wrapper
  border-bottom: 1px solid $color-border
  padding: 10px
  .mint-cell-title
    flex: none
  .mint-cell-value
    flex: 1
    padding: 0 20px
    display: flex
    justify-content: space-between
    .leftInfo
      .name
        display: inline-block
        margin-right: 13px
        line-height: 66px
        font-size: 30px
        color: $color-primary
        font-weight: bold
      .patCardNo
        display: inline-block
        font-size: 24px
        color: $color-value-grey
      .serial_number
        line-height: 40px
        font-size: 26px
        color: $color-title-black
        .value
          color: $color-word-grey
      .department
        line-height: 40px
        font-size: 26px
        color: $color-title-black
    .rightInfo
      text-align: center
      .price,.refunding,.tag
        float: right
        min-width: 80px
        padding: 8px 7px
        background: #d8d8d8
        color: #fff
        border-radius: 10px
        font-size: 26px
        margin-bottom: 16px
        margin-left: 5px
      .refunded
        background: $color-primary
        float: right
        width: 80px
        padding: 12px 10px
        color: #fff
        border-radius: 10px
        font-size: 26px
        margin-bottom: 16px
        margin-left: 5px
      .date
        text-align: right
        clear: both
        color: $color-value-grey
        font-size: 24px
      .green
        background: $color-primary
      .orange
        background: #f69343
.noData
  width: 366px
  margin: 100px 200px
.mint-loadmore-bottom
  span
    display: inline-block
    transition: .2s linear
    vertical-align: middle
    span.is-rotate
      transform: rotate(180deg)
>>>.van-dialog__header
  padding-top: 15px
  color: $color-primary
.detail
  margin-top: 25px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  >li
    display: flex
    height: 50px
    label
      width: 200px
      color: #999
    span
      width: 200px
</style>
