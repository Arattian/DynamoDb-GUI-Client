export interface RecordState {
  visible: boolean;
  recordMeta: string;
  hashKey: string;
  hashKeyLabel: string;
  rangeKey: string;
  rangeKeyLabel: string;
  header: any[];
  data: any[];
  attributes: string[];
  pageSize: number;
  pageNumber: number;
  filterText: string;
}
