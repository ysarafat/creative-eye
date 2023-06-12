import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

function GoogleLogin() {
    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location.state?.from?.pathname || '/';
    const loginByGoogle = () => {
        loginWithGoogle()
            .then((res) => {
                const userInfo = {
                    userName: res.user.displayName,
                    email: res.user.email,
                    image: res.user.photoUrl,
                    role: 'student',
                };
                fetch('https://creative-eye.onrender.com/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(userInfo),
                })
                    .then((res) => res.json())
                    .then((data) => console.log(data));
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500,
                });

                navigate(from, { replace: true });
            })

            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <button
            onClick={loginByGoogle}
            className="w-full  flex justify-center items-center gap-3 border bg-white dark:bg-dark-grey dark:border-none dark:text-white border-slate-200 shadow h-11 rounded-lg hover:shadow-lg cursor-pointer"
        >
            <FcGoogle size={30} /> <p>Login With Google</p>
        </button>
    );
}

export default GoogleLogin;
