import { createContext, useReducer, useContext } from "react";

const reducer = (state, action) => {
  if (action.type && action.type === "SET") {
    return action.payload;
  }
  return state;
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(reducer, null);

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext);
  return notification;
};

export const useNotify = () => {
  const dispatch = useContext(NotificationContext)[1];
  return (payload) => {
    dispatch({ type: "SET", payload });
    setTimeout(() => {
      dispatch({ type: "SET", payload: "" });
    }, 5000);
  };
};

export default NotificationContext;
