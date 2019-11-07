<template>
  <div class="reserve">
    <router-view v-if="$store.state.userInfo !== {}"></router-view>
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
    this.$store.commit('updateUserInfo')
    if (this.$store.state.userInfo.visitCardNo === '' && this.$store.state.userInfo.socialCardNo === '') {
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
