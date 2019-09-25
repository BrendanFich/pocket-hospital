<template>
  <div class="drugSearch">
    <div class="displayCard">
      <img src="@/assets/img/ecbdfe95978b0.png" />
      <div class="title">
        <h1>掌上医院</h1>
        <p>自助药品搜索</p>
        <div class="icon"></div>
      </div>
    </div>
    <Searchbar placeholder="搜索科室或医生"></Searchbar>

    <mt-cell class="cell" is-link>
      <div slot="icon" class="fakePicture"></div>
      <div slot="title" class="content">
        <div>药品名称：复方阿胶浆</div>
        <div>药品规格：20ml/瓶</div>
        <div>药品价格：30元</div>
      </div>
    </mt-cell>
    <mt-cell class="cell" is-link>
      <div slot="icon" class="fakePicture"></div>
      <div slot="title" class="content">
        <div>药品名称：复方阿胶浆</div>
        <div>药品规格：20ml/瓶</div>
        <div>药品价格：30元</div>
      </div>
    </mt-cell>
    <mt-cell class="cell" is-link>
      <div slot="icon" class="fakePicture"></div>
      <div slot="title" class="content">
        <div>药品名称：复方阿胶浆</div>
        <div>药品规格：20ml/瓶</div>
        <div>药品价格：30元</div>
      </div>
    </mt-cell>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar'
export default {
  name: 'DrugSearch',
  data () {
    return {
      value: ''
    }
  },
  components: { Searchbar },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.drugSearch {
  background: #f2f2f2;
  height: 100vh;
  .displayCard {
    height: 200px;
    background: linear-gradient(to right, #47baeb, #65d5f1);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 30px 70px 18px;
    img {
      width: 150px;
      margin-right: 53px;
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
}
</style>
