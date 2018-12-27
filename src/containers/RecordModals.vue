<template lang="pug">
  el-row
    CreateModal(
      v-if="showCreateModal"
      :isVisible="showCreateModal"
      :metaValue="recordMeta"
      :metaChange="setMeta"
      :confirmHandler="putItem"
      :cancelHandler="toggleCreateModal"
      hintText="Confirmation creates a new item, or replaces an old item with a new item by delegating to AWS.DynamoDB.putItem()"
    )
    DeleteModal(
      v-if="showDeleteModal"
      :isVisible="showDeleteModal"
      :cancelHandler="toggleDeleteModal"
      :confirmHandler="removeItem"
      alertText="Are you sure to delete this?"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Mutation, Getter, State } from 'vuex-class';
import CreateModal from '../components/CreateModal.vue';
import DeleteModal from '../components/DeleteModal.vue';
const namespace: string = 'records';
@Component({
  components: {
    CreateModal,
    DeleteModal,
  },
})
export default class RecordModals extends Vue {
  @Getter('showCreateModal', { namespace }) private showCreateModal: any;
  @Getter('showDeleteModal', { namespace }) private showDeleteModal: any;
  @Getter('recordMeta', { namespace }) private recordMeta: any;
  @Action('putItem', { namespace }) private putItem: any;
  @Action('removeItem', { namespace }) private removeItem: any;
  @Mutation('setMeta', { namespace }) private setMeta: any;
  @Mutation('toggleCreateModal', { namespace }) private toggleCreateModal: any;
  @Mutation('toggleDeleteModal', { namespace }) private toggleDeleteModal: any;
}
</script>

<style lang="stylus" scoped>
</style>
