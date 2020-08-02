import { call, put } from 'redux-saga/effects';
import { get } from 'lodash';
import actions from 'redux/actions'


function* loginRequest(api, action) {
  const { resolve, reject } = action;
  console.log("HERE")
}

export default {
  loginRequest
}