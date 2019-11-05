<template>
  <div class="cQueue">
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
        <li>
          <span class="key">报到时间</span>
          <span class="value">2019-08-31 08:48</span>
        </li>
      </ul>
    </div>
    <div class="queueBefore">
      <span class="key">前方还有</span>
      <span class="value">10 人</span>
    </div>
  </div>
</template>

<script>
import CustomerInfoCard from '@/components/CustomerInfoCard'
export default {
  name: 'cQueue',
  components: { CustomerInfoCard },
  data () {
    return {}
  },
  methods: {
    confirm () {
      this.$router.push({ path: '/payOnline', name: 'payOnline' })
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.cQueue {
  background: #f2f2f2;
  height: 100vh;
  .orderInfo {
    margin-top: 22px;
    background: #fff;
  }
  .orderInfo ul > li ,.queueBefore{
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
  .queueBefore{
    margin-top: 85px;
    background: #fff;
  }
}
</style>
