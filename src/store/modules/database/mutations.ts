import { MutationTree } from 'vuex';
import { DatabaseModuleState } from './types';

function setToDefault(state: DatabaseModuleState) {
  state.submitForm.configs = {
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
    endpoint: '',
    maxRetries: 1,
    dynamoDbCrc32: false,
  };
  state.submitForm.port = '';
  state.submitForm.name = 'Database ' + (state.list.length + 1);
}

function setDbList(state: DatabaseModuleState, newDbList: any) {
  state.list = newDbList;
}

function correctInputs(state: DatabaseModuleState, serviceType: string) {
  switch (serviceType) {
    case 'remote':
      state.submitForm.configs.endpoint = `https://dynamodb.${
        state.submitForm.configs.region
      }.amazonaws.com`;
      state.submitForm.name =
        state.submitForm.name || `Database ${state.list.length + 1}`;
      break;
    case 'local':
      state.submitForm.configs.region = 'localhost';
      state.submitForm.configs.endpoint = `http://localhost:${
        state.submitForm.port
      }`;
      state.submitForm.configs.accessKeyId = Math.random()
        .toString(36)
        .substring(7);
      state.submitForm.configs.secretAccessKey = Math.random()
        .toString(36)
        .substring(7);
      state.submitForm.name =
        state.submitForm.name || `Database ${state.list.length + 1}`;
      break;
  }
}

const mutations: MutationTree<DatabaseModuleState> = {
  correctInputs,
  setToDefault,
  setDbList,
};
export default mutations;
