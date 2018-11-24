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
  creatingTable: false,
  currentTable: '',
  loading: false,
  deletingTable: false,
};

export const mutations: MutationTree<TableState> = {
  setTableJson(state, jsonContent) {
    state.jsonContent = jsonContent;
  },
  createTableForm(state) {
    const defaultJsonContent = {
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
    };
    state.defaultJsonContent = defaultJsonContent;
    state.creatingTable = !state.creatingTable;
  },
  deleteTableForm(state) {
    state.deletingTable = !state.deletingTable;
  },
  setCurrentTable(state, tableName) {
    state.currentTable = tableName;
  },
  loading(state) {
    state.loading = !state.loading;
  },
};

export const getters: GetterTree<TableState, RootState> = {

};

export const actions: ActionTree<TableState, RootState> = {
  getCurrentTable({ commit, dispatch }, tableName) {
    commit('setCurrentTable', tableName);
    dispatch('scanTable');
    dispatch('describeTable');
  },
  async createTable({ commit, dispatch, rootState, state }: ActionContext<TableState, RootState>) {
    const { dbInstance } = rootState.database;
    const params = state.defaultJsonContent;
    commit('loading');
    try {
      await dbInstance.createTable(params).promise();
    } catch (err) {
      commit('database/responseError', err.message, {root: true});
      commit('loading');
      return;
    }
    commit('loading');
    commit('createTableForm');
  },

  async scanTable({ commit, rootState, state, dispatch }: ActionContext<TableState, RootState>) {
    const { dbClient } = rootState.database;
    const { currentTable } = state;
    commit('loading');
    let data;
    try {
      data = await dbClient.scan({TableName: currentTable}).promise();
    } catch (err) {
      commit('database/responseError', err.message, {root: true});
      commit('loading');
      return;
    }
    dispatch('describeTable');
    commit('records/setData', data.Items, {root: true});
    commit('records/setHeader', null, {root: true});
    commit('loading');
  },

  async describeTable({ commit, rootState, state }: ActionContext<TableState, RootState>) {
    const { dbInstance } = rootState.database;
    const { currentTable } = state;
    commit('loading');
    let data;
    try {
      data = await dbInstance.describeTable({TableName: currentTable}).promise();
    } catch (err) {
      commit('database/responseError', err.message, {root: true});
      commit('loading');
      return;
    }
    commit('setTableJson', data.Table);
    commit('records/extractKeys', data.Table, {root: true});
    commit('loading');
  },

  async updateTable({ commit, rootState, state }: ActionContext<TableState, RootState>) {
    const { dbInstance } = rootState.database;
    const { jsonContent }: any = state;
    commit('loading');
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
      commit('loading');
    } catch (err) {
      commit('database/responseError', err.message, {root: true});
      commit('loading');
      return;
    }
  },
  async deleteTable({ commit, rootState, state, dispatch }: ActionContext<TableState, RootState>) {
    const { dbInstance } = rootState.database;
    const { currentTable } = state;
    commit('loading');
    try {
      await dbInstance.deleteTable({TableName: currentTable}).promise();
    } catch (err) {
      commit('database/responseError', err.message, {root: true});
      commit('loading');
      return;
    }
    commit('deleteTableForm');
    dispatch('database/getNewTable', currentTable, {root: true});
    commit('loading');
  },
};

export const table: Module<TableState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
