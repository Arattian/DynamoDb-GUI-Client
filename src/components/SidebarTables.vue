<template lang="pug">
  .outer
    .inner-fixed
      el-button(type="primary" plain @click="initialState")
        span Quick Connect
      .input-field
        el-select(:value="currentDb" @change="getCurrentDb" placeholder="Select Database" spellcheck="false" :title="currentDb")
          el-option(
            v-for="db in databaseList"
            :key="db.name"
            :value="db.name"
          )
      el-row(class="change-title")
        el-col(:span="22") Edit Database
        el-col(:span="2" class="edit")
          i(class="el-icon-edit" @click="toggleEditModal")
      el-row(class="input-field")
        el-input(placeholder="Search Table" @input="filterTextChange" :value="filterText" suffix-icon="el-icon-search" spellcheck="false")
      el-row(class="table-actions")
        el-col(:span="12" class="title") TABLES
        el-col(:span="12" class="actions")
          i(:class="[loading ? 'el-icon-loading' : '', 'el-icon-refresh refresh']" @click="getDbTables() && toggleLoading()" title="Refresh Table List")
          i(class="el-icon-circle-plus-outline add" @click="toggleCreateModal" title="Create Table")
          i(class="el-icon-delete remove" v-if="currentTable" @click="toggleDeleteModal" title="Delete Table" :disabled="true")
    .inner-remaining
      .list-item(v-for="(table, index) in tableList" :key="index" @click="switchTable(table)" :class="{active: isActive(table)}")
        .info
          span {{ table }}
      span(v-if="!tableList.length") Empty database
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SidebarTables extends Vue {
  private loading: boolean = false;
  @Prop(Function) private getCurrentDb: any;
  @Prop(Function) private getDbTables: any;
  @Prop(Function) private switchTable: any;
  @Prop(Function) private filterTextChange: any;
  @Prop(Function) private initialState: any;
  @Prop(Function) private toggleCreateModal: any;
  @Prop(Function) private toggleDeleteModal: any;
  @Prop(Function) private toggleEditModal: any;
  @Prop(Array) private databaseList!: string[];
  @Prop(Array) private tableList!: string[];
  @Prop(String) private currentTable!: string;
  @Prop(String) private currentDb!: string;
  @Prop(String) private filterText!: string;

  private isActive(table: any) {
    return table === this.currentTable;
  }
  private toggleLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
</script>

<style lang="stylus" scoped>
.el-button
  width 100%
  border-radius 0
  border-left 0
  border-right 0

.input-field
  padding 10px
  border-bottom 1px solid #121820

.table-actions, .change-title
  font-size .9em
  padding 10px
  border-bottom 1px solid #121820
  display flex

.actions
  display flex
  justify-content flex-end
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

.edit
  margin-left 10px
  display flex
  justify-content flex-end
  align-items center

.edit:hover
  color #00d986
  cursor pointer

.list-item
  background #121820
  margin 5px 10px
  padding 5px
  align-items center
  display flex
  border-radius 5px

.list-item:hover
  cursor pointer
  background rgba(#00397f, .5)

.list-item .info
  display flex
  align-items center
  width 100%
  overflow hidden

.info span
  margin-left 5px
  min-width 80%

.active
  background #00397f

.active:hover
  background #00397f

.refresh:hover
  color #52ceff

.outer
  display flex
  flex-flow column
  height 100%

.inner-remaining
  flex-grow 1
  overflow-y auto
  font-size 1em
</style>
