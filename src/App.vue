o
<template>
  <div id="app">
    <!-- Header -->
    <HeaderBar />

    <!-- Main content rendered by RouterView -->
    <RouterView />


    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<script>
// import HomeView from "./views/HomeView.vue";
import HeaderBar from "./components/AppHeader.vue";
import FooterComponent from "./components/AppFooter.vue";
// import HostelCard from "./components/HostelCard.vue";

export default {
  name: "App",
  components: {
    // HomeView,
    // HostelCard,
    HeaderBar,
    FooterComponent,
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
