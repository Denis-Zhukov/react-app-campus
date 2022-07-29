import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export const NoMatch = () => {
    let navigate = useNavigate();

    return (<>
            <h2 className="text-center">Page not found</h2>

            <Button
                className="button icon-left ms-md-3"
                variant="dark"
                onClick={() => navigate("/")}
            > Main </Button>

            <Button
                className="button icon-left ms-md-3"
                variant="outline-dark"
                onClick={() => navigate(-1)}
            > Back </Button>

        </>
    );
};