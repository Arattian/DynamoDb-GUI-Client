import { MutationTree } from 'vuex';
import { RootState } from './types';
import AWS from 'aws-sdk';

function showResponse(state: RootState, response: any) {
  if (typeof response === 'object') {
    state.response.title = 'Error';
    state.response.type = 'error';
    state.response.message = response.message;
  } else {
    state.response.title = 'Success';
    state.response.type = 'success';
    state.response.message = response;
  }
  setTimeout(() => {
    state.response = {
      title: '',
      type: '',
      message: '',
    };
  }, 100);
}

function setDBInstances(state: RootState, configs: any) {
  state.dbInstance = new AWS.DynamoDB(configs);
  state.dbClient = new AWS.DynamoDB.DocumentClient(configs);
  state.endpoint = configs.endpoint;
}

function removeDbFromState(state: RootState) {
  state.tables = [];
  state.endpoint = '';
}

function setTableNames(state: RootState, tableNames: any[]) {
  state.tables = [];
  for (const name of tableNames) {
    state.tables.push({
      name,
      ItemCount: 0,
    });
  }
}

function setTablesWithItemCount(state: RootState, tables: Array<{name: string, ItemCount: number}>) {
  state.tables = tables;
}

function deleteFromList(state: RootState, tableName: string) {
  state.tables = state.tables.filter((table: any) => table.name !== tableName);
}

function loading(state: RootState) {
  state.loading = !state.loading;
}

function setCurrentTable(state: RootState, tableName: string) {
  state.currentTable = tableName;
}

const mutations: MutationTree<RootState> = {
  showResponse,
  setDBInstances,
  removeDbFromState,
  setTableNames,
  setTablesWithItemCount,
  deleteFromList,
  loading,
  setCurrentTable,
};

export default mutations;
