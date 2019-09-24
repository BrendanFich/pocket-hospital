<template>
  <div class="cardInfo">
    <h2>就诊卡信息</h2>
    <mt-field label="卡类型" v-model="cardInfo.cardStyle" :disableClear="true" :readonly="true"></mt-field>
    <mt-field label="姓名" v-model="cardInfo.name" :readonly="true"></mt-field>
    <mt-field label="卡号" v-model="cardInfo.cardNum" :readonly="true"></mt-field>
    <mt-field label="证件号码" type="password" v-model="cardInfo.IDnumber" :readonly="true"></mt-field>
    <mt-field label="性别" v-model="cardInfo.gender" :readonly="true"></mt-field>
    <mt-field label="生日" v-model="cardInfo.birthday" :readonly="true"></mt-field>
  </div>
</template>

<script>
export default {
  name: 'CardInfo',
  data () {
    return {
      cardInfo: {
        cardStyle: '诊疗卡',
        cardNum: '321321321321',
        IDnumber: '123123123123123',
        gender: '男',
        birthday: '1985-02-11',
        name: '张家辉'
      }
    }
  },
  methods: {}
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
