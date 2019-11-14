<template>
  <div class='outCount'>
    <CustomerInfoCard></CustomerInfoCard>
    <div class="summary">
      <ul>
        <li>总费用汇总：</li>
        <li></li><!-- 空li占位 -->
        <li>预交金总额：<span class="value">{{prePay}}</span></li>
        <li>住院总费用：<span class="value">{{totalFee}}</span></li>
        <li>预交金余额：<span class="value">{{prePay - totalFee}}</span></li>
        <li @click="recharge"><span class="icon">充值</span></li>
      </ul>
    </div>

  </div>
</template>

<script>
import CustomerInfoCard from '@/components/CustomerInfoCard'
import util from '@/assets/js/util'
export default {
  components: { CustomerInfoCard },
  data () {
    return {
      prePay: 50000,
      totalFee: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    recharge () {
      this.$router.push('/inHosp/balance')
    },
    getSumList () {
      util.http
        .post('/api/invisit/getVisitDaliySum')
        .then(res => {
          console.log(res)
          let totalFee = 0
          let resData = res.data.Records.Records
          for (let i = 0; i < resData.length; i++) {
            totalFee = totalFee + parseInt(resData[i].ItemTotalFee)
          }
          this.totalFee = totalFee
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.getSumList()
  }
}
</script>

<style lang='scss' scoped>
.outCount{
  background: #f2f2f2;
  height: 100vh;
  .summary {
    background: url("../../../assets/img/allTotalBg.png") no-repeat;
    width: 750px;
    height: 269px;
    background-size: 100% 100%;
    color: #fff;
    margin-top: 28px;
    ul{
      padding: 32px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      li{
        width: 330px;
        height: 78px;
        font-size: 24px;
        .value {
          font-size: 36px;
          font-weight:bold;
        }
      }
      .icon {
        padding: 8px 25px;
        background: rgba(255, 255, 255, 0.41);
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
