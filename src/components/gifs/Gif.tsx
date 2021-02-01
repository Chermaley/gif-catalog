import {GifType} from "../../redux/gifReducer";
import React from "react";

import classes from './Gif.module.scss';

type GifPropTypes = {
    gif: GifType,
    onGifClick: () => void
}

export const Gif: React.FC<GifPropTypes> = ({onGifClick, gif}) => {
    if (typeof gif.url !== 'object') {
        return (
            <div onClick={onGifClick}
                 className={classes.gif}>
                <img src={gif.url} alt={gif.groupName}/>
            </div>
        );
    }
    return (
        <div className={classes.someGif} onClick={onGifClick}>
            {gif.url.map(u => {
                return (
                    <img src={u} key={u} alt={u}/>
                );
            })}
        </div>
    );
};