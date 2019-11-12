<template>
  <div class="liveHosOrder">
    <ul>
      <li v-for="(item, index) in payInfoList" :key="index">
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
            <span class="price">{{item.paymentFee}}元</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  name: 'liveHosOrder',
  data () {
    return {
      selected: 0,
      payInfoList: []
    }
  },
  created () {
    util.http
      .post('/api/invisit/getVisitPayInfo')
      .then(res => {
        console.log(res)
        this.payInfoList = res.data.Records
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang="scss" scoped>
.liveHosOrder {
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
}
</style>
