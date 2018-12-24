<template lang="pug">
  el-row
    el-button(type="primary" plain @click="initialState") Quick Connect
    el-row(class="title") Change Database
    el-select(:value="currentDb" @change="getCurrentDb" placeholder="Select Database" spellcheck="false" :title="currentDb" class="input-field")
      el-option(
        v-for="db in databaseList"
        :key="db.name"
        :value="db.name"
      )
    el-row(class="input-field")
      el-input(placeholder="Search Table" @keyup.native="filterTextChange" :value="filterText" suffix-icon="el-icon-search" spellcheck="false")
    el-row(class="title") TABLES
      .actions
        i(class="el-icon-circle-plus-outline add" @click="createTableForm" title="Create Table")
        i(class="el-icon-delete remove" v-if="currentTable" @click="deleteTableForm" title="Delete Table" :disabled="true")
    el-row(class="container")
      .list-item(v-for="(table, index) in tableList" :key="index" @click="switchTable(table)" :class="{active: isActive(table)}")
        .info
          v-icon(name="list-alt" class="icon")
          span {{ table }}
      span(v-if="!tableList.length") Empty database
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SidebarTables extends Vue {
  @Prop() private currentDb: any;
  @Prop() private getCurrentDb: any;
  @Prop() private databaseList: any;
  @Prop() private tableList!: any[];
  @Prop() private switchTable: any;
  @Prop() private currentTable: any;
  @Prop() private filterTextChange: any;
  @Prop() private filterText: any;
  @Prop() private initialState: any;
  @Prop() private createTableForm: any;
  @Prop() private deleteTableForm: any;

  private isActive(table: any) {
    return table === this.currentTable;
  }
}
</script>

<style lang="stylus" scoped>
.el-button
  width 100%
  border-radius 0px
  border-left 0px
  border-right 0px
.input-field
  padding 10px
  border-bottom 1px solid #121820
.title
  font-size 0.9em
  padding 10px
  border-bottom 1px solid #121820
.actions
  display inline-block
  float right
  font-size 1.2em
.actions i
  margin-left 15px
  cursor pointer
.add:hover
  color #00d986
  cursor pointer
.remove:hover
  color #ff6d6d
  cursor pointer
.header
  color #eee
  padding 10px
  margin-bottom 20px
.el-select
  width 100%
.list-item
  background #121820
  margin 5px 10px
  padding 5px
  align-items center
  display flex
  border-radius 5px
  transition 0.1s linear
.list-item:hover
  cursor pointer
  background rgba(#00397f, 0.5)
.list-item .info
  display flex
  align-items center
  width 90%
  height 100%
  overflow hidden
span
  margin-left 5px
  max-width 80%
.active
  background #00397f
.active:hover
  background #00397f
.container
  height 100vh
  overflow-y auto
  transition 0.5s linear
</style>
