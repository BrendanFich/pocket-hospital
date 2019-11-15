<template>
  <div class="regInfo">
    <h1>住院登记信息：</h1>
    <ul>
      <li>
        <span class="key">流水号</span>
        <span class="value">{{regInfo.hisOrdNum}}</span>
      </li>
      <li>
        <span class="key">卡号</span>
        <span class="value">{{regInfo.CardNo}}</span>
      </li>
      <li>
        <span class="key">登记时间</span>
        <span class="value">{{regInfo.AdmitDT}}</span>
      </li>
      <li>
        <span class="key">姓名</span>
        <span class="value">{{regInfo.patName}}</span>
      </li>
      <li>
        <span class="key">电话</span>
        <span class="value">{{regInfo.patMobile}}</span>
      </li>
    </ul>
    <mt-button class="backBtn" type="primary" @click="back">返回</mt-button>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  components: {},
  data () {
    return {
      regInfo: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    util.http
      .post('/api/invisit/getInPatInfo')
      .then(res => {
        if (res.data.hisOrdNum === '') {
          this.$router.push('/inHosp/inHospReg1')
        } else {
          this.regInfo = res.data
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang='scss' scoped>
.regInfo {
  background: #f2f2f2;
  min-height: 100vh;
  h1 {
    color: #333333;
    font-size: 30px;
    font-weight: bold;
    padding: 30px 40px;
  }
  ul > li {
    background: #fff;
    height: 88px;
    padding: 0 54px 0 43px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ededed;
    .key {
      color: #333333;
      font-size: 30px;
      font-weight: bold;
    }
    .value {
      color: #666666;
      font-size: 30px;
    }
  }
  .backBtn {
    margin: 0 12.5px;
    margin-top: 92px;
    width: 725px;
    height: 80px;
    background: #09cf74;
    font-size: 30px;
  }
}
</style>
