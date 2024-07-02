import { applyMiddleware, compose, createStore } from "redux";
import { userReducer } from "../reducer/userReducer";
import thunk from "redux-thunk";

export const store = createStore(
    userReducer,
    compose(
        applyMiddleware(thunk),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);


// store.subscribe(() => console.log(store.getState()));
