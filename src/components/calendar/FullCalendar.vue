<template>
  <FullCalendar :options="calendarOptions"> 
    <template v-slot:eventContent="arg"> <!--Extracting arguments on event click-->
      <b class="event_class">{{ arg.event.title }}</b>
      <!-- <div class="event_class"></div> -->
    </template>
  </FullCalendar>

  <!-- Enabling DetailModal for event click -->
  
  <DetailModal
    :showModal="this.showModal"
    :modalDetails="this.modalDetails"
    :handleClose="handleClose"
  />
  

</template>

<script>
import FullCalendar from "@fullcalendar/vue3"; //Importing FullCalendar library and plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import apiService from "../../services/apiService.js";
import DetailModal from "../Calendar_options/DetailModal.vue";

export default {
  props: {
    bookings: Array,
    stations: Array,
    getDate: Array,
    selectedStationId: String,
    getInitialDate: String,
  },
  components: {
    FullCalendar,
    DetailModal,
  },
  data() {
    return {
      bookingDetails: {},
      showModal: false,
      modalDetails: {},
    };
  },
  
  computed: {
    getEventData() {
      /**This function extracts the booking details data.
       * Returns events as an object  */
      return (this.eventData = this.bookings.map((booking) => {
        return {
          id: booking.id,
          title: booking.customerName,
          start: new Date(booking.startDate).toISOString().replace(/T.*$/, ""), //Shortenning date string to short date format
          end: new Date(booking.endDate).toISOString().replace(/T.*$/, ""),
        };
      }));
    },

    //Customizing calendar according to the given requirements.
    calendarOptions() {
      const events = this.getEventData.map((event) => ({
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        id: event.id,
      }));

      return {
        plugins: [dayGridPlugin, interactionPlugin ],
        initialView: "dayGridWeek",
        initialDate: this.getDate[0].replace(/T.*$/, ""),
        height: 500,
        contentHeight: 1000,
        events,
        eventColor: '#19231A',
        eventClick: this.handleEventClick,
        headerToolbar: {
          left: "prev next today",
          center: "title",
          right: "dayGridMonth dayGridWeek",
        },
        footerToolbar: {
          left: "",
          center: "",
          right: "",
        },
      };
    },
  },
  methods: {
    calculateBookingDuration(startDate, endDate) {
      /** This function calculates the duration of a booking. 
       *  Returns the month and days of total duration as an object. */

      const millisecondsInMonth = 30.44 * 24 * 60 * 60 * 1000; //total milliseconds in a month
      const millisecondsInDay = 24 * 60 * 60 * 1000; //total milliseconds in a day

      let start = Date.parse(startDate); //convert date string to milliseconds
      let end = Date.parse(endDate);

      const durationMilliseconds = new Date(end - start); // converting our given start and end dates to milliseconds
      const months = Math.floor(durationMilliseconds / millisecondsInMonth);

      const remainingMilliseconds = durationMilliseconds % millisecondsInMonth;
      const days = Math.floor(remainingMilliseconds / millisecondsInDay);

      return { months, days };
    },
    async handleEventClick(info) {
      /**This function fetches the event info for the clicked event.
       * Returns an object for modal component.
       */
      let station = this.stations.find(
        (station) => station.id === this.selectedStationId //fetch id of the clicked booking
      );

      try {
        const response = await apiService.getBookingById(
          this.selectedStationId,
          info.event.id
        );
        const responseStatus = Object.keys(response.data); 
        if (responseStatus.length > 0) {
          this.bookingDetails = response.data;
        } else {
          console.log("Error: Data not found");
        }
      } catch (error) {
        console.log("Error", error); 
      }

      let startDate = new Date(this.bookingDetails.startDate);
      let endDate = new Date(this.bookingDetails.endDate);

      this.modalDetails = {
        customerName: this.bookingDetails.customerName,
        startDate: startDate.toString().substring(4, 15),
        endDate: endDate.toString().substring(4, 15),
        duration: this.calculateBookingDuration(startDate, endDate),
        station: station.name,
      };

      this.showModal = true; // Display modal
    },

    handleClose() {
      this.showModal = false; //Disable modal
    },
  },
};
</script>

<style scoped>

.event_class {
  height: 30px;
}
</style>