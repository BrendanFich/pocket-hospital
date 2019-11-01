<template>
  <div class="suggestion">
    <div class="textarea">
      <mt-field placeholder="请输入意见..." type="textarea" rows="8" v-model="content"></mt-field>
    </div>
    <mt-button type="primary" class="btn" @click.native="handleClick">提交意见</mt-button>
  </div>
</template>

<script>
import util from '@/utils/util'
export default {
  name: 'suggestion',
  data () {
    return {
      content: ''
    }
  },
  methods: {
    handleClick () {
      console.log(this.content)
      if (this.content) {
        util.http
          .post('/api/user/submissionOfOpinions', { opinion: this.content })
          .then(res => {
            if (res.code === 0) {
              this.content = ''
              this.$toast({
                message: '提交成功',
                duration: 1000,
                className: 'toast'
              })
            } else {
              this.$toast({
                message: '提交失败',
                duration: 1000,
                className: 'toast'
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
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
    width: 726px;
    margin: 0 auto;
    padding-top: 38px;
    > .mint-cell {
      border: 1px solid #dddddd;
      border-radius: 5px;
      /deep/ .mint-field-core {
        font-size: 28px;
      }
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
