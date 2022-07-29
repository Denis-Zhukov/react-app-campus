import React, { useState } from "react";
import s from "./LoadImage.module.css";


export const LoadImage = ({fileState, className}) => {
    const [drag, setDrag] = useState(false);
    const [file, setFile] = fileState;
    const [preview, setPreview] = useState();

    const dragStartHandler = (e) => {
        e.preventDefault();
        setDrag(true);
    };

    const dragLeaveHandler = (e) => {
        e.preventDefault();
        setDrag(false);
    };

    const dropHandler = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if( !file ) return;
        setFile(file);
        setPreviewImage(file);
    };

    const loadHandler = (e) => {
        const file = e.target.files[0];
        if( !file ) return;
        setFile(file);
        setPreviewImage(file);
    };

    const setPreviewImage = (file) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => setPreview(reader.result));
        file && reader.readAsDataURL(file);
    };

    return (
        <label
            className={`${s.container} ${className}`}
            htmlFor="inputLoadImage"
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            onDrop={e => dropHandler(e)}
        >
            {
                file == null ?
                    <>
                        < div className={s.loadIconWrapper}>
                            <div className={s.loadIcon}><i className="fa-solid fa-cloud-arrow-down" /></div>
                            {
                                drag ?
                                    <span>Отпустите изображение</span> :
                                    <span>Перетащите изображение</span>
                            }
                        </div>
                        <div className={s.fileName}>
                            {file?.name}
                        </div>
                        <label htmlFor="inputLoadImage" className={s.inputLoader}>
                            Выбрать изображение...
                        </label>
                    </> :
                    <img src={preview} alt="loaded-image" />
            }
            <input
                type="file"
                id="inputLoadImage"
                className={s.invisible}
                onChange={(e) => loadHandler(e)}
            />
        </label>
    );
};