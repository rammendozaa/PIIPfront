import { combineReducers } from 'redux'
import template from './template'
import activity from './activity'

const rootReducer = combineReducers({
  userTemplate: template,
  userActivity: activity
})

export default rootReducer
