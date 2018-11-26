import { GetterTree } from 'vuex';
import { RecordState } from './types';
import { RootState } from '@/store/types';

const keys = (state: RecordState) => {
  return {
    hashKey: state.hashKey,
    hashKeyLabel: state.hashKeyLabel,
    rangeKey: state.rangeKey,
    rangeKeyLabel: state.rangeKeyLabel,
  };
};

const visible = (state: RecordState) => state.visible;
const jsonContent = (state: RecordState) => state.jsonContent;
const attributes = (state: RecordState) => state.attributes;
const data = (state: RecordState) => state.data;
const header = (state: RecordState) => state.header;

const getters: GetterTree<RecordState, RootState> = {
  visible,
  jsonContent,
  keys,
  attributes,
  data,
  header,
};
export default getters;
