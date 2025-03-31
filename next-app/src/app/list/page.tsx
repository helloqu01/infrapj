'use client'

import { useEffect, useState } from 'react'
import { fetchPosts, deletePost } from '@/lib/api/post';
import Link from 'next/link'

interface Post {
  id: number
  title: string
  content: string
}

export default function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  const loadPosts = async () => {
    setLoading(true)
    try {
      const data = await fetchPosts()
      setPosts(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const handleDelete = async (id: number) => {
    const confirmed = confirm('정말 이 게시글을 삭제하시겠습니까?')
    if (!confirmed) return

    try {
      await deletePost(id)
      alert('삭제되었습니다.')
      loadPosts() // 목록 새로고침
    } catch (e) {
      console.error(e)
      alert('삭제에 실패했습니다.')
    }
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">게시판</h1>

      <div className="flex justify-end mb-4">
        <Link href="/list/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          ✍️ 글쓰기
        </Link>
      </div>

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded shadow-sm flex justify-between items-center">
              <Link href={`/list/${post.id}`} className="text-lg font-semibold hover:underline">
                {post.title}
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-500 hover:underline text-sm ml-4"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
