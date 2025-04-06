// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCrad'; // Check your import path (PostCrad -> PostCard)
import { useArticleStore } from '../store/useArticleStore';

const SomeArticle = () => {
  const navigate = useNavigate();
//   const [showAllArticles, setShowAllArticles] = useState(false);
  const { articles, isFetchingArticles } = useArticleStore();

  // Safely handle articles data
  const revarticles = articles ? [...articles].reverse() : [];
  
  // Get first 3 articles or all articles based on state
  const displayedArticles = revarticles.slice(0, 2);

  const handleSeeMore = () => {
    // if (showAllArticles) {
      navigate('/articles');
    // } else {
    //   setShowAllArticles(true);
    // }
  };

  return (
    <div>
      {/* Articles Section */}
      <section className="py-3">
        <div className="mx-auto px-1">
          <h2 className="text-4xl mb-3 text-center">Latest Articles</h2>
          
          {isFetchingArticles ? (
            <div className="text-center py-8">Loading articles...</div>
          ) : revarticles.length === 0 ? (
            <div className="text-center py-8">No articles available</div>
          ) : (
            <>
              <div className="flex flex-col">
                {displayedArticles.map(article => (
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
                ))}
              </div>

              {revarticles.length >=2 && (
                <div className="text-center mt-8">
                  <button 
                    onClick={handleSeeMore}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    See All Articles
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default SomeArticle;
