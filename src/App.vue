<template>
  <div id="app">
    <HeaderBar />
    <div class="section-columns">
      <main class="column">
        <HostleItemListCard
          :value="{
            title: 'Гуртожиток №1',
            description: 'Гуртожиток для студентів...',
            address: 'вул. Бойчука Михайла, 13–6',
            phone: '+36849168498',
          }"
        />
        <HostleItemListCard
          :value="{
            title: 'Гуртожиток №2',
            description: 'Гуртожиток для студентів...',
            address: 'вул. Бойчука Михайла, 13–6',
            phone: '+36849168498',
          }"
        />
        <HostleItemListCard
          :value="{
            title: 'Гуртожиток №2',
            description: 'Гуртожиток для студентів...',
            address: 'вул. Бойчука Михайла, 13–6',
            phone: '+36849168498',
          }"
        />
        <HostleItemListCard
          :value="{
            title: 'Гуртожиток №2',
            description: 'Гуртожиток для студентів...',
            address: 'вул. Бойчука Михайла, 13–6',
            phone: '+36849168498',
          }"
        />
        <HostleItemListCard
          :value="{
            title: 'Гуртожиток №2',
            description: 'Гуртожиток для студентів...',
            address: 'вул. Бойчука Михайла, 13–6',
            phone: '+36849168498',
          }"
        />

        <home />
      </main>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "./components/Footer-component.vue";
import HeaderBar from "./components/Header-bar.vue";
import HostleItemListCard from "./components/hostel-item-card.vue";

export default {
  name: "App",
  components: {
    HeaderBar,
    HostleItemListCard,
    FooterComponent,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: 484848;
  width: auto;
  height: auto;
}
</style>
