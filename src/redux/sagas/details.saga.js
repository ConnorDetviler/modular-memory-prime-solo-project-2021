import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchDetails(action) {
    const id = action.payload;
    console.log(id)
    try {
        const detailsGet = yield axios.get(`/api/details/${id}`)
        const patchDetails = detailsGet.data[0];

        console.log('patch details from router:', patchDetails)

        yield put({
            type: 'SET_DETAILS',
            payload: patchDetails
        })
    } catch (err) {
        console.log('Error in fetchDetails', err);
    }
}

function* clearDetails() {
    console.log('clearing details reducer')
    yield put({
        type: 'ERASE_DETAILS'
    })
}

function* detailSaga() {
    yield takeEvery('FETCH_DETAILS', fetchDetails);
    yield takeEvery('CLEAR_DETAILS', clearDetails);
}

export default detailSaga