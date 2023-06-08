import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../Layouts/Dashboard';
import Main from '../Layouts/Main';
import AllUsers from '../Pages/Dashboard/Admin/AllUsers/AllUsers';
import AddClass from '../Pages/Dashboard/Instructor/AddClass/Addclass';
import Home from '../Pages/Home/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';

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
        element: <Dashboard />,
        children: [
            {
                path: 'add-class',
                element: <AddClass />,
            },
            {
                path: 'users',
                element: <AllUsers />,
            },
        ],
    },
]);

export default router;
