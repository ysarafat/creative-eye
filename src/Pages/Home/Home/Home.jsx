import React from 'react';
import Banner from '../Banner/Banner';
import PopularClasses from '../PopularClasses/PopularClasses';
import PopularInstructor from '../PopularInstructor/PopularInstructor';
import SubscribeForm from '../SubscribeForm/SubscribeForm';
import Blog from './Blog/Blog';

function Home() {
    return (
        <div>
            <Banner />
            <PopularClasses />
            <PopularInstructor />
            <Blog />
            <SubscribeForm />
        </div>
    );
}

export default Home;
