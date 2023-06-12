import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../Layouts/Dashboard';
import Main from '../Layouts/Main';
import Classes from '../Pages/Classes/Classes';
import AllUsers from '../Pages/Dashboard/Admin/AllUsers/AllUsers';
import ManageClasses from '../Pages/Dashboard/Admin/ManageClasses/ManageClasses';
import AddClass from '../Pages/Dashboard/Instructor/AddClass/AddClass';
import MyClasses from '../Pages/Dashboard/Instructor/MyClasses/MyClasses';
import UpdateClass from '../Pages/Dashboard/Instructor/UpdateClass/UpdateClass';
import EnrolledClass from '../Pages/Dashboard/Student/EnrolledClass/EnrolledClass';
import Payment from '../Pages/Dashboard/Student/Payment/Payment';
import PaymentHistory from '../Pages/Dashboard/Student/Payment/PaymentHistory';
import { default as SelectClasses } from '../Pages/Dashboard/Student/SelectClasses/SelectClasses';
import Error from '../Pages/Error/Error';
import Home from '../Pages/Home/Home/Home';
import Instructors from '../Pages/Instructors/Instructors';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import AdminRoute from './AdminRoute';
import InstructorRoute from './InstructorRoute';
import PrivateRoute from './PrivateRoute';
import StudentRoute from './StudentRoute';

const router = new createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <Error />,
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
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            {
                path: 'select-classes',
                element: (
                    <StudentRoute>
                        <SelectClasses />
                    </StudentRoute>
                ),
            },
            {
                path: 'payment/:id',
                element: (
                    <StudentRoute>
                        <Payment />
                    </StudentRoute>
                ),
            },
            {
                path: 'payment-history',
                element: (
                    <StudentRoute>
                        <PaymentHistory />
                    </StudentRoute>
                ),
            },
            {
                path: 'enrolled-classes',
                element: (
                    <StudentRoute>
                        <EnrolledClass />
                    </StudentRoute>
                ),
            },
            {
                path: 'add-class',
                element: (
                    <InstructorRoute>
                        <AddClass />
                    </InstructorRoute>
                ),
            },
            {
                path: 'update-class/:id',
                element: (
                    <InstructorRoute>
                        <UpdateClass />
                    </InstructorRoute>
                ),
            },
            {
                path: 'my-classes',
                element: (
                    <InstructorRoute>
                        <MyClasses />
                    </InstructorRoute>
                ),
            },
            {
                path: 'users',
                element: (
                    <AdminRoute>
                        <AllUsers />
                    </AdminRoute>
                ),
            },
            {
                path: 'manage-classes',
                element: (
                    <AdminRoute>
                        <ManageClasses />
                    </AdminRoute>
                ),
            },
        ],
    },
]);

export default router;
