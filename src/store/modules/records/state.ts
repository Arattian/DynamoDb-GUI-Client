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
  limit: null,
  lastEvaluatedKey: null,
};

export default state;
