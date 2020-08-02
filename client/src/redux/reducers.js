import { combineReducers } from 'redux'

export default combineReducers({ 
    auth: require('./auth-reducer').reducer,
    alert: require('./alert-reducer').reducer
})