<template lang="pug">
  el-row(class="actions")
    el-button(:type="cancelType" plain @click="cancelHandler") {{cancelText}}
    el-button(:type="confirmType" plain @click="confirmHandler") {{confirmText}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class ActionButtons extends Vue {
  @Prop(Function) private cancelHandler: any;
  @Prop(Function) private confirmHandler: any;
  @Prop({ default: 'Cancel' }) private cancelText!: string;
  @Prop({ default: 'primary' }) private cancelType!: string;
  @Prop({ default: 'Confirm' }) private confirmText!: string;
  @Prop({ default: 'success' }) private confirmType!: string;
}
</script>

<style lang="stylus" scoped>
.actions
  display flex
  justify-content center

.el-button
  width 100px
  margin-top 20px
</style>
