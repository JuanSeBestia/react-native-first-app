import api from '../../api/axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as ActionCreators from './ActionCreators'
import * as ActionTypes from './ActionTypes'



export function* fetchDishesSaga(action) {
    try {
        yield put(ActionCreators.dishesLoading())
        const dishes = yield call(api.dishes.fecthAll)
        yield put(ActionCreators.addDishes(dishes));
    } catch (error) {
        console.error("fetchDishesSaga:error", error)
        yield put(ActionCreators.dishesFailed({ error: error.response }));
    }
}

export default function* dishesSaga() {
    yield takeLatest(ActionTypes.FETCH_DISHES, fetchDishesSaga)
}