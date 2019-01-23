export interface RecordModuleState {
  showCreateModal: boolean;
  showDeleteModal: boolean;
  showGroupDeleteModal: boolean;
  recordMeta: any;
  hashKey: string;
  rangeKey: string;
  header: any[];
  data: any[];
  filtered: true | undefined;
  limit: number | undefined;
  lastEvaluatedKeyIndex: number;
  evaluatedKeys: any[];
  sortBy: string;
  selectedRows: any[];
  groupDelete: any[];
  retry: number;
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
