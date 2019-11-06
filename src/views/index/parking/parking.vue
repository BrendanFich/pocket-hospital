<template>
  <div class="parking">
    <img src="@/assets/img/parkBg.png" />
    <div class="btns">
      <mt-button type="primary" class="btn">查看医院车位</mt-button>
      <mt-button type="primary" class="btn">停车缴费</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'parking',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.parking {
  background: #f2f2f2;
  height: 100vh;
  img {
    width: 750px;
  }
  .btns{
    margin: 0 auto;
    width: 618px;
    position: absolute;
    top: 327px;
    left: 66px;
    display: flex;
    justify-content: space-between;
    .btn{
      width: 280px;
      height: 80px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.21);
      color: #fff;
      font-size: 26px;
    }
  }
}
</style>
