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
  const params = {
    TableName: currentTable,
    Key: {
      [state.hashKey]: row[state.hashKey],
      [state.rangeKey]: row[state.rangeKey],
    },
  };
  try {
    await dbClient.delete(params).promise();
  } catch (err) {
    commit('showResponse', err, {root: true});
    return;
  }
  commit('toggleDeleteModal');
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
  commit('toggleCreateModal');
}

async function getRecords({ commit, rootState, state }: ActionContext<RecordState, RootState>) {
  const { dbClient } = rootState;
  const { currentTable } = rootState;
  commit('loading', true, {root: true});
  let data;
  try {
    data = await dbClient.scan({
      TableName: currentTable,
      Limit: state.limit,
      // ExclusiveStartKey: state.limit && state.lastEvaluatedKey,
    }).promise();
  } catch (err) {
    commit('showResponse', err, {root: true});
    commit('loading', false, {root: true});
    return;
  }
  commit('setData', data.Items);
  commit('setHeader');
  // commit('setLastEvaluatedKey', data.LastEvaluatedKey);
  commit('loading', false, {root: true});
}
/*TODO
Vue - show prev, next button with pagenumber in center,
  which is one digit bigger from index of lastevaluated key.

TODO
  if evaluatedKey array exists, then next page button displayed,
  on click next page it gets next elements and
  lastevaluated key pushed to evaluatedKeys array.
  on click previouspage it gets all items with evaluatedkey,
  which i get from evaluatedkeys array page minus one position.
  On click prev i am not pushing new evaluated key in my array.
  On row count change, i get all rows and reset the evaluatedkey array

  TODO
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

const actions: ActionTree<RecordState, RootState> = {
  getRecords,
  putItem,
  getItem,
  removeItem,
  generateMeta,
  getLimitedRows,
};

export default actions;
