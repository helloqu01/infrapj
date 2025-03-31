// app/list/new/page.tsx (글쓰기 페이지)
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createPost } from '@/lib/api/post';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost({ title, content });
    router.push('/list');
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">새 글 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          required
        />
        <textarea
          className="w-full border px-3 py-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          rows={8}
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">작성</button>
      </form>
    </main>
  );
}
