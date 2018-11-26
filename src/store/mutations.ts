import { MutationTree } from 'vuex';
import { RootState } from './types';
import AWS from 'aws-sdk';

function responseError(state: RootState, payload: any) {
  state.error = payload;
  setTimeout(() => {
    state.error = null;
  }, 100);
}

function setDBInstances(state: RootState, configs: any) {
  state.dbInstance = new AWS.DynamoDB(configs);
  state.dbClient = new AWS.DynamoDB.DocumentClient(configs);
  state.endpoint = configs.endpoint;
}

function removeDbFromState(state: RootState) {
  const emptyDb = {
    tables: [],
  };
  state.currentDb = emptyDb;
  state.endpoint = '';
}

function setTables(state: RootState, tables: Array<{name: string, ItemCount: number}>) {
  state.currentDb.tables = tables;
}

function deleteFromList(state: RootState, tableName: string) {
  state.currentDb.tables = state.currentDb.tables.filter((table: any) => table.name !== tableName);
}

function loading(state: RootState) {
  state.loading = !state.loading;
}

function setCurrentTable(state: RootState, tableName: string) {
  state.currentTable = tableName;
}

const mutations: MutationTree<RootState> = {
  responseError,
  setDBInstances,
  removeDbFromState,
  setTables,
  deleteFromList,
  loading,
  setCurrentTable,
};

export default mutations;
