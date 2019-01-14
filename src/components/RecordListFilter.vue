<template lang="pug">
  el-row(class="filters" type="flex" v-if="records.data")
    .scan-container
      .scan
        el-autocomplete(:fetch-suggestions="getKeys" v-model="records.filterParams.filterColumn" placeholder="Key")
        el-select(v-model="records.filterParams.filterExpr" class="select" collapse-tags placeholder="Expression" @change="setNotEqualExpr")
          el-option(v-for="expression in records.filterParams.expressions" :key="expression" :label="expression" :value="expression") {{expression}}
        el-select(v-model="records.filterParams.valueType" class="select" collapse-tags placeholder="Type" @change="setFilterValueType")
          el-option(v-for="type in records.filterParams.types" :key="type" :label="type" :value="type") {{type}}
        el-input(:placeholder="records.filterParams.valueType !== 'null' ? 'Value' : 'Not Available'" v-model="records.filterParams.filterValue" :disabled="records.filterParams.valueType === 'null'" spellcheck="false" class="filter-text")
          el-button(type="success" slot="append" plain icon="el-icon-search" title="Scan Table" @click="filterRecords") Scan
    .sort-container
      i(v-if="records.sortBy" class="el-icon-circle-close-outline sort-order" @click="records.sortBy = ''")
      i(v-if="records.sortBy" :class="[records.sortDesc ? 'el-icon-caret-bottom': 'el-icon-caret-top active', 'sort-order']" @click="records.sortDesc = !records.sortDesc")
      el-select(v-model="records.sortBy" collapse-tags placeholder="Sort By")
        el-option(v-for="headerText in header" :key="headerText" :label="headerText" :value="headerText")
          .wrapper
            span {{headerText}}
</template>

<script lang="ts">
import { Vue, Component, Prop} from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
export default class RecordListFilter extends Vue {
  private key: any = '';
  @Prop() private filterText!: string;
  @Prop() private filterTextChange: any;
  @Prop() private header: any;
  @Prop() private getKeys: any;
  @Prop() private filterRecords: any;
  @Prop() private setFilterValueType: any;
  @Prop() private setNotEqualExpr: any;
  @State('records') private records: any;
}
</script>

<style lang="stylus" scoped>
.filters
  width 98%
  margin auto
  margin-bottom 5px
.scan-container
  width 60%
  margin-left -1.5px
.select
  max-width 125px
.heading
  margin-bottom 5px
.scan
  display flex
  justify-content flex-start
.scan > *
  margin 0 1.5px
.filter-text
  width 50%
.sort-container
  width 40%
  display flex
  justify-content flex-end
  align-items center
.sort
  display flex
.sort-order
  width 25px
  cursor pointer
.wrapper
  display flex
  justify-content space-between
  align-items center
.el-badge
  display flex
  justify-content space-between
  align-items center
</style>
