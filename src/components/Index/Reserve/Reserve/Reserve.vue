<template>
  <div class="reserve">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'reserve',
  data () {
    return {}
  },
  created () {
    this.$post('/api/user/vx_info').then(res => {
      if (res.data.info.visitName === '') {
        this.bindCardNotice()
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  beforeDestroy () {
    this.$messagebox.close(false)
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
          this.$router.replace('/mine/cardManage/bindCard')
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
