<template>
  <div class="list">
    <x-header>上拉加载,下拉刷新</x-header>
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="false"
        @top-status-change="handleTopChange"
        @bottom-status-change="handleBottomChange"
        ref="loadmore">
        <ul>
          <li class="page-loadmore-listitem" :key="item" v-for="item in list">{{ item }}</li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { Spinner, Loadmore } from 'mint-ui'

export default {
  data () {
    return {
      list: [],
      topStatus: '',
      bottomStatus: '',
      wrapperHeight: 0,
      allLoaded: false
    }
  },
  components: {
    'mt-spinner': Spinner, // 或者使用 Vue.component(Spinner.name, Spinner) 注册组件
    'mt-loadmore': Loadmore
  },
  methods: {
    handleTopChange (status) {
      console.log(status)
      this.topStatus = status
    },
    handleBottomChange (status) {
      console.log('handleBottomChange ', status)
      this.bottomStatus = status
    },
    loadTop () {
      console.log('loadTop')
      setTimeout(() => {
        let firstValue = this.list[0]
        for (let i = 1; i <= 10; i++) {
          this.list.unshift(firstValue - i)
        }
        this.$refs.loadmore.onTopLoaded()
        console.log('load top end')
      }, 2000)
    },
    loadBottom () {
      setTimeout(() => {
        let lastValue = this.list[this.list.length - 1]
        if (lastValue <= 60) {
          for (let i = 1; i <= 10; i++) {
            this.list.push(lastValue + i)
          }
        } else {
          this.allLoaded = true // 若数据已全部获取完毕
        }
        this.$refs.loadmore.onBottomLoaded()// 固定方法，查询完要调用一次，用于重新定位
        console.log('loadBottom end, this.allLoaded = ', this.allLoaded)
      }, 1500)
    }
  },
  created () {
    for (let i = 0; i < 20; i++) {
      this.list.push(i)
    }
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  background-color: #fafafa;
}
ul,li{ padding:0;margin:0;list-style:none};
.page-loadmore-wrapper {
  overflow: scroll; // 很重要
  -webkit-overflow-scrolling : touch; // 解决view滑动速度慢或者卡顿问题
}
.page-loadmore-listitem {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
}
.mint-loadmore-top {
  span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
  }
  span.is-rotate {
    transform: rotate(180deg);
  }
}
.mint-loadmore-bottom {
  span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
    }
    span.is-rotate {
      transform: rotate(180deg);
    }
}
</style>
