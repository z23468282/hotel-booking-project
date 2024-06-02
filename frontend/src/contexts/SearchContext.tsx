import React, { useContext, useState } from 'react';

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>(
    () => sessionStorage.getItem('destination') || ''
  );
  const [checkIn, setCheckIn] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem('checkIn') || new Date().toISOString())
  );
  const [checkOut, setCheckOut] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem('checkOut') || new Date().toISOString())
  );
  const [adultCount, setAdultCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem('adultCount') || '1')
  );
  const [childCount, setChildCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem('childCount') || '0')
  );
  const [hotelId, setHotelId] = useState<string>(
    () => sessionStorage.getItem('HotelId') || ''
  );

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelId) {
      setHotelId(hotelId);
    }

    sessionStorage.setItem('destination', destination);
    sessionStorage.setItem('checkIn', checkIn.toISOString());
    sessionStorage.setItem('checkOut', checkOut.toString());
    sessionStorage.setItem('adultCount', adultCount.toString());
    sessionStorage.setItem('childCount', childCount.toString());
    if (hotelId) {
      sessionStorage.setItem('HotelId', hotelId);
    }
  };

  const value = {
    destination,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    hotelId,
    saveSearchValues,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};
