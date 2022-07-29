import React, { useEffect } from "react";
import { Alert, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCampusImages, getCampusInfo, clearInfo, clearImages } from "../../store/campusSlice";
import { PENDING, FULFILLED, REJECTED } from "../../store/statuses";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Lazy } from "swiper";

import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import s from "./Campus.module.css";

export const Campus = () => {
    const dispatch = useDispatch();
    const {
        images, imagesStatus, imagesError,
        info, infoStatus, infoError,
    } = useSelector(state => state.campus);

    useEffect(() => {
        dispatch(getCampusInfo());
        dispatch(getCampusImages());
        return () => {
            dispatch(clearInfo());
            dispatch(clearImages());
        };
    }, [dispatch]);


    return (
        <Container fluid>
            <Row>
                {
                    imagesStatus === FULFILLED &&
                    <Swiper
                        lazy={true}
                        rewind={true}
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={"auto"}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={{clickable: true}}
                        modules={[Lazy, EffectCoverflow, Pagination]}
                        className={s.swiper}
                    >
                        {images.map((img => (
                            <SwiperSlide key={img.id} className={s.swiperSlide}>
                                <img data-src={img.url} alt="slide" className="swiper-lazy" />
                                <div className="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                            </SwiperSlide>
                        )))}
                    </Swiper>
                }

                {imagesStatus === REJECTED && <Alert variant="danger">{imagesError}</Alert>}
            </Row>

            <Row>
                {(infoStatus === PENDING || imagesStatus === PENDING) &&
                    <Spinner animation="border" role="status" className="mx-auto">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}

                {
                    infoStatus === FULFILLED &&
                    <>
                        <h2 className="text-center">{info?.name}</h2>
                        {info?.body.split("\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                    </>
                }

                {infoStatus === REJECTED && <Alert variant="danger">{infoError}</Alert>}
            </Row>

        </Container>
    );
};