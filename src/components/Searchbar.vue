<template>
  <div class="searchbar">
    <mt-search
      v-model="value"
      :placeholder="placeholder"
      @keyup.enter.native="sendSearchContent"
      @blur.native="sendSearchContent"
      ref="mtSearch"
    ></mt-search>
  </div>
</template>

<script>
export default {
  name: 'Searchbar',
  props: ['placeholder'],
  data () {
    return {
      value: ''
    }
  },
  methods: {
    sendSearchContent () {
      this.$emit('getSearchContent', this.value)
    },
    close () {
      this.value = ''
      this.sendSearchContent()
    }
  },
  mounted () {
    this.$nextTick(() => {
      let cancel = this.$refs.mtSearch.$el.querySelectorAll(
        '.mint-searchbar-cancel'
      )[0]
      cancel.onclick = () => {
        this.close()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.searchbar {
  width: 750px;
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
}
</style>
