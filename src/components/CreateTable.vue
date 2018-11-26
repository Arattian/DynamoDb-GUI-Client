<template lang="pug">
  el-dialog(center :visible.sync="creatingTable" width="800px")  
    el-row(class="editor")
      vue-json-editor(v-model="defaultJsonContent" :showBtns="false" ref="editorInstance")
    el-row(class="actions")
      el-button(type="primary" plain @click="createTableForm") Cancel
      el-button(type="success" plain @click="createTable") Create
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';
const namespace: string = 'table';
@Component
export default class ItemAction extends Vue {
  @Getter('creatingTable', { namespace }) private creatingTable: any;
  @Getter('defaultJsonContent', { namespace }) private defaultJsonContent: any;
  @Action('createTable', { namespace }) private createTable: any;
  @Mutation('createTableForm', { namespace }) private createTableForm: any;
  private mounted() {
    setTimeout(() => {
      const { editor }: any = this.$refs.editorInstance;
      editor.expandAll();
    }, 200);
  }
}
</script>

<style lang="stylus" scoped>
.actions
  display flex
  justify-content center
.el-button
  width 100px
  margin-top 20px
.editor
  height 50vh
  overflow-y auto
</style>
