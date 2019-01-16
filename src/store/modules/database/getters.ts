import { GetterTree } from 'vuex';
import { DatabaseModuleState } from './types';
import { RootState } from '@/store/types';

const validateForm = (state: DatabaseModuleState) => {
  const obj: any = state.submitForm.configs;
  for (const key in obj) {
    if (!obj[key]) {
      return;
    }
  }
  return true;
};

const getters: GetterTree<DatabaseModuleState, RootState> = {
  validateForm,
};

export default getters;
