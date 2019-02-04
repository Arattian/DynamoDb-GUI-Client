<template lang="pug">
  el-row(class="table")
    el-table(
      :data="list"
      border
      v-if="keys.hashKey"
      size="mini"
      @row-dblclick="showEditModal"
      tooltip-effect="light"
      @selection-change="handleRowSelection"
      )
      el-table-column(type="selection" width="50")
      el-table-column(type="index")
      el-table-column(:prop="keys.hashKey" :show-overflow-tooltip="true")
        template(slot="header" slot-scope="slot" )
          span {{keys.hashKey}}
          i(class="el-icon-warning key")
      el-table-column(:prop="keys.rangeKey" :show-overflow-tooltip="true" :label="keys.rangeKey" v-if="keys.rangeKey")
        template(slot="header" slot-scope="slot")
          span {{keys.rangeKey}}
          i(class="el-icon-warning key")
      el-table-column(v-for="(header, index) of header" :show-overflow-tooltip="true" :prop="header" :label="header" title="Something" :key="index" v-if="hideHashKey(header)")
      el-table-column(fixed="right" width="50")
        template(slot="header" slot-scope="slot")
          .delete-selected
            i(class="el-icon-delete" v-if="selectedItems" @click="showGroupDeleteModal" title="Delete Selected")
        template(slot-scope="scope")
          span(class="delete-column")
            i(class="el-icon-delete delete" @click="showDeleteModal(scope.row)" title="Delete Raw")
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class RecordList extends Vue {
    @Prop(Function) private showEditModal: any;
    @Prop(Function) private hideHashKey: any;
    @Prop(Function) private showDeleteModal: any;
    @Prop(Function) private showGroupDeleteModal: any;
    @Prop(Function) private handleRowSelection: any;
    @Prop(Array) private list!: any[];
    @Prop(Number) private selectedItems!: any[];
    @Prop(Array) private header!: any[];
    @Prop(Object) private keys!: { hashKey: string; rangeKey: string };
  }
</script>

<style lang="stylus" scoped>
  .key
    margin-left 5px

  .delete-column
    width 100%
    text-align center
    display block
    font-size 1.2em

  .delete:hover
    color #ff6d6d
    cursor pointer

  .delete-selected
    display flex
    justify-content center
    align-items center

  .delete-selected i
    color #ff6d6d
    cursor pointer

  .delete-selected i:hover
    color #ff4747
    cursor pointer

  .delete-selected i
    font-size 1.8em

  .el-table
    width 100%
    font-size .9em
    color #eee

  .table
    width 98%
    overflow auto
    height 80vh
    margin auto
</style>
