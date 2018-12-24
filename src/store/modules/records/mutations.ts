
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
  state.attributes = [];
  state.header = [];
  const keyArray: any = [];
  for (const row of extractData) {
    // tslint:disable-next-line:forin
    for (const key in row) {
      if (!keyArray.includes(key)) {
        state.header.push({label: key, prop: `${key}`});
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

function initialState(state: RecordState) {
  state.recordMeta = '';
  state.hashKey = '';
  state.hashKeyLabel = '';
  state.rangeKey = '';
  state.rangeKeyLabel = '';
  state.attributes = [];
  state.data = [];
  state.header = [];
  state.filterText = '';
}

const mutations: MutationTree<RecordState> = {
  toggleActionForm,
  setData,
  setHeader,
  extractKeys,
  setMeta,
  filterTextChange,
  initialState,
};

export default mutations;
