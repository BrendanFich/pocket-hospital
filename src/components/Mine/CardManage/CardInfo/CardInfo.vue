<template>
  <div class="cardInfo" v-if="cardInfo">
    <h2>就诊卡信息</h2>
    <mt-field label="卡类型" v-model="cardType" :disableClear="true" :readonly="true"></mt-field>
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
    <mt-button type="primary" class="btn" @click.native="untie">解绑</mt-button>
  </div>
</template>

<script>
export default {
  name: 'cardInfo',
  data () {
    return {
      cardInfo: {},
      cardType: '院内就诊卡'
    }
  },
  created () {
    this.$post('/api/user/vx_info').then(res => {
      if (res.code === 0) {
        this.cardInfo = res.data.info.pat_list.filter(item => item.visitCardNo === this.$route.params.cardNo)[0]
        this.visitCardNo = res.data.info.visitCardNo
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  computed: {
  },
  methods: {
    setDefault () {
      const duration = 1500
      const className = 'toast'
      this.$post('/api/pat/changeCard',
        {
          patCardNo: this.$route.params.cardNo,
          patName: this.cardInfo.patName
        })
        .then(res => {
          if (res.code === 0) {
            this.$toast({ message: '设置成功', duration, className })
            this.$router.go(-2)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    untie () {
      this.$post('/api/pat/cancelCard', {
        PatientId: Number(this.cardInfo.patId),
        CardType: '1',
        patCardNo: this.$route.params.cardNo
      })
        .then(res => {
          if (res.code === 0) {
            this.$toast({ message: '解绑成功', duration: 1500, className: 'toast' })
            this.$router.go(-1)
          }
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.cardInfo
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
  /deep/ .mint-actionsheet-listitem
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
