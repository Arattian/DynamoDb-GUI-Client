<template lang="pug">
  EditDatabaseModal(
    :currentDb="currentDb"
    :cancelHandler="toggleEditModal"
    :fillEditForm="fillEditForm"
    :submitRemoteForm="submitRemoteForm"
    :submitLocalForm="submitLocalForm"
    :regionList="database.regionList"
    :submitForm="database.submitForm"
  )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Mutation, Getter, State } from 'vuex-class';
import { TableModuleState } from '../store/modules/table/types';
import EditDatabaseModal from '../components/EditDatabaseModal.vue';

const namespace: string = 'database';
@Component({
  components: {
    EditDatabaseModal,
  },
})
export default class DatabaseModals extends Vue {
  @Getter private currentDb!: string;
  @State(namespace) private database!: any;
  @Mutation('toggleEditModal', { namespace }) private toggleEditModal!: any;
  @Mutation('fillEditForm', { namespace }) private fillEditForm!: any;
  @Action('submitRemoteForm', { namespace }) private submitRemoteForm!: any;
  @Action('submitLocalForm', { namespace }) private submitLocalForm!: any;
}
</script>

<style lang="stylus" scoped>
</style>
