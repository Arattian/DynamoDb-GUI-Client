<template lang="pug">
  el-row(class="table")
    el-table(:data="list" border v-if="keys.hashKey" @row-dblclick="getItem" size="mini")
      el-table-column(type="index" :index="paginationIndex")
      el-table-column(:prop="keys.hashKey" :label="keys.hashKeyLabel" :render-header="renderHash")
      el-table-column(:prop="keys.rangeKey" :label="keys.rangeKeyLabel" :render-header="renderRange" v-if="keys.rangeKey")
      el-table-column(v-for="(header, index) of header" :prop="header.prop" :label="header.label" :key="index" v-if="hideHashKey(header)")        
      el-table-column(fixed="right" width="50")
        template(slot-scope="scope")
          span(class="delete-column")
            i(class="el-icon-delete delete" @click="removeItem(scope.row)" title="Delete Raw")
</template>

<script lang="ts">
import { Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class RecordList extends Vue {
  @Prop() private list: any;
  @Prop() private keys: any;
  @Prop() private getItem: any;
  @Prop() private paginationIndex!: any;
  @Prop() private header: any;
  @Prop() private hideHashKey: any;
  @Prop() private removeItem: any;
  @Prop({default: 'mini'}) private size!: string;
  private renderHash(createElement: any, { column }: any) {
    return createElement(
      'div',
      [
        createElement('a', [column.label + ' ']),
        createElement('i', {
          class: 'el-icon-warning',
        }),
      ],
    );
  }
  private renderRange(createElement: any, { column }: any) {
    return createElement(
      'div',
      [
        createElement('a', [column.label + ' ']),
        createElement('i', {
          class: 'el-icon-warning',
        }),
      ],
    );
  }
}
</script>

<style lang="stylus" scoped>
.delete-column
  width 100%
  text-align center
  display block
  font-size 1.2em
.delete-column:hover
  color #ff6d6d
  cursor pointer
.el-col
  align-items center
  display flex
  flex-direction column
.el-table
  width 100%
  font-size 0.9em
  color #eee
.table
  overflow-y auto
  width 100%
  height 70vh
</style>
