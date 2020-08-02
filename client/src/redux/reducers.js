import { combineReducers } from 'redux'

export default combineReducers({ 
    auth: require('./auth-reducer').reducer
})