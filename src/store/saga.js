import { put, takeLatest } from 'redux-saga/effects';

function* addLinkSaga(action) {
  yield put({ type: 'ADD_LINK', payload: action.payload });
}

function* linkSaga() {
  yield takeLatest('ADD_LINK_REQUEST', addLinkSaga);
}

export default linkSaga;
