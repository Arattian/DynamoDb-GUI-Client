
import { MutationTree } from 'vuex';
import { DbState } from './types';

function setToDefault(state: DbState) {
  state.submitForm.configs = {
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
    endpoint: '',
  };
  state.submitForm.color = '';
  state.submitForm.port = '';
  state.submitForm.name = 'Database ' + state.list.length;
}

function setDbList(state: DbState, newDbList: any) {
  state.list = newDbList;
}

function setDbName(state: DbState, name: any) {
  state.submitForm.name = name;
}

function correctInputs(state: DbState, serviceType: string) {
  switch (serviceType) {
    case 'remote':
      state.submitForm.configs.endpoint = `https://dynamodb.${state.submitForm.configs.region}.amazonaws.com`;
      state.submitForm.name = state.submitForm.name || `Database ${state.list.length}`;
      break;
    case 'local':
      state.submitForm.configs.region = 'localhost';
      state.submitForm.configs.endpoint = `http://localhost:${state.submitForm.port}`;
      state.submitForm.configs.accessKeyId = Math.random().toString(36).substring(7);
      state.submitForm.configs.secretAccessKey = Math.random().toString(36).substring(7);
      state.submitForm.name = state.submitForm.name || `Database ${state.list.length}`;
      break;
  }
}

const mutations: MutationTree<DbState> = {
  correctInputs,
  setToDefault,
  setDbList,
  setDbName,
};
export default mutations;
