import { GetterTree } from 'vuex';
import { RecordState } from './types';
import { RootState } from '@/store/types';

const keys = (state: RecordState) => {
  return {
    hashKey: state.hashKey,
    hashKeyLabel: state.hashKeyLabel,
    rangeKey: state.rangeKey,
    rangeKeyLabel: state.rangeKeyLabel,
  };
};

const tableDataPage = (state: RecordState, getters: GetterTree<RecordState, RootState>) => {
  const data: any = getters.filterTable;
  return data.filter((item: any, i: any) => {
    if (i >= (state.pageNumber - 1) * state.pageSize &&
        i < ((state.pageNumber - 1) * state.pageSize + state.pageSize)) {
      return item;
    }
  });
};

const filterTable = (state: RecordState) => {
  let data = state.data.filter((record: any) => {
    for (const key in record) {
      if ((record[key] + '').includes(state.filterText)) {
        return record;
      }
    }
  });
  if (state.attributes.length) {
    data = data.filter((record: any) => {
      for (const key in record) {
        if (state.attributes.indexOf(key) > -1) {
          return record;
        }
      }
    });
  }
  return data;
};

const hasAttribute = (state: RecordState) => (attribute: string) => {
  return state.data.filter((record: any) => {
    for (const key in record) {
        if (attribute === key) {
          return record;
        }
      }
  }).length;
};

const paginationIndex = (state: RecordState) => (i: any) => {
  return i + (state.pageNumber - 1) * state.pageSize + 1;
};

const hideHashKey = (state: RecordState) => (el: any) => {
  return el.prop !== state.hashKey && el.prop !== state.rangeKey;
};

const attributes = (state: RecordState) => state.attributes;
const data = (state: RecordState) => state.data;
const header = (state: RecordState) => state.header;
const pageNumber = (state: RecordState) => state.pageNumber;
const pageSize = (state: RecordState) => state.pageSize;
const filterText = (state: RecordState) => state.filterText;
const total = (_: any, getters: GetterTree<RecordState, RootState>) => getters.filterTable.length;

const getters: GetterTree<RecordState, RootState> = {
  keys,
  attributes,
  data,
  header,
  filterTable,
  tableDataPage,
  pageNumber,
  pageSize,
  filterText,
  hasAttribute,
  total,
  paginationIndex,
  hideHashKey,
};
export default getters;
