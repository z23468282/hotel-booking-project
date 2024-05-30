import React from 'react';
import { AiFillStar } from 'react-icons/ai';

type Props = {
  selectedStars: string[];
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onchange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">住宿級別</h4>
      <div className="flex flex-col gap-0.5">
        {['5', '4', '3', '2', '1'].map((star) => (
          <label key={star} className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="rounded"
              value={star}
              checked={selectedStars.includes(star)}
              onChange={onchange}
            />
            <span className="flex">
              {Array.from({ length: parseInt(star) }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-400" />
              ))}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StarRatingFilter;
