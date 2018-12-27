<template lang="pug">
  el-col
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
          el-form-item(label="Secret Access Key" required)
            el-input(v-model="configs.secretAccessKey" placeholder="AWS secret access key")
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
            el-input(placeholder="port" v-model="submitForm.port")
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
import ActionButtons from './ActionButtons.vue';

const namespace: string = 'database';

@Component({
  components: {
    ActionButtons,
  },
})
export default class ConnectDatabase extends Vue {
  @Prop() private configs: any;
  @Prop() private regionList: any;
  @Prop() private submitForm: any;
  @Prop() private submitRemoteForm: any;
  @Prop() private submitLocalForm: any;
  @Prop() private setToDefault: any;

  private mounted() {
    this.setToDefault();
  }
}
</script>

<style lang="stylus" scoped>
.el-col
  height 100vh
  display flex
  justify-content center
  align-items center
.el-tabs
  width 80%
  max-width 700px
.el-form
  width 100%
  border-radius 2px
  height 50vh
</style>
