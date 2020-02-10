// Este arquivo é para juntar todos os sagas em um só arquivo
// all juntar vários sagas
import { all } from 'redux-saga/effects';

// Sagas
import cart from './Cart/sagas';

export default function* rootSaga() {
  return yield all([cart]);
}
