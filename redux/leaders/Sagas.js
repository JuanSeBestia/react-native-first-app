import api from '../../api/axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as ActionCreators from './ActionCreators'
import * as ActionTypes from './ActionTypes'



export function* fetchLeadersSaga(action) {
    try {
        yield put(ActionCreators.leadersLoading())
        const leaders = yield call(api.leaders.fecthAll)
        yield put(ActionCreators.addLeaders(leaders));
    } catch (error) {
        console.log("fetchLeadersSaga:error", error)
        yield put(ActionCreators.leadersFailed(error.message));
    }
}

export default function* leadersSaga() {
    yield takeLatest(ActionTypes.FETCH_LEADERS, fetchLeadersSaga)
}