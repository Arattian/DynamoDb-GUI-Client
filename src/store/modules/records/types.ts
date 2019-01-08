export interface RecordState {
  showCreateModal: boolean;
  showDeleteModal: boolean;
  recordMeta: string;
  hashKey: string;
  hashKeyLabel: string;
  rangeKey: string;
  rangeKeyLabel: string;
  header: any[];
  data: any[];
  attributes: string[];
  filterText: string;
  limit: number | null;
  lastEvaluatedKeyIndex: number;
  evaluatedKeys: any[];
}
