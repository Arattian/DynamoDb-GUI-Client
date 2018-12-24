<template lang="pug">
  el-row(class="container")
    el-row
      el-col(:span="6")
        i(class="el-icon-circle-plus-outline add" @click="generateMeta" title="Add Record")
        i(class="el-icon-refresh refresh" @click="getRecords" title="Refresh Table")
      el-col(:span="6" :offset="8" class="itemCount") {{itemCount}} rows in {{currentTable}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';

const namespace = 'records';

@Component
export default class Footer extends Vue {
  @Prop() private generateMeta: any;
  @Prop() private getRecords: any;
  @Getter private currentTable: any;
  @Getter('itemCount', { namespace: 'table' }) private itemCount: any;
}
</script>

<style lang="stylus" scoped>
.container
  border-top 1px solid #121820
  border-left 2px solid #121820
  position fixed
  height 35px
  width 100%
  bottom 0px
  background #121820
  z-index 1000
.el-col
  display flex
  align-items center
  height 35px
.el-col i
  cursor pointer
  padding 10px 15px
  font-size 1.2em
.add
  color #00d986
.refresh
  color #409EFF
.add:hover
  color #55ffbe
.refresh:hover
  color #52ceff
.itemCount
  justify-content flex-end
</style>
