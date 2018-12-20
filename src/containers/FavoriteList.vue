<template lang="pug">
  el-col(:span="4")
    FavoriteListElement(
      :list="list"
      :removeHandler="removeDbFromStorage"
      :elementHandler="getCurrentDb"
      :activeDb="currentDb"
    )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';
import FavoriteListElement from '../components/FavoriteListElement.vue';
const namespace: string = 'database';
@Component({
  components: {
    FavoriteListElement,
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
  height 100vh
.el-button
  width 100%
  border-radius 0px
  border-left 0px
  border-right 0px
span
  margin-left 5px
</style>
