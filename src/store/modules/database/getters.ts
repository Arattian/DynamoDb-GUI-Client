import { GetterTree } from 'vuex';
import { DbState } from './types';
import { RootState } from '@/store/types';

const validate = (state: DbState) => {
  const obj: any = state.configs;
  for (const key in obj) {
    if (!obj[key]) {
      return;
    }
  }
  return true;
};

const formVisible = (state: DbState) => state.formVisible;
const configs = (state: DbState) => state.configs;
const regionList = (state: DbState) => state.regionList;
const isRemote = (state: DbState) => state.isRemote;
const status = (state: DbState) => state.status;
const list = (state: DbState) => state.list;

const getters: GetterTree<DbState, RootState> = {
  validate,
  formVisible,
  configs,
  regionList,
  isRemote,
  list,
  status,
};

export default getters;
