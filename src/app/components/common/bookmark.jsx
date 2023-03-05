import React from "react";
import PropTypes from "prop-types";
const BookMark = ({ status, ...rest }) => {
    let d = 1;
    return (
        <button {...rest}>
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
        </button>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool
};

export default BookMark;
