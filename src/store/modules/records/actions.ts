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
  commit('addItemToList', Item);
  commit('setHeader');
  commit('toggleCreateModal');
  commit('showResponse', ' ', {root: true});
  dispatch('table/getMeta', null, {root: true});
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
}
async function removeItem({ commit, rootState, dispatch, state }: ActionContext<RecordState, RootState>) {
  const { dbClient } = rootState;
  const { currentTable } = rootState;
  const row: any = state.recordMeta;
  const Key: any = {
    [state.hashKey]: row[state.hashKey],
    [state.rangeKey]: row[state.rangeKey],
  };
  const params = {
    TableName: currentTable,
    Key,
  };
  try {
    await dbClient.delete(params).promise();
  } catch (err) {
    commit('showResponse', err, {root: true});
    return;
  }
  commit('deleteItemFromList', Key);
  commit('toggleDeleteModal');
  commit('setHeader');
  commit('showResponse', ' ', {root: true});
  dispatch('table/getMeta', null, {root: true});
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
  commit('toggleCreateModal');
}

async function getRecords({ dispatch, commit, rootState, state }: ActionContext<RecordState, RootState>) {
  const { dbClient } = rootState;
  const { currentTable } = rootState;
  commit('loading', true, {root: true});
  let data;
  try {
    data = await dbClient.scan({
      TableName: currentTable,
      Limit: state.limit,
      ExclusiveStartKey: state.evaluatedKeys[state.lastEvaluatedKeyIndex - 1],
    }).promise();
  } catch (err) {
    commit('showResponse', err, {root: true});
    commit('loading', false, {root: true});
    return;
  }
  commit('setData', data.Items);
  commit('setHeader');
  commit('loading', false, {root: true});
  dispatch('table/getMeta', null, {root: true});
  data.LastEvaluatedKey && commit('addEvaluatedKey', data.LastEvaluatedKey);
}
/*TODO
  Implement new filter logic, which works with dynamodb filterexpr.
*/
async function getLimitedRows({ commit, dispatch }: ActionContext<RecordState, RootState>, limit: any) {
  if (isNaN(limit)) {
    commit('showResponse', {message: 'Limit must be a number'}, {root: true});
  } else {
    commit('setLimit', limit);
    dispatch('getRecords');
  }
}

async function getPreviousRecords({ commit, dispatch }: ActionContext<RecordState, RootState>) {
  commit('lastEvaluatedKeyIndexDec');
  dispatch('getRecords');
}

async function getNextRecords({ commit, dispatch }: ActionContext<RecordState, RootState>) {
  commit('lastEvaluatedKeyIndexInc');
  dispatch('getRecords');
}

async function refreshTable({ commit, dispatch }: ActionContext<RecordState, RootState>) {
  commit('initialState');
  dispatch('getRecords');
}

const actions: ActionTree<RecordState, RootState> = {
  getRecords,
  putItem,
  getItem,
  removeItem,
  generateMeta,
  getLimitedRows,
  getPreviousRecords,
  getNextRecords,
  refreshTable,
};

export default actions;
