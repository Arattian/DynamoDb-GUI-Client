<template lang="pug">
  el-col(:span="24" class="records-container")
    RecordListActions(
      :generateMeta="generateMeta"
      :getRecords="getRecords"
      :filterText="records.filterText"
      :filterTextChange="filterChangeHandler"
      :resetCurrentPage="resetCurrentPage"
      :header="header"
      :hasAttribute="hasAttribute"
      :pageSize="pageSize"
      :changePageSizeAndReset="changePageSizeAndReset"
    )
    RecordList(
      :list="tableDataPage"
      :keys="keys"
      :getItem="getItem"
      :paginationIndex="paginationIndex"
      :header="header"
      :hideHashKey="hideHashKey"
      :removeHandler="removeItem"
      size="mini"
    )
    el-pagination(
      layout="pager"
      :total="total"
      :page-size="pageSize"
      background
      @current-change="changeCurrentPage"
      ref="pagination"
    )
    RecordEdit(
      v-if="records.visible"
      :isVisible="records.visible"
      :metaValue="records.recordMeta"
      :metaChange="setMeta"
      :confirmHandler="putItem"
      :cancelHandler="toggleActionForm"
    )
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';
import { Getter, Action, Mutation, State } from 'vuex-class';
import RecordEdit from '../components/RecordEdit.vue';
import RecordList from '../components/RecordList.vue';
import RecordListActions from '../components/RecordListActions.vue';
const namespace: string = 'records';

@Component({
  components: {
    RecordEdit,
    RecordList,
    RecordListActions,
  },
})
export default class TableRecords extends Vue {
  @State private records: any;
  @Getter private loading: any;
  @Getter('header', { namespace }) private header: any;
  @Getter('keys', { namespace }) private keys!: {hashKey: string; rangeKey: string};
  @Getter('pageSize', { namespace }) private pageSize: any;
  @Getter('filterText', { namespace }) private filterText: any;
  @Getter('hasAttribute', { namespace }) private hasAttribute: any;
  @Getter('tableDataPage', { namespace }) private tableDataPage: any;
  @Getter('total', { namespace }) private total: any;
  @Getter('paginationIndex', { namespace }) private paginationIndex: any;
  @Getter('hideHashKey', { namespace }) private hideHashKey: any;
  @Action('putItem', { namespace }) private putItem: any;
  @Action('generateMeta', { namespace }) private generateMeta: any;
  @Action('removeItem', { namespace }) private removeItem: any;
  @Action('getRecords', { namespace }) private getRecords: any;
  @Action('getItem', { namespace }) private getItem: any;
  @Mutation('filterTextChange', { namespace }) private filterTextChange: any;
  @Mutation('changeCurrentPage', { namespace }) private changeCurrentPage: any;
  @Mutation('changePageSize', { namespace }) private changePageSize: any;
  @Mutation('toggleActionForm', { namespace }) private toggleActionForm: any;
  @Mutation('setMeta', { namespace }) private setMeta: any;
  private beforeUpdate() {
    if (this.loading && this.records.pageNumber !== 1) {
      this.changeCurrentPage(1);
      const { handleCurrentChange }: any = this.$refs.pagination;
      handleCurrentChange(1);
    }
  }
  private resetCurrentPage() {
    this.changeCurrentPage(1);
    const { handleCurrentChange }: any = this.$refs.pagination;
    handleCurrentChange(1);
  }
  private changePageSizeAndReset(val: number) {
    this.changePageSize(val);
    this.resetCurrentPage();
  }
  private filterChangeHandler(el: any) {
    this.resetCurrentPage();
    this.filterTextChange(el);
  }
}
</script>

<style lang="stylus" scoped>
.el-col
  align-items center
  display flex
  flex-direction column
.el-pagination
  margin 20px
.records-container
  height 100vh
</style>
