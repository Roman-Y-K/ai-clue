import { Feed } from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        CREATE YOUR TIPS
        <br />
        <span className="text_gradient text-center">with AI Power </span>
      </h1>
      <p className="descr text-center">
        AI Clue is an modern artificial intelligence tool which allows you to
        find, create and share constructive tips
      </p>
      <Feed />
    </section>
  );
};

export default Home;
