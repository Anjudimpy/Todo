import { createStore } from "redux";
import { rootReducer } from "./rootReducer"

export const store= createStore(
    rootReducer,
    window._REDUX_DEVTOOLS_EXTENSION_&& window._REDUX_DEVTOOLS_EXTENSION_()
)