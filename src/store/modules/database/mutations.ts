
import { MutationTree } from 'vuex';
import { DbState } from './types';

function  getDbList(state: DbState) {
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
}

function addingDatabase(state: DbState) {
  state.formVisible = !state.formVisible;
}

function setToDefault(state: DbState) {
  state.configs = {
    name: '',
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
    endpoint: '',
  };
  state.formVisible = false;
  state.status = '';
  state.isRemote = true;
}

function generateEndpoint(state: DbState) {
  if (state.configs.region === 'localhost') {
    state.isRemote = false;
    state.configs.endpoint = '';
    state.configs.accessKeyId = '_' + Math.random().toString(36).substr(2, 9);
    state.configs.secretAccessKey = '_' + Math.random().toString(36).substr(2, 9);
  } else {
    state.isRemote = true;
    state.configs.accessKeyId = '';
    state.configs.secretAccessKey = '';
    state.configs.endpoint = `https://dynamodb.${state.configs.region}.amazonaws.com`;
  }
}

function setStatus(state: DbState, message: string) {
  state.status = message;
}

const mutations: MutationTree<DbState> = {
  addingDatabase,
  generateEndpoint,
  setStatus,
  setToDefault,
  getDbList,
};
export default mutations;
