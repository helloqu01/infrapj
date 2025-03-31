// app/list/[id]/edit/page.tsx (수정 페이지)
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchPost } from '@/lib/api/post';
import api from '@/lib/api/axios';

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) fetchPost(Number(id)).then((post) => {
      setTitle(post.title);
      setContent(post.content);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.put(`/posts/${id}`, { title, content });
    router.push(`/list/${id}`);
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">글 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border px-3 py-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">수정</button>
      </form>
    </main>
  );
}
