import React from 'react';
import {Actions} from '../actions/Actions';
import {Alert} from '../alert/Alert';
import {GifsContainer} from '../gifs/gifsContainer';
import {getRandomTag} from "../../randomTags";
import {useDispatch, useSelector} from "react-redux";
import {getGifs} from '../../redux/gifReducer';
import {getIsDelayMode} from "../../redux/selectors";

import './App.scss';

export const App = () => {
    const dispatch = useDispatch();
    const isDelayMode = useSelector(getIsDelayMode);

    React.useEffect(() => {
        let interval: any;
        if (isDelayMode) {
            interval = setInterval(() => {
                let randomTag = getRandomTag();
                dispatch(getGifs(randomTag));
            }, 5000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isDelayMode, dispatch]);

    return (
        <div className="App">
            <Actions/>
            <GifsContainer/>
            <Alert/>
        </div>
    );
};

