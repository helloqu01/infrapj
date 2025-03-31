'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPost } from '@/lib/api/post';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) fetchPost(Number(id)).then(setPost);
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
      <Link href={`/list/${post.id}/edit`} className="text-blue-500 underline mr-4">수정</Link>
      <Link href="/list" className="text-gray-600 underline">목록으로</Link>
    </main>
  );
}
