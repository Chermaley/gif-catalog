import {GifType} from "../../redux/gifReducer";
import {Gif} from "./Gif";
import React from "react";

type GifsGroupPropTypes = {
    gifs: GifType[],
    groupName: string,
    onGifClick: (groupName: string) => void
}
export const GifsGroup: React.FC<GifsGroupPropTypes> = ({gifs, groupName, onGifClick}) => {
    return (
        <div>
            <span>{groupName}</span>
            {gifs.map(g => {
                return <Gif onGifClick={() => onGifClick(g.groupName)}
                            key={g.id}
                            gif={g}/>
            })}
        </div>
    )
}