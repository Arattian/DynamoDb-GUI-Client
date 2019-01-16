import { ActionTree, ActionContext } from 'vuex';
import { RecordModuleState } from './types';
import { RootState } from '@/store/types';
import { ScanInput } from 'aws-sdk/clients/dynamodb';

async function putItem({ dispatch, commit, rootState, state }: ActionContext<RecordModuleState, RootState>) {
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

async function getItem({state, commit, rootState}: ActionContext<RecordModuleState, RootState>, row: any) {
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
async function removeItem({ commit, rootState, dispatch, state }: ActionContext<RecordModuleState, RootState>) {
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

function generateMeta({commit, state}: ActionContext<RecordModuleState, RootState>) {
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

// tslint:disable-next-line:max-line-length
async function getRecords({ dispatch, commit, rootState, state }: ActionContext<RecordModuleState, RootState>, params: ScanInput) {
  const { dbClient } = rootState;
  const { currentTable } = rootState;
  commit('loading', true, {root: true});
  let data;
  try {

    data = await dbClient.scan({
      TableName: currentTable,
      Limit: state.limit,
      ExclusiveStartKey: state.evaluatedKeys[state.lastEvaluatedKeyIndex - 1],
      ...params,
    },
      /*
      //TODO
      Find better way to task bellow.
       //Ask to Gev
       Row limitation will be disabled when scanning table.
       When limit attribute used i cant scan whole table and find all results from
       filterExpression, so i need to disable it to get all matches.
       Disabling limit can cause read capacity problem.
       */
    ).promise();
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

async function filterRecords({ dispatch, getters, commit, state }: ActionContext<RecordModuleState, RootState>) {
  if (!getters.scanIsValid) {
    commit('showResponse', {message: 'Please fill all scan fields.'}, {root: true});
    return;
  }
  /*
    Limit and FilterExpression not returning the items that match the filter requirements in right way.
  */
  commit('setLimit', null);
  commit('clearEvaluatedKeys');
  commit('changeFilterValueType');
  commit('setFilterStatus');
  const params = {
    FilterExpression:
      `${state.filterParams.filterColumn} ${state.filterParams.filterExpr} :${state.filterParams.filterColumn}1`,
    ExpressionAttributeValues:
      {
        [':' + state.filterParams.filterColumn + '1']: state.filterParams.filterValue,
      },
  };
  dispatch('getRecords', params);
}
async function getLimitedRows({ commit, dispatch }: ActionContext<RecordModuleState, RootState>, limit: any) {
  if (isNaN(limit)) {
    commit('showResponse', {message: 'Limit must be a number'}, {root: true});
  } else {
    commit('setLimit', limit);
    commit('clearEvaluatedKeys');
    dispatch('getRecords');
  }
}

async function getPreviousRecords({ state, commit, dispatch }: ActionContext<RecordModuleState, RootState>) {
  commit('lastEvaluatedKeyIndexDec');
  dispatch('getRecords');
}

async function getNextRecords({ state, commit, dispatch }: ActionContext<RecordModuleState, RootState>) {
  commit('lastEvaluatedKeyIndexInc');
  dispatch('getRecords');
}

async function refreshTable({ commit, dispatch }: ActionContext<RecordModuleState, RootState>) {
  commit('initialState');
  dispatch('getRecords');
}

const actions: ActionTree<RecordModuleState, RootState> = {
  getRecords,
  putItem,
  getItem,
  removeItem,
  generateMeta,
  getLimitedRows,
  getPreviousRecords,
  getNextRecords,
  refreshTable,
  filterRecords,
};

export default actions;
