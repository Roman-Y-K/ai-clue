import Post from '@models/post';
import { connectDB } from '@utils/database';

export const POST = async (request) => {
  const { userId, post, tag } = await request.json();

  try {
    await connectDB();
    const newPost = new Post({ creator: userId, post, tag });
    console.log(newPost);

    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new post', { status: 500 });
  }
};
