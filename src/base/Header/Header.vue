<template>
  <div class="header" v-if="title">
    <div class="title">{{ title }}</div>
    <img src="./img/back.png" alt="" @click="$router.back()" />
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      title: '掌上医院'
    }
  },
  created () {
    this.setTitle()
  },
  mounted () {

  },
  methods: {
    setTitle () {
      console.log(this.$route.name)
      switch (this.$route.name) {
        case 'index':
          this.title = ''
          break
        case 'hospitalInfo':
          this.title = '医院信息'
          break
        case 'doctorIntro':
          this.title = '医生介绍'
          break
        case 'reportsKind':
          this.title = '报告查询'
          break
        case 'examination':
          this.title = '检查报告'
          break
        case 'bodyExam':
          this.title = '检验报告'
          break
        case 'drugIndex':
        case 'drugSearchPage':
          this.title = '药品查询'
          break
        case 'serverIndex':
        case 'serverSearchPage':
          this.title = '医疗服务查询'
          break
        case 'parking':
          this.title = '车位查询'
          break
        case 'suggestion':
          this.title = '意见提交'
          break
        case 'nav':
          this.title = '住院服务'
          break
        case 'sSymptom':
          this.title = '智能导诊'
          break
        case 'docSearchPage':
          this.title = '导诊搜索'
          break
        case 'cConfirm':
          this.title = '就诊报到'
          break
        case 'sDept':
          this.title = '选择科室'
          break
        case 'sDayDoc':
          this.title = '选择医生'
          break
        case 'sTime':
        case 'gSTime':
          this.title = '选择时间'
          break
        case 'confirm':
          this.title = '确认挂号信息'
          break
        case 'unpayItem':
        case 'unpayList':
          this.title = '待缴费订单'
          break
        case 'iHospital':
          this.title = ''
          break
        case 'mine':
          this.title = ''
          break
        case 'cardManage':
          this.title = '就诊卡管理'
          break
        case 'bindCard':
          this.title = '就诊卡绑定'
          break
        case 'regOrderList':
          this.title = '挂号订单'
          break
        case 'unpaid':
          this.title = '缴费订单'
          break
        case 'reportDetail':
          this.title = '报告详情'
          break
        case 'cardInfo':
          this.title = '就诊卡信息'
          break
        case 'recharge':
          this.title = '预交金缴纳'
          break
        case 'feeTotal':
          this.title = '汇总清单'
          break
        case 'dailyList':
          this.title = '每日清单'
          break
        case 'liveHosOrder':
          this.title = '住院预交金订单'
          break
        case 'regOrderItem':
          this.title = '挂号详情'
          break

        default:
          this.title = ''
      }
    }
  },
  watch: {
    $route (val) {
      this.setTitle()
    }
  }
}
</script>

<style lang="sass" scoped>
.header
  padding: 0 20px
  width: calc(100% - 40px)
  height: 90px
  background: #59dca4
  text-align: center
  position: fixed
  top: 0
  left: 0
  z-index: 999
  .title
    font-size: 30px
    color: white
    line-height: 90px
  img
    position: absolute
    right: 20px
    top: 25px
    width: 40px
    height: 40px
</style>
