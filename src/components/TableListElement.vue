<template lang="pug">
  el-row(class="container")
    .list-item(v-for="(table, index) in list" :key="index" @click="switchTable(table.name)" :class="{active: isActive(table)}")
      .info
        v-icon(name="list-alt" class="icon")
        span {{ table.name }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class TableListElement extends Vue {
  private visible: boolean = false;
  @Prop() private list!: any[];
  @Prop() private switchTable: any;
  @Prop() private currentTable: any;
  private isActive(table: any) {
    return table.name === this.currentTable;
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  background #121820
  margin 5px 10px
  padding 5px
  align-items center
  display flex
  border-radius 5px
  transition 0.1s linear
.list-item:hover
  cursor pointer
  background rgba(#00397f, 0.5)
.list-item .info
  display flex
  align-items center
  width 90%
  height 100%
  overflow hidden
span
  margin-left 5px
  max-width 80%
.active
  background #00397f
.active:hover
  background #00397f
.container
  height 100vh
  overflow-y auto
  transition 0.5s linear
::-webkit-scrollbar
  width 5px
  background transparent  /* optional: just make scrollbar invisible */
::-webkit-scrollbar-thumb 
  background #484d54
  border-radius 2px
</style>
