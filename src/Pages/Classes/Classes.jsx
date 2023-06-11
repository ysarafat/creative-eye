import React from 'react';
import Container from '../../Components/Container/Container';
import useClasses from '../../hooks/useClasses';
import PageTitleBanner from '../Shared/PageTitleBanner.jsx/PageTitleBanner';
import ClassesCard from './ClassesCard';

function Classes() {
    const [classes] = useClasses();
    const approveClass = classes.filter((cls) => cls.status === 'approved');

    return (
        <>
            <PageTitleBanner
                title="our All classes"
                subtitle="Through the Lens, Unveiling the Art and Craft of Photography"
            />
            <Container>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-10 my-10">
                        {approveClass?.map((cls) => (
                            <ClassesCard key={cls._id} classes={cls} />
                        ))}
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Classes;
