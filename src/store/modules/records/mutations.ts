
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

function setHeader(state: RecordState, data: any[]) {
  let extractData = state.data;
  state.attributes = [];
  if (data) {
    extractData = data;
  }
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

function newAttribute(state: RecordState, attributeName: string) {
  state.attributes.indexOf(attributeName) === -1 && state.attributes.push(attributeName);
}

function changeCurrentPage(state: RecordState, val: number) {
  state.pageNumber = val;
}

function changePageSize(state: RecordState, val: number) {
  state.pageSize = val;
}

function setNewMeta(state: RecordState, newRecordMeta: string) {
  state.recordMeta = newRecordMeta;
}

const mutations: MutationTree<RecordState> = {
  toggleActionForm,
  setData,
  setHeader,
  extractKeys,
  setMeta,
  filterTextChange,
  newAttribute,
  setNewMeta,
  changeCurrentPage,
  changePageSize,
};

export default mutations;
