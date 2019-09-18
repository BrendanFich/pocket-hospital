<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 清除内外边距 */
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, /* structural elements 结构元素 */
dl, dt, dd, ul, ol, li, /* list elements 列表元素 */
pre, /* text formatting elements 文本格式元素 */
fieldset, lengend, button, input, textarea, /* form elements 表单元素 */
th, td {
  /* table elements 表格元素 */
  margin: 0;
  padding: 0;
}

/* 重置列表元素 */
ul,
ol {
  list-style: none;
}

/* 重置文本格式元素 */
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
<style lang="scss">
#app {
  font-family: "Microsoft YaHei", "Avenir", Helvetica, Arial, sans-serif;
  width: 750px;
}
body {
  .mint-msgbox {
    border-radius: 10px;
    .mint-msgbox-header {
      display: none;
    }
    .mint-msgbox-content {
      padding: 50px 52px;
      .mint-msgbox-message {
        text-align: left;
        font-size: 30px;
        color: #333333;
        line-height: 56px;
      }
    }
    .mint-msgbox-btns {
      height: 75px;
      .mint-msgbox-btn {
        font-size: 30px;
        line-height: 75px;
      }
      .mint-msgbox-cancel {
        color: #999999;
      }
      .mint-msgbox-confirm {
        color: #09cf74;
      }
    }
  }
}
</style>
