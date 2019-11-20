<template>
  <div class="liveHosOrder">

    <mt-navbar v-model="selected">
      <mt-tab-item id="1" @click.native="getUnpaidList">未付款</mt-tab-item>
      <mt-tab-item id="2" @click.native="getPaidList">已付款</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <img class="noData" v-if="unpaid.length === 0" src="./img/noData.png" />
        <div v-for="(item,index) in unpaid" :key="index" >
          <div class="paidTime">下单日期：{{item.paymentDate}}</div>
          <div class="orderCard" @click="pay(item.ledgerSn)">
            <div class="left">
              <img src="./img/money.png" alt />
              <div class="baseInfo">
                <div>
                  <span class="name">{{item.patName}}</span>
                  <span class="num">{{item.PatCardNo}}</span>
                </div>
                <div class="item">
                  <span class="key">院区</span>
                  <span class="value">：全院</span>
                </div>
                <div class="item">
                  <span class="key">类型</span>
                  <span class="value">: 住院费预交金</span>
                </div>
              </div>
            </div>
            <div class="right">
              <span class="price">{{item.paymentFee/100}}元</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <img class="noData" v-if="paid.length === 0" src="./img/noData.png" />
        <div v-for="(item,index) in paid" :key="index">
          <div class="paidTime">下单日期：{{item.paymentDate}}</div>
          <div class="orderCard">
            <div class="left">
              <img src="./img/money.png" alt />
              <div class="baseInfo">
                <div>
                  <span class="name">{{item.patName}}</span>
                  <span class="num">{{item.PatCardNo}}</span>
                </div>
                <div class="item">
                  <span class="key">院区</span>
                  <span class="value">：全院</span>
                </div>
                <div class="item">
                  <span class="key">类型</span>
                  <span class="value">: 住院费预交金</span>
                </div>
              </div>
            </div>
            <div class="right">
              <span class="price">{{item.paymentFee/100}}元</span>
            </div>
        </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
import util from '@/assets/js/util'
import wx from 'weixin-js-sdk'

export default {
  name: 'liveHosOrder',
  data () {
    return {
      selected: '1',
      payInfoList: [],
      unpaid: [],
      paid: []
    }
  },
  created () {
    this.getUnpaidList()
  },
  methods: {
    getUnpaidList () {
      util.http
        .post('/api/invisit/getVisitPayInfo')
        .then(res => {
          this.unpaid = res.data.Records.sort(util.compareTime('paymentDate'))
        })
        .catch(error => {
          console.log(error)
        })
    },
    getPaidList () {
      util.http
        .post('/api/invisit/payInfoList')
        .then(res => {
          this.paid = res.data.Records.sort(util.compareTime('paymentDate'))
        })
        .catch(error => {
          console.log(error)
        })
    },
    pay (ledgerSn) {
      this.$messagebox.confirm('请确认支付').then(action => {
        util.http
          .post('/api/doctor/payComfirm', {ledgerSn})
          .then(res => {
            this.wxPay(res.data.Records)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    wxPay (config) {
      let self = this
      wx.ready(function () {
        wx.chooseWXPay({
          timestamp: config.timeStamp,
          nonceStr: config.nonceStr,
          package: config.package,
          signType: config.signType,
          paySign: config.paySign,
          success: function (res) {
            self.getUnpaidList()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.liveHosOrder {
  background: #f2f2f2;
  min-height: 100vh;
  .mint-navbar {
    .mint-tab-item {
      padding: 31px 0;
      /deep/ .mint-tab-item-label {
        color: #999999;
        font-size: 26px;
      }
    }
    .mint-tab-item.is-selected {
      text-decoration: none;
      margin: 0;
      border: none;
      background: #09cf74;
      /deep/ .mint-tab-item-label {
        color: #fff;
      }
    }
  }
  .paidTime {
    color: #999999;
    font-size: 24px;
    padding: 25px 30px;
  }
  .orderCard {
    height: 107px;
    background: #fff;
    padding: 30px 50px 30px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 47px;
        margin-right: 30px;
      }
      .baseInfo {
        font-size: 24px;
        line-height: 36px;
        .key {
          color: #999999;
        }
        .value {
          color: #666666;
        }
        .name {
          color: #5adba3;
          font-size: 26px;
          font-weight: bold;
          line-height: 50px;
        }
        .num {
          font-size: 24px;
          color: #cccccc;
          display: inline-block;
          margin-left: 12px;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      span {
        color: #fff;
        font-size: 24px;
        padding: 3px 11px;
        border-radius: 5px;
      }
      .price {
        background: #f69343;
        min-width: 80px;
        height: 28px;
        text-align: center;
      }
      .orderTime {
        margin-top: 10px;
        background: #5adba3;
      }
    }
  }
  .noData {
        width: 366px;
        margin: 100px 200px;
      }
}
</style>
