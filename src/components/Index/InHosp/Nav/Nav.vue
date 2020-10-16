<template>
  <div class="nav">
    <!-- <img src="./img/hosptalBg.png" class="hospBg" /> -->
    <DocAvatar name="hospital"/>
    <div class="content">
      <ul>
        <li @click="linkTo('/inHosp/recharge')">
          <img src="./img/hosptalPay.png" alt class="icon" />
          <div class="navInfo">
            <div class="navName">预交金缴纳</div>
            <div class="navIntro">在线预交金缴纳</div>
          </div>
        </li>
        <li @click="linkTo('/inHosp/dailyList')">
          <img src="./img/dailyList.png" alt class="icon" />
          <div class="navInfo">
            <div class="navName">每日清单</div>
            <div class="navIntro">住院每日清单查询</div>
          </div>
        </li>
        <li @click="linkTo('/inHosp/feeTotal')">
          <img src="./img/totalList.png" alt class="icon" />
          <div class="navInfo">
            <div class="navName">汇总清单</div>
            <div class="navIntro">总清单查询</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import DocAvatar from '@/base/DocAvatar/DocAvatar'
export default {
  components: { DocAvatar },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    linkTo (url) {
      this.$router.push(url)
    }
  },
  created () {}
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.nav
  @include main()
  position: relative
  .hospBg
    width: 750px
  .content
    position: absolute
    top: 500px
    left: 57px
    width: 626px
    margin: 0 auto
    margin-bottom: 140px
    background: $color-white
    border-radius: 20px
    ul
      margin-left: 40px
      margin-right: 40px
    li
      display: flex
      justify-content: flex-start
      align-items: center
      height: 157px
      border-bottom: 1px solid $color-title-grey
      &:last-child
        border: none
      .icon
        width: 69px
        margin-right: 30px
      .navInfo
        flex: 1
        .navName
          font-size: 30px
          color: $color-title-black
          font-weight: bold
          margin-bottom: 14px
        .navIntro
          font-size: 24px
          color: $color-word-grey
</style>
