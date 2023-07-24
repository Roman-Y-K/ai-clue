'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const UpdatePost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [post, setPost] = useState({ text: '', tag: '' });
  const [submited, setIsSubmited] = useState(false);

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();

      setPost({
        text: data.post,
        tag: data.tag,
      });
    };

    if (postId) getPostDetails();
  }, [postId]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setIsSubmited(true);

    if (!postId) return alert('Missed PostId!');

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          post: post.text,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmited(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submited={submited}
      handleSubmit={handleUpdatePost}
    />
  );
};

export default UpdatePost;
