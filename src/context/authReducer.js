export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, isFetching: true, isError: false };
    case "LOGIN_SUCCESS":
      return { user: action.payload, isFetching: false, isError: false };
    case "LOGIN_ERROR":
      return { user: null, isFetching: true, isError: action.payload };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload].filter(
            (id) => {
              return id !== action.payload;
            }
          ),
        },
      };
    default:
      return state;
  }
};
