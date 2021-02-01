import {actions as actionsAl} from "./alertReducer";
import {CommonThunkType, InferActionsTypes} from "./store";
import {getImageApi} from "../api/api";

const initialState = {
    isLoading: false,
    isGroup: false,
    gifs: [] as Array<GifType>,
    isDelayMode: false
};

const imageReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_GIF":
            return {
                ...state,
                isLoading: false,
                gifs: [action.payload, ...state.gifs]
            };
        case "CLEAR_GIF":
            return {
                ...state,
                gifs: []
            };
        case "CHANGE_IS_GROUP":
            return {
                ...state,
                isGroup: action.payload
            };
        case "CHANGE_IS_LOADING":
            return {
                ...state,
                isLoading: action.payload
            };
        case "CHANGE_IS_DELAY_MODE":
            return {
                ...state,
                isDelayMode: action.payload
            }
        default:
            return state;
    }
};

export const actions = {
    setGif: (payload: GifType) => ({type: "SET_GIF", payload} as const),
    clearGif: () => ({type: "CLEAR_GIF"} as const),
    changeIsLoading: (payload: boolean) => ({type: "CHANGE_IS_LOADING", payload} as const),
    changeIsGroup: (payload: boolean) => ({type: "CHANGE_IS_GROUP", payload} as const),
    changeIsDelayMode: (payload: boolean) => ({type: "CHANGE_IS_DELAY_MODE", payload} as const)
}

export const getGifs = (tag: string): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.changeIsLoading(true));
        if (tag === 'delay') {
            dispatch(actionsAl.showMessage({alertType: "alert", message: "Вы запустили DelayMode"}))
            dispatch(actions.changeIsDelayMode(true));
        } else if (!tag.includes(',')) {
            await dispatch(_getOneGif(tag));
        } else {
            await dispatch(_getSomeGifs(tag));
        }
    } catch (e) {
        dispatch(actionsAl.showMessage({message: `Произошла http ошибка`, alertType: 'error'}));
    } finally {
        dispatch(actions.changeIsLoading(false));
    }
};

const _getOneGif = (tag: string): ThunkType => async (dispatch) => {
    let response = await getImageApi(tag);

    if (response.data.image_url) {
        let newGif: GifType = {id: response.data.id, url: response.data.image_url, groupName: tag, isSome: false};
        dispatch(actions.setGif(newGif));
    } else {
        dispatch(actionsAl.showMessage({message: 'По тегу ничего не найдено', alertType: 'alert'}));
    }
}

const _getSomeGifs = (tag: string): ThunkType => async (dispatch) => {
    const tagArray = tag.split(',');

    let results = await Promise.all(tagArray.map(tag => {
        return getImageApi(tag);
    }));

    const isAllGifsFetched = results.every(response => response.data.image_url);

    if (isAllGifsFetched) {
        let someGif = results.reduce<GifType>((prev, item) => {
            if (typeof prev.url !== "string") {
                prev.url.push(item.data.image_url);
            }
            prev.id += item.data.id;
            prev.groupName = tagArray.toString();
            return prev;
        }, {url: [], id: '', groupName: '', isSome: true});
        dispatch(actions.setGif(someGif));
    } else {
        dispatch(actionsAl.showMessage({message: 'По одному из тегов ничего не найдено', alertType: 'alert'}));
    }
}

export default imageReducer;

//Types
export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions | typeof actionsAl>
type ThunkType = CommonThunkType<ActionsType>
export type GifType = {
    id: string,
    url: string | string[],
    groupName: string,
    isSome: boolean
}
