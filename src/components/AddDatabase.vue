<template lang="pug">
  el-dialog(title="Add Database" center :visible.sync="addDatabaseModule.visible")
    DatabaseForm
    span(slot="footer" class="dialog-footer")
        el-button(@click="setToDefault" type="cancel") Cancel
        el-button(@click="submitForm" type="primary") Confirm
    span(v-model="addDatabaseModule.status")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';
import DatabaseForm from './DatabaseForm.vue';
const namespace: string = 'dbModule/addDatabaseModule';
@Component({
  components: {
    DatabaseForm,
  },
})
export default class AddDatabase extends Vue {
  @State((state) => state.dbModule.addDatabaseModule) private addDatabaseModule: any;
  @Mutation('setToDefault', { namespace }) private setToDefault: any;
  @Action('submitForm', { namespace }) private submitForm: any;
  @Mutation('responseError', { namespace: 'dbModule' }) private responseError: any;
  @Mutation('getDbList', { namespace: 'dbModule' }) private getDbList: any;
  private updated() {
    if (this.addDatabaseModule.status === 'success') {
      this.getDbList();
      this.setToDefault();
    } else if (this.addDatabaseModule.status !== '') {
      this.responseError(this.addDatabaseModule.status);
      this.setToDefault();
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-button
  min-width 100px
</style>
