<template>
  <div class="reserve" v-if="isBinded">
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
      include: ['sDept'],
      isBinded: false,
      cardInfo: {}
    }
  },
  created () {
    this.$post('/api/user/vx_info')
      .then(res => {
        if (res.data.info.visitCardNo === '') {
          this.bindCardNotice()
        } else if (res.data.info.visitCardNo.length !== 64) {
          let index = res.data.info.pat_list.findIndex(i => {
            return i.visitCardNo === res.data.info.visitCardNo
          })
          this.cardInfo = index > -1 ? res.data.info.pat_list[index] : {}
          this.levelUpNotice()
        } else {
          this.isBinded = true
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    bindCardNotice () {
      this.$dialog.confirm({
        title: '提示',
        message: '请先绑卡'
      }).then(() => {
        this.$router.replace('/mine/cardManage')
      }).catch(() => {
        this.$router.push('/index')
      })
    },
    levelUpNotice () {
      this.$dialog.confirm({
        title: '提示',
        message: '挂号需健康卡，请升级！'
      }).then(() => {
        console.log(this.cardInfo)
        this.toBandCardHtml(
          {
            name: this.cardInfo.patName,
            idType: '01',
            idNumber: this.cardInfo.patIdNo,
            birthday: this.getBirthFormIdNo(this.cardInfo.patIdNo),
            nation: this.cardInfo.nation,
            gender: this.cardInfo.patSex,
            phone1: this.cardInfo.patMobile,
            address: this.cardInfo.addressDetail
          }
        )
      }).catch(() => {
        this.$router.push('/index')
      })
    },
    getBirthFormIdNo (idNo) {
      if (idNo.length === 15) { // 15位身份证
        return '19' + idNo.substring(6, 8) + '-' + idNo.substring(8, 10) + '-' + idNo.substring(10, 12)
      } else if (idNo.length === 18) { // 18位身份证
        return idNo.substring(6, 10) + '-' + idNo.substring(10, 12) + '-' + idNo.substring(12, 14)
      }
    },
    toBandCardHtml (cardInfo) {
      this.$post('/api/health/addcard/geturl')
        .then(res => {
          if (res.code === 0) {
            console.log(res.data + '?cardinfo=' + btoa(encodeURI(JSON.stringify(cardInfo))))
            window.location = res.data + '?cardinfo=' + btoa(encodeURI(JSON.stringify(cardInfo)))
          } else {
            alert('获取跳转地址失败')
          }
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
