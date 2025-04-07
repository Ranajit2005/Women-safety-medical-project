import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { Link } from 'react-router-dom'
import { LogOut, Pill, Contact, User, LogIn, ReceiptText, Hand } from 'lucide-react'

const Navbar = () => {
    const { logout, authUser } = useAuthStore();
    return (
        <header
            className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'
        >

            <div className='container mx-auto px-4 h-16'>
                <div className='flex items-center justify-between h-full'>
                    <div className='flex items-center gap-8'>
                        <Link to='/' className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
                            <div className='w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center'>
                                <Pill className='w-5 h-5 text-primary' />
                            </div>
                            <h1 className='text-lg font-bold'>Medical</h1>
                        </Link>
                    </div>

                    <div className='flex items-center gap-2'>

                        {
                            authUser ? (
                                <>
                                    <Link to={"/community"} className='flex items-center btn btn-sm gap-2'>
                                        <Hand className='size-5' />
                                        <span className='hidden sm:inline'>Community</span>
                                    </Link>
                                    <Link to={"/articles"} className='flex items-center btn btn-sm gap-2'>
                                        <ReceiptText className='size-5' />
                                        <span className='hidden sm:inline'>Articles</span>
                                    </Link>

                                    <Link to={"/contact"} className='flex items-center btn btn-sm gap-2'>
                                        <Contact className='size-5' />
                                        <span className='hidden sm:inline'>Contact</span>
                                    </Link>

                                    <button className='flex gap-2 items-center' onClick={logout}>
                                        <LogOut className='size-5' />
                                        <span className='hidden sm:inline'>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <Link to='/login' className='flex items-center btn btn-sm gap-2 transition-colors'>
                                    <LogIn className='w-4 h-4' />
                                    <span className='hidden sm:inline'>Login</span>
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>

        </header>
    )

}

export default Navbar