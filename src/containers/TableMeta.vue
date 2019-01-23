<template lang="pug">
  el-col(:span="24")
    el-row(class="actions")
      i(class="el-icon-circle-check-outline upload" @click="updateTable" title="Save")
      i(class="el-icon-refresh refresh" @click="getMeta" title="Refresh")
    el-row(class="editor")
      vue-json-editor(:value="table.tableMeta" @json-change="setTableMeta" :showBtns="false" ref="editorInstance")
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import { Getter, Action, Mutation, State } from 'vuex-class';
  import { TableModuleState } from '../store/modules/table/types';
  const namespace = 'table';

  @Component
  export default class TableMeta extends Vue {
    @Getter private currentTable!: string;
    @State(namespace) private table!: TableModuleState;
    @Action('getMeta', { namespace }) private getMeta: any;
    @Action('updateTable', { namespace }) private updateTable: any;
    @Mutation('setTableMeta', { namespace }) private setTableMeta: any;
    @Watch('currentTable')
    private expandAll() {
      setTimeout(() => {
        if (this.$refs.editorInstance) {
          const { editor }: any = this.$refs.editorInstance;
          editor.expandAll();
        }
      }, 100);
    }
    private mounted() {
      this.expandAll();
    }
  }
</script>

<style lang="stylus" scoped>
  .actions i
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

