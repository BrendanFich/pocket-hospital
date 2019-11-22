<template>
  <div class="payOnline">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1" @click.native="getUnpaidList">未付款</mt-tab-item>
      <mt-tab-item id="2" @click.native="getPaidList">已付款</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <img class="noData" v-if="unpaid.length === 0" src="./img/noData.png" />
        <div v-for="(item,index) in unpaid" :key="index">
          <mt-cell @click.native="pay(item.ledgerSn)">
            <div class="leftInfo">
              <div class="name">{{item.patName}}</div>
              <div class="patCardNo">{{item.PatCardNo}}</div>
              <div class="serial_number">
                订单号：
                <span class="value">{{item.outPatId}}</span>
              </div>
              <div class="department">
                开单科室：
                <span class="value">{{item.paymentDeptName}}</span>
              </div>
            </div>
            <div class="rightInfo">
              <div class="price unPaid">{{item.paymentFee}}元</div>
              <div class="date">{{item.paymentDate}}</div>
            </div>
          </mt-cell>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <img class="noData" v-if="paid.length === 0" src="./img/noData.png" />
        <div v-for="(item,index) in paid" :key="index" @click="enterInfo(item.ledgerSn)">
          <mt-cell>
            <div class="leftInfo">
              <div class="name">{{item.patName}}</div>
              <div class="patCardNo">{{item.PatCardNo}}</div>
              <div class="serial_number">
                订单号：
                <span class="value">{{item.ledgerSn}}</span>
              </div>
              <div class="department">
                开单科室：
                <span class="value">{{item.paymentDeptName}}</span>
              </div>
            </div>
            <div class="rightInfo">
              <div>
                <div class="refunding" v-if="item.paymentStatus === '2'">退款中</div>
                <div class="refunded" v-if="item.paymentStatus === '-2'">已退款</div>
                <div class="price">{{item.paymentFee}}元</div>
              </div>
              <div class="date">{{item.paymentDate}}</div>

            </div>
          </mt-cell>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import util from '@/assets/js/util'
import wx from 'weixin-js-sdk'
export default {
  name: 'payOnline',
  data () {
    return {
      selected: '1',
      unpaid: [],
      paid: []
    }
  },
  created () {
    this.getUnpaidList()
  },
  methods: {
    enterInfo (ledgerSn) {
      this.$router.push({name: 'outOrderInfo', params: {ledgerSn}})
    },
    getUnpaidList () {
      util.http
        .post('/api/doctor/getVisitPayInfo')
        .then(res => {
          this.unpaid = res.data.Records
        })
        .catch(error => {
          console.log(error)
        })
    },
    getPaidList () {
      util.http
        .post('/api/doctor/payInfoList')
        .then(res => {
          this.paid = res.data.Records.filter(item => item.paymentStatus === '1' || item.paymentStatus === '2')
        })
        .catch(error => {
          console.log(error)
        })
    },
    pay (ledgerSn) {
      let self = this
      this.$messagebox.confirm('请确认支付').then(action => {
        util.http
          .post('/api/doctor/payComfirm', {ledgerSn})
          .then(res => {
            wx.ready(function () {
              wx.chooseWXPay({
                timestamp: res.data.Records.timeStamp,
                nonceStr: res.data.Records.nonceStr,
                package: res.data.Records.package,
                signType: res.data.Records.signType,
                paySign: res.data.Records.paySign,
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
.payOnline
  @include page($color-page-background)
  .mint-navbar
    .mint-tab-item
      padding: 31px 0
      /deep/ .mint-tab-item-label
        color: $color-word-grey
        font-size: 26px
    .mint-tab-item.is-selected
      text-decoration: none
      margin: 0
      border: none
      background: $color-primary
      /deep/ .mint-tab-item-label
        color: $color-white
  .mint-tab-container
    margin-top: 28px
    /deep/ .mint-cell-value
      width: 750px
      justify-content: space-between
    /deep/ .mint-cell-wrapper
      border-bottom: 1px solid #e3e3e3
      padding: 28px 45px 30px 41px
    .mint-cell-wrapper
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
</style>
