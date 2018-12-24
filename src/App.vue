<template lang="pug">
  #app
    Sidebar(class="sidebar")
    Main(class="main")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import Main from './containers/Main.vue';
import Sidebar from './containers/Sidebar.vue';

@Component({
  name: 'app',
  components: {
    Main,
    Sidebar,
  },
})
export default class App extends Vue {
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Roboto')
*
  padding 0
  margin 0
  font-family 'Roboto', sans-serif
  box-sizing border-box
  user-select none !important
*::-webkit-scrollbar
  width 5px
  background transparent
*::-webkit-scrollbar-thumb
  background #484d54
  border-radius 2px
html,body
  height 100%
  width 100%
  font-size 14px
  overflow hidden
::placeholder
  opacity 0.5
#app
  display flex
// customizing some imported components and theme selectors
.el-input__inner
  background-color #2c323a !important
.cell
  text-overflow ellipsis
  white-space nowrap !important
.el-tabs__header
  background none !important
.el-color-picker__trigger
  border none !important
.el-color-picker__color
  border 1px solid #121820 !important
// table row height
.el-table .cell
  line-height 20px !important
td
  cursor pointer
.jsoneditor
  border none !important
  height 100% !important
.jsoneditor-field
  color #fff !important
// jsoneditor KEY field hover background
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
// jsoneditor VALUE field hover background
.jsoneditor-value:hover,.jsoneditor-value:focus
  color #fff !important
  background #191d25 !important
  border 1px solid #191d25 !important
.jsoneditor-tree button:focus
  background none !important
  outline none !important
.jsoneditor-highlight
  background none !important
.jsoneditor-search input
  background #2c323a !important
  color #fff !important
.jsoneditor-search div.jsoneditor-frame
  background #2c323a !important
  color #fff !important
  border-radius 2px !important
  border 1px solid #121820 !important
</style>
