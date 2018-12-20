<template lang="pug">
  .container
    el-row(class="title") FAVORITES
    .list-item(v-for="(db, index) in list" :key="index" @click='elementHandler(db.name)' :style="{borderLeft: 3 + 'px solid' + db.color}")
      .info
        v-icon(name="database")
        span {{db.name}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class FavoriteListElement extends Vue {
  private some: string = 'list';
  @Prop() private list!: any[];
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
  border-radius 5px
.list-item .info
  display flex
  align-items center
  width 90%
  overflow hidden
.list-item:hover
  cursor pointer
  background rgba(#00397f, 0.5)
.list-item .delete
  position absolute
  font-size 1.1em
  right 10px
.list-item .delete:hover
  color #ff6d6d
  cursor pointer
.list-item img
  width 20px
  margin-right 10px
span
  margin-left 5px
  width 80%
</style>
