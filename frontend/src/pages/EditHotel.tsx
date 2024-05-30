import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../contexts/AppContext';

const EditHotel = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { hotelId } = useParams();

  const { data: hotel } = useQuery('fetchMyHotelById', () => {
    return apiClient.fetchMyHotelById(hotelId || '');
  });

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: '更新成功', type: '成功' });
      navigate('/my-hotels');
    },
    onError: () => {
      showToast({ message: '更新失敗', type: '錯誤' });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <div className="container mx-auto mt-10">
      <ManageHotelForm
        hotel={hotel}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EditHotel;
