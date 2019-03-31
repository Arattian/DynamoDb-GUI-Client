<template lang="pug">
  el-dialog(center :visible="isVisible" :show-close="false" width="800px")
    el-row(class="hint-container")
      el-popover(
        placement="left-end"
        title="Hint"
        width="500"
        trigger="hover"
        :content="hintText")
        i(class="el-icon-question hint" slot="reference")
    el-row(class="editor")
      vue-json-editor(:value="metaValue" @json-change="metaChange" :showBtns="false" ref="editorInstance")
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
  @Prop(Function) private confirmHandler: any;
  @Prop(Function) private cancelHandler: any;
  @Prop(Function) private metaChange: any;
  @Prop(Object) private metaValue: any;
  @Prop(Boolean) private isVisible!: boolean;
  @Prop(String) private hintText!: string;
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
