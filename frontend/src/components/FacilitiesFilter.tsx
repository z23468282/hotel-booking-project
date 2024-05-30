import React from 'react';
import { hotelFacilities } from '../config/hotel-option-config';

type Props = {
  selectedFacilities: string[];
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onchange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">客房設施</h4>
      <div className="flex flex-col gap-0.5">
        {hotelFacilities.map((facility) => (
          <label key={facility} className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="rounded"
              value={facility}
              checked={selectedFacilities.includes(facility)}
              onChange={onchange}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FacilitiesFilter;
