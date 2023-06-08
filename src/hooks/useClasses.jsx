import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useEnrolled = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/classes`);
            return response.data;
        },
    });
    return [classes, refetch];
};

export default useEnrolled;
