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
const recordMeta = (state: RecordState) => state.recordMeta;
const data = (state: RecordState) => state.data;
const header = (state: RecordState) => state.header;
const filterText = (state: RecordState) => state.filterText;
const limit = (state: RecordState) => state.limit;
const showCreateModal = (state: RecordState) => state.showCreateModal;
const showDeleteModal = (state: RecordState) => state.showDeleteModal;
const lastEvaluatedKeyIndex = (state: RecordState) => state.lastEvaluatedKeyIndex;
const evaluatedKeys = (state: RecordState) => state.evaluatedKeys;

const getters: GetterTree<RecordState, RootState> = {
  keys,
  attributes,
  recordMeta,
  data,
  header,
  tableDataPage,
  filterText,
  limit,
  hasAttribute,
  hideHashKey,
  showCreateModal,
  showDeleteModal,
  lastEvaluatedKeyIndex,
  evaluatedKeys,
};
export default getters;
