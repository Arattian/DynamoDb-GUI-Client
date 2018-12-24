<template lang="pug">
  .container
    el-row(class="title") FAVORITES
    .list-item(
      v-for="(db, index) in databaseList"
      :key="index"
      :style="{borderLeft: 3 + 'px solid' + db.color}"
      )
      v-icon(name="database")
      span(@click='elementHandler(db.name)') {{db.name}}
      i(class="el-icon-delete delete" @click="removeHandler(db)")
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
.list-item
  background #121820
  margin 10px
  padding 5px
  align-items center
  display flex
  color #eee
  min-width 130px
  border-radius 5px
.list-item:hover
  cursor pointer
  background rgba(#00397f, 0.5)
.delete:hover
  color #ff6d6d
  cursor pointer
.list-item img
  width 20px
  margin-right 10px
span
  margin-left 5px
  margin-right 5px
  overflow hidden
  width 80%
</style>
