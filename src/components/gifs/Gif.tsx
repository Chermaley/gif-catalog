import {GifType} from "../../redux/gifReducer";
import React from "react";

type GifPropTypes = {
    gif: GifType,
    onGifClick: () => void
}

export const Gif:React.FC<GifPropTypes> = ({onGifClick, gif}) => {
    return (
        <div onClick={onGifClick}>
            {typeof gif.url !== 'object'
                ? <img src={gif.url} alt={gif.groupName}/>
                : gif.url.map(u => <img src={u} alt={u}/>)
            }
        </div>
    )
}