<template>
  <div class="container">
    <div v-if="stations !== undefined" id="station-selector-loading" class="calendar_options"> 
      <StationSelector
        :stations="stations"
        v-model="selectedStation"
        @change="fetchBookings"
        @send-id="getStationId"
      />
    </div>
    <div class="loading"  v-else>
      <div class="loader"></div>
      <div>Loading Stations...</div>
    </div>
    
      <div class="calendar" v-if="getDate !== undefined">
        <FullCalendar :stations="stations" :getDate="this.getDate" :bookings="this.bookings" :selectedStationId="selectedStationId" :getInitialDate="getInitialDate"/>
      </div>
    <div class="loading" v-else>
      <div class="loader"></div>
      <div>Loading Calendar...</div>
   </div>
</div>
  
</template>

<script>

import StationSelector from "../Calendar_options/StationSelector.vue";
import apiService from "../../services/apiService.js"; //importing API functions
import FullCalendar from "./FullCalendar.vue";

export default {
  name: "BookingCalender",
  components: {
    StationSelector,
    FullCalendar,
  },

  data() {
    return {
      bookings: [],
      stations: [],
      selectedStation: null,
      selectedStationId: null,
      initialDate: null, //date for first render   
    };
  },
  

  created() {
    this.fetchStations();
  },

  watch: {
    selectedStationId(newId) { 
      if (newId !== null) { 
        this.fetchStations(); 
      }
    },
  },

  methods: {
    getStationId(stationId) {
      /**This function sets the selected station id*/
      this.selectedStationId = stationId;
    },

    async fetchStations() {
      /**This function fetches the API for stations.
       * Returns an array of stations.
       */
      
      try {
        const response = await apiService.getStations(); 
        if (response.status === 200) {
          this.stations = response.data;
          
          this.selectedStation = this.stations.find(
            (station) => station.id === this.selectedStationId
          );
          this.fetchBookings(); //fetch bookings for selected station

        } else {
          console.log("Error: Data not found");
        }
      } catch (error) {
        console.log("Error fetching stations", error);
      }
    },

    async fetchBookings() {
      /**This function fetches bookings for the selected station.
       * Returns an array of bookings.
       */
      if (!this.selectedStation) return;
      try {
        let response = await apiService.getBookings(this.selectedStation.id);
        //status 200 is successful
        if (response.status === 200) {
          
          this.bookings = response.data;
          this.$emit('bookingsUpdated'); //emitting updated event for child components
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    },
  },

  computed: {
    getDate() {
      if(this.bookings.length > 0) {
        let startDate = this.bookings.map((booking) => {
        return booking.startDate; //initializing the beginning date
      });
      return startDate.sort(); //earliest booking will be displayed as first element of array
      }
      
    },
    getInitialDate() {
      return this.initialDate = this.getDate[0].replace(/T.*$/, '');
    },
  },

};
</script>

<style scoped>
.loading {
  width: 50%;
  position:fixed;
  left: 30%;
  right: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}
.loader {
  width: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid;
  border-color: #000 #0000;
  animation: l1 1s infinite;
  
}
@keyframes l1 {to{transform: rotate(.5turn)}}

.container {
  margin: 2%;
  padding: 1%;
  margin: 0 8%; 
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.calendar {
 
}

.day {
  flex: 1;
}

.day h3 {
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
  cursor: pointer;
}

li {
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
