<template>
  <div class="payOnline">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'payOnline',
  data () {
    return {
    }
  },
  computed: {
    activeIndex () {
      return this.$route.name === 'paid' ? 1 : 0
    }
  },
  methods: {
    select (path) {
      if (this.$route.fullPath === path) {
      } else {
        this.$router.replace(path)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.payOnline
  @include page($color-page-background)
  .tabBox
    display: flex
    margin-bottom: 30px
    .tab
      flex: 1
      height: 90px
      display: flex
      justify-content: center
      align-items: center
      color: $color-word-grey
      background: $color-white
    .tab.active
      color: $color-white
      background: $color-primary
</style>
