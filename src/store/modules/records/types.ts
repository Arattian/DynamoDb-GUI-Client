export interface RecordModuleState {
  showCreateModal: boolean;
  showDeleteModal: boolean;
  recordMeta: string;
  hashKey: string;
  rangeKey: string;
  header: any[];
  data: any[];
  filtered: boolean;
  limit: number | undefined;
  lastEvaluatedKeyIndex: number;
  evaluatedKeys: any[];
  sortBy: string;
  sortOrder: boolean;
  filterParams: FilterParams;
}

export interface FilterParams {
  filterColumn: string;
  filterExpr: string;
  filterValue: string | number | null;
  valueType: string;
  types: string[];
  expressions: string[];
}
