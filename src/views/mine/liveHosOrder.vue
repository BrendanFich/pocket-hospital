<template>
  <div class="liveHosOrder">

    <mt-navbar v-model="selected">
      <mt-tab-item id="1" @click.native="getUnpaidList">未付款</mt-tab-item>
      <mt-tab-item id="2" @click.native="getPaidList">已付款</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <img class="noData" v-if="unpaid.length === 0" src="@/assets/img/noData.png" />
        <div v-for="(item,index) in unpaid" :key="index" >
          <div class="paidTime">下单日期：{{item.paymentDate}}</div>
          <div class="orderCard" @click="pay(item.ledgerSn)">
          <div class="left">
            <img src="@/assets/img/money.png" alt />
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
            <span class="price">{{item.paymentFee ? item.paymentFee : 999}}元</span>
          </div>
        </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <img class="noData" v-if="paid.length === 0" src="@/assets/img/noData.png" />
        <div v-for="(item,index) in paid" :key="index">
          <div class="paidTime">下单日期：{{item.paymentDate}}</div>
          <div class="orderCard">
          <div class="left">
            <img src="@/assets/img/money.png" alt />
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
            <span class="price">{{item.paymentFee ? item.paymentFee : 999}}元</span>
          </div>
        </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
import util from '@/assets/js/util'
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
          this.unpaid = res.data.Records
          this.clickedUnPaid = true
        })
        .catch(error => {
          console.log(error)
        })
    },
    getPaidList () {
      util.http
        .post('/api/invisit/payInfoList')
        .then(res => {
          this.paid = res.data.Records
          this.clickedPaid = true
        })
        .catch(error => {
          console.log(error)
        })
    },
    pay (ledgerSn) {
      const duration = 1500
      const className = 'toast'
      this.$messagebox.confirm('请确认支付').then(action => {
        util.http
          .post('/api/doctor/payComfirm', {ledgerSn})
          .then(res => {
            if (res.code === 0 && res.data.Records.Code === '0') {
              this.$toast({ message: '支付成功', duration, className })
              this.getUnpaidList()
            }
          })
          .catch(error => {
            console.log(error)
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
