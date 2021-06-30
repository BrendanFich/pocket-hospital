<template>
  <div class="heath-card-list">
    <iframe :src="iframeSrc" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: 'heathCardList',
  data () {
    return {
      patMobile: {},
      iframeSrc: ''
    }
  },
  async created () {
    if (this.$route.query.nc) {
      await this._commitWx(JSON.parse(decodeURI(atob(this.$route.query.nc))))
      this.$router.replace({ query: {} })
    }
    this.patMobile = await this._getDefaultCardMobile()
    let list = await this._getHealthCardList()
    let cardUrl = await this._getCardUrl()
    // window.location.href = 'http://qlyt.zhangfb.cn:8091/web/cardlist?cardList=' + a
    // window.location.href = 'http://192.168.1.123:8082/list.html?cardList=' + a // 调试
    this.iframeSrc = 'static/list.html?timestamp=' + new Date().getTime() + '&cardList=' + list.join(';') + '&url=' + cardUrl
  },
  methods: {
    _commitWx (req) {
      req.PatientId = req.PatientId.toString()
      return new Promise((resolve, reject) => {
        this.$post('/api/pat/bindCard/fresh', req).then(res => {
          if (res.code === 0) {
            resolve(res.data)
          } else {
            resolve()
          }
        })
      })
    },
    _getDefaultCardMobile () {
      return new Promise((resolve, reject) => {
        this.$post('/api/user/vx_info').then(res => {
          if (res.code === 0) {
            resolve(res.data.info.patMobile)
          }
        })
      })
    },
    _getHealthCardList () {
      return new Promise((resolve, reject) => {
        this.$post('/api/user/health_card')
          .then(res => {
            console.log(res.data)
            if (res.data.length > 0) {
              resolve(res.data.map(i => {
                return JSON.stringify({
                  name: i.patName,
                  idCard: i.patIdNo,
                  qrCodeText: i.visitCardNo,
                  phone: this.patMobile
                }).replace(/\"/g, '*')
              }))
            } else {
              resolve([])
            }
          })
      })
    },
    _getCardUrl () {
      return new Promise((resolve, reject) => {
        this.$post('/api/health/addcard/geturl')
          .then(res => {
            console.log(res.data)
            resolve(res.data)
          })
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.heath-card-list
  background: $color-page-background
  min-height: calc(100vh - 98px)
  iframe
    width: 100%
    min-height: calc(100vh - 98px)
</style>
