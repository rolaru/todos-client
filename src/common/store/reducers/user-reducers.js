export const userReducers = {
  login: (state, payload) => {
    return {
      ...state,
      user: payload
    };
  }
};