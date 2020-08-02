import { takeLatest, all } from 'redux-saga/effects'
import ActionTypes from 'redux/action-types'
import API from '../services/api'
import authSagas from './auth-sagas';


const api = API.create()
export default function* root() {
  yield all([
    takeLatest(ActionTypes.LOGIN_REQUEST, authSagas.loginRequest, api)
  ]);}