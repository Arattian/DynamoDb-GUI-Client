<template lang="pug">
  el-col(:span="24")
    el-row(class="actions")
      i(class="el-icon-upload upload" @click="updateTable" title="Upload")
      i(class="el-icon-refresh refresh" @click="describeTable" title="Refresh")
    el-row(class="editor")
      vue-json-editor(v-model="tableModule.jsonContent" :showBtns="false")
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
const namespace = 'tableModule/table';

@Component
export default class JsonSchema extends Vue {
  @State((state) => state.tableModule.table) private tableModule: any;
  @Action('describeTable', { namespace }) private describeTable: any;
  @Action('updateTable', { namespace }) private updateTable: any;
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
  height 85vh
  overflow-y auto
</style>

