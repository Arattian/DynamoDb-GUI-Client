<template lang="pug">
  .container
    .actions
      el-col(:span="6")
        el-row
          i(class="el-icon-delete remove" @click="deleteTableForm" title="Delete Table")
          i(class="el-icon-circle-plus-outline add" @click="createTableForm" title="Create Table")
      el-col(:span="20")
        el-select(:value="currentTable" @change="switchTable" placeholder="Select Table" spellcheck="false" :title="currentTable")
          el-option(
            v-for="table in tables" 
            :key="table.name"
            :value="table.name"
          )
            .wrapper
              span {{table.name}}
              el-badge(type="warning" :value="table.ItemCount")
    CreateTable(
      v-if="creatingTable"
      :isVisible="creatingTable"
      :metaValue="newTableMeta"
      :metaChange="setNewTableMeta"
      :cancelHandler="createTableForm"
      :confirmHandler="createTable"
    )
    DeleteTable(
      v-if="deletingTable"
      :isVisible="deletingTable"
      :deleteTableForm="deleteTableForm"
      :deleteTable="deleteTable"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Mutation, Getter } from 'vuex-class';
import CreateTable from '../components/CreateTable.vue';
import DeleteTable from '../components/DeleteTable.vue';
const namespace: string = 'table';
@Component({
  components: {
    CreateTable,
    DeleteTable,
  },
})
export default class TableActions extends Vue {
  @Prop() private expandMeta: any;
  @Getter private currentTable: any;
  @Getter private tables: any;
  @Action private getCurrentTable: any;
  @Getter('newTableMeta', { namespace }) private newTableMeta: any;
  @Getter('creatingTable', { namespace }) private creatingTable: any;
  @Getter('deletingTable', { namespace }) private deletingTable: any;
  @Action('deleteTable', { namespace }) private deleteTable: any;
  @Action('createTable', { namespace }) private createTable: any;
  @Mutation('createTableForm', { namespace }) private createTableForm: any;
  @Mutation('deleteTableForm', { namespace }) private deleteTableForm: any;
  @Mutation('setNewTableMeta', { namespace }) private setNewTableMeta: any;

  private switchTable(tableName: string) {
    this.getCurrentTable(tableName);
    this.expandMeta();
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
