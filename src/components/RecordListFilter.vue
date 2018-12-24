<template lang="pug">
  el-row(class="filters" v-if="records.data")
    el-col(class="text-filter")
      el-input(placeholder="Filter table" @keyup.native="filterTextChange" :value="filterText" suffix-icon="el-icon-search" spellcheck="false")
    el-col(class="attribute-filter")
      el-select(v-model="records.attributes" multiple collapse-tags placeholder="Has Attributes")
        el-option(v-for="attribute in header" :key="attribute.prop" :label="attribute.prop" :value="attribute.prop")
          .wrapper
            span {{attribute.prop}}
            el-badge(type="warning" :value="hasAttribute(attribute.prop)")
</template>

<script lang="ts">
import { Vue, Component, Prop} from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
export default class RecordListFilter extends Vue {
  @Prop() private filterText!: string;
  @Prop() private filterTextChange: any;
  @Prop() private header: any;
  @Prop() private hasAttribute: any;
  @State('records') private records: any;
}
</script>

<style lang="stylus" scoped>
.filters
  display flex
  justify-content space-between
  width 100%
  margin-bottom 5px
.text-filter
  margin-left 20px
  width 300px
.attribute-filter
  margin-left 20px
.wrapper
  display flex
  justify-content space-between
  align-items center
.el-badge
  display flex
  justify-content space-between
  align-items center
</style>
