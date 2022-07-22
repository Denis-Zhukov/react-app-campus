import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import { sidebarItems } from "../../../assets/constants";
import { NavLink } from "react-router-dom";
import { ModalWindow } from "../../ModalWindow/ModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { showAddingWindow } from "../../../store/applicationSlice";

export const ToolkitRatingSidebar = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const {authRole} = useSelector(state => state.auth);

    return (
        <>
            <Accordion defaultActiveKey="0" className="dark-accordion centeredByVertical mb-3">
                {sidebarItems.campus.map((item, index) => (
                    <Accordion.Item eventKey={index} key={index} className="sidebarItem">
                        <NavLink to={item.to}>{item.title}</NavLink>
                    </Accordion.Item>
                ))}
                {authRole === "admin" &&
                    <button
                        className="addStudentBtn"
                        onClick={() => dispatch(showAddingWindow())}
                    ><i className="fa-solid fa-user-plus"></i></button>
                }
            </Accordion>
            <ModalWindow
                show={show}
                setShow={setShow}
            />
        </>
    );
};
