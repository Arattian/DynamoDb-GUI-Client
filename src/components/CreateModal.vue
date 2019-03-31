<template lang="pug">
  el-dialog(center :visible="isVisible" :show-close="false" width="800px")
    el-row(class="hint-container")
      el-select(v-model="editor")
        el-option(value="Tree") Tree
        el-option(value="Code") Code
      el-popover(
        placement="left-end"
        title="Hint"
        width="500"
        trigger="hover"
        :content="hintText")
        i(class="el-icon-question hint" slot="reference")
    el-row(class="tree-editor" v-show="editor === 'Tree'")
      vue-json-editor(:value="metaValue" @json-change="metaChange" :showBtns="false" ref="editorInstance")
    el-row(class="code-editor" v-show="editor === 'Code'")
      vue-json-editor(:value="metaValue" @json-change="metaChange" :showBtns="false" :mode="'code'")
    ActionButtons(
      :cancelHandler="cancelHandler"
      :confirmHandler="confirmHandler"
      confirmText="Save"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ActionButtons from './ActionButtons.vue';

@Component({
  components: {
    ActionButtons,
  },
})
export default class CreateModal extends Vue {
  private editor: string = 'Tree';
  @Prop(Function) private confirmHandler: any;
  @Prop(Function) private cancelHandler: any;
  @Prop(Function) private metaChange: any;
  @Prop(Object) private metaValue: any;
  @Prop(Boolean) private isVisible!: boolean;
  @Prop(String) private hintText!: string;
  private mounted() {
    setTimeout(() => {
      if (this.editor === 'tree') {
        const { editor }: any = this.$refs.editorInstance;
        editor.expandAll();
      }
    }, 200);
  }
}
</script>

<style lang="stylus" scoped>
.hint-container
  display flex
  justify-content flex-end
  align-items center

.hint
  color #fdb416
  font-size 1.7em
  cursor pointer

.hint:hover
  color #ffd272

.el-select
  margin-right 10px
  width 116px

.editor
  height 50vh
  overflow-y auto
</style>
