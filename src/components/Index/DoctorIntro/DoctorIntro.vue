<template>
  <div class="doctorIntro">
    <div style="background: #fff;">
      <div class="content">
        <ul>
          <li
            v-for="(item, index) in deptList"
            :key="index"
            class="deptItem"
            :class="{active: item.deptCode === deptCode}"
            @click="deptCode = item.deptCode"
          >
            <div class="icon" :style="{ background: color[index % 5] }">
              {{ item.deptName.substring(0, 1) }}
            </div>
            <div class="department">{{ item.deptName }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="title">医生简介</div>

    <mt-tab-container v-model="selected" class="scollBox">
      <mt-tab-container-item
        v-for="(item, index) in deptList"
        :key="index"
        :id="index"
      >
        <img
          class="noData"
          v-if="docList.length === 0"
          src="./img/noData.png"
        />
        <ul style="background: #fff;">
          <li
            class="doctorIntroCard"
            v-for="(doctor, dindex) in docList"
            :key="dindex"
          >
            <img class="avatar" src="./img/avatar100x101.png" />
            <div class="doctorInfo">
              <p class="doctorName">{{ doctor.doctorName }}</p>
              <p class="doctorTitle">
                {{ doctor.doctorTitle }} {{ doctor.title }}
              </p>
              <div class="star">
                <img v-for="n in doctor.star" :key="n" src="./img/starOn.png" />
              </div>
              <p class="textIntro">
                {{
                  doctor.doctorIntrodution === null
                    ? "暂无介绍"
                    : doctor.doctorIntrodution
                }}
              </p>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  name: 'doctorIntro',
  data () {
    return {
      selected: 0,
      color: ['#E3B461', '#E36A61', '#98E361', '#61E3B4', '#619BE3'],
      deptList: [],
      docList: [],
      deptCode: ''
    }
  },
  created () {
    this.getDeptList()
  },
  watch: {
    deptCode (val) {
      this.getDocInfo(val)
    }
  },
  methods: {
    getDeptList () {
      this.$post('/api/department/recommend')
        .then(res => {
          this.deptList = res.data
          this.deptCode = res.data[0].deptCode
        })
        .catch(error => {
          console.log(error)
        })
    },
    getDocInfo (deptCode) {
      this.$post('/api/doctor/doc_info', { deptCode: deptCode.toString() })
        .then(res => {
          this.docList = res.data
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.doctorIntro
  @include page($color-page-background)
  text-align: center
  .noData
    width: 366px
    margin-top: 50px
  /deep/ .swiper-wrapper
    padding: 0 20px
  // .swiper-slide
  //   height: 160px
  //   display: flex
  //   justify-content: center
  //   align-items: center
  //   flex-direction: column

  .content
    width: 100%
    overflow-x: auto
    &::-webkit-scrollbar
      display: none
    ul
      display: flex
      align-items: center
      .deptItem
        padding: 0 15px
        height: 160px
        width: 160px
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        .icon
          margin: 0 20px
          width: 70px
          height: 70px
          line-height: 70px
          text-align: center
          border-radius: 50%
          color: $color-white
          font-size: 30px
        .department
          height: 22px
          margin: 15px 0
          font-size: 20px
          color: $color-value-grey
      .active
        background: #eee
  .title
    text-align: start
    font-size: 24px
    color: $color-word-grey
    line-height: 88px
    margin-left: 30px
  .scollBox
    overflow-y: auto
    height: calc( 100vh - 248px )
  .doctorIntroCard
    height: 195px
    padding: 30px 50px 40px 30px
    border-bottom: 1px solid $color-border
    display: flex
    .avatar
      width: 100px
      height: 100px
      margin-right: 24px
    .doctorInfo
      flex: 1
      text-align: start
      .doctorName
        font-size: 30px
        color: $color-title-black
        font-weight: bold
        line-height: 42px
      .doctorTitle
        font-size: 24px
        color: $color-title-black
        line-height: 34px
      .star
        padding: 5px 0 10px 0
        img
          width: 20px
      .textIntro
        font-size: 24px
        color: $color-title-black
</style>
