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
import moment from 'moment'
export default {
  name: 'inquiry',
  components: {},
  data () {
    return {
      msg: '',
      time: moment().format('YYYY-MM-DD HH:mm'),
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

<style lang="scss" scoped>
.inquiry {
  background: #f2f2f2;
  min-height: calc(100vh - 98px);
  padding-bottom: 98px;
  .nowTime {
    color: #999999;
    font-size: 24px;
    padding-top: 50px;
    padding-bottom: 40px;
    text-align: center;
  }
  .msgList {
    background: #f2f2f2;
    padding: 0 50px;
    li {
      display: flex;
      margin: 15px 0;
      .avatar {
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
  .finished {
    font-size: 30px;
    text-align: center;
    width: 400px;
    margin: 100px auto;
    padding: 20px 0;
    border: 1px solid #000;
    border-radius: 10px;
    background: #fff;
  }
  .inputMsg {
    background: #e0e0e0;
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
