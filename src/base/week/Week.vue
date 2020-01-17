<template>
  <div class="week">
    <ul>
      <li
        v-for="(item, index) in dateList"
        :key="index"
        :class="{ active: item[2] === selectedDate }"
        @click="select(item)"
      >
        <div class="up">{{ item[0] }}</div>
        <div class="down">{{ item[1] }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {},
  data () {
    return {
      dateList: [],
      selectedDate: ''
    }
  },
  computed: {},
  mounted () {
  },
  created () {
    for (let i = 0; i < 7; i++) {
      let dateItem = [
        moment()
          .add(i, 'days')
          .format('dd'),
        moment()
          .add(i, 'days')
          .format('DD'),
        moment()
          .add(i, 'days')
          .format('YYYY-MM-DD')
      ]
      this.dateList.push(dateItem)
    }
    this.selectedDate = moment().format('YYYY-MM-DD')
  },
  methods: {
    select (dateItem) {
      this.selectedDate = dateItem[2]
    }
  },
  watch: {
    selectedDate (val) {
      this.$emit('changeDate', val)
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.week
  ul
    display: flex
    li
      background: $color-white
      flex: 1
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      font-size: 26px
      border: 1px solid #ededed
      padding: 15px 0
      .up
        color: $color-title-grey
        margin-bottom: 20px
    .active
      background: $color-primary
      color: #fff
      .up
        color: #fff
</style>
