<template>
  <div id="app">
    <main>
    <notifications position="top center"
                   width="80%"
                   :duration="3000"
                   animation-type="velocity" />

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
  },
}

</script>

<style lang="css" scoped>

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: #F4F7FE;
  }

  main {
    background-color: #F4F7FE;
  }

  ::v-deep(.vue-notification-wrapper) {
    margin: 30px 5px 10px;
    height: max-content !important;

    .vue-notification {
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      background-color: #F4F7FE;
      padding: 20px 15px 25px;
      color: #2B3674;
      border-radius: 10px;
      border-left: 12px solid #4318FF;
      &.success, &.info {
        border-color: #4318FF;
      }
      &.warn {
        border-color: #FFED29;
      }
      &.error {
        border-color: #FF1A63;
      }

      .notification-title {
        font-family: Poppins-Bold, sans-serif;;
        font-weight: 700;
        font-size: 17px;
      }

      .notification-content {
        font-family: Poppins-Medium, sans-serif;;
        font-weight: 500;
        font-size: 16px;
      }

      @media (max-width: 768px) {
        .notification-title {
          font-size: 14px;
        }

        .notification-content {
          font-size: 13px;
        }
      }
    }
  }
</style>
