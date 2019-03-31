<template lang="pug">
  el-row(class="filters" type="flex")
    .scan-container
      .scan
        el-autocomplete(:fetch-suggestions="getKeys" v-model="filterParams.filterColumn" placeholder="Key")
          el-button(v-if="filtered" type="danger" slot="prepend" plain icon="el-icon-close" title="Disable Filter" @click="refreshTable")
        el-select(v-model="filterParams.filterExpr" class="select" collapse-tags placeholder="Expression" @change="setNotEqualExpr")
          el-option(v-for="expression in filterParams.expressions" :key="expression" :label="expression" :value="expression") {{expression}}
        el-select(v-model="filterParams.valueType" class="select" collapse-tags placeholder="Type" @change="setFilterValueType")
          el-option(v-for="attributeType in filterParams.types" :key="attributeType" :label="attributeType" :value="attributeType") {{attributeType}}
        el-select(v-if="filterParams.valueType === 'boolean'" v-model="filterParams.filterValue" class="select" placeholder="Boolean")
          el-option(:value="true") {{'true'}}
          el-option(:value="false") {{'false'}}
        el-input(v-if="filterParams.valueType !== 'boolean'" :placeholder="filterParams.valueType !== 'null' ? 'Value' : 'Not Available'" v-model="filterParams.filterValue" :disabled="filterParams.valueType === 'null'" spellcheck="false" class="filter-text")
        el-button(type="success" plain icon="el-icon-search" class="scan-button" title="Scan Table" @click="filterRecords")
          span(class="hidden-xs-only") Scan
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
  @Prop(Boolean) private filtered!: boolean;
  @Prop(Object) private filterParams!: FilterParams;
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

.el-select
  min-width 56px

.el-input
  min-width 115px

.el-autocomplete
  min-width 56px

.wrapper
  display flex
  justify-content space-between
  align-items center

.scan-button
  border 1px solid #191d25 !important
  border-radius 0
  margin-left -10px
</style>
