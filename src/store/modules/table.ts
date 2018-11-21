import { TableState, RootState } from '../types';
import { Module, MutationTree, ActionTree, GetterTree, ActionContext } from 'vuex';

const namespaced: boolean = true;

export const state: TableState = {
  defaultJsonContent: {
    AttributeDefinitions: [
      {
        AttributeName: '',
        AttributeType: 'S | N | B',
      },
    ],
    KeySchema: [
      {
        AttributeName: '',
        KeyType: 'HASH | RANGE',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: '',
      WriteCapacityUnits: '',
    },
    TableName: '',
    GlobalSecondaryIndexes: [
      {
        IndexName: '',
        KeySchema: [
          {
            AttributeName: '',
            KeyType: 'HASH | RANGE',
          },
        ],
        Projection: {
          NonKeyAttributes: [
            '',
          ],
          ProjectionType: 'ALL | KEYS_ONLY | INCLUDE',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 0,
          WriteCapacityUnits: 0,
        },
      },
    ],
    LocalSecondaryIndexes: [
      {
        IndexName: '',
        KeySchema: [
          {
            AttributeName: '',
            KeyType: 'HASH | RANGE',
          },
        ],
        Projection: {
          NonKeyAttributes: [
            '',
          ],
          ProjectionType: 'ALL | KEYS_ONLY | INCLUDE',
        },
      },
    ],
    SSESpecification: {
      Enabled: false,
      KMSMasterKeyId: '',
      SSEType: 'AES256 | KMS',
    },
    StreamSpecification: {
      StreamEnabled: false,
      StreamViewType: 'NEW_IMAGE | OLD_IMAGE | NEW_AND_OLD_IMAGES | KEYS_ONLY',
    },
  },
  jsonContent: '',
};

export const mutations: MutationTree<TableState> = {
  setTableJson(state, jsonContent) {
    state.jsonContent = jsonContent;
  },
};

export const getters: GetterTree<TableState, RootState> = {

};

export const actions: ActionTree<TableState, RootState> = {
  async createTable({ commit, rootState, state }: ActionContext<TableState, RootState>) {
    const { dbInstance } = rootState.dbModule;
    const params = state.defaultJsonContent;
    commit('tableModule/loading', null, {root: true});
    try {
      await dbInstance.createTable(params).promise();
    } catch (err) {
      commit('dbModule/responseError', err.message, {root: true});
      commit('tableModule/loading', null, {root: true});
      return;
    }
    commit('tableModule/loading', null, {root: true});
    commit('tableModule/creatingTableToggle', null, {root: true});
  },

  async scanTable({ commit, rootState, state, dispatch }: ActionContext<TableState, RootState>) {
    const { dbClient } = rootState.dbModule;
    const { currentTable } = rootState.tableModule;
    commit('tableModule/loading', null, {root: true});
    let data;
    try {
      data = await dbClient.scan({TableName: currentTable}).promise();
    } catch (err) {
      commit('dbModule/responseError', err.message, {root: true});
      commit('tableModule/loading', null, {root: true});
      return;
    }
    dispatch('describeTable');
    commit('tableModule/records/setData', data.Items, {root: true});
    commit('tableModule/records/setHeader', null, {root: true});
    commit('tableModule/loading', null, {root: true});
  },

  async describeTable({ commit, rootState, state }: ActionContext<TableState, RootState>) {
    const { dbInstance } = rootState.dbModule;
    const { currentTable } = rootState.tableModule;
    commit('tableModule/loading', null, {root: true});
    let data;
    try {
      data = await dbInstance.describeTable({TableName: currentTable}).promise();
    } catch (err) {
      commit('dbModule/responseError', err.message, {root: true});
      commit('tableModule/loading', null, {root: true});
      return;
    }
    commit('setTableJson', data.Table);
    commit('tableModule/records/extractKeys', data.Table, {root: true});
    commit('tableModule/loading', null, {root: true});
  },

  async updateTable({ commit, rootState, state }: ActionContext<TableState, RootState>) {
    const { dbInstance } = rootState.dbModule;
    const { jsonContent }: any = state;
    commit('tableModule/loading', null, {root: true});
    const params = {
      TableName: jsonContent.TableName,
      AttributeDefinitions: jsonContent.AttributeDefinitions,
      GlobalSecondaryIndexUpdates: jsonContent.GlobalSecondaryIndexUpdates,
      ProvisionedThroughput: {
        ReadCapacityUnits: jsonContent.ProvisionedThroughput && jsonContent.ProvisionedThroughput.ReadCapacityUnits,
        WriteCapacityUnits: jsonContent.ProvisionedThroughput && jsonContent.ProvisionedThroughput.WriteCapacityUnits,
      },
      SSESpecification: jsonContent.SSESpecification,
      StreamSpecification: jsonContent.StreamSpecification,
    };
    try {
      await dbInstance.updateTable(params).promise();
      commit('tableModule/loading', null, {root: true});
    } catch (err) {
      commit('dbModule/responseError', err.message, {root: true});
      commit('tableModule/loading', null, {root: true});
      return;
    }
  },
};

export const table: Module<TableState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
