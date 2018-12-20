<template lang="pug">
  el-col(:span="20")
    el-tabs(type="border-card")
      el-tab-pane(label="Remote")
        el-form(:model="configs")
          el-form-item(label="Database Name (Optional)")
            el-input(placeholder="Database display name" :value="'Database ' + (list.length + 1)" @change="setDbName")
              template(slot="append")
                el-color-picker(v-model="submitForm.color" size="mini")
          el-form-item(label="AWS region" required)
            el-select(v-model="configs.region" placeholder="AWS Region")
              el-option(v-for="(region, index) in regionList" :key="index" :label="region" :value="region")
          el-form-item(label="Access Key Id" required)
            el-input(v-model="configs.accessKeyId" placeholder="AWS access key id")
          el-form-item(label="Secret Access Key" required)
            el-input(v-model="configs.secretAccessKey" placeholder="AWS secret access key")
        .actions
          ActionButtons(
            :cancelHandler="setToDefault"
            :confirmHandler="submitRemoteForm"
            :confirmText="'Connect'"
            :cancelText="'Clear'"
          )
      el-tab-pane(label="Local")
        el-form(:model="configs")
          el-form-item(label="Database Name (Optional)")
            el-input(placeholder="Database display name" :value="'Database ' + (list.length + 1)" @change="setDbName")
              template(slot="append")
                el-color-picker(v-model="submitForm.color" size="mini")
          el-form-item(label="Localhost Port" required)
            el-input(placeholder="port" v-model="submitForm.port")
              template(slot="prepend") http://localhost:
        .actions
          ActionButtons(
            :cancelHandler="setToDefault"
            :confirmHandler="submitLocalForm"
            :confirmText="'Connect'"
            :cancelText="'Clear'"
          )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';
import ActionButtons from '../components/ActionButtons.vue';

const namespace: string = 'database';

@Component({
  components: {
    ActionButtons,
  },
})
export default class AddDatabase extends Vue {
  @Getter('configs', { namespace }) private configs: any;
  @Getter('regionList', { namespace }) private regionList: any;
  @Getter('list', { namespace }) private list: any;
  @Getter('submitForm', { namespace }) private submitForm: any;
  @Action('submitRemoteForm', { namespace }) private submitRemoteForm: any;
  @Action('submitLocalForm', { namespace }) private submitLocalForm: any;
  @Mutation('setToDefault', { namespace }) private setToDefault: any;
  @Mutation('setDbName', { namespace }) private setDbName: any;
}
</script>

<style lang="stylus" scoped>
.el-col
  display flex
  justify-content center
  align-items center
  height 100vh
.el-tabs
  width 80%
  max-width 700px
.el-form
  width 100%
  border-radius 2px
  height 40vh
.actions
  align-self flex-end
.el-button
  min-width 100px
</style>
