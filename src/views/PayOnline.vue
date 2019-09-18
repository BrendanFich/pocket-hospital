<template>
  <div class="payOnline">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">未付款</mt-tab-item>
      <mt-tab-item id="2">已付款</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <router-link to="/checkIn" v-for="(item,index) in unpaid" :key="index">
          <mt-cell>
            <div class="leftInfo">
              <div class="name">{{item.name}}</div>
              <div class="medical_card">{{item.medical_card}}</div>
              <div class="serial_number">
                流水号：
                <span class="value">{{item.serial_number}}</span>
              </div>
              <div class="department">
                开单科室：
                <span class="value">{{item.department}}</span>
              </div>
            </div>
            <div class="rightInfo">
              <div class="price unPaid">{{item.price}}</div>
              <div class="date">{{item.date}}</div>
            </div>
          </mt-cell>
        </router-link>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div v-for="(item,index) in paid" :key="index">
          <mt-cell>
            <div class="leftInfo">
              <div class="name">{{item.name}}</div>
              <div class="medical_card">{{item.medical_card}}</div>
              <div class="serial_number">
                流水号：
                <span class="value">{{item.serial_number}}</span>
              </div>
              <div class="department">
                开单科室：
                <span class="value">{{item.department}}</span>
              </div>
            </div>
            <div class="rightInfo">
              <div class="price">{{item.price}}</div>
              <div class="date">{{item.date}}</div>
            </div>
          </mt-cell>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  name: 'PayOnline',
  data () {
    return {
      selected: '1',
      unpaid: [
        {
          name: '张家辉',
          medical_card: '3567901',
          serial_number: '2019082854321',
          department: '内分泌科(门)',
          date: '2019-08-28 11:30',
          price: '113.21元'
        },
        {
          name: '张家辉',
          medical_card: '3567901',
          serial_number: '2019082854321',
          department: '内分泌科(门)',
          date: '2019-08-28 11:30',
          price: '113.21元'
        },
        {
          name: '张家辉',
          medical_card: '3567901',
          serial_number: '2019082854321',
          department: '内分泌科(门)',
          date: '2019-08-28 11:30',
          price: '113.21元'
        },
        {
          name: '张家辉',
          medical_card: '3567901',
          serial_number: '2019082854321',
          department: '内分泌科(门)',
          date: '2019-08-28 11:30',
          price: '113.21元'
        },
        {
          name: '张家辉',
          medical_card: '3567901',
          serial_number: '2019082854321',
          department: '内分泌科(门)',
          date: '2019-08-28 11:30',
          price: '113.21元'
        }
      ],
      paid: [
        {
          name: '陈小春',
          medical_card: '3567901',
          serial_number: '2019082854321',
          department: '内分泌科(门)',
          date: '2019-08-28 11:30',
          price: '113.21元'
        },
        {
          name: '陈小春',
          medical_card: '3567901',
          serial_number: '2019082854321',
          department: '内分泌科(门)',
          date: '2019-08-28 11:30',
          price: '113.21元'
        },
        {
          name: '陈小春',
          medical_card: '3567901',
          serial_number: '2019082854321',
          department: '内分泌科(门)',
          date: '2019-08-28 11:30',
          price: '113.21元'
        },
        {
          name: '陈小春',
          medical_card: '3567901',
          serial_number: '2019082854321',
          department: '内分泌科(门)',
          date: '2019-08-28 11:30',
          price: '113.21元'
        },
        {
          name: '陈小春',
          medical_card: '3567901',
          serial_number: '2019082854321',
          department: '内分泌科(门)',
          date: '2019-08-28 11:30',
          price: '113.21元'
        },
        {
          name: '陈小春',
          medical_card: '3567901',
          serial_number: '2019082854321',
          department: '内分泌科(门)',
          date: '2019-08-28 11:30',
          price: '113.21元'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.payOnline {
  background: #f2f2f2;
  height: 100vh;
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
        .medical_card {
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
          display: inline-block;
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
          color: #999999;
          font-size: 24px;
        }
      }
    }
  }
}
</style>
