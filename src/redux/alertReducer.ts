import {InferActionsTypes} from "./store";

const initialState = {
    message: '',
    typeAlert: '',
    isVisible: false
};

const alertReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SHOW_MESSAGE":
            return {
                ...state,
                message: action.payload.message,
                typeAlert: action.payload.typeAlert,
                isVisible: true
            };
        case "HIDE_MESSAGE":
            return {
                ...state,
                isVisible: false
            };
        default:
            return state;
    }
};


export const actions = {
    showMessage: (payload: ShowMessagePayloadType) => ({type: "SHOW_MESSAGE", payload} as const),
    hideMessage: () => ({type: "HIDE_MESSAGE"} as const)
}

export default alertReducer;

//Types
type ShowMessagePayloadType = {
    message: string,
    typeAlert: string
}
export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>