<template>
  <div class="inHospReg2">
    <div @click="showOption(0)" class="selectItem">
      <mt-field label="身份类型" v-model="cardStyle" :disableClear="true" :readonly="true"></mt-field>
      <div class="isLink">></div>
    </div>
    <div @click="showOption(1)" class="selectItem">
      <mt-field label="支付类型" v-model="payStyle" :disableClear="true" :readonly="true"></mt-field>
      <div class="isLink">></div>
    </div>
    <mt-field label="姓名" placeholder="请输入姓名" v-model="name" :disableClear="true"></mt-field>
    <div @click="showOption(0)" class="selectItem">
      <mt-field label="性别" placeholder="请选择性别" v-model="sex" :disableClear="true" :readonly="true"></mt-field>
      <div class="isLink">></div>
    </div>

    <div @click="showOption(1)" class="selectItem">
      <mt-field label="证件类型" v-model="paperwork" :disableClear="true" :readonly="true"></mt-field>
      <div class="isLink">></div>
    </div>
    <mt-field label="证件号码" placeholder="请输入证件号码" type="string" v-model="idNum" :disableClear="true"></mt-field>
    <mt-field
      label="电话号码"
      placeholder="请输入电话号码"
      type="string"
      v-model="phoneNum"
      :disableClear="true"
    ></mt-field>
    <mt-field label="国家" placeholder="请输入国家" type="string" v-model="country" :disableClear="true"></mt-field>

    <div @click="showOption(1)" class="selectItem">
      <mt-field
        label="婚姻状态"
        placeholder="请选择婚姻状态"
        v-model="maritalStatus"
        :disableClear="true"
        :readonly="true"
      ></mt-field>
      <div class="isLink">></div>
    </div>
    <mt-field label="民族" placeholder="请输入民族" type="string" v-model="nation" :disableClear="true"></mt-field>
    <mt-field
      label="出生地址"
      placeholder="请输入出生地址"
      type="string"
      v-model="birthPlace"
      :disableClear="true"
    ></mt-field>
    <mt-field
      label="籍贯"
      placeholder="请输入籍贯"
      type="string"
      v-model="registration"
      :disableClear="true"
    ></mt-field>

    <mt-button type="primary" class="btn" @click.native="submit">提交信息</mt-button>
    <mt-actionsheet :actions="actions1" v-model="sheet1Visible" cancelText></mt-actionsheet>
    <mt-actionsheet :actions="actions2" v-model="sheet2Visible" cancelText></mt-actionsheet>
    <div id="qrcode"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      sheet1Visible: false,
      sheet2Visible: false,
      cardStyle: '诊疗卡',
      payStyle: '',
      paperwork: '二代身份证',
      cardNum: '',
      idNum: '',
      name: '',
      sex: '',
      phoneNum: '',
      country: '',
      maritalStatus: '',
      nation: '',
      birthPlace: '',
      registration: '',
      actions1: [
        { name: '诊疗卡', method: this.sCardStyle0 },
        { name: '医保卡', method: this.sCardStyle1 }
      ],
      actions2: [
        { name: '二代身份证', method: this.sPaperwork0 },
        { name: '港澳居民身份证', method: this.sPaperwork1 },
        { name: '台湾居民身份证', method: this.sPaperwork2 },
        { name: '护照', method: this.sPaperwork3 }
      ]
    }
  },
  computed: {
    cardType () {
      return this.cardStyle === '诊疗卡' ? '1' : '2'
    },
    patIdType () {
      if (this.paperwork === this.actions2[0].name) {
        return '1'
      }
      if (this.paperwork === this.actions2[1].name) {
        return '2'
      }
      if (this.paperwork === this.actions2[2].name) {
        return '3'
      }
      if (this.paperwork === this.actions2[3].name) {
        return '4'
      }
    }
  },
  watch: {},
  methods: {
    showOption (index) {
      if (index === 0) {
        this.sheet1Visible = true
      }
      if (index === 1) {
        this.sheet2Visible = true
      }
    },
    sCardStyle0 () {
      this.cardStyle = this.actions1[0].name
    },
    sCardStyle1 () {
      this.cardStyle = this.actions1[1].name
    },
    sPaperwork0 () {
      this.paperwork = this.actions2[0].name
    },
    sPaperwork1 () {
      this.paperwork = this.actions2[1].name
    },
    sPaperwork2 () {
      this.paperwork = this.actions2[2].name
    },
    sPaperwork3 () {
      this.paperwork = this.actions2[3].name
    },
    submit () {

    }
  },
  created () {
    this.idNum = this.$route.params.patIdNo ? this.$route.params.patIdNo : ''
    this.name = this.$route.params.patName ? this.$route.params.patName : ''
  }
}
</script>

<style lang='scss' scoped>
.inHospReg2 {
  background: #f2f2f2;
  height: 100vh;
  .mint-field {
    /deep/ .mint-cell-wrapper {
      padding: 0;
      height: 88px;
      font-size: 30px;
      font-weight: bold;
      .mint-cell-title {
        color: #44a0f5;
        font-weight: bold;
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
