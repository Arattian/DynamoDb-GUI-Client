<template lang="pug">
  el-col(:span="6")
    el-button(@click='addingDatabase' plain type="primary") Add Database
    DatabaseListElement(
      :list="list"
      :removeHandler="removeDbFromStorage"
      :elementHandler="getCurrentDb"
      :activeDb="currentDb"
    )
    AddDatabase
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';
import AddDatabase from './AddDatabase.vue';
import DatabaseListElement from '../components/DatabaseListElement.vue';
const namespace: string = 'database';
@Component({
  components: {
    AddDatabase,
    DatabaseListElement,
  },
})
export default class DatabaseList extends Vue {
  @Getter private currentDb: any;
  @Getter('list', { namespace }) private list: any;
  @Mutation('addingDatabase', { namespace }) private addingDatabase: any;
  @Action('getDbList', { namespace }) private getDbList: any;
  @Action('removeDbFromStorage', { namespace }) private removeDbFromStorage: any;
  @Action('getCurrentDb') private getCurrentDb: any;
  private created() {
    this.getDbList();
  }
}
</script>

<style lang="stylus" scoped>
.el-col
  margin-top -2px
  border-right 2px solid #121820
  border-top 2px solid #121820
  min-height 55px
  padding 10px
  height 100vh
.el-button
  width 100%
</style>
