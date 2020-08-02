import { call, put } from 'redux-saga/effects';
import { get } from 'lodash';
import actions from 'redux/actions'
import api from 'services/api'
import { setItem } from 'utils/localstorage-utils'

function* loginRequest(api, action) {
  const { user, resolve, reject } = action;
  const response = yield call(api.login, user)
  if (response.status !== 200 && response.status !== 201 && !response.data.success) {
    yield put(actions.setAlert(response.data.errors.message, 'danger'))
    return ;
  }
  const token = response.data.token;
  yield put(actions.setAlert("You have been logged in", 'success'))
  setItem('token', token)
  yield put(actions.loadUser())
}

function* signUpRequest(api, action) {
  const { user, resolve, reject } = action;

  const response = yield call(api.signUp, user)
  if (response.status !== 200 && response.status !== 201 && !response.data.success) {
    yield put(actions.setAlert(response.data.message, 'danger'))
    return ;
  }

  const token = response.data.token;
  setItem('token', token)
  yield put(actions.setAlert("You have been logged in", 'success'))
  yield put(actions.loadUser())
}

function* loadUserRequest(api) {

  const response = yield call(api.fetchUser)
  if (response.status === 200) {
    const user = response.data;
    yield put(actions.loadUserSuccess(user))
  }
  else {

    // yield put(actions.setAlert("Please log in to continue", 'danger'))
  }
}

function* logOutRequest() {
  yield put(actions.setAlert("You have been logged out", 'success'))
  localStorage.removeItem('token')
}



export default {
  loginRequest,
  signUpRequest,
  loadUserRequest,
  logOutRequest
}