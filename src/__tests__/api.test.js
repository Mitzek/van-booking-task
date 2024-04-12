import apiService from "../services/apiService.js"
import axios from "axios";

jest.mock('axios')

//Test cases for stations
describe('testing API call for stations', () => {
  it('successfull API call', async () => {
    //calling get function
    await apiService.getStations()
    //Testing api 
    expect(axios.get).toHaveBeenCalledWith('https://605c94c36d85de00170da8b4.mockapi.io/stations');

  })
 
 it('errors in API call', async () => {
      //expect error in API call
      const error = new Error('API call failed');
      axios.get.mockRejectedValue(error);
      await expect(apiService.getStations()).rejects.toThrow('API call failed');
      expect(axios.get).toHaveBeenCalledWith('https://605c94c36d85de00170da8b4.mockapi.io/stations');
    });
 
})

describe('fetch stations', () => {

  it('successfully fetching stations from API', async () => {
    //sample data
   const sampleStations = [{id: "1", name: "Berlin"}, {id: "2", name:"Lisbon"}]
   // status 200 means successful
   const response = {data: sampleStations, status: 200}
   //mocking axios api call
  axios.get.mockResolvedValue(response);
  const stations = await apiService.getStations();
  //comparing the data from api call to sample data
  expect(stations.data).toEqual(sampleStations);
  
});
it('failed fetching stations from API', async () => {
  const error = {data: "Not Found"}
  const response = {data: error, status: 404}
  axios.get.mockResolvedValue(response);
  const stations = await apiService.getStations();
  expect(stations.data).toEqual(error);
  expect(axios.get).toHaveBeenCalledWith('https://605c94c36d85de00170da8b4.mockapi.io/stations');
 
});
 

});


//Test cases for bookings 
describe('testing API call for bookings', () => {
  it('successfull API call', async () => {
    
    //sample id for first station
    const stationId = "1"
    await apiService.getBookings(stationId)
    //Testing  api 
    expect(axios.get).toHaveBeenCalledWith('https://605c94c36d85de00170da8b4.mockapi.io/stations/1/bookings');

  })
 
 it('errors in API call', async () => {
      //expect error in API call
      const error = new Error('Error invalid id');
      const stationId = {}
      axios.get.mockRejectedValue(error);
      await expect(apiService.getBookingById(stationId)).rejects.toThrow('Error invalid id');
      expect(axios.get).toHaveBeenCalledWith('https://605c94c36d85de00170da8b4.mockapi.io/stations/1/bookings');
    });
 
})

describe('fetch bookings', () => {

  it('successfully fetching bookings from API', async () => {
    //sample data
   const stationdId = "1"
   const sampleBookings = [{id: "1", customerName: "Keara Adams", endDate: "2021-07-17T08:51:27.402Z", id: "1",
   pickupReturnStationId: "1", startDate : "2021-03-13T22:04:19.032Z"}, 
   {id: '7', pickupReturnStationId: '1', customerName: 'Elmira Larkin Sr.', startDate: '2021-02-19T17:22:15.117Z', endDate: '2021-08-10T10:35:41.773Z'}]
   
   // status 200 means successful
   const response = {data: sampleBookings, status: 200}

   //mocking axios api call
  axios.get.mockResolvedValue(response);
  const bookings = await apiService.getBookings(stationdId);
  //comparing the data from api call to sample data
  expect(bookings.data).toEqual(sampleBookings);
  
});
it('failed fetching bookings from API', async () => {
  const stationdId = {}
  const error = {data: "Not Found"}
  const response = {data: error, status: 404}
  axios.get.mockResolvedValue(response);
  const bookings = await apiService.getBookings(stationdId);
  expect(bookings.data).toEqual(error);
 
});
 

});


//Test cases for individual booking
describe('testing API call for individual booking', () => {
  it('successfull API call', async () => {
    
    //sample id for first station
    const stationId = "1"
    const bookingId = "1"
    await apiService.getBookingById(stationId, bookingId)
    //Testing api 
    expect(axios.get).toHaveBeenCalledWith('https://605c94c36d85de00170da8b4.mockapi.io/stations/1/bookings/1');

  })
 
 it('errors in API call', async () => {
      //expect error in API call
      const error = new Error('Error invalid id');
      const stationId = {}
      const bookingId = []
      axios.get.mockRejectedValue(error);
      await expect(apiService.getBookingById(stationId, bookingId)).rejects.toThrow('Error invalid id');
      expect(axios.get).toHaveBeenCalledWith('https://605c94c36d85de00170da8b4.mockapi.io/stations/1/bookings/1');
    });
 
})

describe('fetch individual booking', () => {

  it('successfully fetched invidiual booking from API', async () => {
    //sample data
   const stationdId = "1"
   const bookingId = "1"
   const sampleBooking = [{id: "1", customerName: "Keara Adams", endDate: "2021-07-17T08:51:27.402Z", id: "1",
   pickupReturnStationId: "1", startDate : "2021-03-13T22:04:19.032Z"},]
   
   // status 200 means successful
   const response = {data: sampleBooking, status: 200}

   //mocking axios api call
  axios.get.mockResolvedValue(response);
  const booking = await apiService.getBookingById(stationdId, bookingId);
  //comparing the data from api call to sample data
  expect(booking.data).toEqual(sampleBooking);
  
});
it('failed fetching individual booking from API', async () => {
  const stationdId = {}
  const bookingId = []
  const error = {data: "Not Found"}
  const response = {data: error, status: 404}
  axios.get.mockResolvedValue(response);
  const booking = await apiService.getBookings(stationdId, bookingId);
  expect(booking.data).toEqual(error);
 
});
 

});

