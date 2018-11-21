import AWS from 'aws-sdk';
import { Module, MutationTree, ActionTree } from 'vuex';
import { tableModule } from './tableModule';
import { addDatabaseModule } from './addDatabaseModule';
import { DbModuleState, RootState } from '../types';

const namespaced: boolean = true;

const modules = {
  addDatabaseModule,
};

export const state: DbModuleState = {
  list: [],
  currentDb: {
    endpoint: '',
    tables: [],
  },
  dbInstance: {},
  dbClient: {},
  error: null,
};

export const mutations: MutationTree<DbModuleState> = {
  removeDbFromState(state) {
    const emptyDb = {
      endpoint: '',
      tables: [],
    };
    state.currentDb = emptyDb;
  },

  responseError(state, payload) {
    state.error = payload;
    setTimeout(() => {
      state.error = null;
    }, 100);
  },

  setErrorToNull(state) {
    state.error = null;
  },

  getDbList(state) {
    const newDbList = [];
    for (let i = 0; i < localStorage.length; i++) {
      try {
        JSON.parse(Object.values(localStorage)[i]);
      } catch {
        continue;
      }
      newDbList.push(JSON.parse(Object.values(localStorage)[i]));
    }
    state.list = newDbList;
  },

  setTables(state, tables) {
    state.currentDb.tables = tables;
  },
  setDBInstances(state, configs) {
    state.dbInstance = new AWS.DynamoDB({...configs});
    state.dbClient = new AWS.DynamoDB.DocumentClient({...configs});
    state.currentDb.endpoint = configs.endpoint;
  },
};

export const actions: ActionTree<DbModuleState, RootState> = {
  removeDbFromStorage({ commit }, db) {
    localStorage.removeItem(`${db.name}-db`);
    commit('removeDbFromState');
    commit('getDbList');
  },
  async getCurrentDb({ commit, state, dispatch }, payload) {
    commit('tableModule/loading', null, {root: true});
    commit('setDBInstances', payload);
    let data;
    try {
      data = await state.dbInstance.listTables().promise();
    } catch (err) {
      commit('responseError', err.message);
      commit('tableModule/loading', null, {root: true});
      return;
    }
    commit('tableModule/loading', null, {root: true});
    commit('setTables', data.TableNames);
    commit('tableModule/setCurrentTable', data.TableNames[0], {root: true});
    dispatch('tableModule/table/scanTable', null, {root: true});
    dispatch('tableModule/table/describeTable', null, {root: true});
  },
};

export const dbModule: Module<DbModuleState, RootState> = {
  namespaced,
  modules,
  state,
  mutations,
  actions,
};
