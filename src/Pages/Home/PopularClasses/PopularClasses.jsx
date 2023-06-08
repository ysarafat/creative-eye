import React, { useEffect, useState } from 'react';
import Container from '../../../Components/Container/Container';
import ClassCard from '../../Shared/ClassCard/ClassCard';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';

function PopularClasses() {
    const [popularClasses, setPopularClasses] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/popular-class')
            .then((res) => res.json())
            .then((data) => setPopularClasses(data));
    }, []);
    return (
        <div className="mt-14">
            <Container>
                <SectionTitle
                    title="Popular Classes"
                    subtitle="Explore Highly Sought-After Courses with Wide Appeal"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-10 my-10">
                    {popularClasses?.map((classes) => (
                        <ClassCard key={classes._id} classes={classes} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default PopularClasses;
