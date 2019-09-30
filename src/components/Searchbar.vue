<template>
  <div class="searchbar">
    <img class="cancelIcon" src="@/assets/img/搜索.png" alt />
    <input type="text" v-model="value" :placeholder="placeholder" @focus="focus" />
    <div class="xIcon" :class="{show: value}" @click="clear">×</div>
    <button class="cancel" :class="{show : isShow}" @click="cancel">取消</button>
    <div class="resultList" :class="{show : isShow}"></div>
  </div>
</template>
<script>
export default {
  name: 'Searchbar',
  props: ['placeholder'],
  data () {
    return {
      value: '',
      isShow: false,
      isEmpty: true
    }
  },
  methods: {
    focus () {
      this.isShow = true
      this.$emit('getSearchStatus', true)
    },
    cancel () {
      this.value = ''
      this.isShow = false
      this.$emit('getSearchStatus', false)
    },
    clear () {
      this.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
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
    display: none;
    min-height: calc(100vh - 128px);
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
</style>
