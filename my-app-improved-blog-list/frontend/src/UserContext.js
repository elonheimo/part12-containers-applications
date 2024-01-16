import { createContext, useReducer, useContext } from "react";
import loginService from "./services/login";
import storage from "./services/storage";

const reducer = (state, action) => {
  if (action.type && action.type === "SET") {
    return action.payload;
  }
  return state;
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(reducer, storage.loadUser());

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const [user] = useContext(UserContext);
  return user;
};

export const useEmptyUserValue = () => {
  const dispatch = useContext(UserContext)[1]
  return () => {
    storage.removeUser();
    dispatch({ type: 'SET', payload: null })
  }
};

export const useLogin = () => {
  const dispatch = useContext(UserContext)[1];
  return async (payload) => {
    try {
      const user = await loginService.login(payload)
      dispatch({ type: 'SET', payload: user })
      storage.saveUser(user)
      return 'welcome'
    } catch (err) {
      return 'wrong user or pw'
    }
  };
};


export default UserContext;
