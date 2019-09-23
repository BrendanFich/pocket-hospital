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
    <div class="inputMsg">
      <mt-field v-model="msg" placeholder="请输入内容..." :disableClear="true" @keydown="commit"></mt-field>
      <button class="moreBtn">+</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Inquiry',
  components: {},
  data () {
    return {
      msg: '',
      time: moment().format('YYYY-MM-DD HH:mm'),
      msgList: [
        {
          identity: 'doctor',
          avatarUrl: require('@/assets/img/图层 826 拷贝 4.png'),
          content: '我是主任医师陈辉'
        },
        {
          identity: 'patient',
          avatarUrl: require('@/assets/img/图层 826 拷贝 4.png'),
          content: '我也是陈辉'
        }
      ]
    }
  },
  created () {},
  methods: {
    commit (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.inquiry {
  background: #f2f2f2;
  height: 100vh;
  .nowTime {
    color: #999999;
    font-size: 24px;
    padding-top: 50px;
    padding-bottom: 40px;
    text-align: center;
  }
  .msgList {
    width: 650px;
    margin: 0 auto;
    li {
      display: flex;
      margin: 15px 0;
      img {
        width: 80px;
        height: 80px;
      }
      .msgCell {
        background: #fff;
        position: relative;
        box-sizing: border-box;
        font-size: 14px;
        padding: 30px 40px;
        border-radius: 10px;
        font-size: 28px;
        color: #333333;
      }
    }
    .leftSide {
      img {
        margin-right: 32px;
      }
      .msgCell:before {
        position: absolute;
        content: "";
        border: 20px solid;
        left: -35px;
        top: 25px;
        border-color: transparent #fff transparent transparent;
      }
    }
    .rightSide {
      flex-direction: row-reverse;
      img {
        margin-left: 32px;
      }
      .msgCell:after {
        position: absolute;
        content: "";
        border: 20px solid;
        border-color: transparent transparent transparent #fff;
        right: -35px;
        top: 25px;
      }
    }
  }
  .inputMsg {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 98px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #e0e0e0;
    .mint-field {
      flex: 1;
      width: 606px;
      height: 66px;
      border-radius: 10px;
      margin: 0 30px;
      /deep/ .mint-field-core {
        padding-left: 20px;
        font-size: 28px;
      }
    }
    .moreBtn {
      background: #cccccc;
      border: none;
      outline: none;
      border-radius: 50%;
      color: #fff;
      font-size: 50px;
      width: 58px;
      height: 58px;
      margin-right: 30px;
    }
  }
}
</style>
