import React from "react";
import { NavLink } from "react-router-dom";
import s from "./SignInButton.module.css";
import { useSelector } from "react-redux";

export const SignInButton = () => {
    const {isAuth} = useSelector(state => state.auth);

    return (
        <NavLink to={isAuth ? "/logout" : "/campus/signin"} className={s.logoutBtn}>
            <i className={`fa-solid fa-right-from-bracket`} />
        </NavLink>
    );
};