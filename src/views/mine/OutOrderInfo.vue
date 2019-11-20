<template>
  <div class="OutOrderInfo">
    <h1>缴费订单详情：</h1>
    <ul>
      <li>
        <span class="key">流水号</span>
        <span class="value">{{info.ledgerSn}}</span>
      </li>
      <li>
        <span class="key">卡号</span>
        <span class="value">{{info.PatCardNo}}</span>
      </li>
      <li>
        <span class="key">缴费时间</span>
        <span class="value">{{info.paymentDate}}</span>
      </li>
      <li>
        <span class="key">科室</span>
        <span class="value">{{info.paymentDeptName}}</span>
      </li>
      <li>
        <span class="key">医生</span>
        <span class="value">{{info.paymentDoctorName}}</span>
      </li>
      <li>
        <span class="key">患者</span>
        <span class="value">{{info.patName}}</span>
      </li>
    </ul>
    <mt-button class="btn" type="primary" @click="back">返回</mt-button>
    <mt-button class="btn" type="primary" @click="cancelOrder">退款</mt-button>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  data () {
    return {
      info: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    back () {
      this.$router.go(-1)
    },
    cancelOrder () {
      if (this.$route.params.paymentStatus === '2') {
        this.$toast({ message: '该订单退款中...', duration: 1500, className: 'toast' })
      }
      if (this.$route.params.paymentStatus === '1') {
        util.http
          .post('/api/doctor/payRefund', {ledgerSn: this.$route.params.ledgerSn})
          .then(res => {
            if (res.code === 0) {
              this.$toast({ message: '成功申请退款', duration: 1500, className: 'toast' })
              this.$router.go(-1)
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    getPaidList () {
      util.http
        .post('/api/doctor/payInfo', {ledgerSn: this.$route.params.ledgerSn})
        .then(res => {
          this.info = res.data.Records
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.getPaidList()
  }
}
</script>

<style lang='scss' scoped>
.OutOrderInfo {
  background: #f2f2f2;
  min-height: 100vh;
  h1 {
    color: #333333;
    font-size: 30px;
    font-weight: bold;
    padding: 30px 40px;
  }
  ul > li {
    background: #fff;
    height: 88px;
    padding: 0 54px 0 43px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ededed;
    .key {
      color: #333333;
      font-size: 30px;
      font-weight: bold;
    }
    .value {
      color: #666666;
      font-size: 30px;
    }
  }
  .btn {
    margin: 0 12.5px;
    margin-top: 50px;
    width: 725px;
    height: 80px;
    background: #09cf74;
    font-size: 30px;
  }
}
</style>
