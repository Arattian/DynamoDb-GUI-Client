<template lang="pug">
  .container
    CreateTableModal(
      v-if="creatingTable"
      :isVisible="creatingTable"
      :metaValue="newTableMeta"
      :metaChange="setNewTableMeta"
      :cancelHandler="createTableForm"
      :confirmHandler="createTable"
    )
    DeleteTableModal(
      v-if="deletingTable"
      :isVisible="deletingTable"
      :cancelHandler="deleteTableForm"
      :confirmHandler="deleteTable"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Mutation, Getter } from 'vuex-class';
import CreateTableModal from '../components/CreateTableModal.vue';
import DeleteTableModal from '../components/DeleteTableModal.vue';
const namespace: string = 'table';
@Component({
  components: {
    CreateTableModal,
    DeleteTableModal,
  },
})
export default class TableModals extends Vue {
  @Getter private currentTable: any;
  @Getter private tables: any;
  @Getter('newTableMeta', { namespace }) private newTableMeta: any;
  @Getter('creatingTable', { namespace }) private creatingTable: any;
  @Getter('deletingTable', { namespace }) private deletingTable: any;
  @Action('deleteTable', { namespace }) private deleteTable: any;
  @Action('createTable', { namespace }) private createTable: any;
  @Mutation('createTableForm', { namespace }) private createTableForm: any;
  @Mutation('deleteTableForm', { namespace }) private deleteTableForm: any;
  @Mutation('setNewTableMeta', { namespace }) private setNewTableMeta: any;
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
