<template>
  <div id="app">
    <main>
      <HostelView />
    </main>
  </div>
</template>

<script>

import HostelView from "@/views/HostelView.vue";

export default {
  name: "App",
  components: {
    HostelView
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
