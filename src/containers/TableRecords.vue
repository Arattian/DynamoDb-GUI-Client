<template lang="pug">
  el-col(:span="24")
    RecordListFilter(
      :filterText="filterText"
      :filterTextChange="filterTextChange"
      :header="header"
      :hasAttribute="hasAttribute"
    )
    RecordList(
      :list="tableDataPage"
      :keys="keys"
      :editItem="editHandler"
      :header="header"
      :hideHashKey="hideHashKey"
      :removeHandler="removeHandler"
      size="mini"
    )
    RecordFooter(
      :generateMeta="generateMeta"
      :getRecords="getRecords"
      :currentTable="currentTable"
      :itemCount="itemCount"
      :getLimitedRows="getLimitedRows"
      :limit="limit"
    )
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';
import { Getter, Action, Mutation, State } from 'vuex-class';
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
  @Getter('itemCount', { namespace: 'table' }) private itemCount: any;
  @Getter('header', { namespace }) private header: any;
  @Getter('keys', { namespace }) private keys!: {hashKey: string; rangeKey: string};
  @Getter('filterText', { namespace }) private filterText: any;
  @Getter('hasAttribute', { namespace }) private hasAttribute: any;
  @Getter('tableDataPage', { namespace }) private tableDataPage: any;
  @Getter('limit', { namespace }) private limit: any;
  @Getter('hideHashKey', { namespace }) private hideHashKey: any;
  @Action('generateMeta', { namespace }) private generateMeta: any;
  @Action('getRecords', { namespace }) private getRecords: any;
  @Action('getItem', { namespace }) private getItem: any;
  @Action('getLimitedRows', { namespace }) private getLimitedRows: any;
  @Mutation('filterTextChange', { namespace }) private filterTextChange: any;
  @Mutation('toggleDeleteModal', { namespace }) private toggleDeleteModal: any;
  @Mutation('toggleCreateModal', { namespace }) private toggleCreateModal: any;

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
