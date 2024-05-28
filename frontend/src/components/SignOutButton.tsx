import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const { mutate } = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      showToast({ message: '已登出!', type: '成功' });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: '錯誤' });
    },
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
    >
      登出
    </button>
  );
};

export default SignOutButton;
