<template lang="pug">
  el-col(:span="18" v-loading="tableModule.loading")
    el-row
      el-col(:span="14")
        el-tabs(v-model="activeTab" @tab-click="handleClick")
          el-tab-pane(label="Records" name="records")
          el-tab-pane(label="JSON" name="json")
      el-col(:span="1")
        el-row
          i(class="el-icon-date add" @click="creatingTableToggle" title="Create Table")
      el-col(:span="9")
        el-select(v-model="tableModule.currentTable" @change="switchTable()" placeholder="Select Table")
          el-option(
          v-for="table in dbModule.currentDb.tables" 
          :key="table"
          :label="table"
          :value="table"
          )
    Records(v-if="recordsTab")
    JsonSchema(v-if="jsonTab")
    CreateTable(v-if="tableModule.creatingTable")
    span(v-if="dbModule.error")
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';
import JsonSchema from './JsonSchema.vue';
import Records from './Records.vue';
import CreateTable from './CreateTable.vue';
const namespace: string = 'tableModule';

@Component({
  components: {
    Records,
    JsonSchema,
    CreateTable,
  },
})
export default class TableInfo extends Vue {
  public activeTab: string = 'records';
  public jsonTab: boolean = false;
  public recordsTab: boolean = true;
  public $notify: any = this.$notify;
  @State('dbModule') private dbModule: any;
  @State('tableModule') private tableModule: any;
  @Action('scanTable', { namespace: 'tableModule/table' }) private scanTable: any;
  @Mutation('setErrorToNull', { namespace: 'dbModule' }) private setErrorToNull: any;
  @Mutation('creatingTableToggle', { namespace }) private creatingTableToggle: any;
  private updated() {
    if (this.dbModule.error) {
      this.$notify.error({
        title: 'Error',
        message: this.dbModule.error,
        duration: 3500,
      });
    }
  }
  private switchTable() {
      this.scanTable();
  }
  private handleClick(ev: any) {
    if ((ev.name === 'records' && this.recordsTab) || (ev.name === 'json' && this.jsonTab)) {
      return;
    }
    this.jsonTab = !this.jsonTab;
    if (this.tableModule.currentTable !== '') {
      this.switchTable();
    }
    this.recordsTab = !this.recordsTab;
  }
}
</script>

<style lang="stylus" scoped>
.el-col
  padding 10px 10px
  color #ccc
.el-col .el-row
  display flex
  justify-content center
  align-items center
  font-size 1.1em
.el-col .add:hover
  color #00d986
  cursor pointer
</style>
