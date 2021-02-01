import {actions as actionsAl} from "./alertReducer";
import {CommonThunkType, InferActionsTypes} from "./store";
import {getImageApi} from "../api/api";

export type GifType = {
    id: string,
    url: string | string[],
    groupName: string,
    isSome: boolean
}


const initialState = {
    isLoading: false,
    isGroup: false,
    gifs: [] as Array<GifType>,
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
        default:
            return state;
    }
};


export const actions = {
    setGif: (payload: GifType) => ({type: "SET_GIF", payload} as const),
    clearGif: () => ({type: "CLEAR_GIF"} as const),
    changeIsLoading: (payload: boolean) => ({type: "CHANGE_IS_LOADING", payload} as const),
    changeIsGroup: (payload: boolean) => ({type: "CHANGE_IS_GROUP", payload} as const)
}


export const getImages = (tag: string): ThunkType => async (dispatch) => {
        try {
            dispatch(actions.changeIsLoading(true));
            if (!tag.includes(',')) {
                let response = await getImageApi(tag);

                if (response.data.image_url) {
                    let newGif: GifType = {id: response.data.id, url: response.data.image_url, groupName: tag, isSome: false};
                    dispatch(actions.setGif(newGif));
                } else {
                    dispatch(actionsAl.showMessage({message: 'По тегу ничего не найдено', typeAlert: 'alert'}));
                }
            } else {
                //Parallel ajax
                const tagArray = tag.split(',');

                let results = await Promise.all(tagArray.map(tag => {
                    return getImageApi(tag);
                }));
                //image exist check
                const isAllFetched = results.every(response => response.data.image_url);

                if (isAllFetched) {
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
                    dispatch(actionsAl.showMessage({message: 'По одному из тегов ничего не найдено', typeAlert: 'alert'}));
                }
            }

            dispatch(actions.changeIsLoading(false));
        } catch (e) {
            dispatch(actionsAl.showMessage({message: `Произошла http ошибка ${e}`, typeAlert: 'error'}));
        }
};


export default imageReducer;

//Types
export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions | typeof actionsAl>
type ThunkType = CommonThunkType<ActionsType>
