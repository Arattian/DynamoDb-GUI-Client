<template lang="pug">
  .container
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
.container
  position absolute
  top 0
  right 0
.actions
  z-index 1
  display flex
  justify-content center
  align-items center
  background-color #222933
</style>
