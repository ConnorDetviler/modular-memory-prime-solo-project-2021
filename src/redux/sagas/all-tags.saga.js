import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllTags(action) {

    try {
        const tagsGet = yield axios.get(`/api/all-tags`)
        const tags = tagsGet.data;

        console.log('all tags from router:', tags)

        yield put({
            type: 'SET_ALL_TAGS',
            payload: tags
        })
    } catch (err) {
        console.log('Error in fetchAllTags', err);
    }
}

function* fetchAllTagsSaga() {
    yield takeEvery('FETCH_ALL_TAGS', fetchAllTags);
}

export default fetchAllTagsSaga