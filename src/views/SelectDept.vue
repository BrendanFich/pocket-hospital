<template>
  <div class="selectDept">
    <Searchbar placeholder="搜索科室" @getSearchContent="showSearchContent"></Searchbar>
    <div class="content">
      <mt-navbar v-model="selected" class="left_navbar">
        <mt-tab-item :id="index" v-for="(item,index) in searchData" :key="index">{{item.block}}</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" class="right_container">
        <mt-tab-container-item :id="index" v-for="(item,index) in searchData" :key="index">
          <div class="hiddenMsg" :class="{notFound: !item.division.length}">无相关科室</div>
          <router-link
            :to="{
          name: 'selectDoc',
          params:{
            dname: ditem.name
          }}"
            v-for="(ditem,dindex) in item.division"
            :key="dindex"
          >
            <mt-cell :title="ditem.name">
              <img class="icon" src="@/assets/img/科室.png" />&gt;
            </mt-cell>
          </router-link>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar'
export default {
  name: 'SelectDept',
  components: { Searchbar },
  data () {
    return {
      selected: 0,
      searchContent: '',
      fakeData: [
        {
          block: '南海院区',
          division: [
            { name: '内分泌科', id: '001' },
            { name: '骨内科', id: '002' },
            { name: '肠道专科', id: '003' }
          ]
        },
        {
          block: '西院区',
          division: [
            { name: '皮肤科', id: '004' },
            { name: '耳鼻喉科', id: '005' }
          ]
        }
      ]
    }
  },
  computed: {
    searchData () {
      let searchContent = this.searchContent
      let $this = this
      if (searchContent) {
        return this.fakeData.map((item, index) => {
          return {
            block: item.block,
            division: item.division.filter(ditem => {
              if (ditem.name.includes(searchContent)) {
                $this.selected = index
                return ditem
              }
            })
          }
        })
      }
      $this.selected = 0
      return this.fakeData
    }
  },
  methods: {
    showSearchContent (data) {
      this.searchContent = data
    }
  }
}
</script>

<style lang="scss" scoped>
.selectDept {
  background: #f2f2f2;
  height: 100vh;
  .content {
    min-height: calc(100vh - 126px);
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
      .hiddenMsg {
        display: none;
      }
      .notFound {
        display: block;
        text-align: center;
        font-size: 26px;
        color: #333333;
        margin-top: 30px;
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
            top: 30px;
            width: 20px;
          }
        }
      }
    }
  }
}
</style>
