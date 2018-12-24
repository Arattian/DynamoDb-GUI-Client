<template lang="pug">
  el-dialog(center :visible="isVisible" :show-close="false" width="800px")
    el-row(class="editor")
      vue-json-editor(:value="metaValue" :showBtns="false" @json-change="metaChange" ref="editorInstance")
    ActionButtons(
      :cancelHandler="cancelHandler"
      :confirmHandler="confirmHandler"
      confirmText="Create"
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
export default class CreateTable extends Vue {
  @Prop() private isVisible!: boolean;
  @Prop() private metaValue: any;
  @Prop() private confirmHandler: any;
  @Prop() private cancelHandler: any;
  @Prop() private metaChange: any;
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
