import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const DetailSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-3xl font-bold mb-3 ">新增飯店</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        名稱
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('name', { required: '請填寫名稱' })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        城市
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('city', { required: '請填寫城市' })}
        />
        {errors.city && (
          <span className="text-red-500">{errors.city.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        描述
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('description', { required: '請填寫描述' })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1 max-w-[50%]">
        每晚價格
        <input
          type="number"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('pricePerNight', { required: '請填寫價格' })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1 max-w-[50%]">
        星級
        <select
          {...register('starRating', { required: '請選擇一個' })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            選擇一個
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailSection;
