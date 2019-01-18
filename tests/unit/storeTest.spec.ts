import storeConfig from '@/store';
import database from '@/store/modules/database';
import table from '@/store/modules/database';
import record from '@/store/modules/database';
import { fakeSubmitForm, emptySubmitForm, duplicateDbName, wrongSubmitForm } from './testData';

const store = storeConfig;





test('Database submitted with missing field', async () => {
  database.state.submitForm = emptySubmitForm;
  await store.dispatch('database/setCredentials');
  expect(database.state.list.length).toBe(0);
});

test('Database submitted with missing field', async () => {
  database.state.submitForm = wrongSubmitForm;
  const response = await store.dispatch('database/setCredentials');
  expect(response).toBeUndefined();
});

test('Database added successfully', async () => {
  database.state.submitForm = fakeSubmitForm;
  await store.dispatch('database/setCredentials');
  localStorage.setItem(`${fakeSubmitForm.name}-db`, JSON.stringify(database));
  expect(database.state.list.length).toBe(1);
  database.state.submitForm = duplicateDbName;
  await store.dispatch('database/setCredentials');
  expect(store.state.response.message).toBe('Database with that name already exists');
});
