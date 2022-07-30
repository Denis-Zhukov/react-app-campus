import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Container, Spinner, Alert } from "react-bootstrap";
import { AddAndEditNews } from "../News/AddAndEditNews/AddAndEditNews";
import { ModalWindow } from "../../components/ModalWindow/ModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { PENDING, FULFILLED, REJECTED } from "../../store/statuses";

import defaultImage from "../../assets/images/news_default_image.jpg";
import s from "../AdminRatingStudent/AdminRatingStudent.module.css";

export const ReadingPost = ({action, selector, deleteAction, editAction, clearOpenPost, clearResult}) => {
    const {id} = useParams();
    const nav = useNavigate();

    const dispatch = useDispatch();
    const {open: post, status, error, resultError, resultStatus, edited, deleted} = useSelector(selector);
    const {isAuth} = useSelector(state => state.auth);

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showConfirmEdit, setShowConfirmEdit] = useState(false);
    const [editablePost, setEditablePost] = useState({...post});

    const handleDeletePost = () => dispatch(deleteAction(id));
    const handleEditPost = () => dispatch(editAction());


    useEffect(() => {
        dispatch(action(id));
        return () => {
            dispatch(clearOpenPost());
            clearResult && dispatch(clearResult());
        };
    }, [dispatch, action, id, clearOpenPost, clearResult]);

    useEffect(() => {
        if( deleted ) {
            nav("/");
        }
    }, [deleted, nav]);

    useEffect(() => {
        setEditablePost({...post});
    }, [post]);


    return (
        <Container fluid className="pt-3">
            {
                resultStatus === PENDING &&
                <Alert variant="dark" className="text-light">Отправка данных. Не закрывайте браузер</Alert>
            }
            {
                resultStatus === FULFILLED &&
                <Alert variant="dark" className="text-light">
                    {deleted ? "Запись удалена" : "Запись редактирована"} ({new Date(Date.now()).toLocaleString("ru-RU")})
                </Alert>
            }
            {
                resultStatus === REJECTED &&
                <Alert variant="danger">Ошибка {edited ? "редактирования" : "удаления"} записи: {resultError}</Alert>
            }

            {
                status === PENDING &&
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            }
            {
                status === FULFILLED &&
                <>
                    <Row>
                        <Col className="text-center"><h2>{post?.title}</h2></Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <img src={post?.image ?? defaultImage} alt="main-img" className="w-100" />
                            {isAuth &&
                                <>
                                    {
                                        deleteAction && <button
                                            onClick={() => setShowConfirmDelete(true)}
                                            className={s.toolkitBtn}
                                            title="Удаление поста"
                                        ><i className="fa-solid fa-trash-can" /></button>
                                    }
                                    {
                                        editAction &&
                                        <button
                                            onClick={() => setShowConfirmEdit(true)}
                                            className={s.toolkitBtn}
                                            title="Редактирование поста"
                                        ><i className="fa-solid fa-arrow-right-arrow-left"></i></button>
                                    }
                                    <ModalWindow
                                        show={showConfirmDelete}
                                        setShow={setShowConfirmDelete}
                                        title="Вы уверены?"
                                        body="Удалить данную статью?"
                                        handleAction={handleDeletePost}
                                    />

                                    <ModalWindow
                                        show={showConfirmEdit}
                                        setShow={setShowConfirmEdit}
                                        title="Редактирование"
                                        body={<AddAndEditNews
                                            setShow={setShowConfirmEdit}
                                            editable={{post: editablePost, setPost: setEditablePost, loadedImage: defaultImage}}
                                        />}
                                        handleAction={handleEditPost}
                                    />
                                </>
                            }
                        </Col>
                        <Col xs={8}>
                            {post?.body?.split("\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                        </Col>
                    </Row>
                </>
            }
            {
                status === REJECTED &&
                <Row> <Alert variant="danger" key="danger" className="text-center">{error}</Alert> </Row>
            }
        </Container>
    );
};