import React from 'react';
import { hotelTypes } from '../config/hotel-option-config';

type Props = {
  selectedHotelTypes: string[];
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedHotelTypes, onchange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">住宿類型</h4>
      <div className="flex flex-col gap-0.5">
        {hotelTypes.map((hotelType) => (
          <label key={hotelType} className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="rounded"
              value={hotelType}
              checked={selectedHotelTypes.includes(hotelType)}
              onChange={onchange}
            />
            <span>{hotelType}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default HotelTypesFilter;
