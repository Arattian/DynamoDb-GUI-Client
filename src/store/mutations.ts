import { MutationTree } from 'vuex';
import { RootState } from './types';
import DynamoDB from 'aws-sdk/clients/dynamodb';

function initialState(state: RootState) {
  state.dbInstance = {};
  state.dbClient = {};
  state.currentTable = '';
  state.currentDb = '';
  state.tables = [];
  state.filterText = '';
  state.loading = false;
  state.response = {
    title: '',
    type: '',
    message: '',
  };
}

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
}

function notified(state: RootState) {
  state.response = {
    title: '',
    type: '',
    message: '',
  };
}

function setDBInstances(state: RootState, name: any) {
  const databaseJson: any = localStorage.getItem(`${name}-db`);
  const database = JSON.parse(databaseJson);
  database.configs.maxRetries = 5;
  state.dbInstance = new DynamoDB(database.configs);
  state.dbClient = new DynamoDB.DocumentClient(database.configs);
  state.currentDb = database.name;
  state.tables = [];
  state.currentTable = '';
}

function removeDbFromState(state: RootState) {
  state.tables = [];
}

function setTableNames(state: RootState, tableNames: any[]) {
  state.tables = tableNames;
}

function deleteFromList(state: RootState, tableName: string) {
  state.tables = state.tables.filter((table: any) => table !== tableName);
  state.currentTable = '';
}

function loading(state: RootState, isLoading: boolean) {
  if (isLoading) {
    setTimeout(() => {
      if (!state.loading) {
        state.loading = true;
        setTimeout(() => {
          state.loading = false;
        }, 1000);
      }
    }, 500);
  }
  state.loading = isLoading;
}

function setCurrentTable(state: RootState, tableName: string) {
  state.currentTable = tableName;
}

function filterTextChange(state: RootState, filterField: any) {
  state.filterText = filterField.target.value;
}

const mutations: MutationTree<RootState> = {
  initialState,
  showResponse,
  setDBInstances,
  removeDbFromState,
  setTableNames,
  deleteFromList,
  loading,
  setCurrentTable,
  notified,
  filterTextChange,
};

export default mutations;
