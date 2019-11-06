<template>
  <div class="reserve">
    <router-view v-if="$store.state.userInfo.visitCardNo"></router-view>
  </div>
</template>
<script>
// import util from '@/assets/js/util'

export default {
  name: 'reserve',
  data () {
    return {}
  },
  created () {
    if (!this.$store.state.userInfo.visitCardNo && !this.$store.state.userInfo.socialHosCardNO) {
      this.bindCardNotice()
    }
  },
  methods: {
    bindCardNotice () {
      let text = `
      <div>
        <p style="text-align: center">请先建档绑卡</p>
      </div>
      `
      this.$messagebox
        .confirm(text)
        .then(action => {
          this.$router.push('/mine/cardManage/buildCard')
        })
        .catch(err => {
          console.log(err)
          this.$router.push('/index')
        })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
