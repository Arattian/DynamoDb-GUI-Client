<template lang="pug">
  el-col(:span="18" v-loading="loading")
    el-row
      el-col(:span="16")
        el-tabs(v-model="activeTab" @tab-click="handleClick")
          el-tab-pane(label="Records" name="records")
          el-tab-pane(label="Meta" name="json")
      el-col(:span="2")
        el-row
          i(class="el-icon-delete remove" @click="deleteTableForm" title="Delete Table")
          i(class="el-icon-circle-plus-outline add" @click="createTableForm" title="Create Table")
      el-col(:span="6")
        el-select(v-model="currentTable" filterable @change="switchTable()" placeholder="Select Table" spellcheck="false" :title="table.currentTable")
          el-option(
            v-for="table in tables" 
            :key="table.name"
            :value="table.name"
          )
            .wrapper
              span {{table.name}}
              el-badge(type="warning" :value="table.ItemCount")
    Records(v-if="recordsTab")
    JsonSchema(v-if="jsonTab" ref="jsonSchema")
    CreateTable(v-if="table.creatingTable")
    DeleteTable(v-if="table.deletingTable")
    span(v-if="error")
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';
import { State, Action, Mutation, Getter } from 'vuex-class';
import JsonSchema from './JsonSchema.vue';
import Records from './Records.vue';
import CreateTable from './CreateTable.vue';
import DeleteTable from './DeleteTable.vue';
const namespace: string = 'table';

@Component({
  components: {
    Records,
    JsonSchema,
    CreateTable,
    DeleteTable,
  },
})
export default class TableInfo extends Vue {
  public $notify: any = this.$notify;
  private activeTab: string = 'records';
  private jsonTab: boolean = false;
  private recordsTab: boolean = true;
  @Getter('tables') private tables: any;
  @Getter('error') private error: any;
  @Getter('loading') private loading: any;
  @Getter('currentTable') private currentTable: any;
  @State('table') private table: any;
  @Action('getRecords', { namespace: 'records' }) private getRecords: any;
  @Mutation('createTableForm', { namespace }) private createTableForm: any;
  @Mutation('deleteTableForm', { namespace }) private deleteTableForm: any;
  @Mutation('getMeta', {namespace}) private getMeta: any;
  private updated() {
    if (this.error) {
      this.$notify.error({
        title: 'Error',
        message: this.error,
        duration: 3500,
      });
    }
  }
  private switchTable() {
    this.expandJsonSchema();
    this.getRecords();
    this.getMeta();
  }
  private expandJsonSchema() {
    setTimeout(() => {
      const { jsonSchema }: any = this.$refs;
      if (jsonSchema) {
        jsonSchema.expandAll();
      }
    }, 1000);
  }
  private handleClick(ev: any) {
    if ((ev.name === 'records' && this.recordsTab) || (ev.name === 'json' && this.jsonTab)) {
      return;
    }
    this.jsonTab = !this.jsonTab;
    this.recordsTab = !this.recordsTab;
    if (this.jsonTab) {
      this.expandJsonSchema();
    }
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
i 
  margin 0 5px
.el-col .add:hover
  color #00d986
  cursor pointer
.el-col .remove:hover
  color #ff6d6d
  cursor pointer
.el-col .refresh:hover
  color #409EFF
  cursor pointer
.wrapper
  display flex
  justify-content space-between
  align-items center
.el-badge
  display flex
</style>
