<template>
  <div class="payOnline">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">未付款</mt-tab-item>
      <mt-tab-item id="2" @click.native="getPaidList">已付款</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <img class="noData" v-if="unpaid.length === 0" src="@/assets/img/noData.png" />
        <div v-for="(item,index) in unpaid" :key="index">
          <mt-cell @click.native="pay(item.ledgerSn)">
            <div class="leftInfo">
              <div class="name">{{item.patName}}</div>
              <div class="patCardNo">{{item.PatCardNo}}</div>
              <div class="serial_number">
                流水号：
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
        <img class="noData" v-if="paid.length === 0" src="@/assets/img/noData.png" />
        <div v-for="(item,index) in paid" :key="index">
          <mt-cell>
            <div class="leftInfo">
              <div class="name">{{item.patName}}</div>
              <div class="patCardNo">{{item.PatCardNo}}</div>
              <div class="serial_number">
                流水号：
                <span class="value">{{item.outPatId}}</span>
              </div>
              <div class="department">
                开单科室：
                <span class="value">{{item.paymentDeptName}}</span>
              </div>
            </div>
            <div class="rightInfo">
              <div class="price">{{item.paymentFee}}元</div>
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
export default {
  name: 'payOnline',
  data () {
    return {
      selected: '1',
      clickedPaid: false,
      clickedUnPaid: false,
      unpaid: [
        // {
        //   name: '张家辉',
        //   patCardNo: '3567901',
        //   serial_number: '2019082854321',
        //   department: '内分泌科(门)',
        //   date: '2019-08-28 11:30',
        //   price: '113.21元'
        // }
      ],
      paid: [
        // {
        //   name: '陈小春',
        //   patCardNo: '3567901',
        //   serial_number: '2019082854321',
        //   department: '内分泌科(门)',
        //   date: '2019-08-28 11:30',
        //   price: '113.21元'
        // },
        // {
        //   name: '陈小春',
        //   patCardNo: '3567901',
        //   serial_number: '2019082854321',
        //   department: '内分泌科(门)',
        //   date: '2019-08-28 11:30',
        //   price: '113.21元'
        // }
      ]
    }
  },
  created () {
    this.getUnpaidList()
  },
  methods: {
    getUnpaidList () {
      if (!this.clickedUnPaid) {
        util.http
          .post('/api/doctor/getVisitPayInfo')
          .then(res => {
            console.log(res)
            this.unpaid = res.data.Records
            this.clickedUnPaid = true
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    getPaidList () {
      if (!this.clickedPaid) {
        util.http
          .post('/api/doctor/payInfoList')
          .then(res => {
            console.log(res)
            this.paid = res.data.Records
            this.clickedPaid = true
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    pay (ledgerSn) {
      console.log('paying...')
      util.http
        .post('/api/doctor/payInfo', {ledgerSn})
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.payOnline {
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
  .mint-tab-container {
    margin-top: 28px;
    /deep/ .mint-cell-value {
      width: 750px;
      justify-content: space-between;
    }
    /deep/ .mint-cell-wrapper {
      border-bottom: 1px solid#e3e3e3;
      padding: 28px 45px 30px 41px;
    }
    .mint-cell-wrapper {
      .leftInfo {
        .name {
          display: inline-block;
          margin-right: 13px;
          line-height: 66px;
          font-size: 30px;
          color: #09cf74;
          font-weight: bold;
        }
        .patCardNo {
          display: inline-block;
          font-size: 24px;
          color: #666666;
        }
        .serial_number {
          line-height: 48px;
          font-size: 26px;
          color: #333333;
          .value {
            color: #999999;
          }
        }
        .department {
          line-height: 48px;
          font-size: 26px;
          color: #333333;
        }
      }
      .rightInfo {
        text-align: center;
        .price {
          float: right;
          width: 80px;
          padding: 12px 10px;
          background: #f69343;
          color: #fff;
          border-radius: 10px;
          font-size: 26px;
          margin-bottom: 16px;
        }
        .unPaid {
          background: #d8d8d8;
        }
        .date {
          clear: both;
          color: #999999;
          font-size: 24px;
        }
      }
    }
  }
  .noData {
        width: 366px;
        margin: 100px 200px;
      }
}
</style>
