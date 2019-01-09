<template lang="pug">
  el-col(:span="24" class="container")
    el-col(:span="6")
      i(class="el-icon-circle-plus-outline add" @click="generateMeta" title="Add Record")
      i(class="el-icon-refresh refresh" @click="refreshTable" title="Refresh Table")
      el-popover(
        placement="top"
        width="200"
        v-model="visible")
        .popover-content
          el-row
            el-row(class="popover-row") Maximum rows in table
            el-row(class="popover-row")
              el-input(placeholder="Row Count" @change="getLimitedRows" :disabled="checked" :value="limit" spellcheck="false") rows
            el-row(class="popover-row")
              el-checkbox(v-model="checked" @change="getLimitedRows(null)") No Limit
        el-row(class="popover-close")
          el-button(size="mini" plain type="primary" @click="visible = false") Close
        i(class="el-icon-setting settings" slot="reference" title="Table Settings")
      i(
        class="el-icon-arrow-left"
        :class="{disabled: lastEvaluatedKeyIndex < 1}"
        @click="lastEvaluatedKeyIndex >= 1 && getPreviousRecords()"
        )
      .pageIndex {{ lastEvaluatedKeyIndex + 1 }}
      i(
        class="el-icon-arrow-right"
        :class="{disabled: (lastEvaluatedKeyIndex + 1) * limit >= itemCount }"
        @click="(lastEvaluatedKeyIndex + 1) * limit < itemCount && getNextRecords()"
        )
    el-col(:span="14" class="itemCount") {{itemCount}} rows in {{currentTable}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';

const namespace = 'records';

@Component
export default class RecordFooter extends Vue {
  private visible = false;
  private checked = false;
  @Prop() private generateMeta: any;
  @Prop() private refreshTable: any;
  @Prop() private getNextRecords: any;
  @Prop() private currentTable: any;
  @Prop() private itemCount: any;
  @Prop() private limit: any;
  @Prop() private getLimitedRows: any;
  @Prop() private getPreviousRecords: any;
  @Prop() private lastEvaluatedKeyIndex: any;
  @Prop() private evaluatedKeys: any;
}
</script>

<style lang="stylus" scoped>
.popover-content
  display flex
  justify-content center
  align-items center
  flex-direction column
.popover-row
  margin-top 10px
.popover-close
  display flex
  justify-content flex-end
.container
  border-top 1px solid #121820
  border-left 2px solid #121820
  position fixed
  height 35px
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
.settings
  color #fcff84
.add:hover
  color #55ffbe
.refresh:hover
  color #52ceff
.settings:hover
  color #fcffe4
.itemCount
  justify-content flex-end
.disabled
  color #aaaaaa
  cursor not-allowed !important
</style>
