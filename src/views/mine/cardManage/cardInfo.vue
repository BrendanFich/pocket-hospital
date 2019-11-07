<template>
  <div class="cardInfo" v-if="cardInfo">
    <h2>就诊卡信息</h2>
    <mt-field label="卡类型" v-model="cardInfo.PatIdType" :disableClear="true" :readonly="true"></mt-field>
    <mt-field label="姓名" v-model="cardInfo.patName" :readonly="true" :disableClear="true"></mt-field>
    <mt-field label="卡号" v-model="$route.params.cardNo" :readonly="true" :disableClear="true"></mt-field>
    <mt-field
      label="证件号码"
      type="string"
      v-model="cardInfo.patIdNo"
      :readonly="true"
      :disableClear="true"
    ></mt-field>
    <mt-field label="性别" v-model="cardInfo.patSex" :readonly="true" :disableClear="true"></mt-field>
    <mt-field label="生日" v-model="cardInfo.patBirth" :readonly="true" :disableClear="true"></mt-field>
    <mt-button type="primary" class="btn" @click.native="setDefault">设为默认</mt-button>
  </div>
</template>

<script>
import util from '@/assets/js/util'

export default {
  name: 'cardInfo',
  data () {
    return {
    }
  },
  computed: {
    cardInfo () {
      return this.$store.state.patInfoBinded.filter(item => (item.visitCardNo === this.$route.params.cardNo) || (item.socialHosCardNO === this.$route.params.cardNo))[0]
    }
  },
  methods: {
    setDefault () {
      const duration = 1500
      const className = 'toast'
      util.http
        .post('/api/pat/changeCard',
          {
            patCardNo: this.$route.params.cardNo,
            patName: this.cardInfo.patName
          })
        .then(res => {
          this.$store.commit('updateUserInfo')
          this.$toast({ message: '设置成功', duration, className })
          // this.$router.back(-1)
          this.$router.push('/mine')
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.cardInfo {
  background: #f2f2f2;
  height: 100vh;
  h2 {
    color: #999999;
    font-size: 24px;
    padding: 25px 40px;
  }
  .mint-field {
    /deep/ .mint-cell-wrapper {
      padding: 0;
      height: 88px;
      font-size: 30px;
      font-weight: bold;
      .mint-cell-title {
        color: #44a0f5;
        width: 168px;
        padding-left: 40px;
      }
    }
  }
  .selectItem {
    position: relative;
    .isLink {
      color: #5adba3;
      font-size: 30px;
      position: absolute;
      top: 27px;
      right: 66px;
    }
  }
  /deep/ .mint-actionsheet-listitem {
    height: 80px;
    font-size: 30px;
    line-height: 80px;
  }
  .attention {
    margin-top: 40px;
    p {
      width: 670px;
      margin: 0 auto;
      font-size: 24px;
      color: #999999;
      line-height: 36px;
    }
  }
  .btn {
    margin: 0 auto;
    margin-top: 54px;
    margin-left: 12.5px;
    width: 725px;
    height: 80px;
    border-radius: 10px;
    background: #09cf74;
    color: #fff;
    font-size: 26px;
  }
}
</style>
