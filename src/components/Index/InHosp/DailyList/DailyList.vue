<template>
  <div class="dailyList">
    <div class="list">
      <img class="noData" v-if="dailyListInfo === {}" src="./img/noData.png" />
      <div v-for="(item,index) in dailyListInfo" :key="index">
        <div class="orderInfo">
          <ul>
            <li>
              <span class="key">费用日期</span>
              <span class="value">{{item.itemDate}}</span>
            </li>
            <li>
              <span class="key">住院科室</span>
              <span class="value">{{item.deptName}}</span>
            </li>
            <li>
              <span class="key">结算类别</span>
              <span class="value">{{item.settleType}}</span>
            </li>
            <li>
              <span class="key">病床号</span>
              <span class="value">{{item.bedNo}}</span>
            </li>
            <li>
              <span class="key">费用总金额</span>
              <span class="value">{{moneyComputed(item.totalFee)}}</span>
            </li>
            <li>
              <span class="key">甲类金额</span>
              <span class="value">{{moneyComputed(item.feeA)}}</span>
            </li>
            <li>
              <span class="key">乙类金额</span>
              <span class="value">{{moneyComputed(item.feeB)}}</span>
            </li>
            <li>
              <span class="key">丙类金额</span>
              <span class="value">{{moneyComputed(item.bedFee)}}</span>
            </li>
            <li>
              <span class="key">西药费</span>
              <span class="value">{{moneyComputed(item.westMedFee)}}</span>
            </li>
            <li>
              <span class="key">成药费</span>
              <span class="value">{{moneyComputed(item.readyMedFee)}}</span>
            </li>
            <li>
              <span class="key">草药费</span>
              <span class="value">{{moneyComputed(item.herbMedFee)}}</span>
            </li>
            <li>
              <span class="key">诊疗费</span>
              <span class="value">{{moneyComputed(item.treatFee)}}</span>
            </li>
            <li>
              <span class="key" style="font-weight: bold">合计</span>
              <span class="value" style="font-weight: bold">{{moneyComputed(item.itemTotalFee)}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    moneyComputed (val) {
      return (Number(val) / 100).toFixed(2)
    },
    back () {
      this.$router.go(-1)
    },
    getInfo () {
      this.$post('/api/user/vx_info').then(res => {
        if (res.code === 0) {
          let visitName = res.data.info.visitName
          let visitCardNo = res.data.info.visitCardNo
          let patIdNo = res.data.info.pat_list.filter(item => item.visitCardNo === visitCardNo)[0].patIdNo
          this.$post('/api/invisit/getInPatInfo', {
            pat_name: visitName,
            id_card_no: patIdNo
          })
            .then(res => {
              this.getVisitDaliyOne(visitCardNo, '1', res.data.InVisitId)
              if (res.data.CardNo) {
                this.$toast('无住院信息')
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getVisitDaliyOne (patCardNo, patCardType, inVisitId) {
      this.$post('/api/invisit/getVisitDaliyOne', { pat_card_no: patCardNo, pat_card_type: patCardType, in_visit_id: inVisitId })
        .then(res => {
          console.log(res)
          this.dailyListInfo = res.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.dailyList
  @include page($color-page-background)
  /deep/ .mint-cell-value
    width: 750px
    justify-content: space-between
  /deep/ .mint-cell-wrapper
    border-bottom: 1px solid $color-border
    padding: 28px 45px 30px 41px
  .list
    .orderInfo
      background: $color-white
      ul > li
        height: 88px
        padding: 0 54px 0 43px
        display: flex
        justify-content: space-between
        align-items: center
        border-bottom: 1px solid $color-border
        .key
          color: $color-title-black
          font-size: 30px
        .value
          color: $color-value-grey
          font-size: 30px
  .btn
    margin: 0 12.5px
    margin-top: 50px
    width: 725px
    height: 80px
    background: $color-primary
    font-size: 30px
</style>
