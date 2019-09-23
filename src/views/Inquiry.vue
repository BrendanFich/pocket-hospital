<template>
  <div class="inquiry">
    <div class="inputMsg">
      <mt-field v-model="msg" placeholder="请输入内容..."></mt-field>
      <!-- <mt-palette-button content="+"></mt-palette-button> -->
      <button class="moreBtn">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inquiry',
  data () {
    return {
      msg: ''
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.inquiry {
  background: #f2f2f2;
  height: 100vh;
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
