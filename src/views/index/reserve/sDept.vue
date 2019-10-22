<template>
  <div class="sDept">
    <Searchbar placeholder="搜索科室或医生" @getSearchStatus="setSearchStatus"></Searchbar>
    <div class="content" :class="{hidden: searching}">

      <mt-navbar v-model="selected" class="left_navbar">
        <mt-tab-item id='0'>全院科室</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected" class="right_container">
        <mt-tab-container-item id="0">
          <!-- <img class="noData" v-if="deptList.length === 0" src="@/assets/img/暂无数据.png" /> -->
          <div v-for="(item,index) in deptList" :key="index" @click="select(item.deptCode, item.deptName)">
            <mt-cell :title="item.deptName">
              <img class="icon" src="@/assets/img/科室.png" />&gt;
            </mt-cell>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>

    </div>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar'
import util from '@/utils/util'

export default {
  name: 'sDept',
  components: { Searchbar },
  data () {
    return {
      selected: '0',
      searching: false,
      deptList: []
    }
  },
  created () {
    util.http.post('/api/doctor/dept_info').then(res => {
      this.deptList = res.data.Records
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    setSearchStatus (data) {
      this.searching = data
    },
    select (deptCode, deptName) {
      this.$store.commit('changeDept', deptCode)
      this.$router.push({name: 'sDayDoc', params: { deptCode: '0173', deptName: '内科门诊' }})
    }
  }
}
</script>

<style lang="scss" scoped>
.sDept {
  background: #f2f2f2;
  height: 100vh;
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
