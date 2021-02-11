import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllPatches(action) {
    let id = action.payload
    console.log('fetching all patches for user:', id)
    try {
        const patchesGet = yield axios.get(`/api/all-patches/${id}`)
        const patches = patchesGet.data;

        console.log('all patches from router:', patches)

        yield put({
            type: 'SET_ALL_PATCHES',
            payload: patches
        })
    } catch (err) {
        console.log('Error in fetchAllPatches', err);
    }
}

function* fetchAllPatchesSaga() {
    yield takeEvery('FETCH_ALL_PATCHES', fetchAllPatches);
}

export default fetchAllPatchesSaga