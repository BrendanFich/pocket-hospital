<template>
  <div class="dailyList">
    <div class="list">
      <img class="noData" v-if="dailyListInfo === {}" src="@/assets/img/noData.png" />
      <mt-cell v-for="(item,index) in dailyListInfo" :key="index">
        <div class="leftInfo">
          <div class="item">
            费用日期：
            <span class="value">{{item.ItemDate}}</span>
          </div>
          <div class="item">
            住院科室：
            <span class="value">{{item.DeptName}}</span>
          </div>
          <div class="item">
            结算类别：
            <span class="value">{{item.SettleType}}</span>
          </div>
          <div class="item">
            病床号：
            <span class="value">{{item.BedNo}}</span>
          </div>
          <div class="item">
            费用总金额：
            <span class="value">{{item.TotalFee}}</span>
          </div>
          <div class="item">
            甲类金额：
            <span class="value">{{item.FeeA}}</span>
          </div>
          <div class="item">
            乙类金额：
            <span class="value">{{item.FeeB}}</span>
          </div>
          <div class="item">
            丙类金额：
            <span class="value">{{item.FeeC}}</span>
          </div>
          <div class="item">
            床位费：
            <span class="value">{{item.BedFee}}</span>
          </div>
          <div class="item">
            西药费：
            <span class="value">{{item.WestMedFee}}</span>
          </div>
          <div class="item">
            成药费:
            <span class="value">{{item.ReadyMedFee}}</span>
          </div>
          <div class="item">
            草药费:
            <span class="value">{{item.HerbMedFee}}</span>
          </div>
          <div class="item">
            诊疗费:
            <span class="value">{{item.TreatFee}}</span>
          </div>
          <div class="item">
            当天费用价格合计：
            <span class="value">{{item.ItemTotalFee}}</span>
          </div>
        </div>
      </mt-cell>
    </div>
    <mt-button class="btn" type="primary" @click="back">返回</mt-button>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  components: {},
  data () {
    return {
      dailyListInfo: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    back () {
      this.$router.go(-1)
    },
    pay () {

    },
    getListInfo () {
      util.http
        .post('/api/invisit/getVisitDaliyOne')
        .then(res => {
          console.log(res)
          this.dailyListInfo = res.data.Records.Records
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.getListInfo()
  }
}
</script>

<style lang='scss' scoped>
.dailyList {
  background: #f2f2f2;
  height: 100vh;
  /deep/ .mint-cell-value {
    width: 750px;
    justify-content: space-between;
  }
  /deep/ .mint-cell-wrapper {
    border-bottom: 1px solid#e3e3e3;
    padding: 28px 45px 30px 41px;
  }
  .list {
    .leftInfo {
      .name {
        display: inline-block;
        margin-right: 13px;
        line-height: 66px;
        font-size: 30px;
        color: #09cf74;
        font-weight: bold;
      }
      .item {
        line-height: 48px;
        font-size: 26px;
        color: #333333;
        .value {
          color: #09CF74;
        }
      }

    }
    .rightInfo {
      text-align:end;
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
        background: #09CF74;
      }
      .date {
        color: #999999;
        font-size: 24px;
      }
    }
  }
  .noData {
        width: 366px;
        margin: 100px 200px;
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
