<template lang="pug">
  el-col(:span="18" v-loading="loading")
    el-row
      el-col(:span="24")
        el-tabs(v-model="activeTab" type="card" @tab-click="handleClick")
          el-tab-pane(label="Records" name="records")
            TableRecords
          el-tab-pane(label="Meta" name="meta")
            TableMeta(ref="meta")
      TableActions(
          :expandMeta="expandMeta"
      )
    span(v-if="response.message")
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';
import TableMeta from './TableMeta.vue';
import TableRecords from './TableRecords.vue';
import TableActions from './TableActions.vue';
const namespace: string = 'table';
@Component({
  components: {
    TableRecords,
    TableMeta,
    TableActions,
  },
})
export default class DatabaseMain extends Vue {
  public $notify: any = this.$notify;
  private activeTab: string = 'records';
  @Getter private response: any;
  @Getter private loading: any;
  @Mutation private notifyed: any;

  private updated() {
    if (this.response.message) {
      this.$notify({
        title: this.response.title,
        message: this.response.message,
        type: this.response.type,
        duration: 3000,
      });
      this.notifyed();
    }
  }
  private expandMeta() {
    setTimeout(() => {
      const { meta }: any = this.$refs;
      if (meta) {
        meta.expandAll();
      }
    }, 1000);
  }
  private handleClick(ev: any) {
    if (this.activeTab === 'meta') {
      this.expandMeta();
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-col
  padding 10px 10px
  color #ccc
</style>
