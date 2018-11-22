import { AddDatabaseState, RootState } from '../types';
import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import AWS from 'aws-sdk';
const namespaced: boolean = true;

export const state: AddDatabaseState = {
  visible: false,
  regionList: [
    'localhost',
    'us-east-1',
    'us-east-2',
    'us-west-1',
    'us-west-2',
    'ap-south-1',
    'ap-northeast-1',
    'ap-northeast-2',
    'ap-northeast-3',
    'ap-southeast-1',
    'ap-southeast-2',
    'ca-central-1',
    'cn-north-1',
    'cn-northwest-1',
    'eu-central-1',
    'eu-west-1',
    'eu-west-2',
    'eu-west-3',
    'sa-east-1',
  ],
  configs: {
    name: '',
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
    endpoint: '',
  },
  status: '',
  isRemote: true,
};

export const mutations: MutationTree<AddDatabaseState> = {
  addingDatabase(state) {
    state.visible = !state.visible;
  },
  setToDefault(state) {
    state.configs = {
      name: '',
      accessKeyId: '',
      secretAccessKey: '',
      region: '',
      endpoint: '',
    };
    state.visible = false;
    state.status = '';
    state.isRemote = true;
  },
  generateEndpoint(state) {
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
  },
  setStatus(state, message) {
    state.status = message;
  },
};

export const getters: GetterTree<AddDatabaseState, RootState> = {
  validate(state) {
    const obj: any = state.configs;
    for (const key in obj) {
      if (!obj[key]) {
        return;
      }
    }
    return true;
  },
};

export const actions: ActionTree<AddDatabaseState, RootState> = {
  submitForm({ dispatch, getters, state }) {
    if (!getters.validate) {
      return;
    }
    dispatch('setCredentials');
  },

  async setCredentials({ commit, state }) {
    if (localStorage.getItem(`${state.configs.name}-db`)) {
      commit('setStatus', 'Database with that name already exists');
      return;
    }
    const DB = new AWS.DynamoDB({...state.configs});
    // const cred = new AWS.CognitoIdentityCredentials({
    //   IdentityPoolId: 'us-east-1:8853780f-54b9-4f6d-a92a-28d4138aec20'
    // });
    // const DB = new AWS.DynamoDB({...cred});
    // console.log(cred);
    try {
      await DB.listTables();
    } catch (err) {
      commit('setStatus', err.message);
      return;
    }
    localStorage.setItem(`${state.configs.name}-db`, JSON.stringify(state.configs));
    commit('setStatus', 'success');
  },
};

export const addDatabase: Module<AddDatabaseState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
