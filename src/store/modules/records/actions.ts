import { ActionTree, ActionContext } from 'vuex';
import { RecordState } from './types';
import { RootState } from '@/store/types';

async function putItem({ dispatch, commit, rootState, state }: ActionContext<RecordState, RootState>) {
  const { dbClient } = rootState;
  const { currentTable } = rootState;
  const Item = state.jsonContent;
  const params: any = {
    TableName: currentTable,
    Item,
  };
  try {
    await dbClient.put(params).promise();
  } catch (err) {
    commit('responseError', err.message, {root: true});
    return;
  }
  dispatch('getRecords');
  dispatch('getTableItemCounts', null, {root: true});
  commit('toggleActionForm');
}

async function getItem({state, commit, rootState}: ActionContext<RecordState, RootState>, row: any) {
  const { dbClient } = rootState;
  const { currentTable } = rootState;
  const params: any = {
    TableName: currentTable,
    Key: {
      [state.hashKey]: row[state.hashKey],
      [state.rangeKey]: row[state.rangeKey],
    },
  };
  let data;
  try {
    data = await dbClient.get(params).promise();
  } catch (err) {
    commit('responseError', err.message, {root: true});
    return;
  }
  commit('setJsonContent', data.Item);
  commit('toggleActionForm');
}
async function removeItem({ commit, rootState, dispatch, state }: ActionContext<RecordState, RootState>, row: any) {
  const { dbClient } = rootState;
  const { currentTable } = rootState;
  const params = {
    TableName: currentTable,
    Key: {
      [state.hashKey]: row[state.hashKey],
    },
  };
  try {
    await dbClient.delete(params).promise();
  } catch (err) {
    commit('responseError', err.message, {root: true});
    return;
  }
  dispatch('getRecords');
}

function generateJsonContent({commit, state}: ActionContext<RecordState, RootState>) {
  const { hashKey, rangeKey } = state;
  let jsonData;
  rangeKey ? jsonData = {
      [hashKey] : '',
      [rangeKey]: '',
    } : jsonData = {
      [hashKey] : '',
    };
  commit('setJsonContent', jsonData);
  commit('toggleActionForm');
}

async function getRecords({ commit, rootState }: ActionContext<RecordState, RootState>) {
  const { dbClient } = rootState;
  const { currentTable } = rootState;
  commit('loading', null, {root: true});
  let data;
  try {
    data = await dbClient.scan({TableName: currentTable}).promise();
  } catch (err) {
    commit('responseError', err.message, {root: true});
    commit('loading', null, {root: true});
    return;
  }
  commit('setData', data.Items);
  commit('setHeader');
  commit('loading', null, {root: true});
}

const actions: ActionTree<RecordState, RootState> = {
  getRecords,
  putItem,
  getItem,
  removeItem,
  generateJsonContent,
};

export default actions;
