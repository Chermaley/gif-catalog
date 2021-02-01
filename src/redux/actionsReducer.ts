import {InferActionsTypes} from "./store";

const initialState = {
    tag: ''
};

const actionsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_TAG":
            return {
                ...state,
                tag: action.payload
            };
        default:
            return state;
    }
};

export default actionsReducer;


export const actions = {
    setGroupName: (payload: string) => ({type: "SET_TAG", payload} as const)
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;