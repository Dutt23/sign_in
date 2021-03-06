import { takeLatest, all } from 'redux-saga/effects'
import ActionTypes from 'redux/action-types'
import API from '../services/api'
import authSagas from './auth-sagas';
import alertSagas from './alert-sagas';

const api = API.create()
export default function* root() {
  yield all([
    takeLatest(ActionTypes.SET_ALERT, alertSagas.displayAlert),
    takeLatest(ActionTypes.SIGN_UP, authSagas.signUpRequest, api),
    takeLatest(ActionTypes.LOAD_USER, authSagas.loadUserRequest, api),
    takeLatest(ActionTypes.LOG_OUT, authSagas.logOutRequest),
    takeLatest(ActionTypes.LOGIN_REQUEST, authSagas.loginRequest, api)
  ]);
}