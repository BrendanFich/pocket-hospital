<template>
  <div class="doctorIntro">
    <div style="background: #fff;">
      <div class="content">
        <ul>
          <li
            v-for="(item, index) in deptList"
            :key="index"
            class="deptItem"
            @click="deptCode = item.deptCode"
            :class="{active: item.deptCode === deptCode}"
          >
            <div
              class="icon"
              :style="{ background: color[index % 5] }"
            >{{ item.deptName.substring(0, 1) }}</div>
            <div class="department">{{ item.deptName }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="title">医生简介</div>

    <mt-tab-container v-model="selected" class="scollBox">
      <mt-tab-container-item v-for="(item, index) in deptList" :key="index" :id="index">
        <img class="noData" v-if="docList.length === 0" src="./img/noData.png" />
        <ul style="background: #fff;">
          <li class="doctorIntroCard" v-for="(doctor, dindex) in docList" :key="dindex" @click="showAllInfo(doctor)">
            <DocAvatar :name="doctor.doctorName" style="margin-left: 20px"/>
            <div class="doctorInfo">
              <p class="doctorName">{{ doctor.doctorName }}</p>
              <p class="doctorTitle">{{ doctor.deptName }} | {{ doctor.doctorTitle }}</p>
              <van-rate :value="Math.round(doctor.score / 2)" readonly />
              <p class="textIntro">{{ doctor.doctorIntrodution || "暂无介绍" }}</p>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
    <van-dialog
      v-model="dialogShow"
      v-if="dialogShow"
      title="医生简介"
      show-cancel-button
      :closeOnClickOverlay="true"
      confirmButtonColor="#09cf74"
      confirmButtonText="确定"
    >
      <DocAvatar :name="doctor.doctorName" :marginLeft="20"/>
      <div class="doctorInfo">
        <p class="doctorName">{{ doctor.doctorName }}</p>
        <p class="doctorTitle">{{ doctor.deptName }} | {{ doctor.doctorTitle }}</p>
        <van-rate :value="Math.round(doctor.score / 2)" readonly />
        <p class="textIntro">{{ doctor.doctorIntrodution || "暂无介绍" }}</p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import DocAvatar from '@/base/DocAvatar/DocAvatar'
export default {
  name: 'doctorIntro',
  components: { DocAvatar },
  data () {
    return {
      selected: 0,
      color: ['#E3B461', '#E36A61', '#98E361', '#61E3B4', '#619BE3'],
      deptList: [],
      docList: [],
      deptCode: '',
      dialogShow: false,
      doctor: {}
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
    },
    showAllInfo (doctor) {
      this.doctor = doctor
      this.dialogShow = true
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.doctorIntro
  @include main()
  display: flex
  flex-direction: column
  text-align: center
  .noData
    width: 366px
    margin-top: 50px
  /deep/ .swiper-wrapper
    padding: 0 20px
  .content
    flex: 1
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
        margin-top: 4px
        border-bottom: 4px solid $color-primary
        .department
          color: $color-black
          font-weight: blod
  .title
    text-align: start
    font-size: 24px
    color: $color-word-grey
    line-height: 88px
    margin-left: 30px
  .scollBox
    overflow-y: auto
    margin-bottom: 80px
    .noData
      width: 366px
      margin: 100px 0  0 60px
  .doctorIntroCard
    height: 160px
    padding: 30px 50px 40px 30px
    border-bottom: 1px solid $color-border
    display: flex
    .doctorInfo
      line-height: 30px
      flex: 1
      text-align: start
      display: -webkit-box
      -webkit-box-orient: vertical
      -webkit-line-clamp: 2
      overflow: hidden
      .doctorName
        font-size: 30px
        color: $color-title-black
        font-weight: bold
        line-height: 42px
      .doctorTitle
        font-size: 24px
        color: $color-title-black
        line-height: 34px
      .textIntro
        font-size: 24px
        color: $color-word-grey
  .van-dialog__content
    padding: 30px
    border-bottom: 1px solid $color-border
    display: flex
    font-size: 16px
    .doctorInfo
      margin: 20px
      line-height: 24px
      flex: 1
      text-align: start
      .doctorName
        color: $color-title-black
        font-weight: bold
      .doctorTitle
        color: $color-title-black
      .textIntro
        color: $color-word-grey
>>>.van-icon-star,>>>.van-icon-star-o
  font-size: 12px
</style>
