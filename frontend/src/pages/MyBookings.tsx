import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

const MyBookings = () => {
  const { data: hotels } = useQuery(
    'fetchMyBookings',
    apiClient.fetchMyBookings
  );

  if (!hotels || hotels.length === 0) {
    return <span>沒有預訂資料...</span>;
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="space-y-5">
        <h1 className="text-3xl font-bold ">我的預訂</h1>
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5"
          >
            <div className="lg:w-full lg:h-[250px]">
              <img
                src={hotel.imageUrls[0]}
                className="w-full h-full object-center object-cover"
              />
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
              <div className="text-2xl font-bold">
                {hotel.name}
                <div className="text-xs font-normal">{hotel.city}</div>
              </div>
              {hotel.bookings.map((booking) => (
                <div key={booking._id}>
                  <div>
                    <span className="font-bold mr-2">日期 :</span>
                    <span>
                      {format(booking.checkIn, 'yyyy年M月d日 EEEE', {
                        locale: zhTW,
                      })}
                      {''}-
                      {format(booking.checkOut, 'yyyy年M月d日 EEEE', {
                        locale: zhTW,
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold br-2">人數 :</span>
                    <span className="">
                      {'\u00A0\u00A0'}
                      {booking.adultCount} 個大人{' '}
                      {booking.childCount > 0 && (
                        <>和 {booking.childCount} 個小孩</>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
