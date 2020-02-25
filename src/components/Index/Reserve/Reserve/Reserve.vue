<template>
  <div class="reserve">
    <keep-alive :include="include">
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive"> </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"> </router-view>
  </div>
</template>
<script>
export default {
  name: 'reserve',
  data () {
    return {
      include: ['sDept']
    }
  },
  created () {
    this.$post('/api/user/vx_info')
      .then(res => {
        if (res.data.info.visitName === '') {
          this.bindCardNotice()
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  beforeDestroy () {
    this.$messagebox.close(false)
  },
  methods: {
    bindCardNotice () {
      // let text = `
      // <div>
      //   <p style="text-align: center">请先建档绑卡</p>
      // </div>
      // `
      // this.$messagebox
      //   .confirm(text)
      //   .then(action => {
      //     this.$router.replace('/mine/cardManage/bindCard')
      //   })
      //   .catch(err => {
      //     console.log(err)
      //     this.$router.push('/index')
      //   })
      this.$dialog.confirm({
        title: '提示',
        message: '请先建档绑卡'
      }).then(() => {
        this.$router.replace('/mine/cardManage/bindCard')
      }).catch(() => {
        this.$router.push('/index')
      })
    }
  },
  watch: {
    $route (to, from) {
      // 如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name)
      }
      // 如果 要 form(离开) 的页面是 keepAlive缓存的，
      // 再根据 deepth 来判断是前进还是后退
      // 如果是后退
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        var index = this.include.indexOf(from.name)
        index !== -1 && this.include.splice(index, 1)
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
