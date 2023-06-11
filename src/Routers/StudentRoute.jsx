import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Components/Spinner/Spinner';
import { AuthContext } from '../Context/AuthProvider';
import useRole from '../hooks/useRole';

function StudentRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    const [userRole, isLoading] = useRole();
    const location = useLocation();

    if (loading || isLoading) {
        return <Spinner />;
    }
    if (user && userRole === 'instructor') {
        return children;
    }
    return <Navigate state={{ from: location }} to="/login" replace />;
}

export default StudentRoute;
