import { HotelType } from '../../../backend/src/shared/types';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">飯店入住資訊</h2>
      <div className="border-b py-2">
        位置:
        <span className="font-bold">{`${hotel.name}, ${hotel.city}`}</span>
      </div>
      <div className="flex justify-between">
        <div>
          入住時間
          <div className="font-bold">
            {format(checkIn, 'yyyy年M月d日 EEEE', { locale: zhTW })}
          </div>
        </div>
        <div>
          退房日期
          <div className="font-bold">
            {format(checkOut, 'yyyy年M月d日 EEEE', { locale: zhTW })}
          </div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        總共入住天數:
        <div className="font-bold">{numberOfNights} 天</div>
      </div>

      <div>
        入住人數:
        <div className="font-bold">
          {adultCount} 個大人 {childCount > 0 && <>和 {childCount} 個小孩</>}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailSummary;
