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
      <li @click="noFinish">
        <div>
          <img src="./img/mealIcon.png" />
          <span class="title">点餐订单</span>
        </div>
        <span class="linkIcon">></span>
      </li>
      <li @click="noFinish">
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
      <div class="item" @click="noFinish">
        <img src="./img/questionIcon.png" alt />
        <span>随访问卷</span>
      </div>
      <div class="item" @click="noFinish">
        <img src="./img/linkIcon.png" alt />
        <span>友情链接</span>
      </div>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/base/Tabbar/Tabbar'

export default {
  name: 'mine',
  data () {
    return {
    }
  },
  created () {
  },
  components: { CustomerInfoCard: () => import('@/base/CustomerInfoCard/CustomerInfoCard'), Tabbar },
  methods: {
    linkTo (url) {
      this.$router.push(url)
    },
    noFinish () {
      this.$toast.fail('尚未开发')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.mine
  background: $color-page-background
  min-height: calc(100vh - 98px)
  .orderList
    margin-top: 22px
    background: $color-white
  .orderList > li
    height: 100px
    padding: 0 54px 0 43px
    display: flex
    justify-content: space-between
    align-items: center
    border-bottom: 1px solid $color-border
    > div
      display: flex
      align-items: center
      > img
        width: 30px
        margin-right: 30px
    .title
      color: $color-value-grey
      font-size: 24px
    .linkIcon
      color: $color-title-grey
      font-size: 24px
  .others
    background: $color-white
    margin-top: 45px
    margin-bottom: 98px
    padding: 30px 10px
    display: flex
    justify-content: space-around
    align-items: center
    .item
      display: flex
      flex-direction: column
      align-items: center
      img
        margin-bottom: 16px
        width: 80px
      span
        font-size: 24px
        color: $color-value-grey
</style>
