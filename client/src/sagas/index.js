import { takeLatest, all } from 'redux-saga/effects'
import ActionTypes from 'redux/action-types'
import API from '../services/api'
import authSagas from './auth-sagas';
import alertSagas from './alert-sagas';

const api = API.create()
export default function* root() {
  yield all([
    takeLatest(ActionTypes.LOGIN_REQUEST, authSagas.loginRequest, api),
    takeLatest(ActionTypes.SET_ALERT, alertSagas.displayAlert),
    takeLatest(ActionTypes.SIGN_UP, authSagas.signUpRequest, api),
    takeLatest(ActionTypes.LOAD_USER, authSagas.loadUserRequest, api)
  ]);}