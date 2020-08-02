import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { v4 as uuidv4 } from 'uuid';


const { Types, Creators } = createActions({
  displayAlert: ['alert'],
  setAlert: ['message', 'alertType'],
  removeAlert: ['id']
})

export const AlerTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  alerts: []
})

export const setAlert = state => state;

export const displayAlert = (state, { alert }) => {
  const newAlerts = [...state.alerts, alert]
  return state.setIn(['alerts'], newAlerts)
}

export const removeAlert = (state, { id }) => {
  var allAlerts = Object.assign([], state.alerts);
  for (let i = 0; i < allAlerts.length; i++) {
    if (allAlerts[i].id === id)
      allAlerts.splice(i, 1)
  }
  return state.setIn(['alerts'], allAlerts === null ? []: allAlerts)
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DISPLAY_ALERT]: displayAlert,
  [Types.SET_ALERT]: setAlert,
  [Types.REMOVE_ALERT]: removeAlert,
})