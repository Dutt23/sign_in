import { call, put , delay} from 'redux-saga/effects';
import { get } from 'lodash';
import actions from 'redux/actions'
import { v4 as uuidv4 } from 'uuid';

function* displayAlert(action) {
  const { message, alertType } = action;
  const alert = {
      message,
      alertType,
      id : uuidv4()
  }

  yield put(actions.displayAlert(alert))
  yield delay(2000)
  yield put(actions.removeAlert(alert.id))
}

export default {
  displayAlert
}