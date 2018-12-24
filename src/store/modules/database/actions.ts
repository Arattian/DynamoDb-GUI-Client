import { ActionTree, ActionContext } from 'vuex';
import { DbState } from './types';
import { RootState } from '@/store/types';
import DynamoDB from 'aws-sdk/clients/dynamodb';

function removeDbFromStorage({ commit, dispatch }: ActionContext<DbState, RootState>, db: any) {
  localStorage.removeItem(`${db.name}-db`);
  commit('removeDbFromState', null, {root: true});
  dispatch('getDbList');
}

async function setCredentials({ commit, dispatch, getters, state }: ActionContext<DbState, RootState>) {
  const database = state.submitForm;
  if (!getters.validateForm) {
    return;
  } else if (localStorage.getItem(`${database.name}-db`)) {
    commit('showResponse', {message: 'Database with that name already exists'}, {root: true});
    return;
  }
  const DB = new DynamoDB({...database.configs});
  try {
    await DB.listTables().promise();
  } catch (err) {
    commit('showResponse', err, {root: true});
    commit('setToDefault');
    return;
  }
  database.createdAt =  + new Date();
  localStorage.setItem(`${database.name}-db`, JSON.stringify(database));
  dispatch('getDbList');
  dispatch('getCurrentDb', database.name, {root: true});
  commit('setToDefault');
}

function submitRemoteForm({ dispatch, commit }: ActionContext<DbState, RootState>) {
  commit('correctInputs', 'remote');
  dispatch('setCredentials');
}

function submitLocalForm({ dispatch, commit }: ActionContext<DbState, RootState>) {
  commit('correctInputs', 'local');
  dispatch('setCredentials');
}

function getDbList({ commit }: ActionContext<DbState, RootState>) {
  const newDbList = [];
  for (let i = 0; i < localStorage.length; i++) {
    try {
      JSON.parse(Object.values(localStorage)[i]);
    } catch {
      continue;
    }
    newDbList.push(JSON.parse(Object.values(localStorage)[i]));
  }
  newDbList.sort((a, b) => a.createdAt - b.createdAt);
  commit('setDbList', newDbList);
}

const actions: ActionTree<DbState, RootState> = {
  removeDbFromStorage,
  setCredentials,
  submitRemoteForm,
  submitLocalForm,
  getDbList,
};

export default actions;
