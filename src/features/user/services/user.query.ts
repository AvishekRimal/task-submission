import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './user.api';

export const useUserQuery = (page: number, limit: number = 10) => {
  const skip = (page - 1) * limit;
  
  return useQuery({
    queryKey: ['users', page],
    queryFn: () => api.getUsers(limit, skip),
  });
};

export const useUserMutations = () => {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['users'] });

  const create = useMutation({
    mutationFn: api.addUser,
    onSuccess: () => {
      invalidate();
    },
  });

  const update = useMutation({
    mutationFn: api.updateUser,
    onSuccess: () => {
      invalidate();
    },
  });

  const remove = useMutation({
    mutationFn: api.deleteUser,
    onSuccess: () => {
      invalidate();
    },
  });

  return { create, update, remove };
};