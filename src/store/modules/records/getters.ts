import { GetterTree } from 'vuex';
import { RecordModuleState } from './types';
import { RootState } from '@/store/types';

const keys = (state: RecordModuleState) => {
  return {
    hashKey: state.hashKey,
    rangeKey: state.rangeKey,
  };
};

const tableDataPage = (state: RecordModuleState) => {
  if (state.sortBy) {
    state.data.sort((a, b) => {
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
    if (state.sortOrder) {
      state.data.reverse();
    }
  }
  return state.data;
};

const getKeys = (state: RecordModuleState) => (_: any, cb: any) => {
  return cb(state.header.map((item) => {
    return {
      value: item,
    };
  }));
};

const hideHashKey = (state: RecordModuleState) => (el: any) => {
  return el !== state.hashKey && el !== state.rangeKey;
};

const scanIsValid = (state: RecordModuleState) => {
  for (const key in state.filterParams) {
    if (!((state.filterParams)as any)[key] && state.filterParams.valueType !== 'null') {
      return false;
    }
  }
  return true;
};

const itemCount = (_: RecordModuleState, __: any, rootState: any) => rootState.table.tableMeta.ItemCount;

const getters: GetterTree<RecordModuleState, RootState> = {
  keys,
  tableDataPage,
  getKeys,
  scanIsValid,
  hideHashKey,
  itemCount,
};
export default getters;
