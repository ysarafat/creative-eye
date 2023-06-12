import React from 'react';
import DynamicTitle from '../../../Components/DynamicTitle/DynamicTitle';
import Banner from '../Banner/Banner';
import Blog from '../Blog/Blog';
import PopularClasses from '../PopularClasses/PopularClasses';
import PopularInstructor from '../PopularInstructor/PopularInstructor';
import SubscribeForm from '../SubscribeForm/SubscribeForm';

function Home() {
    return (
        <div>
            <DynamicTitle title="Home" />
            <Banner />
            <PopularClasses />
            <PopularInstructor />
            <Blog />
            <SubscribeForm />
        </div>
    );
}

export default Home;
