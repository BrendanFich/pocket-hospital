<template>
  <div class="reserve3">
    <div class="doctorInfo">
      <div class="baseInfo">
        <img src="@/assets/预约挂号3_slices/图层 826 拷贝 2.png" alt />
        <div>
          <div class="name">杨辉</div>
          <div class="department">内分泌科(门)</div>
        </div>
      </div>
      <div class="intro">
        主任医师，擅长治疗内分泌失调，免疫力低下。曾在中山大学
        研究院专业研修学习。已在岗位十年经验。
      </div>
    </div>
    <div class="workTime">ss</div>

    <SimpleTabbar></SimpleTabbar>
  </div>
</template>

<script>
import SimpleTabbar from '../components/SimpleTabbar'
export default {
  name: 'Reserve3',
  data () {
    return {}
  },
  components: { SimpleTabbar },
  methods: {}
}
</script>

<style lang="scss" scoped>
.reserve3 {
  margin-top: 80px;
  background: #F2F2F2;
  .doctorInfo {
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .baseInfo {
      width: 690px;
      margin: 19px 0 25px 0;
      display: flex;
      justify-content: start;
      align-items: center;
      img {
        width: 102px;
        height: 102px;
        margin-right: 23px;
      }
      div {
        .name {
          font-size: 30px;
          color: #333333;
          font-weight: bold;
        }
        .department {
          font-size: 24px;
          font-weight: 400;
          color: #999999;
        }
      }
    }
    .intro {
      margin-bottom: 24px;
      width: 690px;
      font-size: 24px;
      font-weight: 400;
      color: #333333;
    }
  }
  .workTime{
    background: #fff;
    margin-top: 8px;
  }
}
</style>
