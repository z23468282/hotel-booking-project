import { RegisterFormData } from './pages/Register';
import { signInFormData } from './pages/SignIn';
import {
  HotelSearchResponse,
  HotelType,
  UserType,
  paymentIntentResponse,
} from '../../backend/src/shared/types';
import { BookingFormData } from './forms/BookingForm/BookingForm';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
// const API_BASE_URL = 'http://localhost:3000';

export const fetchCurrentUser = async (): Promise<UserType> => {
  const res = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('獲取用戶錯誤');
  }

  return res.json();
};

export const register = async (formData: RegisterFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    credentials: 'include', //請求包含http cookie
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
};

export const signIn = async (formData: signInFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'ConTent-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const validateToken = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('驗證無效');
  }

  return res.json();
};

export const signOut = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('登出時發生問題');
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: 'POST',
    credentials: 'include',
    body: hotelFormData,
  });

  if (!res.ok) {
    throw new Error('新增飯店失敗');
  }

  return res.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('獲取資訊失敗');
  }

  return res.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('獲取飯店資料失敗');
  }

  return res.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const res = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`,
    {
      method: 'PUT',
      body: hotelFormData,
      credentials: 'include',
    }
  );

  if (!res.ok) {
    throw new Error('更新資料失敗');
  }

  return res.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  //將資訊附加到url參數
  const queryParams = new URLSearchParams();
  queryParams.append('destination', searchParams.destination || '');
  queryParams.append('checkIn', searchParams.checkIn || '');
  queryParams.append('checkOut', searchParams.checkOut || '');
  queryParams.append('adultCount', searchParams.adultCount || '');
  queryParams.append('childCount', searchParams.childCount || '');
  queryParams.append('page', searchParams.page || '');

  queryParams.append('maxPrice', searchParams.maxPrice || '');
  queryParams.append('sortOption', searchParams.sortOption || '');

  searchParams.facilities?.forEach((facility) =>
    queryParams.append('facilities', facility)
  );

  searchParams.types?.forEach((type) => queryParams.append('types', type));
  searchParams.stars?.forEach((star) => queryParams.append('stars', star));

  const res = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

  if (!res.ok) {
    throw new Error('獲取資料失敗');
  }

  return res.json();
};

export const fetchHotels = async (): Promise<HotelType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/hotels`);

  if (!res.ok) {
    throw new Error('獲取飯店時出錯');
  }

  return res.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const res = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);

  if (!res.ok) {
    throw new Error('獲取失敗');
  }

  return res.json();
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<paymentIntentResponse> => {
  const res = await fetch(
    `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ numberOfNights }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error('獲取付款資訊失敗');
  }

  return res.json();
};

export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error('Error booking room');
  }
};

export const fetchMyBookings = async (): Promise<HotelType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('無法獲取預訂資料');
  }

  return res.json();
};
