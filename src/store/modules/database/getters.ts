import { GetterTree } from 'vuex';
import { DbState } from './types';
import { RootState } from '@/store/types';

const validateForm = (state: DbState) => {
  const obj: any = state.submitForm.configs;
  for (const key in obj) {
    if (!obj[key]) {
      return;
    }
  }
  return true;
};


const configs = (state: DbState) => state.submitForm.configs;
const regionList = (state: DbState) => state.regionList;
const list = (state: DbState) => state.list;
const submitForm = (state: DbState) => state.submitForm;

const getters: GetterTree<DbState, RootState> = {
  validateForm,
  configs,
  regionList,
  list,
  submitForm,
};

export default getters;
