
import { MutationTree } from 'vuex';
import { DbState } from './types';

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
  state.isRemote = true;
}

function setDbList(state: DbState, newDbList: any) {
  state.list = newDbList;
}

function generateEndpoint(state: DbState) {
  if (state.configs.region === 'localhost') {
    state.isRemote = false;
    state.configs.endpoint = '';
    state.configs.accessKeyId = ' ';
    state.configs.secretAccessKey = ' ';
    return;
  } else if (!state.isRemote) {
    state.configs.accessKeyId = '';
    state.configs.secretAccessKey = '';
  }
  state.isRemote = true;
  state.configs.endpoint = `https://dynamodb.${state.configs.region}.amazonaws.com`;
}

const mutations: MutationTree<DbState> = {
  addingDatabase,
  generateEndpoint,
  setToDefault,
  setDbList,
};
export default mutations;
