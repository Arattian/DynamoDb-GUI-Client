<template lang="pug">
  el-col
    ChangeDatabase
    el-row(class="table-filter")
      el-input(placeholder="Search Table" @keyup.native="filterTextChange" :value="filterText" suffix-icon="el-icon-search" spellcheck="false")
    el-row(class="title") TABLES
    TableListElement(
      :list="filteredTables"
      :switchTable="getCurrentTable"
      :currentTable="currentTable"
    )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';
import TableListElement from '../components/TableListElement.vue';
import ChangeDatabase from '../components/ChangeDatabase.vue';

const namespace: string = 'database';

@Component({
  components: {
    TableListElement,
    ChangeDatabase,
  },
})
export default class TableList extends Vue {
  @Getter private tables: any;
  @Getter private currentTable: any;
  @Getter private filteredTables: any;
  @Getter private filterText: any;
  @Action private getCurrentTable: any;
  @Mutation private filterTextChange: any;
}
</script>

<style lang="stylus" scoped>
.table-filter
  font-size 0.9em
  padding 10px
.title
  font-size 0.9em
  padding 10px
  border-bottom 1px solid #121820
.el-col
  margin-top -2px
  border-right 2px solid #121820
  border-top 2px solid #121820
  min-height 55px
  height 100vh
  width 15%
</style>
