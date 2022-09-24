export const LoginStart = () => ({ type: "LOGIN_START" });
export const LoginSuccess = (payload) => ({ type: "LOGIN_SUCCESS", payload });
export const LoginError = (payload) => ({ type: "LOGIN_ERROR", payload });
export const Follow = (payload) => ({ type: "FOLLOW", payload });
export const Unfollow = (payload) => ({ type: "UNFOLLOW", payload });
