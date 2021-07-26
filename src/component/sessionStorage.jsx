import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SessionStorage = (props) => {
  let reduxStoreState = useSelector(state => state);
  let dispatch = useDispatch();

  

  return (
    <>
      {
        (useEffect(() => {
          if (sessionStorage.getItem("redux") != null) {
            dispatch({
              type: "loadStateFromSessionStorage",
              payload: JSON.parse(sessionStorage.getItem("redux")),
            });
            console.log("redux state restore");
          }
        }, []),
        useEffect(() => {
          sessionStorage.setItem("redux", JSON.stringify(reduxStoreState));
          console.log("redux state change");
        }, [reduxStoreState]))
      }
      {props.children}
    </>
  );
};

export default SessionStorage;
