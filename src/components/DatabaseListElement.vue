<template lang="pug">
  .container
    el-row(v-for="(db, index) in list" :key="index" :class="{active: isActive(db)}")
      .info(@click='elementHandler(db)')
        img(src="../assets/logo.svg")
        span {{db.name}}
      i(class="el-icon-delete delete" @click="removeHandler(db)")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class DatabaseListElement extends Vue {
  @Prop() private list!: any[];
  @Prop() private removeHandler: any;
  @Prop() private elementHandler: any;
  @Prop() private activeDb: any;
  private isActive(db: any) {
    return db.name === this.activeDb;
  }
}
</script>

<style lang="stylus" scoped>
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
  font-size 1.1em
  right 10px
.el-row .delete:hover
  color #ff6d6d
  cursor pointer
.el-row img
  width 20px
  margin-right 10px
.active
  border-left 3px solid #008753
</style>
