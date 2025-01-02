<template>
  <div id="app">
    <main>
    <HeaderComponent />
      <RouterView />
    <FooterComponent />

    </main>
  </div>
</template>

<script>

import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
export default {
  name: "App",
  components: {
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
    background-color: #F4F7FE;
  }
</style>
