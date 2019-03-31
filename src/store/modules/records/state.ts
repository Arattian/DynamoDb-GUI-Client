import { RecordModuleState } from './types';

const state: RecordModuleState = {
  showCreateModal: false,
  showDeleteModal: false,
  showGroupDeleteModal: false,
  recordMeta: {},
  hashKey: '',
  rangeKey: '',
  filtered: undefined,
  data: [],
  header: [],
  limit: 15,
  lastEvaluatedKeyIndex: 0,
  evaluatedKeys: [],
  selectedRows: [],
  groupDelete: [],
  retry: 0,
  filterParams: {
    filterColumn: '',
    filterExpr: '=',
    filterValue: '',
    valueType: '',
    types: ['number', 'string', 'isNull', 'boolean'],
    expressions: ['=', '!=', '<', '>', '<=', '>='],
  },
};

export default state;
