<template lang="pug">
  el-row(class="actions")
    el-col(:span="1")
      i(class="el-icon-circle-plus-outline add" @click="generateMeta" title="Add Record")
    el-col(:span="2")
      i(class="el-icon-refresh refresh" @click="getRecords" title="Refresh Table")
    el-col(:span="8" class="text-filter")
      el-input(placeholder="Filter table" @keyup.native="filterTextChange" :value="filterText" suffix-icon="el-icon-search" spellcheck="false")
    el-col(:span="7" class="attributes")
      el-select(v-model="records.attributes" multiple @change="resetCurrentPage" collapse-tags placeholder="Has Attributes")
        el-option(v-for="attribute in header" :key="attribute.prop" :label="attribute.prop" :value="attribute.prop")
          .wrapper
            span {{attribute.prop}}
            el-badge(type="warning" :value="hasAttribute(attribute.prop)")
    el-col(:span="6")
      el-select(:value="pageSize" placeholder="Item per page" @change="changePageSizeAndReset")
        el-option(label="Item per page" default :disabled="true" value="0")
        el-option(:label="5" :value="5")
        el-option(:label="15" :value="15")
        el-option(:label="30" :value="30")
        el-option(:label="50" :value="50")
        el-option(:label="100" :value="100")
</template>

<script lang="ts">
import { Vue, Component, Prop} from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
export default class RecordListActions extends Vue {
  @Prop() private generateMeta: any;
  @Prop() private getRecords: any;
  @Prop() private filterText!: string;
  @Prop() private filterTextChange: any;
  @Prop() private attributes: any;
  @Prop() private resetCurrentPage: any;
  @Prop() private header: any;
  @Prop() private hasAttribute: any;
  @Prop() private pageSize!: number;
  @Prop() private changePageSizeAndReset: any;
  @State('records') private records: any;
}
</script>

<style lang="stylus" scoped>
.actions
  display flex
  justify-content space-between
  width 100%
  margin-bottom 5px
.actions .text-filter
  margin-right 5px
.actions .attributes
  margin-right 5px
.actions i
  font-size 1.5em
  padding 10px
  cursor pointer
.add
  color #00d986
.refresh
  color #409EFF
.add:hover
  color #55ffbe
.refresh:hover
  color #52ceff
.el-col
  align-items center
  display flex
  flex-direction column
.wrapper
  display flex
  justify-content space-between
  align-items center
</style>
