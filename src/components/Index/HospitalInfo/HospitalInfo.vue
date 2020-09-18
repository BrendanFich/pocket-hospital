<template>
  <div class="hospitalInfo">
    <!-- <img src="./img/hosp.png" /> -->
    <DocAvatar name="hospital"/>
    <article>
      {{introduce}}
    </article>
  </div>
</template>

<script>
import DocAvatar from '@/base/DocAvatar/DocAvatar'

export default {
  name: 'hospitalInfo',
  components: { DocAvatar },
  data () {
    return {
      introduce: ''
    }
  },
  created () {
    this.getPayOffInfo()
  },
  methods: {
    getPayOffInfo () {
      this.$post('/api/hosp/introduce')
        .then(res => {
          console.log(res)
          this.introduce = '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0' + res.data.trim()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.hospitalInfo
  @include main()
  img
    width: 750px
  article
    width: 650px
    background: $color-white
    padding: 20px 50px 30px
    color: $color-title-black
    font-size: 24px
    line-height: 36px
    word-wrap: break-word
    overflow: hidden
    text-overflow: ellipsis
    margin-bottom: 98px
    p
      margin: 0 50px
</style>
