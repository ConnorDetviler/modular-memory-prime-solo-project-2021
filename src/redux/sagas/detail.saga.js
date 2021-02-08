import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchDetails(action) {
    console.log(action.payload)
}

function* detailSaga() {
    yield takeEvery('FETCH_DETAILS', fetchDetails);
}

export default detailSaga