<template>
  <div class="index">
    <div class="slogan">
      <img src="./img/indexBg.png" />
    </div>
    <div class="navs1">
      <router-link class="nav1" to="/reserve">
        <img src="./img/reserveBg.png" />
        <h2>预约、挂号</h2>
        <p>当天挂号、预约挂号</p>
      </router-link>
      <div class="navs1">
        <router-link class="nav1" to="/outpatientPay">
          <img src="./img/payOnlineBg.png" />
          <h2>门诊缴费</h2>
          <p>在线缴检查费、药费</p>
        </router-link>
      </div>
    </div>
    <div class="navs2">
      <router-link class="left" to="/guidance">
        <div>
          <h2>智能导诊</h2>
          <p>精准，安全，快捷</p>
        </div>
        <img src="./img/woman.png" />
      </router-link>
      <div class="right">
        <!-- <router-link class="nav2" to="/checkIn">
          <div>
            <h2>就诊报到</h2>
            <p>报到后获取排队信息</p>
          </div>
          <img src="./img/checkIn.png" />
        </router-link> -->
        <router-link class="nav2" to="/inHosp/nav">
          <div>
            <h2>住院服务</h2>
            <p>住院手续一条龙服务</p>
          </div>
          <img src="./img/inHospital.png" />
        </router-link>
      </div>
    </div>
    <div class="navs3">
      <h2>其他服务</h2>
      <div class="otherItems">
        <router-link class="item" to="/hospitalInfo">
          <img src="./img/hospitalIcon.png" />
          <h3>医院信息</h3>
        </router-link>
        <router-link class="item" to="/doctorIntro">
          <img src="./img/dortorIcon.png" />
          <h3>医生介绍</h3>
        </router-link>
        <router-link class="item" to="/reports">
          <img src="./img/reports.png" />
          <h3>报告查询</h3>
        </router-link>
        <router-link class="item" to="/drugSearch">
          <img src="./img/drugIcon.png" />
          <h3>药品查询</h3>
        </router-link>
        <router-link class="item" to="/serverSearch">
          <img src="./img/serverIcon.png"/>
          <h3>医疗服务价格</h3>
        </router-link>
        <!-- <router-link class="item" to="/parking">
          <img src="./img/parkIcon.png" />
          <h3>车位查询</h3>
        </router-link> -->
        <router-link class="item" to="/suggestion">
          <img src="./img/suggestion.png" />
          <h3>意见提交</h3>
        </router-link>
        <div class="item" to="/index" @click="getLocation">
          <img src="./img/guidance.png" />
          <h3>来院导航</h3>
        </div>
        <div class="item"></div>
      </div>
    </div>
    <!-- <Tabbar></Tabbar> -->
  </div>
</template>

<script>
import Tabbar from '@/base/Tabbar/Tabbar'
import wx from 'weixin-js-sdk'

export default {
  name: 'index',
  data () {
    return {}
  },
  components: { Tabbar },
  created () {
    this.$store.commit('clearRegInfo')
  },
  methods: {
    getLocation () {
      wx.ready(function () {
        wx.openLocation({
          latitude: this.$store.state.gpsLatitude,
          longitude: this.$store.state.gpsLongitude,
          name: this.$store.state.gpsName,
          address: this.$store.state.gpsAddress,
          scale: 18
        })
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.index
  backgroud: $color-white
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  flex-wrap: wrap
  .slogan
    width: 100%
    > img
      width: 100%
  .navs1
    display: flex
    .nav1
      display: block
      width: 368px
      height: 148px
      color: $color-white
      position: relative
      > img
        width: 358px
      h2
        font-size: 30px
        font-weight: bold
        position: absolute
        top: 46px
        left: 125px
      p
        font-size: 20px
        position: absolute
        top: 85px
        left: 125px
  .navs2
    border-top: 1px solid $color-border
    border-bottom: 1px solid $color-border
    margin-top: 30px
    width: 100%
    display: flex
    .left
      width: 324px
      height: 247px
      padding: 32px 0 0 39px
      position: relative
      border-right: 1px solid $color-border
      h2
        font-size: 30px
        color: $color-value-grey
        font-weight: bold
      p
        margin-top: 10px
        font-size: 18px
        color: $color-word-grey
      > img
        position: absolute
        right: -4px
        bottom: -10px
        width: 181px
    .right
      width: 424px
      padding: 0 1px
      display: flex
      flex-wrap: wrap
      justify-content: center
      align-items: center
      // .nav2:first-child
      //   border-bottom: 2px solid $color-border
      // .nav2
      //   height: 124px
      //   width: 100%
      //   display: flex
      //   justify-content: center
      //   align-items: center
      //   h2
      //     font-size: 30px
      //     color: $color-value-grey
      //     font-weight: bold
      //   p
      //     margin-top: 10px
      //     font-size: 18px
      //     color: $color-word-grey
      //     margin-right: 50px
      //   > img
      //     width: 72px
      .nav2:first-child
        // border-bottom: 1px solid $color-border
      .nav2
        width: 324px
        height: 247px
        padding: 32px 0 0 39px
        position: relative
        h2
          font-size: 30px
          color: $color-value-grey
          font-weight: bold
        p
          margin-top: 10px
          font-size: 18px
          color: $color-word-grey
        > img
          position: absolute
          right: 20px
          bottom: 20px
          width: 120px
  .navs3
    width: 100%
    padding-bottom: 98px
    flex: 1
    h2
      color: $color-title-black
      font-size: 30px
      padding-left: 49px
      line-height: 88px
      font-weight: 400
      border-bottom: 1px solid $color-border
    .otherItems
      width: 100%
      margin-top: 52px
      display: flex
      flex-wrap: wrap
      justify-content: space-around
      align-items: center
      text-align: center
      .item
        width: 180px
        height: 140px
        h3
          font-size: 24px
          color: $color-title-black
          font-weight: 400
          line-height: 68px
        > img
          width: 45px
</style>
