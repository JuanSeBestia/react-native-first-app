import dishesSaga from "./dishes/Sagas";
import { all } from 'redux-saga/effects';


export default function* rootSaga() {
    yield all([
        dishesSaga(),
    ]);
}