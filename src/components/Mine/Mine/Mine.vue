<template>
  <div class="mine">
    <CustomerInfoCard></CustomerInfoCard>
    <ul class="orderList">
      <li @click="linkTo('/mine/regOrder')">
        <div>
          <img src="./img/regOrderIcon.png" />
          <span class="title">挂号订单</span>
        </div>
        <span class="linkIcon">></span>
      </li>
      <li @click="linkTo('/payOnline')">
        <div>
          <img src="./img/payOnlineIcon.png" />
          <span class="title">缴费订单</span>
        </div>
        <span class="linkIcon">></span>
      </li>
      <li @click="linkTo('/mine/liveHosOrder')">
        <div>
          <img src="./img/liveHosOrderIcon.png" />
          <span class="title">住院预交金订单</span>
        </div>
        <span class="linkIcon">></span>
      </li>
      <li>
        <div>
          <img src="./img/mealIcon.png" />
          <span class="title">点餐订单</span>
        </div>
        <span class="linkIcon">></span>
      </li>
      <li @click="linkTo('/iHospital/review')">
        <div>
          <img src="./img/mineIcon.png" />
          <span class="title">我的就诊</span>
        </div>
        <span class="linkIcon">></span>
      </li>
    </ul>
    <div class="others">
      <div class="item" @click="linkTo('/reports')">
        <img src="./img/myReportIcon.png" alt />
        <span>我的报告</span>
      </div>
      <div class="item" @click="linkTo('/suggestion')">
        <img src="./img/suggestionIcon.png" alt />
        <span>就医反馈</span>
      </div>
      <div class="item">
        <img src="./img/questionIcon.png" alt />
        <span>随访问卷</span>
      </div>
      <div class="item">
        <img src="./img/linkIcon.png" alt />
        <span>友情链接</span>
      </div>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import CustomerInfoCard from '@/base/CustomerInfoCard/CustomerInfoCard'
import Tabbar from '@/base/Tabbar/Tabbar'

export default {
  name: 'mine',
  data () {
    return {
    }
  },
  created () {
  },
  components: { CustomerInfoCard, Tabbar },
  methods: {
    linkTo (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.mine {
  background: #f2f2f2;
  height: 100vh;
  .orderList {
    margin-top: 22px;
    background: #fff;
  }
  .orderList > li {
    height: 100px;
    padding: 0 54px 0 43px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ededed;
    > div {
      display: flex;
      align-items: center;
      > img {
        width: 30px;
        margin-right: 30px;
      }
    }
    .title {
      color: #666666;
      font-size: 24px;
    }
    .linkIcon {
      color: #cccccc;
      font-size: 24px;
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
