<template>
  <div class="regOrder">
    <img class="noData" v-if="orderList.length === 0" src="@/assets/img/noData.png" />
    <ul>
      <li v-for="(item, index) in orderList" :key="index">
        <div class="paidTime">下单日期：{{item.createDate}}</div>
        <div class="orderCard">
          <div class="left">
            <img src="@/assets/img/orderIcon.png" alt />
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
            <span :class="{noArrival: item.visitFlag ==='0',arrivaled: item.visitFlag ==='1'}">{{status(item.visitFlag)}}</span>
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
        this.orderList = res.data.Records
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
    }
  }
}
</script>

<style lang="scss" scoped>
.regOrder {
  background: #f2f2f2;
  height: 100vh;
  .noData {
    width: 366px;
    margin-top: 50px;
    margin-left: 200px;
  }
  .paidTime {
    color: #999999;
    font-size: 24px;
    padding: 25px 30px;
  }
  .orderCard {
    height: 170px;
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
        width: 43px;
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
      }
      .orderTime {
        margin-top: 10px;
        background: #5adba3;
      }
      .noArrival{
        margin-top: 10px;
        background: #f69343;
      }
      .arrivaled {
        margin-top: 10px;
        background: #5adba3;
      }
    }
  }
}
</style>
