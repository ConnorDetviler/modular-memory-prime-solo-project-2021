import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPatchNames(action) {

    const user_id = action.payload;

    console.log('in fetchPatchNames, user id is', user_id);
    try {
        const namesGet = yield axios.get(`/api/patch-names/${user_id}`)
        const patchNames = namesGet.data;

        console.log('patch names from router:', patchNames)

        yield put({
            type: 'SET_PATCH_NAMES',
            payload: patchNames
        })
    } catch (err) {
        console.log('Error in fetchPatchNames', err);
    }
}

function* patchNamesSaga() {
    yield takeEvery('FETCH_PATCH_NAMES', fetchPatchNames);
}

export default patchNamesSaga