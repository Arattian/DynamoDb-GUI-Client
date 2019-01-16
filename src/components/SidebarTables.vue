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
        i(class="el-icon-circle-plus-outline add" @click="toggleCreateModal" title="Create Table")
        i(class="el-icon-delete remove" v-if="currentTable" @click="toggleDeleteModal" title="Delete Table" :disabled="true")
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
  @Prop(Function) private getCurrentDb: any;
  @Prop(Function) private switchTable: any;
  @Prop(Function) private filterTextChange: any;
  @Prop(Function) private initialState: any;
  @Prop(Function) private toggleCreateModal: any;
  @Prop(Function) private toggleDeleteModal: any;
  @Prop(Array) private databaseList!: string[];
  @Prop(Array) private tableList!: string[];
  @Prop(String) private currentTable!: string;
  @Prop(String) private currentDb!: string;
  @Prop(String) private filterText!: string;

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
.info span
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
