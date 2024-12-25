<template>
  <div id="app">
    <main>
    <HeaderComponent />
      <HostelView :hostels="hostelsData" />
      <RouterView />
    <FooterComponent />

    </main>
  </div>
</template>

<script>

import HostelView from "@/views/HostelView.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
export default {
  name: "App",
  components: {
    HostelView,
    FooterComponent,
    HeaderComponent,
  }
}

</script>

<style lang="css">
  /* Something on the way. */

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
</style>
