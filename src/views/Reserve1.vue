<template>
  <div class="reserve1">
    <mt-search v-model="value" placeholder="搜索科室或医生"></mt-search>
    <div class="content">
      <mt-navbar v-model="selected" class="left_navbar">
        <mt-tab-item id="1">南海院区</mt-tab-item>
        <mt-tab-item id="2">西院区</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected" class="right_container">
        <mt-tab-container-item id="1">
          <router-link to="/reserve2" v-for="(item,index) in items" :key="index">
            <mt-cell :title="item.name">
              <img class="icon" src="@/assets/预约挂号_slices/科室.png" />&gt;
            </mt-cell>
          </router-link>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-cell v-for="n in 4" :title="'content ' + n" :key="n">
            <img class="icon" src="@/assets/预约挂号_slices/科室.png" />&gt;
          </mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reserve1',
  data () {
    return {
      value: '',
      selected: '1',
      tbSelected: '',
      items: [
        {
          name: '内分泌科(门)'
        },
        {
          name: '内分泌科(门)'
        },
        {
          name: '内分泌科(门)'
        },
        {
          name: '内分泌科(门)'
        },
        {
          name: '内分泌科(门)'
        },
        {
          name: '内分泌科(门)'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.reserve1 {
  background: #f2f2f2;
  .mint-search {
    margin: 0 auto;
    padding-top: 10px;
    width: 700px;
    height: 66px;
    /deep/ .mint-searchbar {
      z-index: 0;
      background: #f6f6f6;
    }
  }
  .content {
    width: 100%;
    display: flex;
    justify-content: center;
    .left_navbar {
      display: flex;
      flex-direction: column;
      width: 161px;
      height: 100vh;
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
            height: 28px;
          }
        }
      }
    }
  }
}
</style>
