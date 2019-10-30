<template>
  <div class="nav">
    <img src="@/assets/img/医院背景.png" class="hospBg" />
    <div class="content">
      <ul>
        <li @click="linkTo('/inHosp/inHospReg1')">
          <img src="@/assets/img/入院登记.png" alt class="icon" />
          <div class="navInfo">
            <div class="navName">入院登记</div>
            <div class="navIntro">进行入院资料登记</div>
          </div>
        </li>
        <li @click="linkTo('/inHosp/prePay')">
          <img src="@/assets/img/住院缴费.png" alt class="icon" />
          <div class="navInfo">
            <div class="navName">预交金缴纳</div>
            <div class="navIntro">在线预交金缴纳</div>
          </div>
        </li>
        <li @click="linkTo('/inHosp/dailyList')">
          <img src="@/assets/img/每日清单.png" alt class="icon" />
          <div class="navInfo">
            <div class="navName">每日清单</div>
            <div class="navIntro">住院每日清单查询</div>
          </div>
        </li>
        <li @click="linkTo('/inHosp/feeTotal')">
          <img src="@/assets/img/总汇清单.png" alt class="icon" />
          <div class="navInfo">
            <div class="navName">汇总清单</div>
            <div class="navIntro">总清单查询</div>
          </div>
        </li>
        <li @click="linkTo('/inHosp/outCount')">
          <img src="@/assets/img/出院结算.png" alt class="icon" />
          <div class="navInfo">
            <div class="navName">出院结算</div>
            <div class="navIntro">出院金额结算</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    linkTo (url) {
      this.$router.push(url)
    }
  },
  created () {}
}
</script>

<style lang='scss' scoped>
.nav {
  background: #f2f2f2;
  height: 100vh;
  position: relative;
  .hospBg {
    width: 750px;
  }
  .content {
    position: absolute;
    top: 229px;
    left: 57px;
    width: 626px;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
    ul{
      margin-left: 40px;
      margin-right: 40px;
      padding-bottom: 110px;
    }
    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 137px;
      border-bottom: 1px solid #ccc;
      .icon {
        width: 69px;
        margin-right: 30px;
      }
      .navInfo {
        flex: 1;
        .navName {
          font-size: 30px;
          color: #333333;
          font-weight:bold;
          margin-bottom: 14px;
        }
        .navIntro{
          font-size: 24px;
          color: #999999;
        }
      }
    }
  }
}
</style>
