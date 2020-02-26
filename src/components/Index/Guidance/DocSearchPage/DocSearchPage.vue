<template>
  <div class="docSearchPage">
    <van-search
      v-model="value"
      placeholder="请输入相应症状"
      show-action
      @cancel="onCancel"
    />
    <div class="list-content" id="list-content">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :offset="10"
      >
        <div
          class="doctorIntroCard"
          v-for="(item, index) in resultList"
          :key="index"
          @click="linkTo(item.deptCode, item.deptName, item.doctorCode, item.doctorName)"
        >
          <div class="left">
            <div class="avatar"><img :src="getAvatar(item.doctorName)" @error="setDefualtImg"/></div>
            <div class="text">
              <p class="name">{{ item.doctorName }}</p>
              <p>{{ item.deptName }} {{ item.doctorTitle }}</p>
            </div>
          </div>
          <div class="right">></div>
        </div>
        <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
      </van-list>
    </div>
  </div>
</template>

<script>
import { apiBaseUrl } from '@/assets/js/config'
import defualtImg from './img/greenAvatar.png'
export default {
  name: 'docSearchPage',
  data () {
    return {
      value: this.$route.params.tagName === '#' ? '' : this.$route.params.tagName,
      timer: null,
      resultList: [],
      page: 0,
      loading: false,
      finished: false,
      isLoading: false,
      isShowNoData: false
    }
  },
  mounted () {
    if (this.$route.params.tagName === '#') {
      document.querySelector('input').focus()
    }
    let winHeight = document.documentElement.clientHeight
    document.getElementById('list-content').style.height =
      winHeight - 54 + 'px'
  },
  methods: {
    getAvatar (name) {
      return apiBaseUrl + '/upload/doctor/' + name + '.jpg'
    },
    setDefualtImg (e) {
      e.target.src = defualtImg
    },
    linkTo (deptCode, deptName, doctorCode, doctorName) {
      this.$store.commit('updateDeptCode', deptCode)
      this.$store.commit('updateDeptName', deptName)
      this.$store.commit('updateDoctorCode', doctorCode)
      this.$store.commit('updateDoctorName', doctorName)
      this.$router.replace({ name: 'gSTime' })
    },
    onCancel () {
      this.$router.go(-1)
    },
    getResultList () {
      this.$post('/api/doctor/intelligent_guidance', {
        describe: this.value,
        page: this.page,
        size: 10
      })
        .then(res => {
          this.resultList = [...this.resultList, ...res.data]
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
    },
    onLoad () {
      if (this.value) {
        this.page += 1
        this.getResultList()
      } else {
        this.loading = false
      }
    }
  },
  watch: {
    value () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        if (this.value) {
          this.resultList = []
          this.page = 1
          this.isShowNoData = false
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
  display: flex
  flex-direction: column
  .list-content
    flex: 1
    overflow-y: auto
    -webkit-overflow-scrolling : touch
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
          width: 102px
          height: 102px
          overflow: hidden
          border-radius: 50%
          margin-right: 24px
          img
            width: 102px
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
>>>.van-icon.van-icon-search
  color: $color-primary
>>>.van-search__action
  color: $color-primary
>>>.van-search__content
  background: $color-page-background
</style>
