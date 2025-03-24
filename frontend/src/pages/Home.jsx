import React from 'react';
import ScrollableItems from '../components/ScrollableItems';
import Circle from '../components/Circle';

const Home = () => {
  return (

    <div>
        <div className='mt-20'>

        <h1 className='mx-6 sm:mx-10 text-3xl sm:text-4xl text-start'>Health Issues in Women Your Age</h1>

        <ScrollableItems/>
        </div>
        
        {/* <h1 className='mx-auto text-4xl text-center'>Health</h1> */}

        <Circle/>


      Home Page
    </div>
  )
}

export default Home
