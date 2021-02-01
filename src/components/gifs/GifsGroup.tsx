import {GifType} from "../../redux/gifReducer";
import {Gif} from "./Gif";
import React from "react";

import classes from './Gif.module.scss';

type GifsGroupPropTypes = {
    gifs: GifType[],
    groupName: string,
    onGifClick: (groupName: string) => void
}

export const GifsGroup: React.FC<GifsGroupPropTypes> = ({gifs, groupName, onGifClick}) => {
    return (
        <div>
            <div className={classes.groupName}>{groupName}</div>
            <div className={classes.group}>
                {gifs.map(g => {
                    return <Gif onGifClick={() => onGifClick(g.groupName)}
                                key={g.id}
                                gif={g}/>
                })}
            </div>
        </div>
    )
}