<template>
  <div class="reserve">
    <router-view v-if="$store.state.visitName !== ''"></router-view>
  </div>
</template>
<script>
import util from '@/assets/js/util'

export default {
  name: 'reserve',
  data () {
    return {}
  },
  created () {
    util.http.post('/api/user/vx_info').then(res => {
      this.$store.commit('updateDefaultCard', res.data.info.visitName, res.data.info.visitCardNo, res.data.info.socialCardNo)
      if (this.$store.state.visitName === '') {
        this.bindCardNotice()
      }
    }).catch((error) => {
      console.log(error)
    })
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
