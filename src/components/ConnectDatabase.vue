<template lang="pug">
  el-col(:span="24")
    el-tabs(type="border-card" @tab-click="setToDefault")
      el-tab-pane(label="Remote")
        el-form(:model="configs")
          el-form-item(label="Database Name (Optional)")
            el-input(placeholder="Database display name" v-model="submitForm.name")
              template(slot="append")
                el-color-picker(v-model="submitForm.color" size="mini")
          el-form-item(label="AWS region" required)
            el-select(v-model="configs.region" placeholder="AWS Region")
              el-option(v-for="(region, index) in regionList" :key="index" :label="region" :value="region")
          el-form-item(label="Access Key Id" required)
            el-input(v-model="configs.accessKeyId" placeholder="AWS access key id")
          el-form-item(label="Secret Access Key"  @keyup.enter.native="submitRemoteForm" required)
            el-input(v-model="configs.secretAccessKey" :type="inputType" placeholder="AWS secret access key")
              template(slot="append")
                el-button(icon="el-icon-view" @click="showSecretKey")
        ActionButtons(
          :cancelHandler="setToDefault"
          :confirmHandler="submitRemoteForm"
          :confirmText="'Connect'"
          :cancelText="'Clear'"
        )
      el-tab-pane(label="Local")
        el-form(:model="configs")
          el-form-item(label="Database Name (Optional)")
            el-input(placeholder="Database display name" v-model="submitForm.name")
              template(slot="append")
                el-color-picker(v-model="submitForm.color" size="mini")
          el-form-item(label="Localhost Port" required)
            el-input(placeholder="port" @keyup.enter.native="submitLocalForm" v-model="submitForm.port")
              template(slot="prepend") http://localhost:
        ActionButtons(
          :cancelHandler="setToDefault"
          :confirmHandler="submitLocalForm"
          :confirmText="'Connect'"
          :cancelText="'Clear'"
        )
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { DbConfigs, SubmitForm } from '../store/modules/database/types';
  import ActionButtons from './ActionButtons.vue';

  const namespace: string = 'database';

  @Component({
    components: {
      ActionButtons,
    },
  })
  export default class ConnectDatabase extends Vue {
    private inputType: string = 'password';
    @Prop(Function) private submitRemoteForm: any;
    @Prop(Function) private submitLocalForm: any;
    @Prop(Function) private setToDefault: any;
    @Prop(Object) private submitForm!: SubmitForm;
    @Prop(Array) private regionList!: string[];
    @Prop(Object) private configs!: DbConfigs;

    private mounted() {
      this.setToDefault();
    }
    private showSecretKey() {
      if (this.inputType === 'password') {
        this.inputType = 'text';
      } else {
        this.inputType = 'password';
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .el-col
    display flex
    justify-content center
    align-items center

  .el-tabs
    width 80%
    margin 0 auto
    max-width 700px

  .el-form
    width 100%
    border-radius 2px
    height 50vh
</style>
