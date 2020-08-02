import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'



const { Types, Creators } = createActions({
  loginRequest: ['resolve', 'reject'],
  loginSuccess: null,
  loginFailure: ['error'],
  logout: null,
})

export const AuthTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  is_authenticated: false,
})

export const loginRequest = state => state.merge({ requesting: true, error: null })

export const loginSuccess = state => state.merge({ requesting: false, error: null, is_authenticated: true })

export const loginFailure = (state, {error}) => state.merge({ requesting: false, error, is_authenticated: false })

export const logout = state => state.merge({ requesting: false, error : null, is_authenticated: false })



export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout
})