<template>
  <div class="mine">
    <CustomerInfoCard></CustomerInfoCard>
    <div class="orderList">
      <mt-cell class="cell" is-link to="/regOrder">
        <div slot="title" class="content">挂号订单</div>
        <img slot="icon" src="@/assets/img/挂号 (1).png" />
      </mt-cell>
      <mt-cell class="cell" is-link>
        <div slot="title" class="content">缴费订单</div>
        <img slot="icon" src="@/assets/img/缴费.png" />
      </mt-cell>
      <mt-cell class="cell" is-link to="/liveHosOrder">
        <div slot="title" class="content">住院预交金订单</div>
        <img slot="icon" src="@/assets/img/住院2.png" />
      </mt-cell>
      <mt-cell class="cell" is-link>
        <div slot="title" class="content">点餐订单</div>
        <img slot="icon" src="@/assets/img/点餐.png" />
      </mt-cell>
      <mt-cell class="cell" is-link>
        <div slot="title" class="content">我的就诊</div>
        <img slot="icon" src="@/assets/img/我 的.png" />
      </mt-cell>
    </div>
  </div>
</template>

<script>
import CustomerInfoCard from '../components/CustomerInfoCard'
export default {
  name: 'Mine',
  data () {
    return {}
  },
  components: { CustomerInfoCard }
}
</script>

<style lang="scss" scoped>
.mine {
  background: #f2f2f2;
  height: 100vh;
  .orderList {
    margin-top: 33px;
    .cell {
      border-bottom: 1px solid #f2f2f2;
      .content {
        padding: 38px 0px 38px 24px;
        font-size: 24px;
        color: #666666;
      }
      img {
        width: 24px;
        height: 24px;
      }
      /deep/ .mint-cell-allow-right::after {
        width: 15px;
        height: 15px;
        margin-right: 40px;
      }
      /deep/ .mint-cell-wrapper {
        padding: 0 60px;
      }
    }
    /deep/ .mint-cell-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>
