<template lang="pug">
  el-col(:span="24" class="main" v-if="currentTable || !currentDb" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)")
    ConnectDatabase(
      v-if="!currentDb"
      :configs="database.submitForm.configs"
      :regionList="database.regionList"
      :submitForm="database.submitForm"
      :submitRemoteForm="submitRemoteForm"
      :submitLocalForm="submitLocalForm"
      :setToDefault="setToDefault"
    )
    el-col(:span="24" v-if="currentTable")
      el-tabs(v-if="currentTable" v-model="activeTab" type="card")
        el-tab-pane(label="Records" name="records")
          TableRecords
        el-tab-pane(label="Meta" name="meta")
          TableMeta
    span(v-if="response.message")
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { Getter, Action, Mutation, State } from 'vuex-class';
  import { RootState } from '../store/types';
  import ConnectDatabase from '../components/ConnectDatabase.vue';
  import TableRecords from './TableRecords.vue';
  import TableMeta from './TableMeta.vue';
  const namespace: string = 'database';

  @Component({
    components: {
      ConnectDatabase,
      TableRecords,
      TableMeta,
    },
  })
  export default class Main extends Vue {
    public $notify: any = this.$notify;
    private activeTab: string = 'records';
    @Getter private currentDb!: string;
    @Getter private currentTable!: string;
    @Getter private response!: { message: string; title: string; type: string };
    @Getter private loading!: boolean;
    @Mutation private notified: any;
    @State(namespace) private database!: RootState;
    @Action('submitRemoteForm', { namespace }) private submitRemoteForm: any;
    @Action('submitLocalForm', { namespace }) private submitLocalForm: any;
    @Mutation('setToDefault', { namespace }) private setToDefault: any;
    private updated() {
      if (this.response.message) {
        this.$notify({
          title: this.response.title,
          message: this.response.message,
          type: this.response.type,
          duration: 3000,
        });
        this.notified();
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .main
    display flex
    justify-content center
    height 100vh
    margin auto
    margin-left -2px

  .something
    background red
</style>
