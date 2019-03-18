import dishesSaga from "./dishes/Sagas";
import { all } from 'redux-saga/effects';
import leadersSaga from "./leaders/Sagas";


export default function* rootSaga() {
    yield all([
        dishesSaga(),
        leadersSaga(),
    ]);
}