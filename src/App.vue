<template>
   <div class="container">
   <Navbar title="Van Booking Dashboard"/>
   <Booking_Calender />
   </div>
</template>

<script>
import Booking_Calender from './components/calendar/BookingCalendar.vue';
import Navbar from './components/header/Navbar.vue';

export default {  
  name: 'App',
  components: {
  Navbar,
  Booking_Calender,
  },
  data () {
    return {
   
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  margin: 0;
  height: 80vh !important;
}
.container {
        margin: 0;
        padding: 0;
        
    }

    .rubik-300 {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
}
</style>
