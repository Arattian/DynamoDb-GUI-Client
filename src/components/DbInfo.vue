<template lang="pug">
  el-row
    el-col(:span="6")
      .header.header-text Database Endpoint
    el-col(:span="18")
      .header.header-url {{ dbModule.currentDb.endpoint }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
@Component
export default class DbInfo extends Vue {
  @State('dbModule') private dbModule: any;
}
</script>

<style lang="stylus" scoped>
.header-text
  background #121820
  color #eee
  padding 15px 30px
  border-right 2px solid #121820
.header-url
  background #121820
  padding 15px 30px
  color #eee
.header
  min-height 55px
</style>
