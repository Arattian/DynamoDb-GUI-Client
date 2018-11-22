<template lang="pug">
  el-col(:span="24")
    el-row(class="actions" v-if="table.currentTable")
      i(class="el-icon-circle-plus-outline add" @click="generateJsonContent" title="Add Record")
      i(class="el-icon-refresh refresh" @click="scanTable" title="Refresh Table")
      el-input(placeholder="Filter table" suffix-icon="el-icon-search" v-model="filterText" spellcheck="false")
      el-select(v-model="pageSize" placeholder="Item per page" @change="pageSizeChange")
        el-option(label="Item per page" default :disabled="true" value="0")
        el-option(:label="5" :value="5")
        el-option(:label="15" :value="15")
        el-option(:label="30" :value="30")
        el-option(:label="50" :value="50")
        el-option(:label="100" :value="100")
    el-row(class="table")
      el-table(ref="tableRef" :data="tableDataPage()" border v-if="records.hashKey" @row-dblclick="getItem" size="mini")
        el-table-column(type="index" :index="paginationIndex")
        el-table-column(:prop="records.hashKey" :label="records.hashKeyLabel" :render-header="renderHash")
        el-table-column(:prop="records.rangeKey" :label="records.rangeKeyLabel" :render-header="renderRange" v-if="records.rangeKey")
        el-table-column(v-for="(header, index) of records.header" :prop="header.prop" :label="header.label" :key="index" v-if="hideHashKey(header)")        
        el-table-column(fixed="right" width="50")
          template(slot-scope="scope")
            span(class="delete-column")
              i(class="el-icon-delete delete" @click="deleteRow(scope.$index, records.data)" title="Delete Raw")
    el-pagination(
      layout="pager"
      :total="total()"
      :page-size="pageSize"
      background
      @current-change="currentPage"
      ref="pagination"
    )
    RecordAction(v-if="records.visible")
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';
import RecordAction from './RecordAction.vue';
const namespace: string = 'records';

@Component({
  components: {
    RecordAction,
  },
})
export default class Records extends Vue {
  private pageNumber: number = 1;
  private pageSize: any = 15;
  private filterText: any = '';
  @State('records') private records: any;
  @State('table') private table: any;
  @Action('generateJsonContent', { namespace }) private generateJsonContent: any;
  @Action('removeItem', { namespace }) private removeItem: any;
  @Action('scanTable', { namespace: 'table' }) private scanTable: any;
  @Action('getItem', { namespace }) private getItem: any;
  private beforeUpdate() {
    if (this.table.loading && this.pageNumber !== 1) {
      this.pageNumber = 1;
    }
  }
  private total(): number {
    return this.filterTable().length;
  }
  private currentPage(val: number) {
    this.pageNumber = val;
  }
  private tableDataPage() {
    const data = this.filterTable();
    return data.filter((item: any, i: any) => {
      if (i >= (this.pageNumber - 1) * this.pageSize && i < ((this.pageNumber - 1) * this.pageSize + this.pageSize)) {
        return item;
      }
    });
  }
  private filterTable() {
    return this.records.data.filter((record: any) => {
      for (const key in record) {
        if (record[key].includes(this.filterText)) {
          return record;
        }
      }
    });
  }
  private renderHash(createElement: any, { column }: any) {
    return createElement(
      'div',
      [
        createElement('a', [column.label + ' ']),
        createElement('i', {
          class: 'el-icon-warning',
        }),
      ],
    );
  }
  private renderRange(createElement: any, { column }: any) {
    return createElement(
      'div',
      [
        createElement('a', [column.label + ' ']),
        createElement('i', {
          class: 'el-icon-warning',
        }),
      ],
    );
  }
  private deleteRow(i: any, row: any) {
    const paginationIndex = this.paginationIndex(i);
    this.removeItem(row[paginationIndex - 1]);
  }

  private paginationIndex(i: any) {
    return i + (this.pageNumber - 1) * this.pageSize + 1;
  }

  private pageSizeChange(val: number) {
    const { handleCurrentChange }: any = this.$refs.pagination;
    handleCurrentChange(1);
  }

  private hideHashKey(el: any) {
    return el.prop !== this.records.hashKey && el.prop !== this.records.rangeKey;
  }
}
</script>

<style lang="stylus" scoped>
.actions
  display flex
  justify-content space-between
  width 100%
.actions .el-input
  margin-right 15px
.actions i
  font-size 1.5em
  padding 10px
  cursor pointer
.add
  color #00d986
.refresh
  color #409EFF
.add:hover
  color #55ffbe
.refresh:hover
  color #52ceff
.delete-column
  width 100%
  text-align center
  display block
  font-size 1.2em
.delete-column:hover
  color #ff6d6d
  cursor pointer
.el-col
  align-items center
  display flex
  flex-direction column
.el-pagination
  margin 20px
.el-table
  width 100%
  font-size 0.9em
  color #eee
.table
  overflow-y auto
  width 100%
  height 70vh
</style>
