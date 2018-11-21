<template lang="pug">
  el-form(:model="addDatabaseModule.configs")
    el-form-item(label="Database Name (Custom)" required)
      el-input(v-model="addDatabaseModule.configs.name" placeholder="Database display name")
    el-form-item(label="AWS region" required)
      el-select(v-model="addDatabaseModule.configs.region" placeholder="AWS Region" @change="generateEndpoint")
        el-option(v-for="(region, index) in addDatabaseModule.regionList" :key="index" :label="region" :value="region")
    el-form-item(label="Endpoint")
      el-input(placeholder="Database Endpoint" :disabled="addDatabaseModule.isRemote" v-model="addDatabaseModule.configs.endpoint")
    el-form-item(label="Access Key Id" required v-if="addDatabaseModule.isRemote")
      el-input(v-model="addDatabaseModule.configs.accessKeyId" placeholder="AWS access key id")
    el-form-item(label="Secret Access Key" required v-if="addDatabaseModule.isRemote")
      el-input(v-model="addDatabaseModule.configs.secretAccessKey" placeholder="AWS secret access key")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

const namespace = 'dbModule/addDatabaseModule';
@Component
export default class DatabaseForm extends Vue {
@State((state) => state.dbModule.addDatabaseModule) private addDatabaseModule: any;
@Mutation('generateEndpoint', { namespace }) private generateEndpoint: any;
}
</script>

<style lang="stylus" scoped>
</style>
