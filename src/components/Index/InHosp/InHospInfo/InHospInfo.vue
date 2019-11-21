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

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.InHospInfo
  @include page($color-page-background)
  .mint-cell-wrapper
    .leftInfo
      .name
        display: inline-block
        margin-right: 13px
        line-height: 66px
        font-size: 30px
        color: $color-primary
        font-weight: bold
      .patCardNo
        display: inline-block
        font-size: 24px
        color: $color-value-grey
      .serial_number
        line-height: 48px
        font-size: 26px
        color: $color-title-black
        .value
          color: $color-word-grey
      .department
        line-height: 48px
        font-size: 26px
        color: $color-title-black
    .rightInfo
      text-align: center
      .price
        float: right
        width: 80px
        padding: 12px 10px
        background: $color-primary
        color: $color-white
        border-radius: 10px
        font-size: 26px
        margin-bottom: 16px
      .unPaid
        background: #d8d8d8
      .date
        clear: both
        color: $color-word-grey
        font-size: 24px
</style>
