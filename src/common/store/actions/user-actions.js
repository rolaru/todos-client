export const UserActionNames = {
  Login: 'login'
};

export const generateUserActions = dispatch => ({
  login: userData => dispatch({
    type: UserActionNames.Login,
    payload: userData
  })
});