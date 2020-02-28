<template>
  <div class="bindCard">
    <h2>就诊卡信息</h2>
    <mt-field label="* 姓名" placeholder="请输入姓名" v-model="patName" :disableClear="true"></mt-field>
    <mt-field label="* 身份证号" placeholder="请输入身份证号" type="string" v-model="patIdNo" :disableClear="true"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="string" v-model="phone" :disableClear="true"></mt-field>
    <mt-field label="住址" placeholder="请输入您的住址" type="string" v-model="address" :disableClear="true"></mt-field>
    <div @click="showOption" class="selectItem">
      <mt-field label="性别" v-model="patSex" placeholder="请选择性别" :disableClear="true" :readonly="true"></mt-field>
      <div class="isLink">></div>
    </div>
    <mt-field label="出生日期" type="string" v-model="birthday" :disableClear="true" :readonly="true"></mt-field>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <div class="attention">
      <h2>注意事项</h2>
      <p>
        绑定前请确保开卡，就诊卡需要到医院窗口办理。
      </p>
    </div>
    <mt-button type="primary" class="btn" @click.native="handleClick">确认绑定</mt-button>
  </div>
</template>

<script>
export default {
  name: 'bindCard',
  data () {
    return {
      sheetVisible: false,
      paperwork: '二代身份证',
      phone: '',
      patIdNo: '',
      patName: '',
      address: '',
      birthday: '',
      patSex: '',
      actions: [
        { name: '男', method: () => { this.patSex = '男' } },
        { name: '女', method: () => { this.patSex = '女' } }
      ]
    }
  },
  created () {
  },
  computed: {
    cardType () {
      return this.cardTypeWord === '就诊卡' ? '1' : '2'
    }
  },
  methods: {
    showOption () {
      this.sheetVisible = true
    },
    handleClick () {
      const duration = 1500
      const className = 'toast'
      // const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      const p = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
      if (this.patName && this.patIdNo) {
        let reqData = {
          patName: this.patName, // 必填
          patIdNo: this.patIdNo, // 必填
          phone: this.phone,
          address: this.address,
          patSex: this.patSex,
          patIdType: '1',
          birthday: this.birthday
        }
        if (!p.test(this.patIdNo)) {
          this.$toast({ message: '身份证号格式错误', duration, className })
        } else {
          this.$post('/api/pat/bindCard/auto', reqData)
            .then(res => {
              console.log(res)
              if (res.code === 0) {
                this.$toast({ message: '绑定成功', duration, className })
                this.$router.go(-1)
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      } else {
        this.$toast({ message: '请填写带*的必填项', duration, className })
      }
    }
  },
  watch: {
    patIdNo (val) {
      if (val.length === 15) {
        this.birthday = '19' + val.substring(6, 8) + '-' + val.substring(8, 10) + '-' + val.substring(10, 12)
      } else if (val.length === 18) {
        this.birthday = val.substring(6, 10) + '-' + val.substring(10, 12) + '-' + val.substring(12, 14)
      } else {
        this.birthday = ''
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.bindCard
  @include page($color-page-background)
  h2
    color: $color-word-grey
    font-size: 24px
    padding: 25px 40px
  .mint-field
    /deep/ .mint-cell-wrapper
      padding: 0
      height: 88px
      font-size: 30px
      font-weight: bold
      border-bottom: 1px solid $color-border
      .mint-cell-title
        color: #44a0f5
        width: 168px
        padding-left: 40px
  .selectItem
    position: relative
    .isLink
      color: #5adba3
      font-size: 30px
      position: absolute
      top: 27px
      right: 66px
  /deep/ .mint-actionsheet-listitem,/deep/ .mint-actionsheet-button
    height: 80px
    font-size: 30px
    line-height: 80px
  .attention
    margin-top: 40px
    p
      width: 670px
      margin: 0 auto
      font-size: 24px
      color: $color-word-grey
      line-height: 36px
  .btn
    margin: 0 auto
    margin-top: 54px
    margin-left: 12.5px
    width: 725px
    height: 80px
    border-radius: 10px
    background: $color-primary
    color: $color-white
    font-size: 26px
</style>
