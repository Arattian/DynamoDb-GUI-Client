import { RecordState } from './types';

const state: RecordState = {
  showCreateModal: false,
  showDeleteModal: false,
  recordMeta: '',
  hashKey: '',
  hashKeyLabel: '',
  rangeKey: '',
  rangeKeyLabel: '',
  attributes: [],
  data: [],
  header: [],
  filterText: '',
  limit: 15,
  lastEvaluatedKeyIndex: 0,
  evaluatedKeys: [],
};

export default state;
