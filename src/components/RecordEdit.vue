<template lang="pug">
  el-dialog(center :visible="isVisible" :show-close="false" width="800px")
    el-row(class="hint-container")
      el-popover(
        placement="left-end"
        title="Hint"
        width="500"
        trigger="hover"
        content="Confirmation creates a new item, or replaces an old item with a new item by delegating to AWS.DynamoDB.putItem()")
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
export default class RecordEdit extends Vue {
  @Prop() private confirmHandler: any;
  @Prop() private cancelHandler: any;
  @Prop() private metaValue: any;
  @Prop() private metaChange: any;
  @Prop() private isVisible!: boolean;
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
