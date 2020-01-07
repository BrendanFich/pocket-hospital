<template>
  <div class="cardManage">
    <router-link class="addCard" to="/mine/cardManage/bindCard">
      <div>
        <img src="./img/build.png" />
        <span class="title">添加就诊人</span>
      </div>
      <span class="linkIcon">></span>
    </router-link>

    <h2>就诊卡管理</h2>
    <ul class="cardList">
      <router-link
        class="customerInfoCard"
        v-for="(item, index) in bindedCardList"
        tag="li"
        :to="{
          name: 'cardInfo',
          params: {
            cardNo: item.visitCardNo
          }
        }"
        :key="index"
      >
        <div>
          <img src="./img/greenAvatar.png" />
          <div class="textInfo">
            <span class="name">{{ item.patName }}</span>
            <p class="cardNumber">
              就诊卡：{{ item.visitCardNo }}
            </p>
          </div>
        </div>
        <span
          class="status"
          v-if="
            item.visitCardNo === defaultCardNo
          "
          >默认</span
        >
        <span class="isLink" v-else>></span>
      </router-link>
    </ul>

    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/base/Tabbar/Tabbar'

export default {
  name: 'cardManage',
  data () {
    return {
      bindedCardList: [],
      defaultCardNo: ''
    }
  },
  components: { Tabbar },
  computed: {
  },
  methods: {
  },
  created () {
    this.$post('/api/user/vx_info').then(res => {
      if (res.code === 0) {
        this.bindedCardList = res.data.info.pat_list
        this.defaultCardNo = res.data.info.visitCardNo
      }
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.cardManage
  @include page($color-page-background)
  h2
    color: $color-word-grey
    font-size: 24px
    padding: 25px 30px
  .cardList
    overflow-y: auto
    max-height: 1200px
    .customerInfoCard
      border-bottom: 1px solid #f2f2f2
      padding: 47px 50px 46px 31px
      background: $color-white
      display: flex
      align-items: center
      justify-content: space-between
      div
        display: flex
        align-items: center
        img
          width: 104px
          margin-right: 30px
        .textInfo
          display: block
          .name
            color: $color-value-grey
            font-size: 30px
            font-weight: bold
          .cardNumber
            margin-top: 12px
            font-size: 24px
            color: $color-word-grey
      .changeCard
        color: $color-primary
        font-size: 24px
      .status
        margin-left: 17px
        font-size: 24px
        color: $color-white
        background: #f69343
        padding: 3px 12px
        border-radius: 5px
      .isLink
        color: #5adba3
        font-size: 24px
  .addCard
    background: $color-white
    height: 100px
    padding: 0 54px 0 43px
    display: flex
    justify-content: space-between
    align-items: center
    border-bottom: 1px solid $color-border
    > div
      display: flex
      align-items: center
      > img
        width: 30px
        margin-right: 30px
    .title
      color: $color-value-grey
      font-size: 24px
    .linkIcon
      color: $color-title-grey
      font-size: 24px
</style>
