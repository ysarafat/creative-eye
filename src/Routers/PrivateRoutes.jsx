import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Components/Container/Spinner/Spinner';
import { AuthContext } from '../Context/AuthProvider';

function PrivateRoutes({ children }) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Spinner />;
    }
    if (user) {
        return children;
    }
    return <Navigate state={{ from: location }} to="/login" replace />;
}

export default PrivateRoutes;
