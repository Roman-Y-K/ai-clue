'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [isSubmited, setIsSubmited] = useState(false);
  const [post, setPost] = useState({ text: '', tag: '' });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmited(true);

    try {
      const response = await fetch('/api/post/new', {
        method: 'POST',
        body: JSON.stringify({
          post: post.text,
          userId: session?.user.id,
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
      type="Create"
      post={post}
      setPost={setPost}
      isSubmited={isSubmited}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePost;
