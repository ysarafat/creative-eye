import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../Layouts/Dashboard';
import Main from '../Layouts/Main';
import AllUsers from '../Pages/Dashboard/Admin/AllUsers/AllUsers';
import ManageClasses from '../Pages/Dashboard/Admin/ManageClasses/ManageClasses';
import AddClass from '../Pages/Dashboard/Instructor/AddClass/Addclass';
import EnrollClasses from '../Pages/Dashboard/Student/EnrollClasses/EnrollClasses';
import Home from '../Pages/Home/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import PrivateRoutes from './PrivateRoutes';

const router = new createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
    {
        path: 'dashboard',
        element: (
            <PrivateRoutes>
                <Dashboard />
            </PrivateRoutes>
        ),
        children: [
            {
                path: 'my-classes',
                element: <EnrollClasses />,
            },
            {
                path: 'add-class',
                element: <AddClass />,
            },
            {
                path: 'users',
                element: <AllUsers />,
            },
            {
                path: 'manage-classes',
                element: <ManageClasses />,
            },
        ],
    },
]);

export default router;
