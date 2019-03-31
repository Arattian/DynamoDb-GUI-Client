<template lang="pug">
  el-dialog(:visible="true" :show-close="false" width="800px")
    el-form(:model="submitForm.configs")
      el-form-item(label="Database Name (Optional)")
        el-input(placeholder="Database display name" v-model="submitForm.name")
          template(slot="append")
            el-color-picker(v-model="submitForm.color" size="mini")
      .remote(v-if="submitForm.configs.region !== 'localhost'")
        el-form-item(label="AWS region" required)
          el-select(v-model="submitForm.configs.region" placeholder="AWS Region")
            el-option(v-for="(region, index) in regionList" :key="index" :label="region" :value="region")
        el-form-item(label="Access Key Id" required)
          el-input(v-model="submitForm.configs.accessKeyId" placeholder="AWS access key id")
        el-form-item(label="Secret Access Key"  @keyup.enter.native="submitRemoteForm" required)
          el-input(v-model="submitForm.configs.secretAccessKey" :type="inputType" placeholder="AWS secret access key")
            template(slot="append")
              el-button(icon="el-icon-view" @click="showSecretKey")
      .local(v-if="submitForm.configs.region === 'localhost'")
        el-form-item(label="Local Database Endpoint" required)
          el-input(placeholder="Enter Endpoint" @keyup.enter.native="submitLocalForm" v-model="submitForm.configs.endpoint")
    ActionButtons(
      :cancelHandler="cancelHandler"
      :confirmHandler="submitForm.configs.region === 'localhost' ? submitLocalForm : submitRemoteForm"
      confirmType="success"
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
export default class EditDatabaseModal extends Vue {
  private inputType: string = 'password';
  @Prop(String) private currentDb!: string;
  @Prop(Function) private cancelHandler!: any;
  @Prop(Function) private submitRemoteForm!: any;
  @Prop(Function) private submitLocalForm!: any;
  @Prop(Function) private fillEditForm!: any;
  @Prop(Array) private regionList!: string[];
  @Prop(Object) private submitForm!: any;
  private created() {
    this.fillEditForm(this.currentDb);
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
.header
  display flex
  flex-direction column
  align-items center

.el-icon-warning
  color #fdb416
  font-size 5em
  margin-bottom 20px
</style>
