import { PostCard } from './PostCard';

export const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="descr text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.length ? (
          <>
            {data.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            ))}
          </>
        ) : (
          <p className="descr text-left">
            You don't have any posts now. Let's create!
          </p>
        )}
      </div>
    </section>
  );
};
