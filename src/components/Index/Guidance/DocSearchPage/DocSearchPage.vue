<template>
  <div class="docSearchPage">
    <form action="/">
      <van-search
        v-model="value"
        placeholder="请输入相应症状"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        autofocus
      />
    </form>
    <ul class="resultContent">
      <li
        class="doctorIntroCard"
        v-for="(item, index) in resultList"
        :key="index"
        @click="linkTo(item.deptCode, item.deptName, item.doctorCode, item.doctorName)"
      >
        <div class="left">
          <img class="avatar" src="./img/avatar100x101.png" />
          <div class="text">
            <p class="name">{{ item.doctorName }}</p>
            <p>{{ item.deptName }} {{ item.doctorTitle }}</p>
          </div>
        </div>
        <div class="right">></div>
      </li>
    </ul>
    <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
  </div>
</template>

<script>
export default {
  name: 'docSearchPage',
  data () {
    return {
      value: '',
      timer: null,
      resultList: [
        // {
        //   deptCode: 572,
        //   deptName: '专家门诊',
        //   doctorCode: 3676,
        //   doctorIntrodution: '',
        //   doctorName: 'dctest04',
        //   doctorSkill: '',
        //   doctorTitle: '眼睛验光师（中技）',
        //   hasRegtable: '',
        //   score: '9.8'
        // }
      ],
      isShowNoData: false
    }
  },
  created () {
    this.value = this.$route.params.tagName
  },
  methods: {
    linkTo (deptCode, deptName, doctorCode, doctorName) {
      this.$store.commit('updateDeptCode', deptCode)
      this.$store.commit('updateDeptName', deptName)
      this.$store.commit('updateDoctorCode', doctorCode)
      this.$store.commit('updateDoctorName', doctorName)
      this.$router.replace({ name: 'gSTime' })
    },
    onSearch () {},
    onCancel () {
      this.$router.go(-1)
    },
    getResultList () {
      this.$post('/api/doctor/intelligent_guidance', {
        describe: this.value,
        page: 1,
        size: 100
      })
        .then(res => {
          this.resultList = res.data
          this.docList = [...this.docList, ...res.data]
          if (res.page.count === 0) {
            this.isShowNoData = true
          }
          this.loading = false
          if (res.page.totalPage <= res.page.currentPage) {
            this.finished = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  watch: {
    value () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        if (this.value) {
          this.searchResult = []
          this.getResultList()
        }
        this.timer = null
      }, 500)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.docSearchPage
  background: $color-page-background
  height: 100vh
  .searchbar
    width: 750px
    height: 120px
    position: relative
    input
      margin: 30px 25px
      border-radius: 10px
      padding: 20px 70px
      width: 560px
      border: none
      outline: none
      font-size: 24px
    .cancelIcon
      width: 16px
      position: absolute
      top: 55px
      left: 65px
    .cancel
      display: none
      position: absolute
      top: 30px
      right: 50px
      font-size: 24px
      border: none
      background: $color-white
      outline: none
      height: 68px
      margin-left: -10px
      color: $color-primary
    .resultList
      background: $color-white
      display: none
      min-height: calc(100vh - 128px)
      .resultStyle
        font-size: 24px
        padding: 20px 30px
        border-bottom: 1px solid $color-border
      .resultItem
        display: flex
        align-items: center
        padding: 10px 30px
        font-size: 20px
        line-height: 30px
        border-bottom: 1px solid $color-border
    .xIcon
      display: none
      position: absolute
      top: 50px
      right: 130px
      font-size: 25px
      background: $color-xIcon-grey
      border-radius: 50%
      width: 30px
      height: 25px
      text-align: center
      padding-bottom: 5px
      color: $color-title-black
    .show
      display: block
  .resultContent
    margin-top: 20px
    .doctorIntroCard
      background: $color-white
      border-bottom: 1px solid $color-border
      padding: 20px 40px
      display: flex
      justify-content: space-between
      align-items: center
      .left
        display: flex
        .avatar
          width: 100px
          height: 100px
          margin-right: 30px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          p
            @include font(24px, 400, $color-title-black)
            line-height: 50px
          .name
            @include font(30px, 600, $color-title-black)
      .right
        @include font(30px, 400, $color-primary)
  .noData
    width: 366px
    margin-top: 50px
>>>.van-icon.van-icon-search
  color: $color-primary
>>>.van-search__action
  color: $color-primary
>>>.van-search__content
  background: $color-page-background
</style>
