o
<template>
  <div id="app">
    <main>
      <HeaderComponent />
      <DownloadButton/>
      <DormitoryListComponent />
      <FooterComponent />
    </main>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import DormitoryListComponent from "@/components/DormitoryListComponent.vue";
import FooterComponent from './components/FooterComponent.vue';
import DownloadButton from './components/DownloadButton.vue';

export default {
  name: "App",
  components: {
    HeaderComponent,
    DormitoryListComponent,
    FooterComponent,
    DownloadButton
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
