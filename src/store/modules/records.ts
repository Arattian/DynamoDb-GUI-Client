import { RecordState, RootState } from '../types';
import { Module, MutationTree, ActionTree, ActionContext } from 'vuex';
const namespaced: boolean = true;

export const state: RecordState = {
  visible: false,
  jsonContent: '',
  hashKey: '',
  hashKeyLabel: '',
  rangeKey: '',
  rangeKeyLabel: '',
  data: [],
  header: [],
};

export const mutations: MutationTree<RecordState> = {
  toggleActionForm(state) {
    state.visible = !state.visible;
  },
  setJsonContent(state, jsonData) {
    state.jsonContent = jsonData;
  },
  extractKeys(state, schema) {
    state.hashKey = '';
    state.hashKeyLabel = '';
    state.rangeKey = '';
    state.rangeKeyLabel = '';
    for (const item of schema.KeySchema) {
      for (const key in item) {
        if (item[key] === 'HASH') {
          state.hashKey = item.AttributeName;
          state.hashKeyLabel = item.AttributeName.toUpperCase();
        } else if (item[key] === 'RANGE') {
          state.rangeKey = item.AttributeName;
          state.rangeKeyLabel = item.AttributeName.toUpperCase();
        }
      }
    }
  },
  setHeader(state) {
    state.header = [];
    const keyArray: any = [];
    for (const row of state.data) {
      // tslint:disable-next-line:forin
      for (const key in row) {
        if (!keyArray.includes(key)) {
          state.header.push({label: key.toUpperCase(), prop: `${key}`});
          keyArray.push(key);
        }
        if (row[key] + '' === '[object Object]') {
          row[key] = JSON.stringify(row[key]);
        } else {
          row[key] += '';
        }
      }
    }
  },

  setData(state, data) {
    state.data = data;
  },
};

export const actions: ActionTree<RecordState, RootState> = {
  generateJsonContent({commit, state}: ActionContext<RecordState, RootState>) {
    const { hashKey, rangeKey } = state;
    let jsonData;
    rangeKey ? jsonData = {
        [hashKey] : '',
        [rangeKey]: '',
      } : jsonData = {
        [hashKey] : '',
      };
    commit('setJsonContent', jsonData);
    commit('toggleActionForm');
  },
  async putItem({ dispatch, commit, rootState, state }: ActionContext<RecordState, RootState>) {
    const { dbClient } = rootState.database;
    const { currentTable } = rootState.table;
    const Item = state.jsonContent;
    const params: any = {
      TableName: currentTable,
      Item,
    };
    try {
      await dbClient.put(params).promise();
    } catch (err) {
      commit('database/responseError', err.message, {root: true});
      return;
    }
    dispatch('table/scanTable', null, {root: true});
    dispatch('database/getTableItemCounts', null, {root: true});
    commit('toggleActionForm');
  },

  async getItem({state, commit, rootState}: ActionContext<RecordState, RootState>, row) {
    const { dbClient } = rootState.database;
    const { currentTable } = rootState.table;
    const params: any = {
      TableName: currentTable,
      Key: {
        [state.hashKey]: row[state.hashKey],
        [state.rangeKey]: row[state.rangeKey],
      },
    };
    let data;
    try {
      data = await dbClient.get(params).promise();
    } catch (err) {
      commit('database/responseError', err.message, {root: true});
      return;
    }
    commit('setJsonContent', data.Item);
    commit('toggleActionForm');
  },
  async removeItem({ commit, rootState, dispatch }: ActionContext<RecordState, RootState>, row) {
    const { dbClient } = rootState.database;
    const { currentTable } = rootState.table;
    const params = {
      TableName: currentTable,
      Key: {
        [state.hashKey]: row[state.hashKey],
      },
    };
    try {
      await dbClient.delete(params).promise();
    } catch (err) {
      commit('database/responseError', err.message, {root: true});
      return;
    }
    dispatch('table/scanTable', null, {root: true});
  },
};

export const records: Module<RecordState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
};
