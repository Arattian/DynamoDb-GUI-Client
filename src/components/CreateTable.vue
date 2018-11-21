<template lang="pug">
  el-dialog(center :visible.sync="tableModule.creatingTable" width="800px")  
    el-row(class="actions")
      el-popover(    
        placement="left-end"
        title="Hint"
        width="500"
        trigger="hover"
        content="Confirmation adds a new table to your account. In an AWS account, table names must be unique within each region. That is, you can have two tables with same name if you create the tables in different regions")
        i(class="el-icon-question hint" slot="reference")
      i(@click="createTable" class="el-icon-upload save")
    el-row(class="editor")
      vue-json-editor(v-model="table.defaultJsonContent" :showBtns="false")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';
const namespace: string = 'tableModule/table';
@Component
export default class ItemAction extends Vue {
  @State('tableModule') private tableModule: any;
  @State((state) => state.tableModule.table) private table: any;
  @Action('createTable', { namespace }) private createTable: any;
}
</script>

<style lang="stylus" scoped>
.actions
  display flex
  justify-content flex-end
.save
  color #00d986
  font-size 1.7em
  cursor pointer
.save:hover
  color #55ffbe
.hint
  color #f0ce85
  font-size 1.7em
  margin-right 10px
  cursor pointer
.hint:hover
  color #ffe5ac
.editor
  height 50vh
  margin-top 10px
</style>
