import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearStatus } from "../../store/authSlice";

export const Logout = () => {
    const dispatch = useDispatch();
    const {status, error} = useSelector(state => state.auth);
    const nav = useNavigate();

    useEffect(() => {
        dispatch(logout());
        nav("/");
        return () => dispatch(clearStatus());
    }, [dispatch, nav, status]);

    error && console.error(error);
    return <Container>Logout...</Container>;
};