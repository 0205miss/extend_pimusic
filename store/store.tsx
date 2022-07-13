import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// Reducers.
import auth from "./auth/authReducer";
import alert from "./alert/alertReducer";
import AddProduct from "./Tanent/reducer"

// The inital state. Will be merged with partials states.
const initState = {};

// Combine all partial reducers.
const rootReducer = combineReducers({
    alert,
    auth,
    AddProduct,
});

const middleware = [thunk];

// Create reduc store of all existing stores. Also init devtools.
const store = createStore(
    rootReducer,
    initState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
