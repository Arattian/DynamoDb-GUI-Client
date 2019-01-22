import { RecordModuleState } from './types';

const state: RecordModuleState = {
  showCreateModal: false,
  showDeleteModal: false,
  recordMeta: '',
  hashKey: '',
  rangeKey: '',
  filtered: undefined,
  data: [],
  header: [],
  limit: 15,
  lastEvaluatedKeyIndex: 0,
  evaluatedKeys: [],
  sortBy: '',
  sortOrder: true,
  filterParams: {
    filterColumn: '',
    filterExpr: '=',
    filterValue: '',
    valueType: '',
    types: ['number', 'string', 'isNull'],
    expressions: ['=', '!=', '<', '>', '<=', '>='],
  },
};

export default state;
