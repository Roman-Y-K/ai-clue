import Post from '@models/post';
import { connectDB } from '@utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const post = await Post.findById(params.id).populate('creator');
    if (!post) return new Response('Post Not Found', { status: 404 });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { post, tag } = await request.json();

  try {
    await connectDB();
    const existingPost = await Post.findById(params.id);

    if (!existingPost) {
      return new Response('Post not found', { status: 404 });
    }

    existingPost.post = post;
    existingPost.tag = tag;

    await existingPost.save();

    return new Response('Successfully updated the Post', { status: 200 });
  } catch (error) {
    return new Response('Updating Post Error', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    await Post.findByIdAndRemove(params.id);

    return new Response('Post deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Deleting Post Error', { status: 500 });
  }
};
