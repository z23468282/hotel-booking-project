import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export type signInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<signInFormData>();
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate } = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      //顯示toast
      showToast({ message: '登入成功', type: '成功' });
      await queryClient.invalidateQueries('validateToken');
      navigate(location.state?.from?.pathname || '/');
    },
    onError: (error: Error) => {
      //顯示toast
      showToast({ message: error.message, type: '錯誤' });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form className="container flex flex-col gap-5 mt-10" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">登入</h2>

      <label className="text-gray-700 text-sm font-bold flex-1">
        信箱
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('email', { required: '信箱必須填寫' })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        密碼
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('password', {
            required: '密碼必須填寫',
            minLength: { value: 6, message: '密碼必須為6個字元' },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          沒有帳戶?{' '}
          <Link className="underline hover:bg-blue-400" to="/register">
            點擊此處註冊
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          登入
        </button>
      </span>
    </form>
  );
};

export default SignIn;
