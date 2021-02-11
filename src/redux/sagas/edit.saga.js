import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* editPatch(action) {
    const patch = action.payload;
    // console.log(patch)
    try {
        yield axios.post('/api/patch', patch);
    } catch (err) {
        console.log('error in editPatch', err)
    }
}

function* editSaga() {
    yield takeEvery('EDIT_PATCH', editPatch);
}

export default editSaga