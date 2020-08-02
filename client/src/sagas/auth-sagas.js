import { call, put } from 'redux-saga/effects';
import { get } from 'lodash';
import actions from 'redux/actions'
import api from 'services/api'
import { setItem } from 'utils/localstorage-utils'

function* loginRequest(api, action) {
  const { resolve, reject } = action;

}

function* signUpRequest(api, action) {
  const { user, resolve, reject } = action;

  const response = yield call(api.signUp, user)
  if (response.status !== 200 || response.status !== 201 || !response.data.success) {
    yield put(actions.setAlert(response.data.message, 'danger'))
  }

  const token = response.data.token;
  setItem('token', token)
  yield put(actions.loadUser())
}

function* loadUserRequest(api) {

  const response = yield call(api.fetchUser)
  if (response.status === 200) {
    const user = response.data;
    yield put(actions.setAlert("You have been logged in", 'success'))
    yield put(actions.loadUserSuccess(user))
  }
  else {
    yield put(actions.setAlert("Could not log you in", 'danger'))
  }
  console.log(response)
}



export default {
  loginRequest,
  signUpRequest,
  loadUserRequest
}