
import { MutationTree } from 'vuex';
import { RecordState } from './types';

function toggleCreateModal(state: RecordState) {
  state.showCreateModal = !state.showCreateModal;
}

function toggleDeleteModal(state: RecordState) {
  state.showDeleteModal = !state.showDeleteModal;
}

function setMeta(state: RecordState, meta: string) {
  state.recordMeta = meta;
}

function setFilterStatus(state: RecordState) {
  state.filtered = true;
}

function extractKeys(state: RecordState, schema: any) {
  state.hashKey = '';
  state.hashKeyLabel = '';
  state.rangeKey = '';
  state.rangeKeyLabel = '';
  for (const item of schema.KeySchema) {
    for (const key in item) {
      if (item[key] === 'HASH') {
        state.hashKey = item.AttributeName;
        state.hashKeyLabel = item.AttributeName;
      } else if (item[key] === 'RANGE') {
        state.rangeKey = item.AttributeName;
        state.rangeKeyLabel = item.AttributeName;
      }
    }
  }
}

function setHeader(state: RecordState) {
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

function setData(state: RecordState, data: any[]) {
  state.data = data;
}

function filterTextChange(state: RecordState, filterText: any) {
  state.filterText = filterText.target.value;
}

function setLimit(state: RecordState, limit: any) {
  if (!isNaN(limit)) {
    state.limit = limit;
    state.lastEvaluatedKeyIndex = 0;
    state.evaluatedKeys = [];
  }
}

function changeFilterValueType(state: RecordState) {
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

function setFilterValueType(state: RecordState, valueType: string) {
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

function setNotEqualExpr(state: RecordState, expr: string) {
  if (expr === '!=') {
      state.filterParams.filterExpr = '<>';
  }
}

function addItemToList(state: RecordState, newItem: any) {
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

function deleteItemFromList(state: RecordState, deletedItem: any) {
  state.data = state.data.filter((item) => {
    if (item[state.hashKey] !== deletedItem[state.hashKey]) {
      return item;
    } else if (state.rangeKey) {
      return item[state.rangeKey] !== deletedItem[state.rangeKey];
    }
  });
}

function initialState(state: RecordState) {
  if (state.filterParams.filterColumn) {
    state.limit = 15;
  }
  state.recordMeta = '';
  state.hashKey = '';
  state.hashKeyLabel = '';
  state.rangeKey = '';
  state.rangeKeyLabel = '';
  state.filtered = false;
  state.data = [];
  state.header = [];
  state.filterText = '';
  state.evaluatedKeys = [];
  state.lastEvaluatedKeyIndex = 0;
  state.sortBy = '';
  state.sortDesc = true;
  state.filterParams = {
    filterColumn: '',
    filterExpr: '=',
    filterValue: '',
    valueType: '',
    types: ['number', 'string', 'null'],
    expressions: ['=', '!=', '<', '>', '<=', '>='],
  };
}

function addEvaluatedKey(state: RecordState, lastEvaluatedKey: any) {
  !state.evaluatedKeys.some((item: any) => {
   return item === lastEvaluatedKey;
  }) && state.evaluatedKeys.push(lastEvaluatedKey || {});
}

function clearEvaluatedKeys(state: RecordState) {
  state.evaluatedKeys = [];
  state.lastEvaluatedKeyIndex = 0;
}

function lastEvaluatedKeyIndexInc(state: RecordState) {
  state.lastEvaluatedKeyIndex++;
}

function lastEvaluatedKeyIndexDec(state: RecordState) {
  state.lastEvaluatedKeyIndex--;
}

const mutations: MutationTree<RecordState> = {
  toggleCreateModal,
  toggleDeleteModal,
  setData,
  addEvaluatedKey,
  setHeader,
  extractKeys,
  setMeta,
  filterTextChange,
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
};

export default mutations;
