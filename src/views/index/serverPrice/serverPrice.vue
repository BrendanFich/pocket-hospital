<template>
  <div class="serverPrice">
    <div class="displayCard" :class="{hidden: isShow}">
      <img src="@/assets/img/医疗服务价格.png" />
    </div>
    <div class="searchbar">
      <img class="cancelIcon" src="@/assets/img/搜索.png" alt />
      <input type="text" v-model="value" placeholder="搜索医疗服务" @focus="focus" />
      <div class="xIcon" :class="{show: value}" @click="clear">×</div>
      <button class="cancel" :class="{show : isShow}" @click="cancel">取消</button>
      <div class="resultList" :class="{show : isShow}">
        <mt-cell class="cell" is-link v-for="(item,index) in searchResult" :key="index">
          <div slot="icon" class="fakePicture"></div>
          <div slot="title" class="content">
            <div>服务名称：{{item.Name}}</div>
            <div>服务次数：1次</div>
            <div>服务价格：{{item.Price}}元</div>
          </div>
        </mt-cell>
      </div>
    </div>

    <mt-cell
      class="cell"
      is-link
      v-for="(item,index) in drugList"
      :key="index"
      :class="{hidden: isShow}"
    >
      <div slot="icon" class="fakePicture"></div>
      <div slot="title" class="content">
        <div>服务名称：{{item.Name}}</div>
        <div>服务次数：1次</div>
        <div>服务价格：{{item.Price}}元</div>
      </div>
    </mt-cell>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar'
import util from '@/assets/js/util'

export default {
  name: 'serverPrice',
  data () {
    return {
      value: '',
      isShow: false,
      timer: null,
      searchResult: [],
      drugList: [
        { Name: '全身体检（常规）', Model: '1次', Price: 800 },
        { Name: '入职体检', Model: '1次', Price: 200 }
      ]

    }
  },
  components: { Searchbar },
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
    getSearchResult () {
      util.http
        .post('/api/doctor/medicalService', this.funcChina(this.value))
        .then(res => {
          console.log(res)
          this.searchResult = res.data.Records
        })
        .catch(error => {
          console.log(error)
        })
    },
    funcChina (str) {
      if (/.*[\u4e00-\u9fa5]+.*/.test(str)) {
        return {name: str}
      } else {
        return {pycode: str}
      }
    }
  },
  created () {},
  watch: {
    value () {
      // 函数防抖
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        // 搜索内容为空时，不发请求
        if (this.value) {
          this.searchResult = []
          this.getSearchResult()
        }
        this.timer = null
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.serverPrice {
  background: #f2f2f2;
  height: 100vh;
  .displayCard {
    height: 200px;
    // background: linear-gradient(to right, #47baeb, #65d5f1);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // padding: 30px 70px 18px;
    > img {
      width: 750px;
      // margin-right: 53px;
    }
    .title {
      color: #fff;
      h1 {
        font-size: 36px;
        line-height: 48px;
      }
      p {
        font-size: 26px;
        line-height: 36px;
      }
      .icon {
        width: 60px;
        height: 6px;
        border-radius: 3px;
        background: #f6f6f6;
        margin-top: 20px;
        opacity: 0.75;
      }
    }
  }
  .mint-search {
    border-radius: 10px;
    height: 66px;
    padding: 30px 25px;
    /deep/ .mint-searchbar {
      background: #f6f6f6;
      border-radius: 10px;
      height: 66px;
      padding: 0;
      .mint-searchbar-inner {
        padding: 20px 38px;
        background: #f6f6f6;
        border-radius: 10px;
        .mintui.mintui-search {
          margin-top: 3px;
          margin-right: 10px;
        }
        .mint-searchbar-core {
          background: #f6f6f6;
          font-size: 24px;
        }
      }
      .mint-searchbar-cancel {
        margin-right: 38px;
        font-size: 24px;
      }
    }
  }
  .cell {
    .fakePicture {
      width: 123px;
      height: 123px;
      background: #dfdfdf;
      margin-right: 30px;
    }
    .content {
      overflow: hidden;
      width: 454px;
      font-size: 24px;
      line-height: 42px;
      color: #333333;
    }
    /deep/ .mint-cell-allow-right::after {
      width: 15px;
      height: 15px;
      margin-right: 60px;
    }
    /deep/ .mint-cell-wrapper {
      padding: 0;
    }
  }
  /deep/ .mint-cell-title {
    padding: 27px 80px 27px 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .hidden {
    display: none !important;
  }
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
  }
}
</style>
