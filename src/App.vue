<template lang="pug">
  #app
    AppHeader
    el-row
      DatabaseList
      DatabaseMain
</template>

<script>
import AppHeader from './containers/AppHeader.vue';
import DatabaseMain from './containers/DatabaseMain.vue';
import DatabaseList from './containers/DatabaseList.vue';
export default {
  name: 'app',
  components: {
    AppHeader,
    DatabaseMain,
    DatabaseList,
  },
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Roboto')
*
  padding 0
  margin 0 
  font-family 'Roboto', sans-serif
  box-sizing border-box
  user-select none !important
html,body
  height 100%
  width 100%
  font-size 14px
  overflow hidden
  background-color #fff
  background #222933
  color #eee
.el-header
  padding 0px
.cell
  text-overflow ellipsis
  white-space nowrap !important
td
  cursor pointer
.jsoneditor
  border none !important
  height 100% !important
.jsoneditor td
  color #fff !important
.jsoneditor-field
  color #fff !important
.jsoneditor-field:hover,.jsoneditor-field:focus
  color #fff !important
  background #191d25 !important
  border 1px solid #191d25 !important 
.jsoneditor-string
  color #46b7ff !important
.jsoneditor-menu
  background none !important
  border none !important
.jsoneditor-contextmenu .jsoneditor-menu
  background #fff !important
.jsoneditor-contextmenu:active
  background none !important
.jsoneditor-selected
  background none !important
.jsoneditor-tree button
  color #000 !important
.jsoneditor-value:hover,.jsoneditor-value:focus
  color #fff !important
  background #191d25 !important
  border 1px solid #191d25 !important 
.jsoneditor-tree button:focus
  background none !important
  outline none !important
.jsoneditor-highlight
  background none !important
</style>