import {useDispatch, useSelector} from "react-redux";
import {getAlertIsVisible, getAlertMessage, getAlertType} from "../../redux/selectors";
import React from "react";
import { actions } from "../../redux/alertReducer";

import classes from './Alert.module.scss';

export const Alert: React.FC = () => {
    const dispatch = useDispatch();
    const message = useSelector(getAlertMessage);
    const alertType = useSelector(getAlertType);
    const isVisible = useSelector(getAlertIsVisible);

    React.useEffect(() => {
        const alertTimeout = setTimeout(() => {
            dispatch(actions.hideMessage())
        }, 3000);
        return () => {
            clearTimeout(alertTimeout)
        }
    },[dispatch, isVisible])

    const modalCloseHandler = () => {
        dispatch(actions.hideMessage());
    }

    if (!isVisible) return null;

    const classNames = alertType === 'alert' ? classes.alert : classes.alert + ' ' + classes.danger;
    return (
        <div className={classNames}>
            <span onClick={modalCloseHandler}>&#10060;</span>
            {message}
        </div>
    )
}