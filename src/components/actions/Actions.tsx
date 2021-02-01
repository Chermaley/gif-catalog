import React, {ChangeEvent} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getIsDelayMode, getIsGroup, getIsLoading, getTag} from "../../redux/selectors";
import {actions as actionsGif, getGifs} from "../../redux/gifReducer";
import {actions as actionsAc} from "../../redux/actionsReducer";
import {actions as actionsAl} from "../../redux/alertReducer";
import {validateTagInput} from "../../utils";

import classes from "./Actions.module.scss";
import {getRandomTag} from "../../randomTags";

export const Actions: React.FC = () => {
    const tag = useSelector(getTag);
    const isGroup = useSelector(getIsGroup);
    const isLoading = useSelector(getIsLoading);
    const dispatch = useDispatch();

    const isDelayMode = useSelector(getIsDelayMode);

    React.useEffect(() => {
        let interval: number;
        if (isDelayMode) {
            interval = window.setInterval(() => {
                let randomTag = getRandomTag();
                dispatch(getGifs(randomTag));
            }, 5000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isDelayMode, dispatch]);

    const loadButtonHandler = () => {
        dispatch(actionsGif.changeIsDelayMode(false));
        if (tag) {
            dispatch(getGifs(tag));
            dispatch(actionsAc.setGroupName(''));
        } else {
            dispatch(actionsAl.showMessage({alertType: "alert", message: "Заполните поле 'тег'"}));
        }
    };

    const clearButtonHandler = () => {
        dispatch(actionsGif.changeIsDelayMode(false));
        dispatch(actionsAc.setGroupName(''));
        dispatch(actionsGif.clearGif());
    };

    const isGroupButtonHandler = (isGroup: boolean) => {
        dispatch(actionsGif.changeIsDelayMode(false));
        dispatch(actionsGif.changeIsGroup(isGroup));
    };

    const tagInputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        dispatch(actionsAc.setGroupName(validateTagInput(value)));
    };

    return (
        <div className={classes.actions}>
            <input className={classes.input}
                   type="text"
                   placeholder={'Введите тэг'}
                   value={tag}
                   onChange={(e) => tagInputHandler(e)}/>

            <button className={classes.btn + ' ' + classes.primary}
                    disabled={isLoading}
                    onClick={loadButtonHandler}>
                {isLoading ? 'Загрузка...' : 'Загрузить'}
            </button>

            <button className={classes.btn + ' ' + classes.danger}
                    onClick={clearButtonHandler}>
                Очистить
            </button>

            <button className={classes.btn + ' ' + classes.secondary}
                    onClick={() => {
                        isGroupButtonHandler(!isGroup);
                    }}>
                {isGroup ? 'Разгруппировать' : 'Группировать'}
            </button>
        </div>
    );
};
