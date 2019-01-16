<template lang="pug">
  .container
    CreateModal(
      v-if="table.showCreateModal"
      :isVisible="table.showCreateModal"
      :metaValue="table.newTableMeta"
      :metaChange="setNewTableMeta"
      :cancelHandler="toggleCreateModal"
      :confirmHandler="createTable"
      hintText="The CreateTable operation adds a new table to your account. In an AWS account, table names must be unique within each region."
    )
    DeleteModal(
      v-if="table.showDeleteModal"
      :isVisible="table.showDeleteModal"
      :cancelHandler="toggleDeleteModal"
      :confirmHandler="deleteTable"
      alertText="This will permanently delete table and all its items. Continue?"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Mutation, Getter, State } from 'vuex-class';
import { TableModuleState } from '../store/modules/table/types';
import CreateModal from '../components/CreateModal.vue';
import DeleteModal from '../components/DeleteModal.vue';
const namespace: string = 'table';
@Component({
  components: {
    CreateModal,
    DeleteModal,
  },
})
export default class TableModals extends Vue {
  @State(namespace) private table!: TableModuleState;
  @Action('deleteTable', { namespace }) private deleteTable: any;
  @Action('createTable', { namespace }) private createTable: any;
  @Mutation('toggleCreateModal', { namespace }) private toggleCreateModal: any;
  @Mutation('toggleDeleteModal', { namespace }) private toggleDeleteModal: any;
  @Mutation('setNewTableMeta', { namespace }) private setNewTableMeta: any;
}
</script>

<style lang="stylus" scoped>
</style>
