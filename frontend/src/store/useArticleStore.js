import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';





export const useArticleStore = create((set, get) => ({
    articles: null,
    isFetchingArticles: false,
    isAddingArticle: false,
    isUpdatingArticle: false,



    fetchArticle: async () => {
        try {
            set({ isFetchingArticles: true });
            const res = await axiosInstance.get('/article/fetch');


            set({ articles: res.data.articles });
        } catch (error) {
            console.log('error in fetching article:', error);

            set({ articles: null });
        }
        finally {
            set({ isFetchingArticles: false });
        }
    },



}));