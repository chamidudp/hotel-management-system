const BASE_URL = 'http://localhost:8080';

export const ADMIN = `${BASE_URL}/admin/`;
export const ADMIN_PARAM = (id) => `${BASE_URL}/admin/${id}`;
export const ADMIN_SIGNUP = `${BASE_URL}/admin/signup`;
export const ADMIN_LOGIN = `${BASE_URL}/admin/login`;

export const CONTACTUS = `${BASE_URL}/contactus/`;
export const CONTACTUS_PARAM = (id) => `${BASE_URL}/contactus/${id}`;

export const CUSTOMER = `${BASE_URL}/customer/`;
export const CUSTOMER_PARAM = (id) => `${BASE_URL}/customer/${id}`;
export const CUSTOMER_SIGNUP = `${BASE_URL}/customer/signup`;
export const CUSTOMER_LOGIN = `${BASE_URL}/customer/login`;

export const HALL_BOOKING = `${BASE_URL}/hallbooking/`;
export const HALL_BOOKING_PARAM = (id) => `${BASE_URL}/hallbooking/${id}`;
export const GET_HALL_BOOKING_BY_CUSTOMER_ID = (id) => `${BASE_URL}/hallBooking/customer/${id}`;
export const GET_HALL_BOOKING_BY_HALL_ID = (id) => `${BASE_URL}/hallBooking/hall/${id}`;

export const HALL = `${BASE_URL}/hall/`;
export const HALL_PARAM = (id) => `${BASE_URL}/hall/${id}`;
export const GET_HALL_BY_TYPE = (type) => `${BASE_URL}/hall/type/${type}`;
export const GET_HALL_BY_CAPACITY = (capacity) => `${BASE_URL}/hall/capacity/${capacity}`;
export const GET_HALL_BY_PRICE = (price) => `${BASE_URL}/hall/price/${price}`;

export const RECEPTIONIST = `${BASE_URL}/receptionist/`;
export const RECEPTIONIST_PARAM = (id) => `${BASE_URL}/receptionist/${id}`;
export const RECEPTIONIST_LOGIN = `${BASE_URL}/receptionist/login`;

export const ROOM_BOOKING = `${BASE_URL}/roombooking/`;
export const ROOM_BOOKING_PARAM = (id) => `${BASE_URL}/roombooking/${id}`;
export const GET_ROOM_BOOKING_BY_CUSTOMER_ID = (id) => `${BASE_URL}/roomBooking/customer/${id}`;
export const GET_ROOM_BOOKING_BY_ROOM_ID = (id) => `${BASE_URL}/roomBooking/room/${id}`;

export const ROOM = `${BASE_URL}/room/`;
export const ROOM_PARAM = (id) => `${BASE_URL}/room/${id}`;
export const GET_ROOM_BY_TYPE = (type) => `${BASE_URL}/room/type/${type}`;
export const GET_ROOM_BY_CAPACITY = (capacity) => `${BASE_URL}/room/capacity/${capacity}`;
export const GET_ROOM_BY_PRICE = (price) => `${BASE_URL}/room/price/${price}`;

export const USER = `${BASE_URL}/user/`;
export const USER_PARAM = (id) => `${BASE_URL}/user/${id}`;
export const USER_SIGNUP = `${BASE_URL}/user/signup`;
export const USER_LOGIN = `${BASE_URL}/user/login`;