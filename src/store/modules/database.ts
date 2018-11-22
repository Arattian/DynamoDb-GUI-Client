import AWS from 'aws-sdk';
import { Module, MutationTree, ActionTree } from 'vuex';
import { addDatabase } from './addDatabase';
import { DbState, RootState } from '../types';

const namespaced: boolean = true;

const modules = {
  addDatabase,
};

export const state: DbState = {
  list: [],
  currentDb: {
    endpoint: '',
    tables: [],
    tableNames: [],
  },
  dbInstance: {},
  dbClient: {},
  error: null,
};

export const mutations: MutationTree<DbState> = {
  removeDbFromState(state) {
    const emptyDb = {
      endpoint: '',
      tables: [],
      tableNames: [],
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
  setTableNames(state, tableNames) {
    state.currentDb.tableNames = tableNames;
  },
  setDBInstances(state, configs) {
    state.dbInstance = new AWS.DynamoDB({...configs});
    state.dbClient = new AWS.DynamoDB.DocumentClient({...configs});
    state.currentDb.endpoint = configs.endpoint;
  },
  deleteFromList(state, tableName) {
    state.currentDb.tableNames = state.currentDb.tableNames.filter((table: any) => table !== tableName);
    state.currentDb.tables = state.currentDb.tables.filter((table: any) => table.name !== tableName);
  },
};

export const actions: ActionTree<DbState, RootState> = {
  removeDbFromStorage({ commit }, db) {
    localStorage.removeItem(`${db.name}-db`);
    commit('removeDbFromState');
    commit('getDbList');
  },
  async getCurrentDb({ commit, state, dispatch }, payload) {
    commit('table/loading', null, {root: true});
    commit('setDBInstances', payload);
    let data;
    try {
      data = await state.dbInstance.listTables().promise();
    } catch (err) {
      commit('responseError', err.message);
      commit('table/loading', null, {root: true});
      return;
    }
    commit('table/loading', null, {root: true});
    commit('setTableNames', data.TableNames);
    dispatch('getTableItemCounts');
    dispatch('table/getCurrentTable', data.TableNames[0], {root: true});
  },
  async getTableItemCounts({ commit, state }) {
    const { tableNames }: any = state.currentDb;
    const tableList = [];
    for (const table of tableNames) {
      const data = await state.dbInstance.scan({TableName: table}).promise();
      const newTable = {
        name: table,
        ItemCount: data.Count,
      };
      tableList.push(newTable);
    }
    commit('setTables', tableList);
  },
  getNewTable({ commit, state, dispatch }, tableName) {
    commit('deleteFromList', tableName);
    if (state.currentDb.tableNames) {
      const newTable: any = state.currentDb.tableNames[0];
      if (newTable) {
        dispatch('table/getCurrentTable', newTable, {root: true});
      }
    }
  },
};

export const database: Module<DbState, RootState> = {
  namespaced,
  modules,
  state,
  mutations,
  actions,
};
