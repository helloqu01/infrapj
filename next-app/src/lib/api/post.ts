// 📁 src/lib/api/posts.ts
import api from './axios';

export const fetchPosts = () => api.get('/posts').then(res => res.data);
export const fetchPost = (id: number) => api.get(`/posts/${id}`).then(res => res.data);
export const createPost = (data: { title: string; content: string }) => api.post('/posts', data);
export const updatePost = (id: number, data: { title: string; content: string }) =>
  api.put(`/posts/${id}`, data);
export const deletePost = (id: number) => api.delete(`/posts/${id}`);
