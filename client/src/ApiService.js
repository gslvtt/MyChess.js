const BASE_URL = 'http://localhost:3000';

// possible to refactor into a 'fetch factory' to reduce repetition

const apiService = {};

apiService.register = (user) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.login = (user) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.profile = () => {
  return fetch(`${BASE_URL}/me`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.getComments = () => {
  return fetch(`${BASE_URL}/me/getComments`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.addComment = (comment) => {
  return fetch(`${BASE_URL}/me/addComment`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.editComment = (comment) => {
  return fetch(`${BASE_URL}/me/editComment`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.deleteComment = (comment) => {
  return fetch(`${BASE_URL}/me/deleteComment`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default apiService;
