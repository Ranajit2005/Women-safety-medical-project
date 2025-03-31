import React from 'react'
// import { fetchArticle } from '../store/useArticleStore.js'
import { useArticleStore } from '../store/useArticleStore.js'
import PostCard from '../components/PostCrad.jsx';
import Navbar from '../components/Navbar.jsx';


const ArticlePage = () => {

  const { articles, isFetchingArticles } = useArticleStore();
  // console.log('articles:', articles);
  
  // console.log('isFetchingArticles:', isFetchingArticles);

  return (
    <>
    <div
        className="fixed inset-0 w-full h-full bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url('/bg/bg3.jpg')` }}
    ></div>

    <Navbar />

    <h1 className='absolute w-full text-center text-3xl pt-16 sm:pt-2 sm:text-5xl text-black z-50'>Articles</h1>


    <div className="absolute z-50 top-24 sm:top-12 w-full">
      {articles.map((article, index) => (
        <PostCard
          key={index}
          doctorName={article.doctorName}
          title={article.title}
          content={article.content}
          image={article.image}
          date={article.date}
          userId={article.userId}
        />
      ))}
    </div>
    </>
  );
}

export default ArticlePage
