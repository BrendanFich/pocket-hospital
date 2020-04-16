<template>
  <div class="hospitalInfo">
    <img src="./img/hosp.png" />
    <article>
      {{introduce}}
    </article>
  </div>
</template>

<script>
export default {
  name: 'hospitalInfo',
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
          this.introduce = res.data
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
    width: 750px
    background: $color-white
    padding: 50px 0
    color: $color-title-black
    font-size: 24px
    line-height: 36px
    word-wrap: break-word
    overflow: hidden
    text-overflow: ellipsis
    p
      margin: 0 50px
</style>
