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
    commit('showResponse', {message: 'Database with that name already exists'}, {root: true});
    return;
  }
  const DB = new AWS.DynamoDB({...state.configs});
  try {
    await DB.listTables().promise();
  } catch (err) {
    commit('showResponse', err, {root: true});
    commit('setToDefault');
    return;
  }
  localStorage.setItem(`${state.configs.name}-db`, JSON.stringify(state.configs));
  commit('showResponse', 'Successfully added', {root: true});
  commit('getDbList');
  commit('setToDefault');
}

function submitForm({ dispatch, getters }: ActionContext<DbState, RootState>) {
  if (!getters.validate) {
    return;
  }
  dispatch('setCredentials');
}

function getDbList({ commit, dispatch }: ActionContext<DbState, RootState>) {
  const newDbList = [];
  for (let i = 0; i < localStorage.length; i++) {
    try {
      JSON.parse(Object.values(localStorage)[i]);
    } catch {
      continue;
    }
    newDbList.push(JSON.parse(Object.values(localStorage)[i]));
  }
  commit('setDbList', newDbList);
  newDbList && dispatch('getCurrentDb', newDbList[0], {root: true});
}

const actions: ActionTree<DbState, RootState> = {
  removeDbFromStorage,
  setCredentials,
  submitForm,
  getDbList,
};

export default actions;
