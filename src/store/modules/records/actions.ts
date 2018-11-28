import { ActionTree, ActionContext } from 'vuex';
import { RecordState } from './types';
import { RootState } from '@/store/types';

async function putItem({ dispatch, commit, rootState, state }: ActionContext<RecordState, RootState>) {
  const { dbClient } = rootState;
  const { currentTable } = rootState;
  const Item = state.recordMeta;
  const params: any = {
    TableName: currentTable,
    Item,
  };
  try {
    await dbClient.put(params).promise();
  } catch (err) {
    commit('showResponse', err, {root: true});
    return;
  }
  dispatch('getRecords');
  dispatch('getTableItemCounts', null, {root: true});
  commit('toggleActionForm');
  commit('showResponse', ' ', {root: true});
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
    commit('showResponse', err, {root: true});
    return;
  }
  commit('setMeta', data.Item);
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
    commit('showResponse', err, {root: true});
    return;
  }
  commit('showResponse', ' ', {root: true});
  dispatch('getRecords');
}

function generateMeta({commit, state}: ActionContext<RecordState, RootState>) {
  const { hashKey, rangeKey } = state;
  let meta;
  rangeKey ? meta = {
      [hashKey] : '',
      [rangeKey]: '',
    } : meta = {
      [hashKey] : '',
    };
  commit('setMeta', meta);
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
    commit('showResponse', err, {root: true});
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
  generateMeta,
};

export default actions;
