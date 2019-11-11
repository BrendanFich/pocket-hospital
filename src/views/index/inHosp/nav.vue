<template>
  <div class="nav">
    <img src="@/assets/img/hosptalBg.png" class="hospBg" />
    <div class="content">
      <ul>
        <li @click="register">
          <img src="@/assets/img/enter.png" alt class="icon" />
          <div class="navInfo">
            <div class="navName">入院登记</div>
            <div class="navIntro">进行入院资料登记</div>
          </div>
        </li>
        <li @click="linkTo('/mine/liveHosOrder')">
          <img src="@/assets/img/hosptalPay.png" alt class="icon" />
          <div class="navInfo">
            <div class="navName">预交金缴纳</div>
            <div class="navIntro">在线预交金缴纳</div>
          </div>
        </li>
        <li @click="linkTo('/inHosp/dailyList')">
          <img src="@/assets/img/dailyList.png" alt class="icon" />
          <div class="navInfo">
            <div class="navName">每日清单</div>
            <div class="navIntro">住院每日清单查询</div>
          </div>
        </li>
        <li @click="linkTo('/inHosp/feeTotal')">
          <img src="@/assets/img/totalList.png" alt class="icon" />
          <div class="navInfo">
            <div class="navName">汇总清单</div>
            <div class="navIntro">总清单查询</div>
          </div>
        </li>
        <li @click="linkTo('/inHosp/outCount')">
          <img src="@/assets/img/outPay.png" alt class="icon" />
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
import util from '@/assets/js/util'

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
    },
    register () {
      util.http
        .post('/api/invisit/getInPatInfo')
        .then(res => {
          if (res.data.hisOrdNum === '') {
            this.$router.push('/inHosp/inHospReg1')
          } else {
            this.$router.push('/inHosp/regInfo')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {}
}
</script>

<style lang='scss' scoped>
.nav {
  background: #f2f2f2;
  min-height: 100vh;
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
    ul {
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
          font-weight: bold;
          margin-bottom: 14px;
        }
        .navIntro {
          font-size: 24px;
          color: #999999;
        }
      }
    }
  }
}
</style>
