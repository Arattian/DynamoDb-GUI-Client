import { MutationTree } from 'vuex';
import { DatabaseModuleState, SingleDatabaseModuleState } from './types';

function setToDefault(state: DatabaseModuleState) {
  state.submitForm.configs = {
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
    endpoint: 'http://localhost:',
    maxRetries: 1,
    dynamoDbCrc32: false,
  };
  state.submitForm.name = 'Database ' + (state.list.length + 1);
  state.showEditModal = false;
}

function setDbList(
  state: DatabaseModuleState,
  newDbList: SingleDatabaseModuleState[],
) {
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

function toggleEditModal(state: DatabaseModuleState) {
  state.showEditModal = !state.showEditModal;
}

function fillEditForm(state: DatabaseModuleState, name: string) {
  const databaseJson: any = localStorage.getItem(`${name}-db`);
  const database = JSON.parse(databaseJson);
  state.submitForm = Object.assign({}, state.submitForm, database);
}

const mutations: MutationTree<DatabaseModuleState> = {
  correctInputs,
  setToDefault,
  setDbList,
  toggleEditModal,
  fillEditForm,
};
export default mutations;
