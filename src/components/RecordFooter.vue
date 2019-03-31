<template lang="pug">
  el-col(:span="24" class="container")
    el-col(:span="14")
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
              el-input(placeholder="Row Count" @change="getLimitedRows" :disabled="checked" v-model="records.limit" spellcheck="false") rows
            el-row(class="popover-row")
              el-checkbox(v-model="checked" @change="getLimitedRows(null)") No Limit
        el-row(class="popover-close")
          el-button(size="mini" plain type="primary" @click="visible = false") Close
        i(class="el-icon-setting settings" slot="reference" title="Table Settings")
      i(
        class="el-icon-arrow-left"
        :class="{disabled: records.lastEvaluatedKeyIndex < 1}"
        @click="records.lastEvaluatedKeyIndex >= 1 && getPreviousRecords()"
        )
      .pageIndex(
      ) {{ records.lastEvaluatedKeyIndex + 1 }}
      i(
        class="el-icon-arrow-right"
        :class="{disabled: (records.lastEvaluatedKeyIndex + 1) * records.limit >= itemCount || records.evaluatedKeys.length < 1}"
        @click="(records.lastEvaluatedKeyIndex + 1) * records.limit < itemCount && records.evaluatedKeys.length > 0 && getNextRecords()"
        )
      .filter-result(v-if="records.filtered") {{list.length}} matches in {{ records.limit * records.lastEvaluatedKeyIndex + 1 }} - {{ (records.lastEvaluatedKeyIndex + 1) * records.limit > itemCount ? itemCount : (records.lastEvaluatedKeyIndex + 1) * records.limit}} range
    el-col(:span="6" class="itemCount") {{itemCount ? itemCount : 0}} rows in {{currentTable}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';

const namespace = 'records';

@Component
export default class RecordFooter extends Vue {
  private visible: boolean = false;
  private checked: boolean = false;
  @Prop(Function) private generateMeta: any;
  @Prop(Function) private refreshTable: any;
  @Prop(Function) private getNextRecords: any;
  @Prop(Object) private records!: any;
  @Prop(Function) private getPreviousRecords: any;
  @Prop(Function) private getLimitedRows: any;
  @Prop(String) private currentTable!: string;
  @Prop(Number) private itemCount!: number;
  @Prop(Array) private list!: any[];
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
  position fixed
  height 30px
  bottom 0
  background #121820
  z-index 1000
  margin-left 2px

.filter-result
  display flex

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
