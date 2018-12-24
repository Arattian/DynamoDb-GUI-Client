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

const tableDataPage = (state: RecordState) => {
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

const hideHashKey = (state: RecordState) => (el: any) => {
  return el.prop !== state.hashKey && el.prop !== state.rangeKey;
};

const attributes = (state: RecordState) => state.attributes;
const data = (state: RecordState) => state.data;
const header = (state: RecordState) => state.header;
const filterText = (state: RecordState) => state.filterText;
const total = (_: any, getters: GetterTree<RecordState, RootState>) => getters.filterTable.length;

const getters: GetterTree<RecordState, RootState> = {
  keys,
  attributes,
  data,
  header,
  tableDataPage,
  filterText,
  hasAttribute,
  total,
  hideHashKey,
};
export default getters;
