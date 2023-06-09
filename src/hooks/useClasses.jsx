import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useEnrolled = () => {
    const [axiosSecure] = useAxiosSecure();
    const {
        data: classes = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/classes`);
            return response.data;
        },
    });
    return [classes, refetch, isLoading];
};

export default useEnrolled;
