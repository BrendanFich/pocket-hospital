<template>
  <div class="index">
    <div class="main">
      <div class="slogan">
        <img src="@/assets/首页_slices/图层 1.png" />
      </div>
      <div class="navs1">
        <router-link class="nav1" to='/reserve1'>
          <img src="@/assets/首页_slices/组26(1).png" />
          <h2>预约、挂号</h2>
          <p>当天挂号、预约挂号</p>
        </router-link>
        <div class="nav1">
          <img src="@/assets/首页_slices/组26.png" />
          <h2>缴费</h2>
          <p>在线缴检查费、药费</p>
        </div>
      </div>
      <div class="navs2">
        <div class="left">
          <div>
            <h2>智能导诊</h2>
            <p>精准，安全，快捷</p>
          </div>
          <img src="@/assets/首页_slices/f51a82f794ecc.png" />
        </div>
        <div class="right">
          <div class="nav2">
            <div>
              <h2>就诊报到</h2>
              <p>报到后获取排队信息</p>
            </div>
            <img src="@/assets/首页_slices/组 27.png" />
          </div>
          <div class="nav2">
            <div>
              <h2>住院服务</h2>
              <p>住院手续一条龙服务</p>
            </div>
            <img src="@/assets/首页_slices/住院服务.png" />
          </div>
        </div>
      </div>
      <div class="navs3">
        <h2>其他服务</h2>
        <div class="otherItems">
          <div class="item">
            <img src="@/assets/首页_slices/医院 (2).png" />
            <h3>医院信息</h3>
          </div>
          <div class="item">
            <img src="@/assets/首页_slices/医生 (1).png" />
            <h3>医生介绍</h3>
          </div>
          <div class="item">
            <img src="@/assets/首页_slices/报告 (1).png" />
            <h3>报告查询</h3>
          </div>
          <div class="item">
            <img src="@/assets/首页_slices/药.png" />
            <h3>药品查询</h3>
          </div>
          <div class="item">
            <img src="@/assets/首页_slices/医疗.png" />
            <h3>医疗服务价格</h3>
          </div>
          <div class="item">
            <img src="@/assets/首页_slices/车位.png" />
            <h3>车位查询</h3>
          </div>
          <div class="item">
            <img src="@/assets/首页_slices/意见.png" />
            <h3>意见提交</h3>
          </div>
          <div class="item">
            <img src="@/assets/首页_slices/导航.png" />
            <h3>来院导航</h3>
          </div>
        </div>
      </div>
    </div>
    <HomeTabbar></HomeTabbar>
  </div>
</template>

<script>
import HomeTabbar from '../components/HomeTabbar'
export default {
  name: 'Index',
  data () {
    return {}
  },
  components: { HomeTabbar },
  methods: {}
}
</script>
<style lang="scss" scoped>
.index {
  .main {
    width: 100%;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .slogan {
      width: 100%;
      img {
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
        img {
          width: 358px;
          position: absolute;
          z-index: -1;
        }
        h2 {
          font-size: 30px;
          margin-left: 125px;
          margin-top: 46px;
        }
        p {
          margin-left: 125px;
          font-size: 20px;
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
        }
        p {
          font-size: 18px;
          color: #999999;
        }
        img {
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
          }
          p {
            font-size: 18px;
            color: #999999;
            margin-right: 50px;
          }
          img {
            width: 72px;
          }
        }
      }
    }
    .navs3 {
      width: 100%;
      padding-bottom: 156px;
      h2 {
        color: #333333;
        font-size: 24px;
        padding-left: 49px;
        line-height: 68px;
        font-weight: 400;
        font-size: 24px;
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
          img {
            width: 45px;
            height: 45px;
          }
        }
      }
    }
  }
}
</style>
