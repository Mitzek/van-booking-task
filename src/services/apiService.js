import axios from "axios";

const BASE_URL = 'https://605c94c36d85de00170da8b4.mockapi.io';

const apiService = {
  getStations() {
    return axios.get(`${BASE_URL}/stations`);
  },
  getBookings(stationId) {
    return axios.get(`${BASE_URL}/stations/${stationId}/bookings`);
  },
  getBookingById(stationId, bookingId) {
    return axios.get(`${BASE_URL}/stations/${stationId}/bookings/${bookingId}`);
  }
};

export default apiService;
