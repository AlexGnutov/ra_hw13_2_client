import {put, spawn, retry, take, fork} from 'redux-saga/effects';
import {fetchServices} from "../api";
import {FETCH_SERVICES_REQUEST} from "../actions/actions";
import {fetchServicesFailure, fetchServicesSuccess} from "../actions/action-creators";

function* watchServicesFetch() {
    while (true) {
        const action = yield take(FETCH_SERVICES_REQUEST);
        yield fork(handleServicesFetch, action);
    }
}

function* handleServicesFetch() {
    try {
        const retryCount = 1;
        const retryDelay = 1000;
        const data = yield retry(
            retryCount, retryDelay, fetchServices
        );
        yield put(fetchServicesSuccess(data));
    } catch (e) {
        yield put(fetchServicesFailure(e.message));
    }
}

/**/
export default function* saga() {
    yield spawn(watchServicesFetch);
}
