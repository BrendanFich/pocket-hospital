<template>
  <div class="regOrder">
    <img class="noData" v-if="orderList.length === 0" src="./img/noData.png" />
    <ul>
      <li v-for="(item, index) in orderList" :key="index" @click="detail(item.hisOrdNum)">
        <div class="paidTime">下单日期：{{item.createDate}}</div>
        <div class="orderCard">
          <div class="left">
            <img src="./img/orderIcon.png" alt />
            <div class="baseInfo">
              <div>
                <span class="name">{{item.patName}}</span>
                <span class="num">{{item.patCardNo}}</span>
              </div>
              <div class="item">
                <span class="key">日期</span>
                <span class="value">：{{item.scheduleDate}}</span>
              </div>
              <div class="item">
                <span class="key">院区</span>
                <span class="value">：{{item.hostpitalName}}</span>
              </div>
              <div class="item">
                <span class="key">科室</span>
                <span class="value">：{{item.deptName}}</span>
              </div>
              <div class="item">
                <span class="key">医生</span>
                <span class="value">：{{item.doctorName}}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <span class="price">{{item.regFee}}元</span>
            <span class="orderTime">{{item.beginTime}}-{{item.endTime}}</span>
            <span :class="{noArrival: item.visitFlag ==='0',arrivaled: item.visitFlag ==='1' || item.visitFlag === '-1'}">{{status(item.visitFlag)}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  name: 'regOrder',
  data () {
    return {
      orderList: []
    }
  },
  created () {
    util.http
      .post('/api/pat/findAllRegister')
      .then(res => {
        console.log(res)
        this.orderList = res.data.Records.sort(util.compareTime('createDate'))
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    status (code) {
      let text = ''
      switch (code) {
        case '0':
          text = '未报到'
          break
        case '1':
          text = '已报到'
          break
        case '-1':
          text = '已就诊'
      }
      return text
    },
    detail (hisOrdNum) {
      util.http
        .post('/api/pat/findRegisterInfo', {hisOrdNum})
        .then(res => {
          console.log(res)
          let status
          if (res.data.Records.visitFlag === '0') {
            status = '未报到'
          } else if (res.data.Records.visitFlag === '1') {
            status = '已报道'
          } else {
            status = '已就诊'
          }
          let text = `
      <div>
        <p style="color: #5adba3;">订单详情</p>
        <p>订单流水号: ${res.data.Records.hisOrdNum}</p>
        <p>创建时间: ${res.data.Records.createDate}</p>
        <p>就诊科室：${res.data.Records.deptName}</p>
        <p>就诊医生：${res.data.Records.doctorName}</p>
        <p>就诊日期：${res.data.Records.scheduleDate}</p>
        <p>就诊时间：${res.data.Records.beginTime}-${res.data.Records.endTime}</p>
        <p>病人姓名：${res.data.Records.patName}</p>
        <p>病人卡号：${res.data.Records.patCardNo}</p>
        <p>卡号类型：${res.data.Records.patCardType === '1' ? '就诊卡' : '社保卡'}</p>
        <p>挂号费用：${res.data.Records.regFee}</p>
        <p>当前状态：${status}</p>
      </div>
      `
          this.$messagebox('提示', text)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.regOrder
  @include page($color-page-background)
  .noData
    width: 366px
    margin-top: 50px
    margin-left: 200px
  .paidTime
    color: $color-word-grey
    font-size: 24px
    padding: 25px 30px
  .orderCard
    height: 170px
    background: $color-white
    padding: 30px 50px 30px 40px
    display: flex
    justify-content: space-between
    align-items: center
    .left
      display: flex
      justify-content: flex-start
      align-items: center
      img
        width: 43px
        margin-right: 30px
      .baseInfo
        font-size: 24px
        line-height: 36px
        .key
          color: $color-word-grey
        .value
          color: $color-value-grey
        .name
          color: #5adba3
          font-size: 26px
          font-weight: bold
          line-height: 50px
        .num
          font-size: 24px
          color: $color-title-grey
          display: inline-block
          margin-left: 12px
    .right
      display: flex
      flex-direction: column
      align-items: flex-end
      span
        color: $color-white
        font-size: 24px
        padding: 3px 11px
        border-radius: 5px
      .price
        background: #f69343
      .orderTime
        margin-top: 10px
        background: #5adba3
      .noArrival
        margin-top: 10px
        background: #f69343
      .arrivaled
        margin-top: 10px
        background: #5adba3
</style>
