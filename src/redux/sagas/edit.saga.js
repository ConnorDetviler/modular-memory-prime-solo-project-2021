import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* createPatch(action) {
    const patch = action.payload;
    // console.log(patch)
    try {
        const newID = yield axios.post('/api/patch', patch);
        console.log('id of new patch:', newID)
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

function* deletePatch(action) {
    const patch = action.payload
    console.log(patch)
    try {
        yield axios.delete('/api/patch', { data:
            {
                id: patch.id,
                userID: patch.userID
            }
        });
    } catch (err) {
        console.log('error in editPatch DELETE', err)
    }
}

function* editSaga() {
    yield takeEvery('CREATE_PATCH', createPatch);
    yield takeEvery('EDIT_PATCH', editPatch);
    yield takeEvery('DELETE_PATCH', deletePatch);
}

export default editSaga