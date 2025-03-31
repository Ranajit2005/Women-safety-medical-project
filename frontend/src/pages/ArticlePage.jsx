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

      <h1 className='absolute w-full text-center text-3xl pt-16 sm:pt-2 sm:text-5xl text-black z-50'>Articles</h1>

      <div className="absolute z-50 top-24 sm:top-12 w-full">
        {isFetchingArticles ? (
          <div className="text-center py-8">Loading articles...</div>
        ) : !articles || articles.length === 0 ? (
          <div className="text-center py-8">No articles found</div>
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
            />
          ))
        )}
      </div>
    </>
  );
};

export default ArticlePage;