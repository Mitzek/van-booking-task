<template>
  <div :class="{ modalShadow: showModal, disableModal: !showModal }">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">
          <h3>Booking Details</h3>
        </div>
        <button class="modal-cancelButton" @click="handleClose">x</button>
      </div>
      <br />
      <div class="modal-body">
        <div class="modal-details">
          <h4>
            Customer Name:
            <span class="data-details">{{ modalDetails.customerName }}</span>
          </h4>
          <h4>
            Booking Start:
            <span class="data-details">{{ modalDetails.startDate }} </span>
          </h4>
          <h4>
            Booking End:
            <span class="data-details">{{ modalDetails.endDate }} </span>
          </h4>
          <h4 v-if="modalDetails.duration !== undefined">
            Booking Duration:
            <span class="data-details">
              {{ modalDetails.duration.months }} Months and
              {{ modalDetails.duration.days }} days
            </span>
          </h4>
          <h4>
            Booking Station:
            <span class="data-details"> {{ modalDetails.station }}</span>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailModal",
  props: {
    showModal: Boolean,
    modalDetails: Object,
    handleClose: Function,
  },
  components: {},

  data() {
    return {};
  },

  methods: {
    // handleClose() {
    // this.$emit('update:showModal', false); // Emit event to update prop value in parent
    // }
  },
};
</script>

<style>
.modalShadow {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Rubik;
  font-weight: 1;
}

.disableModal {
  display: none;
}

.modal {
  background: rgb(255, 255, 255);
  width: 40%;
  height: 60vh;
  border-radius: 10px;
  padding: 20px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  padding: 10px;
}
.modal-title {
}
h3 {
  font-weight: 500;
  font-size: 1.2rem;
}
.modal-cancelButton {
  border-radius: 100%;
  width: 30px;
  height: 30px;
  margin: 0;
  color: white;
  border: 1px solid red;
  background-color: red;
  font-size: 1.3rem;
  cursor: pointer;
}

.modal-details {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

h4 {
  margin: 0;
  height: 20px;
  text-align: center;
  font-size: 1.2rem;
  padding: 1%;
  color: rgb(63, 63, 63);
  border-bottom: 1px solid rgb(199, 198, 198);
  font-weight: 300;
}

.data-details {
  color: black;
  font-weight: 400;
}
</style>
