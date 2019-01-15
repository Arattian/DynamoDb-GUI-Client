import { RecordState } from './types';

const state: RecordState = {
  showCreateModal: false,
  showDeleteModal: false,
  recordMeta: '',
  hashKey: '',
  rangeKey: '',
  filtered: false,
  data: [],
  header: [],
  limit: 15,
  lastEvaluatedKeyIndex: 0,
  evaluatedKeys: [],
  sortBy: '',
  sortDesc: true,
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
