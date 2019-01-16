<template lang="pug">
  el-row(class="filters" type="flex")
    .scan-container
      .scan
        el-autocomplete(:fetch-suggestions="getKeys" v-model="filterParams.filterColumn" placeholder="Key")
          el-button(v-if="filtered" type="danger" slot="prepend" plain icon="el-icon-close" title="Disable Filter" @click="refreshTable")
        el-select(v-model="filterParams.filterExpr" class="select" collapse-tags placeholder="Expression" @change="setNotEqualExpr")
          el-option(v-for="expression in filterParams.expressions" :key="expression" :label="expression" :value="expression") {{expression}}
        el-select(v-model="filterParams.valueType" class="select" collapse-tags placeholder="Type" @change="setFilterValueType")
          el-option(v-for="type in filterParams.types" :key="type" :label="type" :value="type") {{type}}
        el-input(:placeholder="filterParams.valueType !== 'null' ? 'Value' : 'Not Available'" v-model="filterParams.filterValue" :disabled="filterParams.valueType === 'null'" spellcheck="false" class="filter-text")
          el-button(type="success" slot="append" plain icon="el-icon-search" title="Scan Table" @click="filterRecords") Scan
    .sort-container
      i(v-if="sortBy" class="el-icon-circle-close-outline sort-order" @click="setSortBy('')")
      i(v-if="sortBy" :class="[sortOrder ? 'el-icon-caret-bottom': 'el-icon-caret-top active', 'sort-order']" @click="setSortOrder(!sortOrder)")
      el-select(@change="setSortBy" collapse-tags placeholder="Sort By" :value="sortBy")
        el-option(v-for="headerText in header" :key="headerText" :label="headerText" :value="headerText")
          .wrapper
            span {{headerText}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { FilterParams } from '../store/modules/records/types';
import { State } from 'vuex-class';

@Component
export default class RecordListFilter extends Vue {
  @Prop(Function) private getKeys: any;
  @Prop(Function) private filterRecords: any;
  @Prop(Function) private setFilterValueType: any;
  @Prop(Function) private setNotEqualExpr: any;
  @Prop(Function) private refreshTable: any;
  @Prop(Function) private setSortBy: any;
  @Prop(Function) private setSortOrder: any;
  @Prop(Boolean) private filtered!: boolean;
  @Prop(Boolean) private sortOrder!: boolean;
  @Prop(Array) private header!: string[];
  @Prop(Object) private filterParams!: FilterParams;
  @Prop(String) private sortBy!: string;
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
.sort-order
  width 25px
  cursor pointer
.wrapper
  display flex
  justify-content space-between
  align-items center
</style>
