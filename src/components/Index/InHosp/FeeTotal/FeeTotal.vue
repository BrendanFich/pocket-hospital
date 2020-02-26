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
    .leftInfo
      .name
        display: inline-block
        margin-right: 13px
        line-height: 66px
        font-size: 30px
        color: $color-primary
        font-weight: bold
      .medical_card
        display: inline-block
        font-size: 24px
        color: $color-value-grey
      .serial_number
        line-height: 48px
        font-size: 26px
        color: $color-title-black

      .department
        line-height: 48px
        font-size: 26px
        color: $color-title-black
      .value
          color: $color-primary
    .rightInfo
      text-align:end
      .price
        display: inline-block
        padding: 12px 10px
        background: $color-primary
        color: $color-white
        border-radius: 10px
        font-size: 26px
        margin-bottom: 16px
      .unPaid
        background: $color-primary
      .date
        color: $color-word-grey
        font-size: 24px
</style>
