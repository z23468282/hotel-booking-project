import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';
import { hotelFacilities } from '../../config/hotel-option-config';

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">設施</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility, index) => (
          <label className="text-sm flex gap-1 text-gray-700" key={index}>
            <input
              type="checkbox"
              value={facility}
              {...register('facilities', {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return '至少選擇一項';
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
