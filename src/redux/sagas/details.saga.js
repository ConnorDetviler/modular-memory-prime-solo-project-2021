import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchDetails(action) {
    const id = action.payload;
    console.log(id)
    try {
        const detailsGet = yield axios.get(`/api/details/${id}`)
        const patchDetails = detailsGet.data;
        console.log(patchDetails)
    } catch (err) {
        console.log('Error in fetchDetails', err);
    }
}

function* detailSaga() {
    yield takeEvery('FETCH_DETAILS', fetchDetails);
}

export default detailSaga