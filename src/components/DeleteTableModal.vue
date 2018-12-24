<template lang="pug">
  el-dialog(:visible="isVisible" :show-close="false" width="500px")
    el-row(class="header")
      i(class="el-icon-warning")
      p This will permanently delete table and all its items. Continue?
    ActionButtons(
      :cancelHandler="cancelHandler"
      :confirmHandler="confirmHandler"
      confirmType="danger"
      confirmText="Delete"
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
export default class DeleteTable extends Vue {
  @Prop() private isVisible!: boolean;
  @Prop() private confirmHandler: any;
  @Prop() private cancelHandler: any;
}
</script>

<style lang="stylus" scoped>
.header
  display flex
  flex-direction column
  align-items center
.actions
  display flex
  justify-content center
.el-button
  width 100px
  margin-top 20px
.el-icon-warning
  color #fdb416
  font-size 5em
  margin-bottom 20px
</style>
