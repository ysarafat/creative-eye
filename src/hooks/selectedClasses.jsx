import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const selectedClasses = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: enrolledClasses = [], refetch } = useQuery({
        queryKey: ['enrolledClasses', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure(`/my-enrolled-class?email=${user?.email}`);
            return response.data;
        },
    });
    return [enrolledClasses, refetch];
};

export default selectedClasses;
