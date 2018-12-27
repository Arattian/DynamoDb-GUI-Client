<template lang="pug">
  el-dialog(:visible="isVisible" :show-close="false" width="500px")
    el-row(class="header")
      i(class="el-icon-warning")
      p {{ alertText }}
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
export default class DeleteModal extends Vue {
  @Prop() private isVisible!: boolean;
  @Prop() private confirmHandler: any;
  @Prop() private cancelHandler: any;
  @Prop() private alertText: any;
}
</script>

<style lang="stylus" scoped>
.header
  display flex
  flex-direction column
  align-items center
.el-icon-warning
  color #fdb416
  font-size 5em
  margin-bottom 20px
</style>
