/**
 * Decodes A JWT token to get it's payload.
 * 
 * Source: {@link https://stackoverflow.com/a/38552302}
 * 
 * @param {String} token Token to be decoded
 * @returns {Object} The decoded token payload
 */
export const decodeJwtToken = (token) => {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};