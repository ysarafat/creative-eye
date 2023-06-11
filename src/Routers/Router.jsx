import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../Layouts/Dashboard';
import Main from '../Layouts/Main';
import AllUsers from '../Pages/Dashboard/Admin/AllUsers/AllUsers';
import ManageClasses from '../Pages/Dashboard/Admin/ManageClasses/ManageClasses';
import AddClass from '../Pages/Dashboard/Instructor/AddClass/Addclass';
import MyClasses from '../Pages/Dashboard/Instructor/MyClasses/MyClasses';
import UpdateClass from '../Pages/Dashboard/Instructor/UpdateClass/UpdateClass';
import Payment from '../Pages/Dashboard/Student/Payment/Payment';
import PaymentHistory from '../Pages/Dashboard/Student/Payment/PaymentHistory';
import SelectClasses from '../Pages/Dashboard/Student/SelectClasses/SelectClasses';
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
                path: 'select-classes',
                element: <SelectClasses />,
            },
            {
                path: 'payment/:id',
                element: <Payment />,
            },
            {
                path: 'payment-history',
                element: <PaymentHistory />,
            },
            {
                path: 'add-class',
                element: <AddClass />,
            },
            {
                path: 'update-class/:id',
                element: <UpdateClass />,
            },
            {
                path: 'my-classes',
                element: <MyClasses />,
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
