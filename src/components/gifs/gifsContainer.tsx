import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGifs, getIsGroup} from "../../redux/selectors";
import {Gif} from "./Gif";
import {actions} from "../../redux/actionsReducer";
import {GifsGroup} from "./GifsGroup";

import classes from './Gif.module.scss';
import {GifType} from "../../redux/gifReducer";

type SortedGifsType = {
    [groupName: string] : GifType[]
}

export const GifsContainer: React.FC = () => {
    const [sortedGifs, setSortedGifs] = React.useState<SortedGifsType>({});

    const isGroup = useSelector(getIsGroup);
    const gifs = useSelector(getGifs);
    const dispatch = useDispatch();

    const onGifClick = (tag: string | string[]) => {
        dispatch(actions.setGroupName(tag.toString()));
    };

    React.useEffect(() => {
        const sortGifs = () => {
            const sorted: SortedGifsType = gifs.reduce((acc: any, gif) => {
                if (!acc[gif.groupName]) {
                    acc[gif.groupName] = [];
                }
                acc[gif.groupName].push(gif);
                return acc;
            }, []);
            setSortedGifs(sorted);
        };
        if (gifs.length && isGroup) {
            sortGifs();
        }
    }, [gifs, isGroup]);

    if (!gifs.length) return <p>У вас еще нет гифок</p>;

    return (
        <div>
            {isGroup
                ? <div>
                    {Object.keys(sortedGifs).map((groupName, key) => <GifsGroup
                        onGifClick={onGifClick}
                        key={key}
                        gifs={sortedGifs[groupName]}
                        groupName={groupName}/>)}
                </div>
                : <div className={classes.container}>
                    {gifs.map(g => <Gif onGifClick={() => onGifClick(g.groupName)}
                                        key={g.id}
                                        gif={g}/>
                    )}
                </div>
            }
        </div>
    );
};

