<template lang="pug">
  .container
    el-row(class="title") FAVORITES
    .list-item(
      v-for="(db, index) in databaseList"
      :key="index"
      :style="{borderLeft: 3 + 'px solid' + db.color}"
      )
      .item-content(@click='elementHandler(db.name)')
        v-icon(name="database" class="db-icon")
        span {{db.name}}
      .item-delete(@click="removeHandler(db)")
        i(class="el-icon-delete delete")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class SidebarDatabases extends Vue {
  @Prop() private databaseList!: any[];
  @Prop() private removeHandler: any;
  @Prop() private elementHandler: any;
}
</script>

<style lang="stylus" scoped>
.title
  font-size 0.9em
  padding 10px
  border-bottom 1px solid #121820
.item-content
  display flex
  justify-content space-between
  align-items center
  padding 2.5px
.list-item
  background #121820
  margin 10px
  align-items center
  display flex
  justify-content space-between
  color #eee
  min-width 130px
  border-radius 5px
.list-item:hover
  cursor pointer
  background rgba(#00397f, 0.5)
.delete
  padding 5px
.delete:hover
  color #ff6d6d
  cursor pointer
.db-icon
  margin-left 5px
.item-content span
  margin-left 5px
  margin-right 5px
  overflow hidden
  width 80%
  line-height 20px
</style>
