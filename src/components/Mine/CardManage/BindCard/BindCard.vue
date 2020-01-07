<template>
  <div class="bindCard">
    <h2>就诊卡信息</h2>
    <mt-field label="姓名" placeholder="请输入姓名" v-model="patName" :disableClear="true"></mt-field>
    <mt-field label="身份证号" placeholder="请输入身份证号" type="string" v-model="patIdNo" :disableClear="true"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="string" v-model="phone" :disableClear="true"></mt-field>
    <mt-field label="住址" placeholder="请输入您的住址" type="string" v-model="address" :disableClear="true"></mt-field>
    <div @click="showOption" class="selectItem">
      <mt-field label="性别" v-model="patSex" placeholder="请选择性别" :disableClear="true" :readonly="true"></mt-field>
      <div class="isLink">></div>
    </div>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <div class="attention">
      <h2>注意事项</h2>
      <p>
        绑定前请确保开卡，就诊卡需要到医院窗口办理。
      </p>
    </div>
    <mt-button type="primary" class="btn" @click.native="handleClick">确认绑定</mt-button>
    <!-- <Tabbar></Tabbar> -->
  </div>
</template>

<script>
// import Tabbar from '@/base/Tabbar/Tabbar'

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
      patSex: '',
      actions: [
        { name: '男', method: () => { this.patSex = '男' } },
        { name: '女', method: () => { this.patSex = '女' } }
      ]
    }
  },
  // components: { Tabbar },
  created () {
    // this.$store.commit('updateUserPatInfo')
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
      const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if (this.patName && this.phone && this.patIdNo && this.address && this.patSex) {
        let reqData = {
          patName: this.patName,
          phone: this.phone,
          patIdNo: this.patIdNo,
          address: this.address,
          patSex: this.patSex,
          patIdType: '1'
        }
        if (!p.test(this.patIdNo)) {
          this.$toast({ message: '身份证号格式错误', duration, className })
        } else {
          reqData.birthday = this.patIdNo.substring(6, 10) + '-' + this.patIdNo.substring(10, 12) + '-' + this.patIdNo.substring(12, 14)
          this.$post('/api/pat/bindCard/auto', reqData)
            .then(res => {
              console.log(res)
              // if (res.code === 0) {
              //   if (res.data.Code === '-1' && res.data.Message === '卡号已存在') {
              //     this.$toast({ message: res.data.Message, duration, className })
              //   } else {
              //     this.$store.commit('updateUserInfo')
              //     this.$toast({ message: '绑定成功', duration, className })
              //     this.$router.push({ path: '/mine/cardManage' })
              //   }
              // } else if (res.code === 500 && res.msg === '卡号已绑定') {
              //   this.$toast({ message: res.msg, duration, className })
              // } else if (res.code === 400 && res.msg === 'PatientId参数必填;') {
              //   this.$toast({ message: '未建档，请先建档', duration: 2000, className })
              // }
              if (res.code === 0) {
                this.$toast({ message: '绑定成功', duration, className })
                this.$router.push({ path: '/mine/cardManage' })
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      } else {
        this.$toast({ message: '请完整填写所有信息', duration, className })
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
