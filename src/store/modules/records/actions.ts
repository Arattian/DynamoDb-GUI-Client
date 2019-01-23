import { ActionTree, ActionContext } from 'vuex';
import { RecordModuleState } from './types';
import { RootState } from '@/store/types';
import { ScanInput } from 'aws-sdk/clients/dynamodb';

/* Format to create 50 rows */
// let Item;
// try {
//   for (let i = 0; i < 50; i++) {
//     const Item = {
//       id: Math.random() + Math.random() + '',
//       [Math.random() + '']: Math.random() + Math.random() + '',
//     };
//     const params: any = {
//       TableName: currentTable,
//       Item,
//     };
//     await dbClient.put(params).promise();
//   }
// }
async function putItem({
  dispatch,
  commit,
  rootState,
  state,
}: ActionContext<RecordModuleState, RootState>) {
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
    commit('showResponse', err, { root: true });
    return;
  }
  commit('addItemToList', Item);
  commit('setHeader');
  commit('toggleCreateModal');
  commit('showResponse', ' ', { root: true });
  dispatch('table/getMeta', null, { root: true });
}

async function getItem(
  { state, commit, rootState }: ActionContext<RecordModuleState, RootState>,
  row: any,
) {
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
    commit('showResponse', err, { root: true });
    return;
  }
  commit('setMeta', data.Item);
}
async function removeItem({
  commit,
  rootState,
  dispatch,
  state,
}: ActionContext<RecordModuleState, RootState>) {
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
    commit('showResponse', err, { root: true });
    return;
  }
  commit('deleteItemFromList', Key);
  commit('toggleDeleteModal');
  commit('setHeader');
  commit('showResponse', ' ', { root: true });
  dispatch('table/getMeta', null, { root: true });
}

async function removeSelected({
  commit,
  rootState,
  dispatch,
  state,
}: ActionContext<RecordModuleState, RootState>) {
  const { dbClient } = rootState;
  const { currentTable } = rootState;
  let result = false;
  /*
    When selected 26 or more items, we need to send multiple request due
    to AWS batchWrite limitation
  */
  state.groupDelete.forEach(async (group: any) => {
    const params = {
      RequestItems: {
        [currentTable]: group,
      },
    };
    let response: any;
    try {
      response = await dbClient.batchWrite(params).promise();
    } catch (err) {
      result = false;
      commit('showResponse', err, { root: true });
      return;
    }
    // If there was unprocessed items, retry deleting.
    if (state.retry < 5 && response.UnprocessedItems.currentTable) {
      commit('setGroupDeleteItems', response.UnprocessedItems.currentTable);
      dispatch('removeSelected');
    }
    state.selectedRows.forEach((item) => {
      commit('deleteItemFromList', item);
    });
    state.showGroupDeleteModal && commit('toggleGroupDeleteModal');
    commit('setHeader');
    dispatch('table/getMeta', null, { root: true });
    result = true;
  });
  result && commit('showResponse', ' ', { root: true });
}

function generateMeta({
  commit,
  state,
}: ActionContext<RecordModuleState, RootState>) {
  const { hashKey, rangeKey } = state;
  let meta;
  rangeKey
    ? (meta = {
        [hashKey]: '',
        [rangeKey]: '',
      })
    : (meta = {
        [hashKey]: '',
      });
  commit('setMeta', meta);
  commit('toggleCreateModal');
}

// tslint:disable-next-line:max-line-length
async function getRecords(
  {
    dispatch,
    commit,
    rootState,
    state,
  }: ActionContext<RecordModuleState, RootState>,
  params: ScanInput,
) {
  const { dbClient } = rootState;
  const { currentTable } = rootState;
  commit('loading', true, { root: true });
  let data;
  try {
    data = await dbClient
      .scan({
        TableName: currentTable,
        Limit: state.limit,
        ExclusiveStartKey: state.evaluatedKeys[state.lastEvaluatedKeyIndex - 1],
        FilterExpression:
          state.filtered &&
          `${state.filterParams.filterColumn} ${
            state.filterParams.filterExpr
          } :${state.filterParams.filterColumn}1`,
        ExpressionAttributeValues: state.filtered && {
          [':' + state.filterParams.filterColumn + '1']: state.filterParams
            .filterValue,
        },
        ...params,
      })
      .promise();
  } catch (err) {
    commit('showResponse', err, { root: true });
    commit('loading', false, { root: true });
    return;
  }
  commit('setData', data.Items);
  commit('setHeader');
  commit('loading', false, { root: true });
  dispatch('table/getMeta', null, { root: true });
  data.LastEvaluatedKey && commit('addEvaluatedKey', data.LastEvaluatedKey);
}

async function filterRecords({
  dispatch,
  getters,
  commit,
}: ActionContext<RecordModuleState, RootState>) {
  if (!getters.scanIsValid) {
    commit(
      'showResponse',
      { message: 'Please fill all scan fields.' },
      { root: true },
    );
    return;
  }
  commit('clearEvaluatedKeys');
  commit('changeFilterValueType');
  commit('setFilterStatus');
  dispatch('getRecords');
}
async function getLimitedRows(
  { state, commit, dispatch }: ActionContext<RecordModuleState, RootState>,
  limit: any,
) {
  if (isNaN(limit)) {
    commit(
      'showResponse',
      { message: 'Limit must be a number' },
      { root: true },
    );
  } else {
    commit('setLimit', limit);
    commit('clearEvaluatedKeys');
    dispatch('getRecords');
  }
}

async function getPreviousRecords({
  state,
  commit,
  dispatch,
}: ActionContext<RecordModuleState, RootState>) {
  commit('lastEvaluatedKeyIndexDec');
  dispatch('getRecords');
}

async function getNextRecords({
  state,
  commit,
  dispatch,
}: ActionContext<RecordModuleState, RootState>) {
  commit('lastEvaluatedKeyIndexInc');
  dispatch('getRecords');
}

async function refreshTable({
  commit,
  dispatch,
}: ActionContext<RecordModuleState, RootState>) {
  commit('initialState');
  dispatch('getRecords');
}

const actions: ActionTree<RecordModuleState, RootState> = {
  getRecords,
  putItem,
  getItem,
  removeItem,
  removeSelected,
  generateMeta,
  getLimitedRows,
  getPreviousRecords,
  getNextRecords,
  refreshTable,
  filterRecords,
};

export default actions;
