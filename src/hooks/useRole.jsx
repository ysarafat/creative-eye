import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: userRoll, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axios.get(`user/role/${user?.email}`);

            return res.data.role;
        },
    });
    return [userRoll, isLoading];
};

export default useRole;
