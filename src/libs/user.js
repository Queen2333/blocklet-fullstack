import api from './api';

export function get_users(data) {
  return api.get('/api/users', data);
}

export function get_userInfo(data) {
  return api.get(`/api/users/${data.id}`);
}

export function put_userInfo(data) {
  return api.put(`/api/users/${data.id}`, data);
}
