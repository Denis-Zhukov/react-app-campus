import React, { useEffect } from "react";
import { Alert, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCampusImages, getCampusInfo } from "../../store/campusSlice";

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
        images, statusImages, errorImages,
        info, infoStatus, infoError,
    } = useSelector(state => state.campus);

    useEffect(() => {
        dispatch(getCampusImages());
        dispatch(getCampusInfo());
    }, [dispatch]);

    return (
        <Container fluid>
            <Row>
                {statusImages === "rejected" && <Alert variant="danger">{errorImages}</Alert>}
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
            </Row>
            <Row>
                {infoStatus === "rejected" && <Alert variant="danger">{infoError}</Alert>}
                {infoStatus === "pending" &&
                    <Spinner animation="border" role="status" className="mx-auto">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}

                <h2 className="text-center">{info?.name}</h2>
                {info?.body.split("\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </Row>
        </Container>
    );
};