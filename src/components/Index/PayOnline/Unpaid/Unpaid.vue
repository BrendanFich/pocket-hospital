<template>
  <div
    class="page-loadmore-wrapper"
    ref="wrapper"
    :style="{ height: wrapperHeight + 'px' }"
  >
    <mt-loadmore
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :auto-fill="false"
      @bottom-status-change="handleBottomChange"
      ref="loadmore"
    >
      <img
        class="noData"
        v-if="unpaidList.length === 0"
        src="./img/noData.png"
      />
      <ul>
        <li v-for="(item, index) in unpaidList" :key="index">
          <div>
            <mt-cell @click.native="pay(item.ledgerSn)">
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
              </div>
              <div class="rightInfo">
                <div class="price unPaid">{{ item.paymentFee }}元</div>
                <div class="date">{{ item.paymentDate }}</div>
              </div>
            </mt-cell>
          </div>
        </li>
      </ul>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span
          v-show="bottomStatus !== 'loading'"
          :class="{ 'is-rotate': bottomStatus === 'drop' }"
          >↑</span
        >
        <span v-show="bottomStatus === 'loading'">
          <mt-spinner type="snake"></mt-spinner>
        </span>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  name: 'paid',
  data () {
    return {
      unpaidList: [],
      size: 8,
      bottomStatus: '',
      wrapperHeight: 0,
      allLoaded: false
    }
  },
  created () {
    this.getUnpaidList()
  },
  mounted () {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top
  },
  methods: {
    enterInfo (ledgerSn) {
      this.$router.push({ name: 'outOrderInfo', params: { ledgerSn } })
    },
    getUnpaidList () {
      this.$post('/api/doctor/payInfoList', {
        pay_status: '0',
        page: 1,
        size: this.size
      })
        .then(res => {
          this.unpaidList = res.data
          this.allLoaded = res.page.count <= this.size
          this.$refs.loadmore.onBottomLoaded() // 这个函数有坑，会自动scroll50px
          // console.warn(this.$refs.loadmore.scrollEventTarget.scrollTop)
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleBottomChange (status) {
      console.log('handleBottomChange ', status)
      this.bottomStatus = status
    },
    loadBottom () {
      this.size += 8
      this.getUnpaidList()
    },
    pay (ledgerSn) {
      let self = this
      this.$messagebox.confirm('是否现在支付').then(action => {
        this.$post('/api/doctor/payComfirm', { ledgerSn })
          .then(res => {
            wx.ready(function () {
              wx.chooseWXPay({
                timestamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                success: function (res) {
                  self.getUnpaidList()
                }
              })
            })
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.page-loadmore-wrapper
  overflow-y: scroll // 很重要
  -webkit-overflow-scrolling : touch // 解决view滑动速度慢或者卡顿问题
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
        line-height: 48px
        font-size: 26px
        color: $color-title-black
        .value
          color: $color-word-grey
      .department
        line-height: 48px
        font-size: 26px
        color: $color-title-black
    .rightInfo
      text-align: center
      .price,.refunding
        float: right
        width: 80px
        padding: 12px 10px
        background: #f69343
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
      .unPaid
        background: #d8d8d8
      .date
        clear: both
        color: $color-value-grey
        font-size: 24px
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
</style>
