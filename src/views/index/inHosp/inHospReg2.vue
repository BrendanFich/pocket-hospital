<template>
  <div class="inHospReg2">
    <div @click="showOption(0)" class="selectItem">
      <mt-field label="身份类型" v-model="identityStyle" :disableClear="true" :readonly="true"></mt-field>
      <div class="isLink">></div>
    </div>
    <div @click="showOption(1)" class="selectItem">
      <mt-field label="支付类型" v-model="payStyle" :disableClear="true" :readonly="true"></mt-field>
      <div class="isLink">></div>
    </div>
    <mt-field label="姓名" placeholder="请输入姓名" v-model="name" :disableClear="true"></mt-field>
    <div @click="showOption(2)" class="selectItem">
      <mt-field label="性别" placeholder="请选择性别" v-model="sex" :disableClear="true" :readonly="true"></mt-field>
      <div class="isLink">></div>
    </div>

    <div @click="showOption(3)" class="selectItem">
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

    <div @click="showOption(4)" class="selectItem">
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
    <mt-actionsheet :actions="actions0" v-model="sheet0Visible"></mt-actionsheet>
    <mt-actionsheet :actions="actions1" v-model="sheet1Visible"></mt-actionsheet>
    <mt-actionsheet :actions="actions2" v-model="sheet2Visible"></mt-actionsheet>
    <mt-actionsheet :actions="actions3" v-model="sheet3Visible"></mt-actionsheet>
    <mt-actionsheet :actions="actions4" v-model="sheet4Visible"></mt-actionsheet>
  </div>
</template>

<script>
import util from '@/utils/util'
export default {
  components: {},
  data () {
    return {
      sheet0Visible: false,
      sheet1Visible: false,
      sheet2Visible: false,
      sheet3Visible: false,
      sheet4Visible: false,
      identityStyle: '',
      payStyle: '',
      name: '',
      sex: '',
      paperwork: '',
      idNum: '',
      phoneNum: '',
      country: '',
      maritalStatus: '',
      nation: '',
      birthPlace: '',
      registration: '',
      actions0: [
        { name: '类型1', method: this.sIdentityType },
        { name: '类型2', method: this.sIdentityType }
      ],
      actions1: [
        { name: '支付宝', method: this.sPayStyle },
        { name: '微信', method: this.sPayStyle }
      ],
      actions2: [
        { name: '男', method: this.sSex },
        { name: '女', method: this.sSex }
      ],
      actions3: [
        { name: '二代身份证', method: this.sPaperwork },
        { name: '港澳居民身份证', method: this.sPaperwork },
        { name: '台湾居民身份证', method: this.sPaperwork },
        { name: '护照', method: this.sPaperwork }
      ],
      actions4: [
        { name: '未婚', method: this.sMaritalStatus },
        { name: '已婚', method: this.sMaritalStatus },
        { name: '丧偶', method: this.sMaritalStatus },
        { name: '离婚', method: this.sMaritalStatus }
      ]
    }
  },
  computed: {
  },
  watch: {},
  methods: {
    showOption (index) {
      switch (index) {
        case 0:
          this.sheet0Visible = true
          break
        case 1:
          this.sheet1Visible = true
          break
        case 2:
          this.sheet2Visible = true
          break
        case 3:
          this.sheet3Visible = true
          break
        case 4:
          this.sheet4Visible = true
      }
    },
    sIdentityType (e) {
      console.log(e)
      this.identityStyle = e.name
    },
    sPayStyle (e) {
      this.payStyle = e.name
    },
    sSex (e) {
      this.sex = e.name
    },
    sPaperwork (e) {
      this.paperwork = e.name
    },
    sMaritalStatus (e) {
      this.maritalStatus = e.name
    },
    submit () {
      // if(this.paperwork && this.payStyle && this.name && )
      this.register()
    },
    register () {
      util.http
        .post('/api/invisit/Register')
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
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
  /deep/ .mint-actionsheet-listitem,/deep/ .mint-actionsheet-button {
    height: 80px;
    font-size: 30px;
    line-height: 80px;
  }
}
</style>
