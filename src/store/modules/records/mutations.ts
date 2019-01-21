
import { MutationTree } from 'vuex';
import { RecordModuleState } from './types';

function toggleCreateModal(state: RecordModuleState) {
  state.showCreateModal = !state.showCreateModal;
}

function toggleDeleteModal(state: RecordModuleState) {
  state.showDeleteModal = !state.showDeleteModal;
}

function setMeta(state: RecordModuleState, meta: string) {
  state.recordMeta = meta;
}

function setFilterStatus(state: RecordModuleState) {
  state.filtered = true;
}

function setSortBy(state: RecordModuleState, val: string) {
  state.sortBy = val;
}

function setSortOrder(state: RecordModuleState, val: boolean) {
  state.sortOrder = val;
}

function extractKeys(state: RecordModuleState, schema: any) {
  state.hashKey = '';
  state.rangeKey = '';
  for (const item of schema.KeySchema) {
    for (const key in item) {
      if (item[key] === 'HASH') {
        state.hashKey = item.AttributeName;
      } else if (item[key] === 'RANGE') {
        state.rangeKey = item.AttributeName;
      }
    }
  }
}

function setHeader(state: RecordModuleState) {
  const extractData = state.data;
  state.header = [];
  const keyArray: any = [];
  for (const row of extractData) {
    // tslint:disable-next-line:forin
    for (const key in row) {
      if (!keyArray.includes(key)) {
        state.header.push(key);
        keyArray.push(key);
      }
      if (typeof row[key] === 'object') {
        row[key] = JSON.stringify(row[key]);
      }
    }
  }
}

function setData(state: RecordModuleState, data: any[]) {
  state.data = data;
}

function setLimit(state: RecordModuleState, limit: any) {
  if (limit < 0) {
    limit = 1;
  }
  state.limit = limit && Number(limit);
}

function changeFilterValueType(state: RecordModuleState) {
  switch (state.filterParams.valueType) {
    case 'string':
      state.filterParams.filterValue = state.filterParams.filterValue && state.filterParams.filterValue.toString();
      break;
    case 'number':
      state.filterParams.filterValue = Number(state.filterParams.filterValue);
      break;
    case 'null':
      state.filterParams.filterValue = null;
      break;
  }
}

function setFilterValueType(state: RecordModuleState, valueType: string) {
  switch (valueType) {
    case 'string':
      state.filterParams.expressions = ['=', '!=', '<', '>', '<=', '>='];
      break;
    case 'number':
      state.filterParams.expressions = ['=', '!=', '<', '>', '<=', '>='];
      break;
    case 'null':
      if (state.filterParams.filterExpr !== '<>') {
        state.filterParams.filterExpr = '=';
      }
      state.filterParams.expressions = ['=', '!='];
      state.filterParams.filterValue = null;
      break;
  }
}

function setNotEqualExpr(state: RecordModuleState, expr: string) {
  if (expr === '!=') {
      state.filterParams.filterExpr = '<>';
  }
}

function addItemToList(state: RecordModuleState, newItem: any) {
  let edited = false;
  state.data = state.data.map((item) => {
    if (item[state.rangeKey] === newItem[state.rangeKey] &&
        item[state.hashKey] === newItem[state.hashKey]) {
      edited = true;
      return newItem;
    }
    return item;
  });
  !edited && state.data.push(newItem);
}

function deleteItemFromList(state: RecordModuleState, deletedItem: any) {
  state.data = state.data.filter((item) => {
    if (item[state.hashKey] !== deletedItem[state.hashKey]) {
      return item;
    } else if (state.rangeKey) {
      return item[state.rangeKey] !== deletedItem[state.rangeKey];
    }
  });
}

function initialState(state: RecordModuleState) {
  if (state.filterParams.filterColumn) {
    state.limit = 15;
  }
  state.recordMeta = '';
  state.hashKey = '';
  state.rangeKey = '';
  state.filtered = false;
  state.data = [];
  state.header = [];
  state.evaluatedKeys = [];
  state.lastEvaluatedKeyIndex = 0;
  state.sortBy = '';
  state.sortOrder = true;
  state.filterParams = {
    filterColumn: '',
    filterExpr: '=',
    filterValue: '',
    valueType: '',
    types: ['number', 'string', 'null'],
    expressions: ['=', '!=', '<', '>', '<=', '>='],
  };
}

function addEvaluatedKey(state: RecordModuleState, lastEvaluatedKey: any) {
  !state.evaluatedKeys.some((item: any) => {
   return item === lastEvaluatedKey;
  }) && state.evaluatedKeys.push(lastEvaluatedKey || {});
}

function clearEvaluatedKeys(state: RecordModuleState) {
  state.evaluatedKeys = [];
  state.lastEvaluatedKeyIndex = 0;
}

function lastEvaluatedKeyIndexInc(state: RecordModuleState) {
  state.lastEvaluatedKeyIndex++;
}

function lastEvaluatedKeyIndexDec(state: RecordModuleState) {
  state.lastEvaluatedKeyIndex--;
}

const mutations: MutationTree<RecordModuleState> = {
  toggleCreateModal,
  toggleDeleteModal,
  setData,
  addEvaluatedKey,
  setHeader,
  extractKeys,
  setMeta,
  addItemToList,
  initialState,
  deleteItemFromList,
  lastEvaluatedKeyIndexInc,
  lastEvaluatedKeyIndexDec,
  clearEvaluatedKeys,
  setLimit,
  setFilterValueType,
  changeFilterValueType,
  setNotEqualExpr,
  setFilterStatus,
  setSortBy,
  setSortOrder,
};

export default mutations;
