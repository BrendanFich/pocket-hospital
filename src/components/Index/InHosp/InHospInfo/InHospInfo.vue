<template>
  <div class="InHospInfo">
    <mt-cell @click.native="pay(item.ledgerSn)" v-for="(item, index) in list" :key="index">
      <div class="leftInfo">
        <div class="name">{{item.patName}}</div>
        <div class="patCardNo">{{item.PatCardNo}}</div>
        <div class="serial_number">
          证件号：
          <span class="value">{{item.IdentityNo}}</span>
        </div>
        <div class="department">
          科室：
          <span class="value">{{item.InDeptment}}</span>
        </div>
      </div>
      <div class="rightInfo">
        <div class="price unPaid">{{item.paymentFee}}元</div>
        <div class="date">{{item.paymentDate}}</div>
      </div>
    </mt-cell>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  components: {},
  data () {
    return {
      list: []
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {
    util.http
      .post('/api/invisit/getInPatInfo', {
        patIdNo: '440622192706264318',
        patName: '许均成'
      })
      .then(res => {
        console.log(res)
        this.list = res.data.Records
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang='scss' scoped>
.InHospInfo {
  background: #f2f2f2;
  height: 100vh;
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
</style>
