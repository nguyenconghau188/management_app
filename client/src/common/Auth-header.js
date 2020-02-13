export default function authHeader() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  if (user && token) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  return {};
}
