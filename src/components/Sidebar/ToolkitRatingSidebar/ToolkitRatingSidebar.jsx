import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import { sidebarItems } from "../../../constants";
import { NavLink } from "react-router-dom";
import { ModalWindow } from "../../ModalWindow/ModalWindow";

export const ToolkitRatingSidebar = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Accordion defaultActiveKey="0" className="dark-accordion centeredByVertical">
                {sidebarItems.campus.map((item, index) => (
                    <Accordion.Item eventKey={index} key={index} className="sidebarItem">
                        <NavLink to={item.to}>{item.title}</NavLink>
                    </Accordion.Item>
                ))}
                <button
                    className="addStudentBtn"
                    onClick={() => setShow(true)}
                ><i className="fa-solid fa-user-plus"></i></button>
            </Accordion>
            <ModalWindow
                show={show}
                setShow={setShow}
            />
        </>
    );
};
