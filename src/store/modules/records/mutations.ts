
import { MutationTree } from 'vuex';
import { RecordState } from './types';

function toggleActionForm(state: RecordState) {
  state.visible = !state.visible;
}
function setMeta(state: RecordState, meta: string) {
  state.recordMeta = meta;
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
        state.hashKeyLabel = item.AttributeName.toUpperCase();
      } else if (item[key] === 'RANGE') {
        state.rangeKey = item.AttributeName;
        state.rangeKeyLabel = item.AttributeName.toUpperCase();
      }
    }
  }
}

function setHeader(state: RecordState) {
  const extractData = state.data;
  state.attributes = [];
  state.header = [];
  const keyArray: any = [];
  for (const row of extractData) {
    // tslint:disable-next-line:forin
    for (const key in row) {
      if (!keyArray.includes(key)) {
        state.header.push({label: key.toUpperCase(), prop: `${key}`});
        keyArray.push(key);
      }
      if (row[key] + '' === '[object Object]') {
        row[key] = JSON.stringify(row[key]);
      } else {
        row[key] += '';
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

function changeCurrentPage(state: RecordState, val: number) {
  state.pageNumber = val;
}

function changePageSize(state: RecordState, val: number) {
  state.pageSize = val;
}

function initialState(state: RecordState) {
  state.recordMeta = '';
  state.hashKey = '';
  state.hashKeyLabel = '';
  state.rangeKey = '';
  state.rangeKeyLabel = '';
  state.attributes = [];
  state.data = [];
  state.header = [];
  state.pageSize = 15;
  state.pageNumber = 1;
  state.filterText = '';
}

const mutations: MutationTree<RecordState> = {
  toggleActionForm,
  setData,
  setHeader,
  extractKeys,
  setMeta,
  filterTextChange,
  changeCurrentPage,
  changePageSize,
  initialState,
};

export default mutations;
