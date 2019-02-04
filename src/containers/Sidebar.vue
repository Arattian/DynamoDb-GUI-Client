<template lang="pug">
  el-row(class="sidebar")
    SidebarDatabases(
      v-if="!currentDb"
      :databaseList="database.list"
      :removeHandler="removeDbFromStorage"
      :elementHandler="getCurrentDb"
    )
    SidebarTables(
      v-if="currentDb"
      :currentDb="currentDb"
      :getCurrentDb="getCurrentDb"
      :getDbTables="getDbTables"
      :databaseList="database.list"
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
  import { Getter, Action, Mutation, State } from 'vuex-class';
  import { RootState } from '../store/types';
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
    @Getter private currentDb!: string;
    @Getter private currentTable!: string;
    @Getter private filteredTables!: string[];
    @Getter private filterText!: string;
    @Action private getCurrentDb: any;
    @Action private getDbTables: any;
    @Action private getCurrentTable: any;
    @Mutation private filterTextChange: any;
    @Mutation private initialState: any;
    @State(namespace) private database!: RootState;
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
    height 100%
    width 100%
    min-width 150px
</style>
