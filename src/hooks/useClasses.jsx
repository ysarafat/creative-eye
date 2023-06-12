import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from './useAxiosSecure';

const useClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const {
        data: classes = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const response = await axios.get(`https://creative-eye.onrender.com/classes`);
            return response.data;
        },
    });
    return [classes, refetch, isLoading];
};

export default useClasses;
