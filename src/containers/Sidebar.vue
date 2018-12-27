<template lang="pug">
  el-row(class="sidebar")
    SidebarDatabases(
      v-if="!currentDb"
      :databaseList="databaseList"
      :removeHandler="removeDbFromStorage"
      :elementHandler="getCurrentDb"
    )
    SidebarTables(
      v-if="currentDb"
      :currentDb="currentDb"
      :getCurrentDb="getCurrentDb"
      :databaseList="databaseList"
      :tableList="filteredTables"
      :switchTable="getCurrentTable"
      :currentTable="currentTable"
      :filterTextChange="filterTextChange"
      :filterText="filterText"
      :initialState="initialState"
      :toggleCreateModal="toggleCreateModal"
      :toggleDeleteModal="toggleDeleteModal"
    )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';
import SidebarDatabases from '../components/SidebarDatabases.vue';
import SidebarTables from '../components/SidebarTables.vue';

const namespace: string = 'database';

@Component({
  components: {
    SidebarDatabases,
    SidebarTables,
  },
})
export default class Sidebar extends Vue {
  @Getter private currentDb: any;
  @Getter private currentTable: any;
  @Getter private filteredTables: any;
  @Getter private filterText: any;
  @Action private getCurrentDb: any;
  @Action private getCurrentTable: any;
  @Mutation private filterTextChange: any;
  @Mutation private initialState: any;
  @Getter('list', { namespace }) private databaseList: any;
  @Action('removeDbFromStorage', { namespace }) private removeDbFromStorage: any;
  @Action('getDbList', { namespace }) private getDbList: any;
  @Mutation('toggleCreateModal', { namespace: 'table' }) private toggleCreateModal: any;
  @Mutation('toggleDeleteModal', { namespace: 'table' }) private toggleDeleteModal: any;
  private created() {
    this.getDbList();
  }
}
</script>

<style lang="stylus" scoped>
.sidebar
  border-right 2px solid #121820
  height 100vh
  width 15%
  min-width 150px
  max-width 250px
</style>
