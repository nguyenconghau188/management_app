export function authHeader() {
  //return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'));
  let token = localStorage.getItem('token');
  if (user && token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token ,
    };
  }
  else {
    return {};
  }
}
