import { GetterTree } from 'vuex';
import { RecordState } from './types';
import { RootState } from '@/store/types';

const keys = (state: RecordState) => {
  return {
    hashKey: state.hashKey,
    rangeKey: state.rangeKey,
  };
};

const tableDataPage = (state: RecordState) => {
  const data = state.data;
  if (state.sortBy) {
    data.sort((a, b) => {
      if (!a[state.sortBy] || a[state.sortBy] === 'null') {
        return -1;
      } else if (a[state.sortBy] < b[state.sortBy]) {
        return -1;
      } else if (a[state.sortBy] > b[state.sortBy]) {
        return 1;
      } else {
        return 0;
      }
    });
    if (state.sortDesc) {
      data.reverse();
    }
  }
  return data;
};

const getKeys = (state: RecordState) => (_: any, cb: any) => {
  return cb(state.header.map((item) => {
    return {
      value: item,
    };
  }));
};

const hideHashKey = (state: RecordState) => (el: any) => {
  return el !== state.hashKey && el !== state.rangeKey;
};

const scanIsValid = (state: RecordState) => {
  for (const key in state.filterParams) {
    if (!((state.filterParams)as any)[key] && state.filterParams.valueType !== 'null') {
      return false;
    }
  }
  return true;
};

const filtered = (state: RecordState) => state.filtered;
const recordMeta = (state: RecordState) => state.recordMeta;
const data = (state: RecordState) => state.data;
const header = (state: RecordState) => state.header;
const limit = (state: RecordState) => state.limit;
const showCreateModal = (state: RecordState) => state.showCreateModal;
const showDeleteModal = (state: RecordState) => state.showDeleteModal;
const lastEvaluatedKeyIndex = (state: RecordState) => state.lastEvaluatedKeyIndex;
const evaluatedKeys = (state: RecordState) => state.evaluatedKeys;

const getters: GetterTree<RecordState, RootState> = {
  keys,
  filtered,
  recordMeta,
  data,
  header,
  tableDataPage,
  limit,
  getKeys,
  scanIsValid,
  hideHashKey,
  showCreateModal,
  showDeleteModal,
  lastEvaluatedKeyIndex,
  evaluatedKeys,
};
export default getters;
