<template>
  <div class="searchbar">
    <img class="cancelIcon" src="@/assets/img/搜索.png" alt />
    <input type="text" v-model="value" :placeholder="placeholder" @focus="focus" />
    <div class="xIcon" :class="{show: value}" @click="clear">×</div>
    <button class="cancel" :class="{show : isShow}" @click="cancel">取消</button>
    <div class="resultList" :class="{show : isShow}">
      <div v-if="searchResult.doctors" class="doctors">
        <p class="resultStyle">医生</p>
        <div class="resultItem" v-for="(item, index) in searchResult.doctors" :key="index">
          <img class="avatar" src="@/assets/img/图层 826 拷贝 5.png" />
          <div class="textInfo">
            <p class="name">{{item.name}}</p>
            <p>{{item.department}}</p>
            <p>{{item.title}}</p>
          </div>
        </div>
      </div>
      <div v-if="searchResult.departments" class="departments">
        <p class="resultStyle">科室</p>
        <div class="resultItem" v-for="(item, index) in searchResult.departments" :key="index">
          <img class="icon" src="@/assets/img/科室.png" />
          <p class="name">{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Searchbar',
  props: ['placeholder', 'searchContent'],
  data () {
    return {
      value: '',
      isShow: false,
      isEmpty: true,
      searchResult: {
        doctors: [{ name: '陈外', department: '骨科门诊', title: '主治医师' },
          { name: '陈外', department: '骨科门诊', title: '主治医师' }],
        departments: []
      }
    }
  },
  mounted () {
    this.$on('bridge', val => {
      this.tagSearch(val)
    })
  },
  methods: {
    tagSearch (tagContent) {
      this.value = tagContent
      this.focus()
    },
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
    background: #fff;
    display: none;
    min-height: calc(100vh - 128px);
    .doctors {
      img{
        width: 90px;
        height: 90px;
        margin-right: 20px;
      }
    }
    .departments {
      img{
        width: 20px;
        margin: 35px 45px;
      }
    }
    .resultStyle{
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
</style>
