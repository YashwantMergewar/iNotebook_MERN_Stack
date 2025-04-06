import React from "react";

const Alert = (props) => {
  return (
    <div>
      <div className="alert alert-success d-flex align-items-center" role="alert">
        <div>{props.message}</div>
      </div>
    </div>
  );
};

export default Alert;
