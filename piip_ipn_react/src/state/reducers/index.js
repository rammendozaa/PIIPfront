import { combineReducers } from "redux"
import template from "./template"

const rootReducer = combineReducers({
    userTemplate: template,
});

export default rootReducer;