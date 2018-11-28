<template lang="pug">
  el-dialog(title="Add Database" center :show-close="false" :visible="formVisible")
    el-form(:model="configs")
      el-form-item(label="Database Name (Custom)" required)
        el-input(v-model="configs.name" placeholder="Database display name")
      el-form-item(label="AWS region" required)
        el-select(v-model="configs.region" placeholder="AWS Region" @change="generateEndpoint")
          el-option(v-for="(region, index) in regionList" :key="index" :label="region" :value="region")
      el-form-item(label="Endpoint")
        el-input(placeholder="Database Endpoint" :disabled="isRemote" v-model="configs.endpoint")
      el-form-item(label="Access Key Id" required v-if="isRemote")
        el-input(v-model="configs.accessKeyId" placeholder="AWS access key id")
      el-form-item(label="Secret Access Key" required v-if="isRemote")
        el-input(v-model="configs.secretAccessKey" placeholder="AWS secret access key")
    ActionButtons(
      :cancelHandler="setToDefault"
      :confirmHandler="submitForm"
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
  @Getter('formVisible', { namespace }) private formVisible: any;
  @Getter('configs', { namespace }) private configs: any;
  @Getter('regionList', { namespace }) private regionList: any;
  @Getter('isRemote', { namespace }) private isRemote: any;
  @Action('submitForm', { namespace }) private submitForm: any;
  @Mutation('setToDefault', { namespace }) private setToDefault: any;
  @Mutation('generateEndpoint', { namespace }) private generateEndpoint: any;
}
</script>

<style lang="stylus" scoped>
.el-button
  min-width 100px
</style>
