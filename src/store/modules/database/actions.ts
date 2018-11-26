import { ActionTree, ActionContext } from 'vuex';
import { DbState } from './types';
import { RootState } from '@/store/types';
import AWS from 'aws-sdk';

function removeDbFromStorage({ commit }: ActionContext<DbState, RootState>, db: any) {
  localStorage.removeItem(`${db.name}-db`);
  commit('removeDbFromState', null, {root: true});
  commit('getDbList');
}

async function setCredentials({ commit, state }: ActionContext<DbState, RootState>) {
  if (localStorage.getItem(`${state.configs.name}-db`)) {
    commit('setStatus', 'Database with that name already exists');
    return;
  }
  const DB = new AWS.DynamoDB({...state.configs});
  try {
    await DB.listTables();
  } catch (err) {
    commit('setStatus', err.message);
    return;
  }
  localStorage.setItem(`${state.configs.name}-db`, JSON.stringify(state.configs));
  commit('setStatus', 'success');
}

function submitForm({ dispatch, getters }: ActionContext<DbState, RootState>) {
  if (!getters.validate) {
    return;
  }
  dispatch('setCredentials');
}

const actions: ActionTree<DbState, RootState> = {
  removeDbFromStorage,
  setCredentials,
  submitForm,
};

export default actions;
