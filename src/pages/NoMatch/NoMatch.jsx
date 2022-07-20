import React from "react";
import { useNavigate } from "react-router-dom";

export const NoMatch = () => {
    let navigate = useNavigate();

    return (<>
            <h1 className="text-center">Page not found</h1>
            <button
                className="button icon-left"
                onClick={() => navigate(-1)}
            > Back
            </button>
        </>
    );
};