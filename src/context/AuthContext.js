import { createContext, useReducer } from "react";
import { authReducer } from "./authReducer";

const currentUser = JSON.parse(localStorage.getItem("user"));
// localStorage.removeItem("user");
const InitialState = {
  user: currentUser ? currentUser : null,
  isFetching: false,
  isError: false,
};

export const AuthContext = createContext(InitialState);
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, InitialState);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        isError: state.isError,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
