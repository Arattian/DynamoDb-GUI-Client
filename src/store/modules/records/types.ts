export interface RecordState {
  showCreateModal: boolean;
  showDeleteModal: boolean;
  recordMeta: string;
  hashKey: string;
  rangeKey: string;
  header: any[];
  data: any[];
  filtered: boolean;
  limit: number | null;
  lastEvaluatedKeyIndex: number;
  evaluatedKeys: any[];
  sortBy: string;
  sortDesc: boolean;
  filterParams: {
    filterColumn: string;
    filterExpr: string;
    filterValue: string | number | null;
    valueType: string;
    types: string[];
    expressions: string[];
  };
}
