<template>
  <div class="bindCard">
    <h2>就诊卡信息</h2>
    <div @click="showOption(0)" class="selectItem">
      <mt-field label="卡类型" v-model="cardStyle" :disableClear="true" :readonly="true"></mt-field>
      <div class="isLink">></div>
    </div>
    <mt-field label="卡号" placeholder="请输入卡号" type="number" v-model="CardNum" :disableClear="true"></mt-field>
    <mt-field label="姓名" placeholder="请输入姓名" v-model="name" :disableClear="true"></mt-field>

    <div @click="showOption(1)" class="selectItem">
      <mt-field label="证件类型" v-model="paperwork" :disableClear="true" :readonly="true"></mt-field>
      <div class="isLink">></div>
    </div>
    <mt-field label="证件号码" placeholder="请输入证件号码" type="number" v-model="IDNum" :disableClear="true"></mt-field>
    <mt-actionsheet :actions="actions1" v-model="sheet1Visible" cancelText></mt-actionsheet>
    <mt-actionsheet :actions="actions2" v-model="sheet2Visible" cancelText></mt-actionsheet>
    <div class="attention">
      <h2>注意事项</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
        ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
        accumsan lacus vel facilisis.
      </p>
    </div>

    <mt-button type="primary" class="btn" @click.native="handleClick">确定</mt-button>
  </div>
</template>

<script>
export default {
  name: 'BindCard',
  data () {
    return {
      sheet1Visible: false,
      sheet2Visible: false,
      cardStyle: '诊疗卡',
      paperwork: '身份证',
      CardNum: null,
      IDNum: null,
      name: '',
      actions1: [
        { name: '诊疗卡', method: this.sCardStyle1 },
        { name: '社保卡', method: this.sCardStyle2 }
      ],
      actions2: [
        { name: '身份证', method: this.sPaperwork1 },
        { name: '护照', method: this.sPaperwork2 }
      ]
    }
  },
  methods: {
    showOption (index) {
      if (index === 0) {
        this.sheet1Visible = true
      }
      if (index === 1) {
        this.sheet2Visible = true
      }
    },
    sCardStyle1 () {
      this.cardStyle = this.actions1[0].name
    },
    sCardStyle2 () {
      this.cardStyle = this.actions1[1].name
    },
    sPaperwork1 () {
      this.paperwork = this.actions2[0].name
    },
    sPaperwork2 () {
      this.paperwork = this.actions2[1].name
    },
    handleClick () {
      const duration = 1500
      const className = 'toast'
      const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if (this.CardNum && this.name && this.IDNum) {
        if (!p.test(this.IDNum) && this.paperwork === '身份证') {
          this.$toast({ message: '身份证号有误', duration, className })
        } else {
          this.$toast({ message: '操作成功', duration, className })
          this.$router.push({ path: '/cardManage' })
        }
      } else {
        this.$toast({ message: '请完整填写所有信息', duration, className })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bindCard {
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
