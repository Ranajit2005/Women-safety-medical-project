import React from 'react';
import { useArticleStore } from '../store/useArticleStore.js';
import PostCard from '../components/PostCrad.jsx';
import Navbar from '../components/Navbar.jsx';

const ArticlePage = () => {
  const { articles, isFetchingArticles } = useArticleStore();

  return (
    <>
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url('/bg/bg3.jpg')` }}
      ></div>

      <Navbar />

      <h1 className='absolute w-full text-center text-3xl pt-16 sm:pt-2 sm:text-5xl text-black z-40'>Articles</h1>

      <p className="absolute z-40 w-full text-center text-black top-6 sm:top-20 pt-20 sm:pt-0">If you want to post any article, then <a href="/form" className="text-blue-700 hover:underline hover:cursor-pointer">click here</a></p>

      <div className="absolute z-30 top-24 w-full">
        {isFetchingArticles ? (
          <div className="text-center py-8">Loading articles...</div>
        ) : !articles || articles.length === 0 ? (
          <div className="absolute w-full text-center py-8 top-36 text-2xl font-bold">No articles posted</div>
        ) : (
          articles.map((article) => (
            <PostCard
              key={article._id}
              doctorName={article.doctorName}
              title={article.title}
              content={article.content}
              image={article.image}
              date={article.date}
              userId={article.userId}
              postId={article._id}
              publicId={article.public_id}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ArticlePage;