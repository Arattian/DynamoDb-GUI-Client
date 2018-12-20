<template lang="pug">
  el-row(class="header")
    el-row(class="title") Change Database
    el-select(:value="currentDb" @change="getCurrentDb" placeholder="Select Database" spellcheck="false" :title="currentDb")
      el-option(
        v-for="db in list"
        :key="db.name"
        :value="db.name"
      )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

const namespace = 'database';
@Component
export default class ChangeDatabase extends Vue {
  @Getter private currentDb: any;
  @Action('getCurrentDb') private getCurrentDb: any;
  @Getter('list', {namespace}) private list: any;
}
</script>

<style lang="stylus" scoped>
.title
  font-size 0.9em
  padding 10px
  text-align left
.header
  color #eee
  height 75px
  padding 10px
  margin-bottom 20px
.el-select
  width 100%
</style>
