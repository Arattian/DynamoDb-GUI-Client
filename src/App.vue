<template lang="pug">
  #app
    el-row
      FavoriteList(v-if="!currentDb")
      TableList(v-if="currentDb")
      DatabaseMain(v-if="currentTable")
      AddDatabase(v-if="!currentDb")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import DatabaseMain from './containers/DatabaseMain.vue';
import FavoriteList from './containers/FavoriteList.vue';
import TableList from './containers/TableList.vue';
import AddDatabase from './containers/AddDatabase.vue';

@Component({
  name: 'app',
  components: {
    DatabaseMain,
    FavoriteList,
    TableList,
    AddDatabase,
  },
})
export default class App extends Vue {
  @Getter private currentDb: any;
  @Getter private currentTable: any;
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
html,body
  height 100%
  width 100%
  font-size 14px
  overflow hidden
::placeholder
  opacity 0.5
.el-input__inner
  background-color #2c323a !important
.cell
  text-overflow ellipsis
  white-space nowrap !important
.el-tabs__header
  background none !important
.el-color-picker__trigger
  border none !important
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
