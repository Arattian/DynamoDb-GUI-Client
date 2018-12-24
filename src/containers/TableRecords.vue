<template lang="pug">
  el-row
    RecordListFilter(
      :filterText="records.filterText"
      :filterTextChange="filterTextChange"
      :header="header"
      :hasAttribute="hasAttribute"
    )
    RecordList(
      :list="tableDataPage"
      :keys="keys"
      :getItem="getItem"
      :header="header"
      :hideHashKey="hideHashKey"
      :removeHandler="removeItem"
      size="mini"
    )
    RecordEditModal(
      v-if="records.visible"
      :isVisible="records.visible"
      :metaValue="records.recordMeta"
      :metaChange="setMeta"
      :confirmHandler="putItem"
      :cancelHandler="toggleActionForm"
    )
    RecordFooter(
      :generateMeta="generateMeta"
      :getRecords="getRecords"
    )
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';
import { Getter, Action, Mutation, State } from 'vuex-class';
import RecordEditModal from '../components/RecordEditModal.vue';
import RecordList from '../components/RecordList.vue';
import RecordListFilter from '../components/RecordListFilter.vue';
import RecordFooter from '../components/RecordFooter.vue';

const namespace: string = 'records';

@Component({
  components: {
    RecordEditModal,
    RecordList,
    RecordListFilter,
    RecordFooter,
  },
})
export default class TableRecords extends Vue {
  @State private records: any;
  @Getter private loading: any;
  @Getter('header', { namespace }) private header: any;
  @Getter('keys', { namespace }) private keys!: {hashKey: string; rangeKey: string};
  @Getter('filterText', { namespace }) private filterText: any;
  @Getter('hasAttribute', { namespace }) private hasAttribute: any;
  @Getter('tableDataPage', { namespace }) private tableDataPage: any;
  @Getter('total', { namespace }) private total: any;
  @Getter('hideHashKey', { namespace }) private hideHashKey: any;
  @Getter('handleCurrentChange', { namespace }) private handleCurrentChange: any;
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
}
</script>

<style lang="stylus" scoped>
.el-col
  align-items center
  display flex
  justify-content center
  flex-direction column
.el-pagination
  margin 20px
</style>
