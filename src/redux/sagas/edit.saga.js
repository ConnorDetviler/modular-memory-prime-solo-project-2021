import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* createPatch(action) {
    const patch = action.payload;
    // console.log(patch)
    try {
        yield axios.post('/api/patch', patch);
    } catch (err) {
        console.log('error in editPatch POST', err)
    }
}

function* editPatch(action) {
    const patch = action.payload;
    console.log(patch)
    try {
        yield axios.put('/api/patch', patch);
    } catch (err) {
        console.log('error in editPatch PUT', err)
    }
}

function* editSaga() {
    yield takeEvery('CREATE_PATCH', createPatch);
    yield takeEvery('EDIT_PATCH', editPatch)
}

export default editSaga