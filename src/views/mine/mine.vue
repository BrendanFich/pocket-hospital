<template>
  <div class="mine">
    <CustomerInfoCard></CustomerInfoCard>
    <div class="orderList">
      <mt-cell class="cell" is-link to="/mine/regOrder">
        <div slot="title" class="content">挂号订单</div>
        <img slot="icon" src="@/assets/img/挂号 (1).png" />
      </mt-cell>
      <mt-cell class="cell" is-link>
        <div slot="title" class="content">缴费订单</div>
        <img slot="icon" src="@/assets/img/缴费.png" />
      </mt-cell>
      <mt-cell class="cell" is-link to="/mine/liveHosOrder">
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
    <div class="others">
      <div class="item">
        <img src="@/assets/img/组 28.png" alt />
        <span>我的报告</span>
      </div>
      <div class="item">
        <img src="@/assets/img/组 28(1).png" alt />
        <span>就医反馈</span>
      </div>
      <div class="item">
        <img src="@/assets/img/组 28(2).png" alt />
        <span>随访问卷</span>
      </div>
      <div class="item">
        <img src="@/assets/img/组 28(3).png" alt />
        <span>友情链接</span>
      </div>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import CustomerInfoCard from '@/components/CustomerInfoCard'
import Tabbar from '@/components/Tabbar'
export default {
  name: 'mine',
  data () {
    return {}
  },
  components: { CustomerInfoCard, Tabbar }
}
</script>

<style lang="scss" scoped>
.mine {
  background: #f2f2f2;
  height: 100vh;
  .orderList {
    margin-top: 33px;
    .cell {
      .content {
        padding: 38px 0px 38px 24px;
        font-size: 24px;
        color: #666666;
      }
      img {
        width: 24px;
        margin-left: 60px;
      }
      /deep/ .mint-cell-allow-right::after {
        width: 15px;
        height: 15px;
        margin-right: 40px;
      }
      /deep/ .mint-cell-wrapper {
        border-bottom: 1px solid #f2f2f2;
        padding: 0 ;
      }
    }
    /deep/ .mint-cell-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .others {
    background: #fff;
    margin-top: 45px;
    margin-bottom: 98px;
    padding: 30px 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        margin-bottom: 16px;
        width: 80px;
      }
      span {
        font-size: 24px;
        color: #666666;
      }
    }
  }
}
</style>
