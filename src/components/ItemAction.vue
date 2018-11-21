<template lang="pug">
  el-dialog(center :visible.sync="records.visible" width="800px")  
    el-row(class="actions")
      el-popover(    
        placement="left-end"
        title="Hint"
        width="500"
        trigger="hover"
        content="Confirmation creates a new item, or replaces an old item with a new item by delegating to AWS.DynamoDB.putItem()")
        i(class="el-icon-question hint" slot="reference")
      i(@click="putItem" class="el-icon-upload save")
    el-row(class="editor")
      vue-json-editor(v-model="records.jsonContent" :showBtns="false")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';
const namespace: string = 'tableModule/records';
@Component
export default class ItemAction extends Vue {
  @State((state) => state.tableModule.records) private records: any;
  @Action('putItem', { namespace }) private putItem: any;
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
  overflow-y auto
</style>
