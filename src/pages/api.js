import { LoginError, LoginStart, LoginSuccess } from "../context/authAction";
import axios from "axios";
export const LoginApi = async (user, dispatch) => {
  try {
    dispatch(LoginStart());
    const res = await axios.post("http://localhost:5000/auth/login", user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    dispatch(LoginSuccess(res.data.user));
  } catch (e) {
    dispatch(LoginError(e));
  }
};
export const RegisterApi = async (user, dispatch) => {
  try {
    dispatch(LoginStart());
    const res = await axios.post("http://localhost:5000/auth/register", user);
    dispatch(LoginSuccess(res.data.user));
  } catch (e) {
    dispatch(LoginError(e));
  }
};
