import { useEffect } from 'react';

type ToastProps = {
  message: string;
  type: '成功' | '錯誤';
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();

      return () => {
        clearTimeout(timer);
      };
    }, 5000);
  }, [onClose]);

  const styles =
    type === '成功'
      ? 'fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white maw-w-md'
      : 'fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white maw-w-md';

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
