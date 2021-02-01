import {AppStateType} from "./store";

export const getIsGroup = (state: AppStateType) => {
    return state.gif.isGroup;
}
export const getIsLoading = (state: AppStateType) => {
    return state.gif.isLoading;
}
export const getGifs = (state: AppStateType) => {
    return state.gif.gifs;
}
export const getTag = (state: AppStateType) => {
    return state.actions.tag;
}
export const getAlertMessage = (state: AppStateType) => {
    return state.alert.message;
}
export const getAlertType = (state: AppStateType) => {
    return state.alert.alertType;
}
export const getAlertIsVisible = (state: AppStateType) => {
    return state.alert.isVisible;
}
export const getIsDelayMode = (state: AppStateType) => {
    return state.gif.isDelayMode;
}

