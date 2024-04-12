<template>
  <div class="stationSelector-container">
    <label class="selectLabel" for="stations">Select Station: </label>
    <select
      id="stations"
      class="station_selector"
      v-model="selectedStation"
      @change="handleChange"
    >
      <option v-for="station in stations" :key="station.id" :value="station.id">
        {{ station.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "StationSeletor",
  props: {
    stations: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
    },
    getStationId: {
      type: Function,
    },
  },

  created() {
    this.selectedStation = "1";
    this.$emit("send-id", this.selectedStation); //emitting event to send selected station id
  },
  data() {
    return {
      selectedStation: this.value,
    };
  },
  methods: {
    handleChange() {
      this.$emit("input", this.selectedStation);
      this.$emit("send-id", this.selectedStation);
    },
  },
};
</script>

<style>
.stationSelector-container {
  font-family: Rubik;
}
.station_selector {
  width: 10vw;
  height: 7vh;
  border: 1px solid black;
  padding: 10px;
  margin: 20px 20px 20px 0;
  border-radius: 5px;
}
.selectLabel {
  margin-left: 20px;

  font-weight: 300;
}
</style>
