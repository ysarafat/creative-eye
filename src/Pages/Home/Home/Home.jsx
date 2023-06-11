import React from 'react';
import Banner from '../Banner/Banner';
import PopularClasses from '../PopularClasses/PopularClasses';
import PopularInstructor from '../PopularInstructor/PopularInstructor';

function Home() {
    return (
        <div>
            <Banner />
            <PopularClasses />
            <PopularInstructor />
        </div>
    );
}

export default Home;
