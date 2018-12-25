<template lang="pug">
  el-row(class="main" v-loading="loading")
    ConnectDatabase(
      v-if="!currentDb"
      :configs="configs"
      :regionList="regionList"
      :submitForm="submitForm"
      :submitRemoteForm="submitRemoteForm"
      :submitLocalForm="submitLocalForm"
      :setToDefault="setToDefault"
    )
    el-tabs(v-if="currentTable" v-model="activeTab" type="card")
      el-tab-pane(label="Records" name="records")
        TableRecords
      el-tab-pane(label="Meta" name="meta")
        TableMeta
    span(v-if="response.message")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';
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
  @Getter private currentDb: any;
  @Getter private currentTable: any;
  @Getter private response: any;
  @Getter private loading: any;
  @Mutation private notified: any;
  @Getter('configs', { namespace }) private configs: any;
  @Getter('regionList', { namespace }) private regionList: any;
  @Getter('submitForm', { namespace }) private submitForm: any;
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
.el-tabs
  width 100%
.main
  display flex
  justify-content center
  height 100vh
  width 100%
  margin auto
  margin-left -2px
</style>
