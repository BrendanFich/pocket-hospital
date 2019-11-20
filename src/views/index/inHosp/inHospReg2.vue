<template>
  <div class="inHospReg2">
    <h1>默认信息</h1>
    <mt-field label="卡号" type="number" v-model="CardNo" :disableClear="true" :readonly="true"></mt-field>
    <mt-field label="姓名" v-model="patName" :disableClear="true" :readonly="true"></mt-field>
    <mt-field label="证件号码" type="string" v-model="patIdNo" :disableClear="true" :readonly="true"></mt-field>
    <mt-field
      label="电话号码"
      type="string"
      v-model="patMobile"
      :disableClear="true"
      :readonly="true"
    ></mt-field>
    <mt-field label="联系地址" type="string" v-model="addressDetail" :disableClear="true" :readonly="true"></mt-field>
    <h1>待完善信息</h1>
    <div @click="showOption(2)" class="selectItem">
      <mt-field label="性别" placeholder="请选择性别" v-model="patSex" :disableClear="true" :readonly="true"></mt-field>
      <div class="isLink">></div>
    </div>
    <div @click="showOption(4)" class="selectItem">
      <mt-field
        label="婚姻状态"
        placeholder="请选择婚姻状态"
        v-model="arryStatus"
        :disableClear="true"
        :readonly="true"
      ></mt-field>
      <div class="isLink">></div>
    </div>
    <mt-field label="国籍" placeholder="请输入国家" type="string" v-model="country" :disableClear="true"></mt-field>
    <mt-field label="民族" placeholder="请输入民族" type="string" v-model="nation" :disableClear="true"></mt-field>
    <mt-field
      label="出生地址"
      placeholder="请输入出生地址"
      type="string"
      v-model="birthPlace"
      :disableClear="true"
    ></mt-field>
    <mt-field label="联系人姓名" placeholder="请输入联系人姓名" type="string" v-model="contactName" :disableClear="true"></mt-field>
    <mt-field label="联系人电话" placeholder="请输入联系人电话" type="string" v-model="contactPhone" :disableClear="true"></mt-field>
    <mt-button type="primary" class="btn" @click.native="register">下一步,支付预缴金</mt-button>
    <mt-actionsheet :actions="actions2" v-model="sheet2Visible"></mt-actionsheet>
    <mt-actionsheet :actions="actions4" v-model="sheet4Visible"></mt-actionsheet>
  </div>
</template>

<script>
import util from '@/assets/js/util'
import wx from 'weixin-js-sdk'
export default {
  components: {},
  data () {
    return {
      sheet0Visible: false,
      sheet1Visible: false,
      sheet2Visible: false,
      sheet3Visible: false,
      sheet4Visible: false,
      CardNo: '',
      patientId: '',
      patName: '',
      addressDetail: '',
      patSex: '',
      patIdType: '',
      patIdNo: '',
      patMobile: '',
      country: '',
      arryStatus: '',
      nation: '',
      birthPlace: '',
      contactName: '',
      contactPhone: '',
      actions2: [
        { name: '男', method: this.sPatSex },
        { name: '女', method: this.sPatSex }
      ],
      actions4: [
        { name: '未婚', method: this.sArryStatus },
        { name: '已婚', method: this.sArryStatus },
        { name: '丧偶', method: this.sArryStatus },
        { name: '离婚', method: this.sArryStatus }
      ]
    }
  },
  computed: {
  },
  watch: {},
  methods: {
    showOption (index) {
      switch (index) {
        case 2:
          this.sheet2Visible = true
          break
        case 4:
          this.sheet4Visible = true
      }
    },
    sPayStyle (e) {
      this.payStyle = e.name
    },
    sPatSex (e) {
      this.patSex = e.name
    },
    sPatIdType (e) {
      this.patIdType = e.name
    },
    sArryStatus (e) {
      this.arryStatus = e.name
    },
    register () {
      util.http
        .post('/api/invisit/register', {
          patName: this.patName, // 必要
          patMobile: this.patMobile,
          nationNality: this.country,
          birthPlace: this.birthPlace,
          patSex: this.patSex,
          nation: this.nation,
          arryStatus: this.arryStatus,
          contactName: this.contactName,
          contactPhone: this.contactPhone
        })
        .then(res => {
          if (res.code === 0 && res.data.Code === '0') {
            this.getWxConig(res.data.Records.LedgerSn)
          } else if (res.code === 500) {
            this.$toast({ message: res.msg, duration: 1500, className: 'toast' })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getWxConig (ledgerSn) {
      util.http
        .post('/api/doctor/payComfirm', {ledgerSn})
        .then(res => {
          this.wxPay(res.data.Records)
        })
        .catch(error => {
          console.log(error)
        })
    },
    wxPay (config) {
      let self = this
      wx.ready(function () {
        wx.chooseWXPay({
          timestamp: config.timeStamp,
          nonceStr: config.nonceStr,
          package: config.package,
          signType: config.signType,
          paySign: config.paySign,
          success: function (res) {
            self.$toast({ message: '登记成功', duration: 1500, className: 'toast' })
            self.$router.push('/inHosp/nav')
          },
          cancel: function (res) {
            self.$toast({ message: '登记成功，请及时支付预缴金', duration: 1500, className: 'toast' })
            self.$router.push('/inHosp/nav')
          }
        })
      })
    }
  },
  created () {
    this.CardNo = this.$store.state.userInfo.visitCardNo || this.$store.state.userInfo.socialCardNo
    let self = this
    if (this.$store.state.patInfoBinded !== []) {
      this.$store.state.patInfoBinded.forEach(item => {
        if (item.patName === this.$store.state.userInfo.visitName) {
          self.patIdNo = item.patIdNo
          self.patName = item.patName
          self.patMobile = item.patMobile
          self.patIdType = item.PatIdType
          self.addressDetail = item.addressDetail
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.inHospReg2 {
  background: #f2f2f2;
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
    margin-top: 54px;
    margin-left: 12.5px;
    margin-bottom: 50px;
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
  h1 {
    color: #999999;
    font-size: 24px;
    padding: 25px 40px;
  }
}
</style>
