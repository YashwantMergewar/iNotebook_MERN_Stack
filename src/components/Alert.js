import React, {useContext} from "react";
import AlertContext from "../context/alert/alertContext";

function Alert() {
  const {alert} = useContext(AlertContext);
  const capitalize = (word)=>{
      if (word === "danger") {
          word = "error";
      }
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
      <div style={{height: '60px'}}>
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(alert.type)}</strong>: {alert.msg}
      </div>}
      </div>
  )
}

export default Alert;
