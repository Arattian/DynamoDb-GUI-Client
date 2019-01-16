<template lang="pug">
  el-row(class="table")
    el-table(:data="list" border v-if="keys.hashKey" size="mini" @row-dblclick="editItem")
      el-table-column(type="index")
      el-table-column(:prop="keys.hashKey")
        template(slot="header" slot-scope="slot")
          span {{keys.hashKey}}
          i(class="el-icon-warning key")
      el-table-column(:prop="keys.rangeKey" :label="keys.rangeKey" v-if="keys.rangeKey")
        template(slot="header" slot-scope="slot")
          span {{keys.rangeKey}}
          i(class="el-icon-warning key")
      el-table-column(v-for="(header, index) of header" :prop="header" :label="header" title="Something" :key="index" v-if="hideHashKey(header)")
      el-table-column(fixed="right" width="50")
        template(slot-scope="scope")
          span(class="delete-column")
            i(class="el-icon-delete delete" @click="removeHandler(scope.row)" title="Delete Raw")
</template>

<script lang="ts">
import { Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class RecordList extends Vue {
  @Prop(Function) private editItem: any;
  @Prop(Function) private hideHashKey: any;
  @Prop(Function) private removeHandler: any;
  @Prop(Array) private list!: any[];
  @Prop(Array) private header!: any[];
  @Prop(Object) private keys!: {hashKey: string; rangeKey: string};
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
.delete-column:hover
  color #ff6d6d
  cursor pointer
.el-table
  width 100%
  font-size 0.9em
  color #eee
.table
  width 98%
  overflow auto
  height 85vh
  margin auto
</style>
