<template lang="pug">
  el-col(:span="24")
    el-row(class="actions")
      i(class="el-icon-circle-check-outline upload" @click="updateTable" title="Save")
      i(class="el-icon-refresh refresh" @click="getMeta" title="Refresh")
    el-row(class="editor")
      vue-json-editor(:value="jsonContent" @json-change="setTableJson" :showBtns="false" ref="editorInstance")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';
const namespace = 'table';

@Component
export default class JsonSchema extends Vue {
  @Getter('jsonContent', { namespace }) private jsonContent: any;
  @Action('getMeta', { namespace }) private getMeta: any;
  @Action('updateTable', { namespace }) private updateTable: any;
  @Mutation('setTableJson', { namespace }) private setTableJson: any;
  private expandAll() {
    const { editor }: any = this.$refs.editorInstance;
    editor.expandAll();
  }
}
</script>

<style lang="stylus" scoped>
i
  font-size 1.5em
  padding 10px
  cursor pointer
.actions
  display flex
  justify-content flex-end
.upload
  color #00d986
.refresh
  color #409EFF
.upload:hover
  color #55ffbe
.refresh:hover
  color #52ceff
.editor
  height 80vh
  overflow-y auto
</style>

