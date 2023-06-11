import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../Layouts/Dashboard';
import Main from '../Layouts/Main';
import Classes from '../Pages/Classes/Classes';
import AllUsers from '../Pages/Dashboard/Admin/AllUsers/AllUsers';
import ManageClasses from '../Pages/Dashboard/Admin/ManageClasses/ManageClasses';
import AddClass from '../Pages/Dashboard/Instructor/AddClass/AddClass';
import MyClasses from '../Pages/Dashboard/Instructor/MyClasses/MyClasses';
import UpdateClass from '../Pages/Dashboard/Instructor/UpdateClass/UpdateClass';
import EnrollClass from '../Pages/Dashboard/Student/EnrolledClass/EnrolledClass';
import Payment from '../Pages/Dashboard/Student/Payment/Payment';
import PaymentHistory from '../Pages/Dashboard/Student/Payment/PaymentHistory';
import SelectClasses from '../Pages/Dashboard/Student/SelectClasses/SelectClasses';
import Home from '../Pages/Home/Home/Home';
import Instructors from '../Pages/Instructors/Instructors';
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
            {
                path: 'classes',
                element: <Classes />,
            },
            {
                path: 'instructors',
                element: <Instructors />,
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
                element: (
                    <PrivateRoutes>
                        <SelectClasses />
                    </PrivateRoutes>
                ),
            },
            {
                path: 'payment/:id',
                element: (
                    <PrivateRoutes>
                        <Payment />
                    </PrivateRoutes>
                ),
            },
            {
                path: 'payment-history',
                element: (
                    <PrivateRoutes>
                        <PaymentHistory />
                    </PrivateRoutes>
                ),
            },
            {
                path: 'enrolled-classes',
                element: (
                    <PrivateRoutes>
                        <EnrollClass />
                    </PrivateRoutes>
                ),
            },
            {
                path: 'add-class',
                element: (
                    <PrivateRoutes>
                        <AddClass />
                    </PrivateRoutes>
                ),
            },
            {
                path: 'update-class/:id',
                element: (
                    <PrivateRoutes>
                        <UpdateClass />
                    </PrivateRoutes>
                ),
            },
            {
                path: 'my-classes',
                element: (
                    <PrivateRoutes>
                        <MyClasses />
                    </PrivateRoutes>
                ),
            },
            {
                path: 'users',
                element: (
                    <PrivateRoutes>
                        <AllUsers />
                    </PrivateRoutes>
                ),
            },
            {
                path: 'manage-classes',
                element: (
                    <PrivateRoutes>
                        <ManageClasses />
                    </PrivateRoutes>
                ),
            },
        ],
    },
]);

export default router;
