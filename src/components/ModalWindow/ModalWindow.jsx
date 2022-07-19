import React from "react";
import { Button, Modal } from "react-bootstrap";

export const ModalWindow = ({show, setShow, body, title, handleAction, selector}) => {
    const handleClose = () => setShow(false);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="dark"
                    onClick={() => {
                        handleAction?.();
                        handleClose();
                    }}
                >Подтвердить</Button>
            </Modal.Footer>
        </Modal>
    );
};