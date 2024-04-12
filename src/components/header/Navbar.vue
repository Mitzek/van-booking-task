<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    title: String,
  },
};
</script>

<style scoped>
header {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #171a21;
  height: 8vh;
  padding-top: 5px;
}
h1 {
  margin: 0;
  color: #f8f8f8;
}
</style>
