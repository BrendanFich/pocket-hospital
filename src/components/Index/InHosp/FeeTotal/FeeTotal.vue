<template>
  <div class="dailyList">
    <div class="list">
      <img class="noData" v-if="totalFee.length === 0" src="./img/noData.png" />
      <mt-cell v-for="(item,index) in totalFee" :key="index">
        <div class="leftInfo">
          <div class="name">床位号</div>
          <div class="medical_card">{{item.BedNo}}</div>
          <div class="serial_number">
            结算类别：
            <span class="value">{{item.SettleType}}</span>
          </div>
          <div class="department">
            科室：
            <span class="value">{{item.DeptName}}</span>
          </div>
        </div>
        <div class="rightInfo">
          <div class="price unPaid">{{item.ItemTotalFee}}</div>
          <div class="date">{{item.date}}</div>
        </div>
      </mt-cell>
    </div>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  components: {},
  data () {
    return {
      totalFee: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    getListInfo () {
      util.http
        .post('/api/invisit/getVisitDaliySum')
        .then(res => {
          console.log(res)
          this.totalFee = res.data.Records.Records
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
      .medical_card {
        display: inline-block;
        font-size: 24px;
        color: #666666;
      }
      .serial_number {
        line-height: 48px;
        font-size: 26px;
        color: #333333;

      }
      .department {
        line-height: 48px;
        font-size: 26px;
        color: #333333;
      }
      .value {
          color: #09CF74;
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
}
</style>
