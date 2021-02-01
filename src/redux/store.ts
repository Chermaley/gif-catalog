import {applyMiddleware, combineReducers, createStore, Action} from "redux";
import gifReducer from "./gifReducer";
import thunk, {ThunkAction} from "redux-thunk";

import alertReducer from "./alertReducer";
import actionsReducer from "./actionsReducer";


const rootReducer = combineReducers({
    gif: gifReducer,
    alert: alertReducer,
    actions: actionsReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type CommonThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

const store = createStore(rootReducer, applyMiddleware(thunk));


export default store;