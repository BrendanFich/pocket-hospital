<template>
  <div class="suggestion">
    <div class="textarea">
      <mt-field placeholder="请输入意见..." type="textarea" rows="12" v-model="introduction"></mt-field>
    </div>
    <mt-button type="primary" class="btn">提交意见</mt-button>
  </div>
</template>

<script>
export default {
  name: 'Suggestion',
  data () {
    return {
      introduction: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.suggestion {
  background: #f2f2f2;
  height: 100vh;
  text-align: center;
  .textarea {
    width: 725px;
    margin: 0 auto;
    padding-top: 40px;
    .mint-cell {
      border: 1px solid #dddddd;
      border-radius: 5px;
      font-size: 24px;
    }
  }
  .btn {
    margin-top: 30px;
    width: 725px;
    height: 80px;
    border-radius: 10px;
    background: #09cf74;
    color: #fff;
    font-size: 26px;
  }
}
</style>
