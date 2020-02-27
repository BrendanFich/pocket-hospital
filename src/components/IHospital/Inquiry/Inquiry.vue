<template>
  <div class="inquiry">
    <div class="nowTime">{{time}}</div>
    <ul class="msgList">
      <li
        :class="[{leftSide : msg.identity==='doctor'},{rightSide : msg.identity==='patient'}]"
        v-for="(msg,index) in msgList"
        :key="index"
      >
        <img class="avatar" :src="msg.avatarUrl" alt />
        <div class="msgCell">{{msg.content}}</div>
      </li>
    </ul>
    <div class="finished" @click="enterEva">结束问诊，点击评价</div>
    <div class="inputMsg">
      <mt-field v-model="msg" placeholder="请输入内容..." :disableClear="true" @keydown="commit"></mt-field>
      <button class="moreBtn">+</button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'inquiry',
  components: {},
  data () {
    return {
      msg: '',
      time: dayjs().format('YYYY-MM-DD HH:mm'),
      msgList: [
        {
          identity: 'doctor',
          avatarUrl: require('./img/avatar80x80.png'),
          content: '我是副主任医师劳绍祥'
        },
        {
          identity: 'patient',
          avatarUrl: require('./img/avatar80x80.png'),
          content: '医生我头痛'
        },
        {
          identity: 'doctor',
          avatarUrl: require('./img/avatar80x80.png'),
          content: '多喝开水'
        }
      ]
    }
  },
  created () {},
  methods: {
    commit (e) {
      console.log(e)
    },
    enterEva () {
      this.$router.push('/iHospital/evaluate')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.inquiry
  background: $color-page-background
  min-height: calc(100vh - 98px)
  padding-bottom: 98px
  .nowTime
    color: $color-word-grey
    font-size: 24px
    padding-top: 50px
    padding-bottom: 40px
    text-align: center
  .msgList
    background: $color-page-background
    padding: 0 50px
    li
      display: flex
      margin: 15px 0
      .avatar
        width: 80px
        height: 80px
      .msgCell
        background: $color-white
        position: relative
        box-sizing: border-box
        font-size: 14px
        padding: 30px 40px
        border-radius: 10px
        font-size: 28px
        color: $color-title-black
    .leftSide
      img
        margin-right: 32px
      .msgCell:before
        position: absolute
        content: ""
        border: 20px solid
        left: -35px
        top: 25px
        border-color: transparent $color-white transparent transparent
    .rightSide
      flex-direction: row-reverse
      img
        margin-left: 32px
      .msgCell:after
        position: absolute
        content: ""
        border: 20px solid
        border-color: transparent transparent transparent $color-white
        right: -35px
        top: 25px
  .finished
    font-size: 30px
    text-align: center
    width: 400px
    margin: 100px auto
    padding: 20px 0
    border: 1px solid $color-black
    border-radius: 10px
    background: $color-white
  .inputMsg
    background: $color-input-grey
    position: fixed
    bottom: 0
    width: 100%
    height: 98px
    display: flex
    justify-content: center
    align-items: center
    border-top: 1px solid $color-input-grey
    .mint-field
      flex: 1
      width: 606px
      height: 66px
      border-radius: 10px
      margin: 0 30px
      /deep/ .mint-field-core
        padding-left: 20px
        font-size: 28px
    .moreBtn
      background: $color-add-grey
      border: none
      outline: none
      border-radius: 50%
      color: $color-white
      font-size: 50px
      width: 58px
      height: 58px
      margin-right: 30px
</style>
