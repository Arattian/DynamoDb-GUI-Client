<template lang="pug">
  el-col(:span="24")
    RecordListFilter(
      :header="records.header"
      :getKeys="getKeys"
      :filterRecords="filterRecords"
      :setFilterValueType="setFilterValueType"
      :setNotEqualExpr="setNotEqualExpr"
      :filtered="records.filtered"
      :refreshTable="refreshTable"
      :filterParams="records.filterParams"
      :setSortBy="setSortBy"
      :setSortOrder="setSortOrder"
      :sortBy="records.sortBy"
      :sortOrder="records.sortOrder"
    )
    RecordList(
      :list="tableDataPage"
      :keys="keys"
      :editItem="editHandler"
      :header="records.header"
      :hideHashKey="hideHashKey"
      :removeHandler="removeHandler"
      size="mini"
    )
    RecordFooter(
      :generateMeta="generateMeta"
      :refreshTable="refreshTable"
      :currentTable="currentTable"
      :itemCount="itemCount"
      :getLimitedRows="getLimitedRows"
      :limit="records.limit"
      :getPreviousRecords="getPreviousRecords"
      :getNextRecords="getNextRecords"
      :evaluatedKeys="records.evaluatedKeys"
      :lastEvaluatedKeyIndex="records.lastEvaluatedKeyIndex"
      :filtered="records.filtered"
      :list="tableDataPage"
    )
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';
import { Getter, Action, Mutation, State } from 'vuex-class';
import { RecordModuleState } from '../store/modules/records/types';
import RecordList from '../components/RecordList.vue';
import RecordListFilter from '../components/RecordListFilter.vue';
import RecordFooter from '../components/RecordFooter.vue';

const namespace: string = 'records';

@Component({
  components: {
    RecordList,
    RecordListFilter,
    RecordFooter,
  },
})
export default class TableRecords extends Vue {
  @Getter private currentTable: any;
  @State(namespace) private records!: RecordModuleState;
  @Getter('itemCount', { namespace }) private itemCount!: number;
  @Getter('keys', { namespace }) private keys!: {hashKey: string; rangeKey: string};
  @Getter('getKeys', { namespace }) private getKeys!: Array<{value: string}>;
  @Getter('tableDataPage', { namespace }) private tableDataPage!: any[];
  @Getter('hideHashKey', { namespace }) private hideHashKey!: boolean;
  @Action('generateMeta', { namespace }) private generateMeta: any;
  @Action('filterRecords', { namespace }) private filterRecords: any;
  @Action('getItem', { namespace }) private getItem: any;
  @Action('getLimitedRows', { namespace }) private getLimitedRows: any;
  @Action('getPreviousRecords', { namespace }) private getPreviousRecords: any;
  @Action('getNextRecords', { namespace }) private getNextRecords: any;
  @Action('refreshTable', { namespace }) private refreshTable: any;
  @Mutation('setSortBy', { namespace }) private setSortBy: any;
  @Mutation('setSortOrder', { namespace }) private setSortOrder: any;
  @Mutation('toggleDeleteModal', { namespace }) private toggleDeleteModal: any;
  @Mutation('toggleCreateModal', { namespace }) private toggleCreateModal: any;
  @Mutation('setFilterValueType', { namespace }) private setFilterValueType: any;
  @Mutation('setNotEqualExpr', { namespace }) private setNotEqualExpr: any;

  private removeHandler(row: any) {
    this.getItem(row);
    this.toggleDeleteModal();
  }
  private editHandler(row: any) {
    this.getItem(row);
    this.toggleCreateModal();
  }
}
</script>

<style lang="stylus" scoped>
</style>
