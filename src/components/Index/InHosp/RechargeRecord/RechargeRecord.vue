<template>
  <div class="rechargeRecord">
    <img class="noData" v-if="recordList.length === 0" src="./img/noData.png" />
    <div v-for="(item,index) in recordList" :key="index">
      <div class="paidTime">充值日期：{{item.paymentDate}}</div>
      <div class="orderCard">
        <div class="left">
          <img src="./img/money.png" alt />
          <div class="baseInfo">
            <div class="item">
              <span class="key">订单号：</span>
              <span class="value">{{item.ledgerSn}}</span>
            </div>
            <div class="item">
              <span class="key">充值金额:</span>
              <span class="value">{{item.paymentFee/100}}</span>
            </div>
            <div class="item">
              <span class="key">备注:</span>
              <span class="value">{{item.remarks}}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <span class="price">{{item.paymentFee/100}}元</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  components: {},
  data () {
    return {
      recordList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    getRechargeRecord () {
      util.http
        .post('/api/invisit/findRecharge')
        .then(res => {
          this.recordList = res.data.Records.sort(util.compareTime('paymentDate'))
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.getRechargeRecord()
  }
}
</script>

<style lang='scss' scoped>
.rechargeRecord {
  background: #f2f2f2;
  min-height: 100vh;
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
