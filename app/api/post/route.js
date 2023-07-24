import Post from '@models/post';
import { connectDB } from '@utils/database';

export const GET = async (request, response) => {
  try {
    await connectDB();

    const posts = await Post.find({}).populate('creator');

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};
