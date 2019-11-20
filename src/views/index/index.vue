<template>
  <div class="index">
    <div class="slogan">
      <img src="@/assets/img/indexBg.png" />
    </div>
    <div class="navs1">
      <router-link class="nav1" to="/reserve">
        <img src="@/assets/img/reserveBg.png" />
        <h2>预约、挂号</h2>
        <p>当天挂号、预约挂号</p>
      </router-link>
      <div class="navs1">
        <router-link class="nav1" to="/payOnline">
          <img src="@/assets/img/payOnlineBg.png" />
          <h2>缴费</h2>
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
        <img src="@/assets/img/woman.png" />
      </router-link>
      <div class="right">
        <router-link class="nav2" to="/checkIn">
          <div>
            <h2>就诊报到</h2>
            <p>报到后获取排队信息</p>
          </div>
          <img src="@/assets/img/checkIn.png" />
        </router-link>
        <router-link class="nav2" to="/inHosp/nav">
          <div>
            <h2>住院服务</h2>
            <p>住院手续一条龙服务</p>
          </div>
          <img src="@/assets/img/inHospital.png" />
        </router-link>
      </div>
    </div>
    <div class="navs3">
      <h2>其他服务</h2>
      <div class="otherItems">
        <router-link class="item" to="/hospitalInfo">
          <img src="@/assets/img/hospitalIcon.png" />
          <h3>医院信息</h3>
        </router-link>
        <router-link class="item" to="/doctorIntro">
          <img src="@/assets/img/dortorIcon.png" />
          <h3>医生介绍</h3>
        </router-link>
        <router-link class="item" to="/reports">
          <img src="@/assets/img/reports.png" />
          <h3>报告查询</h3>
        </router-link>
        <router-link class="item" to="/drugSearch">
          <img src="@/assets/img/drugIcon.png" />
          <h3>药品查询</h3>
        </router-link>
        <router-link class="item" to="/serverPrice">
          <img src="@/assets/img/serverIcon.png"/>
          <h3>医疗服务价格</h3>
        </router-link>
        <router-link class="item" to="/parking">
          <img src="@/assets/img/parkIcon.png" />
          <h3>车位查询</h3>
        </router-link>
        <router-link class="item" to="/suggestion">
          <img src="@/assets/img/suggestion.png" />
          <h3>意见提交</h3>
        </router-link>
        <div class="item" to="/index" @click="getLocation">
          <img src="@/assets/img/guidance.png" />
          <h3>来院导航</h3>
        </div>
      </div>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/base/Tabbar'
import wx from 'weixin-js-sdk'
import config from '@/assets/js/config'

export default {
  name: 'index',
  data () {
    return {}
  },
  components: { Tabbar },
  created () {},
  methods: {
    getLocation () {
      console.log('click')
      wx.ready(function () {
        wx.openLocation({
          latitude: config.latitude,
          longitude: config.longitude,
          name: config.hospitalName,
          address: config.address,
          scale: 18
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .slogan {
    width: 100%;
    > img {
      width: 100%;
    }
  }
  .navs1 {
    display: flex;
    .nav1 {
      display: block;
      width: 368px;
      height: 148px;
      color: #fff;
      position: relative;
      > img {
        width: 358px;
      }
      h2 {
        font-size: 30px;
        font-weight: bold;
        position: absolute;
        top: 46px;
        left: 125px;
      }
      p {
        font-size: 20px;
        position: absolute;
        top: 85px;
        left: 125px;
      }
    }
  }
  .navs2 {
    border-top: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
    margin-top: 30px;
    width: 100%;
    display: flex;
    .left {
      width: 324px;
      height: 247px;
      padding: 32px 0 0 39px;
      position: relative;
      border-right: 1px solid #ededed;
      h2 {
        font-size: 30px;
        color: #666666;
        font-weight: bold;
      }
      p {
        margin-top: 10px;
        font-size: 18px;
        color: #999999;
      }
      > img {
        position: absolute;
        right: -4px;
        bottom: -10px;
        width: 181px;
      }
    }
    .right {
      width: 424px;
      padding: 0 1px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .nav2:first-child {
        border-bottom: 1px solid #ededed;
      }
      .nav2 {
        height: 124px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        h2 {
          font-size: 30px;
          color: #666666;
          font-weight: bold;
        }
        p {
          margin-top: 10px;
          font-size: 18px;
          color: #999999;
          margin-right: 50px;
        }
        > img {
          width: 72px;
        }
      }
    }
  }
  .navs3 {
    width: 100%;
    padding-bottom: 110px;
    h2 {
      color: #333333;
      font-size: 30px;
      padding-left: 49px;
      line-height: 88px;
      font-weight: 400;
      border-bottom: 1px solid #ededed;
    }
    .otherItems {
      width: 100%;
      margin-top: 52px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      .item {
        width: 180px;
        height: 140px;
        h3 {
          font-size: 24px;
          color: #333;
          font-weight: 400;
          line-height: 68px;
        }
        > img {
          width: 45px;
        }
      }
    }
  }
}
</style>
