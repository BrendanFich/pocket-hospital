<template>
  <div class="sDept">
    <div class="searchbar">
      <img class="cancelIcon" src="@/assets/img/search.png" alt />
      <input type="text" v-model="value" placeholder="搜索科室名称" @focus="focus" />
      <div class="xIcon" :class="{show: value}" @click="clear">×</div>
      <button class="cancel" :class="{show : isShow}" @click="cancel">取消</button>
      <div class="resultList" :class="{show : isShow}">
        <div v-if="searchResult.length===0 && value !== ''" class="noInfo">无相关科室信息</div>
        <div v-for="(item,index) in searchResult" :key="index" @click="select(item.deptCode, item.deptName)">
          <mt-cell :title="item.deptName">
            <img class="icon" src="@/assets/img/deptIcon.png" />&gt;
          </mt-cell>
        </div>
      </div>
    </div>

    <div class="content" :class="{hidden: isShow}">

      <mt-navbar v-model="selected" class="left_navbar">
        <mt-tab-item id='0'>全院科室</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected" class="right_container">
        <mt-tab-container-item id="0">
          <!-- <img class="noData" v-if="deptList.length === 0" src="@/assets/img/暂无数据.png" /> -->
          <div v-for="(item,index) in deptList" :key="index" @click="select(item.deptCode, item.deptName)">
            <mt-cell :title="item.deptName">
              <img class="icon" src="@/assets/img/deptIcon.png" />&gt;
            </mt-cell>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>

    </div>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  name: 'sDept',
  data () {
    return {
      value: '',
      selected: '0',
      deptList: [],
      isShow: false
    }
  },
  computed: {
    searchResult () {
      if (this.value === '') {
        return []
      } else {
        return this.deptList.filter((item) => { return item.deptName.indexOf(this.value) !== -1 })
      }
    }
  },
  created () {
    util.http.post('/api/doctor/allDeptInfo').then(res => {
      this.deptList = res.data.Records
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    focus () {
      this.isShow = true
    },
    cancel () {
      this.value = ''
      this.isShow = false
    },
    clear () {
      this.value = ''
    },
    select (deptCode, deptName) {
      // this.$store.commit('changeDept', deptCode, deptName)
      // this.$store.commit('changeDept', { deptCode: '173', deptName: '内科门诊' })
      this.$router.push({path: '/iHospital/selectDoc/173&内科门诊'})
    }
  }
}
</script>

<style lang="scss" scoped>
.sDept {
  background: #f2f2f2;
  height: 100vh;
  .searchbar {
    width: 750px;
    position: relative;
    input {
      margin: 30px 25px;
      border-radius: 10px;
      padding: 20px 70px;
      width: 560px;
      border: none;
      outline: none;
      font-size: 24px;
    }
    .cancelIcon {
      width: 16px;
      position: absolute;
      top: 55px;
      left: 65px;
    }
    .cancel {
      display: none;
      position: absolute;
      top: 30px;
      right: 50px;
      font-size: 24px;
      border: none;
      background: #fff;
      outline: none;
      height: 68px;
      margin-left: -10px;
      color: #09cf74;
    }
    .resultList {
      background: #fff;
      display: none;
      min-height: calc(100vh - 128px);
      /deep/ .mint-cell-wrapper {
        height: 80px;
        padding: 0 25px;
        border-bottom: 1px solid #e3e3e3;
        .mint-cell-text {
          padding-left: 50px;
          font-size: 26px;
          color: #333333;
        }
        .mint-cell-value {
          .icon {
            position: absolute;
            left: 32px;
            top: 27px;
            width: 20px;
          }
        }
      }
      .resultStyle {
        font-size: 24px;
        padding: 20px 30px;
        border-bottom: 1px solid #dedede;
      }
      .resultItem {
        display: flex;
        align-items: center;
        padding: 10px 30px;
        font-size: 20px;
        line-height: 30px;
        border-bottom: 1px solid #dedede;
      }
    }

    .xIcon {
      display: none;
      position: absolute;
      top: 50px;
      right: 130px;
      font-size: 25px;
      background: #f6f6f6;
      border-radius: 50%;
      width: 30px;
      height: 25px;
      text-align: center;
      padding-bottom: 5px;
      color: #333;
    }
    .show {
      display: block;
    }
    .noInfo {
      padding: 20px;
    }
  }
  .content {
    min-height: calc(100vh - 128px);
    width: 100%;
    display: flex;
    justify-content: center;
    .left_navbar {
      display: flex;
      flex-direction: column;
      width: 161px;
      flex-wrap: wrap;
      background: #f2f2f2;
      .mint-tab-item {
        width: 161px;
        height: 80px;
        flex: none;
        padding: 0;
        color: #666666;
        /deep/ .mint-tab-item-label {
          font-size: 26px;
          line-height: 80px;
        }
      }
      .mint-tab-item.is-selected {
        color: #fff;
        background: #09cf74;
        border: none;
        text-decoration: none;
      }
    }
    .right_container {
      width: 589px;
      background: #fff;
      .noData {
        width: 366px;
        margin-top: 50px;
      }
      /deep/ .mint-cell-wrapper {
        height: 80px;
        padding: 0 25px;
        border-bottom: 1px solid #e3e3e3;
        .mint-cell-text {
          padding-left: 50px;
          font-size: 26px;
          color: #333333;
        }
        .mint-cell-value {
          .icon {
            position: absolute;
            left: 32px;
            top: 27px;
            width: 20px;
          }
        }
      }
    }
  }
  .hidden {
    display: none;
  }
}
</style>
