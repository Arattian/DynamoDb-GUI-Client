<template lang="pug">
  el-dialog(title="Add Database" center :visible.sync="addDatabase.visible")
    el-form(:model="addDatabase.configs")
      el-form-item(label="Database Name (Custom)" required)
        el-input(v-model="addDatabase.configs.name" placeholder="Database display name")
      el-form-item(label="AWS region" required)
        el-select(v-model="addDatabase.configs.region" placeholder="AWS Region" @change="generateEndpoint")
          el-option(v-for="(region, index) in addDatabase.regionList" :key="index" :label="region" :value="region")
      el-form-item(label="Endpoint")
        el-input(placeholder="Database Endpoint" :disabled="addDatabase.isRemote" v-model="addDatabase.configs.endpoint")
      el-form-item(label="Access Key Id" required v-if="addDatabase.isRemote")
        el-input(v-model="addDatabase.configs.accessKeyId" placeholder="AWS access key id")
      el-form-item(label="Secret Access Key" required v-if="addDatabase.isRemote")
        el-input(v-model="addDatabase.configs.secretAccessKey" placeholder="AWS secret access key")
    span(slot="footer" class="dialog-footer")
        el-button(@click="setToDefault" type="primary" plain) Cancel
        el-button(@click="submitForm" type="success" plain) Confirm
    span(v-model="addDatabase.status")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';
const namespace: string = 'database/addDatabase';

@Component
export default class AddDatabase extends Vue {
  @State((state) => state.database.addDatabase) private addDatabase: any;
  @Mutation('setToDefault', { namespace }) private setToDefault: any;
  @Action('submitForm', { namespace }) private submitForm: any;
  @Mutation('responseError', { namespace: 'database' }) private responseError: any;
  @Mutation('getDbList', { namespace: 'database' }) private getDbList: any;
  @Mutation('generateEndpoint', { namespace }) private generateEndpoint: any;
  private updated() {
    if (this.addDatabase.status === 'success') {
      this.getDbList();
      this.setToDefault();
    } else if (this.addDatabase.status !== '') {
      this.responseError(this.addDatabase.status);
      this.setToDefault();
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-button
  min-width 100px
</style>
