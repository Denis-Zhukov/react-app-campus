import React from "react";
import { NavLink } from "react-router-dom";
import s from "./LogoutButton.module.css";

export const LogoutButton = () => (
    <NavLink to="/logout" className={s.logoutBtn}>
        <i className={`fa-solid fa-right-from-bracket`} />
    </NavLink>
);