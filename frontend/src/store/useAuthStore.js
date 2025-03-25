import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';




export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdateProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');


            set({ authUser: res.data.user });
        } catch (error) {
            console.log('error in checkAuth:', error);

            set({ authUser: null });
        }
        finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            console.log('res in signup:', res.data);

            set({ authUser: res.data });
            toast.success(res.data.message);

        } catch (error) {
            toast.error(error.response.data.message);
            console.log('error in signup:', error);
        }
        finally {
            set({ isSigningUp: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success('Logged out successfully');
        } catch (error) {
            console.log('error in logout:', error);

            toast.error('An error occurred while logging out');
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('auth/login', data);
            set({ authUser: res.data });
            console.log('res in login:', res.data.message);

            toast.success(res.data.message);


        } catch (error) {
            toast.error(error.response.data.message);
            console.log('error in login:', error);

        }
        finally {
            set({ isLoggingIn: false });
        }
    },
    updateProfile: async (data) => {
        set({ isUpdateProfile: true });
        try {
            const { userId, fullName, email, age, profession, bio } = data;
            const user = await axiosInstance.post('/auth/updateProfile', {
                userId,
                fullName,
                email,
                age,
                profession,
                bio
            })
            console.log('user in updateProfile:', user.data);
            set({ authUser: user.data });
            toast.success('Profile updated successfully');
        } catch (error) {
            console.log('error in updateProfile:', error);
            toast.error('An error occurred while updating profile');
        }
        finally {
            set({ isUpdateProfile: false });
        }
    }


}));