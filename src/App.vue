<template>  
  <div id="app">
    <HeaderBar />
    <div class="section-columns">
      <main class="column">
       <HostelItemCard />
       <HostelItemCard />
      <home/>
      </main>
    </div>
  <FooterComponent />

  </div>
</template>

<script>
import FooterComponent from './components/Footer-component.vue';
import HeaderBar from './components/Header-bar.vue';
import HostelItemCard from './components/hostel-item-card.vue';

export default {
  name: 'App',
  components: {
    HeaderBar,
    HostelItemCard,
    FooterComponent
  }
}

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: 484848;
  width:1920px ;
  height: 1080px;
}

</style>
