import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGifs, getIsGroup} from "../../redux/selectors";
import { Gif } from "./Gif";
import {actions} from "../../redux/actionsReducer";
import {GifsGroup} from "./GifsGroup";

type GifsContainerType = {
    classes: any
}

export const GifsContainer: React.FC<GifsContainerType> = ({classes}) => {
    const [sortedGifs, setSortedGifs] = React.useState({});

    const isGroup = useSelector(getIsGroup);
    const gifs = useSelector(getGifs);
    const dispatch = useDispatch();

    const onGifClick = (tag: string | string[]) => {
        dispatch(actions.setGroupName(tag.toString()));
    }

    React.useEffect(() => {
        const sortGifs = () => {
            const sorted = gifs.reduce((acc: any, gif) => {
                    if (!acc[gif.groupName]) {
                        acc[gif.groupName] = [];
                    }
                    acc[gif.groupName].push(gif);
                    return acc;
            }, []);
                setSortedGifs(sorted)
        }
        if (gifs.length && isGroup) {
            sortGifs();
        }
    }, [gifs, isGroup])

    if (!gifs.length) return <p>У вас еще нет гифок</p>

    return (
        <div>
            {isGroup
                ? <div>
                    { Object.keys(sortedGifs).map( (groupName, key) => <GifsGroup
                        onGifClick={onGifClick}
                        key = {key}// @ts-ignore
                        gifs = {sortedGifs[groupName]}
                        groupName = {groupName}/>) }
                </div>
                : <div className={classes.gifContainer}>
                    {gifs.map(g => {
                        return <Gif onGifClick={() => onGifClick(g.groupName)}
                                    key={g.id}
                                    gif={g}/>
                    })}
                </div>
            }
        </div>
    )
}

