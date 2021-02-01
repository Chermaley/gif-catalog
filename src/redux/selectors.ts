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