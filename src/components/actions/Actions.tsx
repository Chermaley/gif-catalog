import React, {ChangeEvent} from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {useDispatch, useSelector} from 'react-redux';
import {getIsGroup, getIsLoading, getTag} from "../../redux/selectors";
import {actions as actionsGif, getImages} from "../../redux/gifReducer";
import {actions as actionsAc} from "../../redux/actionsReducer";
import {actions as actionsAl} from "../../redux/alertReducer";
import { validateTagInput } from '../../utils';


type ActionsPropTypes = {
    classes: any
}

export const Actions: React.FC<ActionsPropTypes> = ({classes}) => {

    const tag = useSelector(getTag);
    const isGroup = useSelector(getIsGroup);
    const isLoading = useSelector(getIsLoading);
    const dispatch = useDispatch();

    const loadButtonHandler = () => {
        if (tag) {
            dispatch(getImages(tag));
            dispatch(actionsAc.setGroupName(''));
        } else {
            dispatch(actionsAl.showMessage({typeAlert: "alert", message: "заполните поле 'тег'"}))
        }
    }

    const clearButtonHandler = () => {
        dispatch(actionsAc.setGroupName(''));
        dispatch(actionsGif.clearGif());
    }

    const isGroupButtonHandler = (isGroup: boolean) => {
        dispatch(actionsGif.changeIsGroup(isGroup))
    }


    const tagInputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const value = e.target.value;
        dispatch(actionsAc.setGroupName(validateTagInput(value)))
    }

    return (
        <div className={classes.actions}>
            <TextField
                label="Введите тег"
                variant="outlined"
                value = {tag}
                onChange = {(e) => tagInputHandler(e)}/>
            <Button
                variant="contained"
                color="primary"
                disabled = {isLoading}
                onClick = {loadButtonHandler}>
                {isLoading ? 'Загрузка...': 'Загрузить'}
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick = {clearButtonHandler}>
                Очистить
            </Button>
            <Button
                variant="contained"
                color="inherit"
                onClick = { () => {isGroupButtonHandler(!isGroup)}}>
                {isGroup ? 'Разгруппировать' : 'Группировать'}
            </Button>
        </div>
    );
};
