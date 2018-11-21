<template lang="pug">
  el-col(:span="6")
    el-button(@click='visibleState' type="primary") Add Database
    el-row(v-for="(db, index) in dbModule.list" :key="index")
      .info(@click='getCurrentDb(db)')
        img(src="../assets/logo.svg")
        span {{db.name}}
      i(class="el-icon-delete delete" @click="removeDbFromStorage(db)")
    AddDatabase
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';
import { DbModuleState } from '../store/types';
import AddDatabase from './AddDatabase.vue';
import CreateTable from './CreateTable.vue';
const namespace: string = 'dbModule';
@Component({
  components: {
    AddDatabase,
    CreateTable,
  },
})
export default class DbList extends Vue {
  @State('dbModule') private dbModule!: DbModuleState;
  @Mutation('visibleState', {namespace: 'dbModule/addDatabaseModule'}) private visibleState: any;
  @Mutation('getDbList', { namespace }) private getDbList: any;
  @Action('removeDbFromStorage', { namespace }) private removeDbFromStorage: any;
  @Action('getCurrentDb', { namespace }) private getCurrentDb: any;
  @Mutation('creatingTableToggle', { namespace }) private creatingTableToggle: any;
  private created() {
    this.getDbList();
  }
  private getDbAndCreateTable(db: any) {
    this.getCurrentDb(db);
    this.creatingTableToggle();
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
.el-row
  background #121820
  margin 10px 0
  padding 10px
  align-items center
  display flex
  color #eee
  border-radius 5px
.el-row .info 
  display flex
  align-items center
  width 90%
  overflow hidden
.el-row .info:hover 
  cursor pointer
  text-decoration underline
.el-row .delete
  position absolute
  right 10px
.el-row .delete:hover
  color #ff6d6d
  cursor pointer
.el-row img
  width 20px
  margin-right 10px
</style>
