<template>
  <div class="confirm">
    <CustomerInfoCard></CustomerInfoCard>
    <div class="orderInfo">
      <ul>
        <li>
          <span class="key">院区</span>
          <span class="value">南海院区</span>
        </li>
        <li>
          <span class="key">科室</span>
          <span class="value">内分泌科(门)</span>
        </li>
        <li>
          <span class="key">医生</span>
          <span class="value">杨辉</span>
        </li>
        <li>
          <span class="key">就诊日期</span>
          <span class="value">2019-08-31</span>
        </li>
        <li>
          <span class="key">时间段</span>
          <span class="value">09:00 - 10:00</span>
        </li>
        <li>
          <span class="key">诊查费</span>
          <span class="value">20</span>
        </li>
      </ul>
    </div>
    <mt-button class="confirmBtn" type="primary" @click="confirm">确认挂号</mt-button>
  </div>
</template>

<script>
import CustomerInfoCard from '@/components/CustomerInfoCard'
export default {
  name: 'confirm',
  components: { CustomerInfoCard },
  data () {
    return {}
  },
  methods: {
    confirm () {
      this.$indicator.open()
      setTimeout(() => {
        this.$indicator.close()
        this.$toast({
          message: '提交成功',
          duration: 1000,
          className: 'toast'
        })
        this.$router.push('/index')
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm {
  background: #f2f2f2;
  height: 100vh;
  .orderInfo {
    margin-top: 22px;
    background: #fff;
    ul > li {
      height: 88px;
      padding: 0 54px 0 43px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ededed;
      .key {
        color: #333333;
        font-size: 30px;
        font-weight: bold;
      }
      .value {
        color: #666666;
        font-size: 30px;
      }
    }
  }
  .confirmBtn {
    margin: 0 12.5px;
    margin-top: 92px;
    width: 725px;
    height: 80px;
    background: #09cf74;
    font-size: 30px;
  }
}
</style>
