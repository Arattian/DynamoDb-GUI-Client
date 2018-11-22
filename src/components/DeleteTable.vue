<template lang="pug">
  el-dialog(:visible.sync="table.deletingTable" width="500px")  
    el-row(class="header")
      i(class="el-icon-warning")
      p This will permanently delete table and all its items. Continue?
    el-row(class="actions")
      el-button(type="primary" plain @click="deleteTableForm") Cancel
      el-button(type="danger" plain @click="deleteTable") Delete
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';
const namespace: string = 'table';
@Component
export default class DeleteTable extends Vue {
  @State('table') private table: any;
  @Action('deleteTable', { namespace }) private deleteTable: any;
  @Mutation('deleteTableForm', { namespace }) private deleteTableForm: any;
}
</script>

<style lang="stylus" scoped>
.header
  display flex
  flex-direction column
  align-items center
.actions
  display flex
  justify-content center
.el-button
  width 100px
  margin-top 20px
.el-icon-warning
  color #fdb416
  font-size 5em
  margin-bottom 20px
</style>
