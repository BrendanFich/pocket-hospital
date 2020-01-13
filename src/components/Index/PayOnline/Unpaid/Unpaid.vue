<template>
  <div class="list-content" id="list-content">
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      :offset="10"
    >
      <div class="list-item" v-for="(item, index) in unpaidList" :key="index">
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
            <div class="price unPaid">{{ item.paymentFee/100 }}元</div>
            <div class="date">{{ item.paymentDate.split(' ')[0] }}</div>
          </div>
        </mt-cell>
      </div>
    </van-list>
    <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'

export default {
  name: 'paid',
  data () {
    return {
      unpaidList: [],
      size: 0,
      loading: false, // 是否处于加载状态
      finished: false, // 是否已加载完所有数据
      isLoading: false, // 是否处于下拉刷新状态
      isShowNoData: false
    }
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight // 视口大小
    document.getElementById('list-content').style.height =
      winHeight - (120 * Math.min(document.documentElement.clientWidth / 750, 2)) + 'px'
      // 调整上拉加载框高度,由于使用rem的原因此处不能只用减120px
  },
  methods: {
    getUnpaidList () {
      this.$post('/api/doctor/payInfoList', {
        pay_status: '0',
        page: 1,
        size: this.size
      })
        .then(res => {
          this.unpaidList = res.data
          if (res.data.length === 0) {
            this.isShowNoData = true
          }
          this.loading = false
          if (res.page.count <= this.size) {
            this.finished = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    onLoad () {
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
                timestamp: res.data.timestamp,
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
