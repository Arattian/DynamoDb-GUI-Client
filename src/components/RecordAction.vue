<template lang="pug">
  el-dialog(center :visible.sync="records.visible" width="800px")  
    el-row(class="hint-container")
      el-popover(    
        placement="left-end"
        title="Hint"
        width="500"
        trigger="hover"
        content="Confirmation creates a new item, or replaces an old item with a new item by delegating to AWS.DynamoDB.putItem()")
        i(class="el-icon-question hint" slot="reference")
    el-row(class="editor")
      vue-json-editor(v-model="records.jsonContent" :showBtns="false" ref="editorInstance")
    el-row(class="actions")
      el-button(type="primary" plain @click="toggleActionForm") Cancel
      el-button(type="success" plain @click="putItem") Save
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';
const namespace: string = 'records';
@Component
export default class RecordAction extends Vue {
  @State('records') private records: any;
  @Action('putItem', { namespace }) private putItem: any;
  @Mutation('toggleActionForm', { namespace }) private toggleActionForm: any;
  private mounted() {
    setTimeout(() => {
      const { editor }: any = this.$refs.editorInstance;
      editor.expandAll();
    }, 200);
  }
}
</script>

<style lang="stylus" scoped>
.hint-container
  display flex
  justify-content flex-end
.actions
  display flex
  justify-content center
.el-button
  width 100px
  margin-top 20px
.hint
  color #fdb416
  font-size 1.7em
  cursor pointer
.hint:hover
  color #ffd272
.editor
  height 50vh
  overflow-y auto
</style>
