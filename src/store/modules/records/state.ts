import { RecordState } from './types';

const state: RecordState = {
  visible: false,
  recordMeta: '',
  hashKey: '',
  hashKeyLabel: '',
  rangeKey: '',
  rangeKeyLabel: '',
  attributes: [],
  data: [],
  header: [],
  pageSize: 15,
  pageNumber: 1,
  filterText: '',
};

export default state;
