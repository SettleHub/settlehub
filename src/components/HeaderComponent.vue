<template>
  <div  class="header_space-top" />
  <header class="header" ref="headerRef" :style="styles">
    <div class="header_inner">
      <nav class="burger-menu-navigation">
        <Slide disableOutsideClick closeOnNavigation noOverlay :width="screenWidth">
          <router-link to="/" class="nav_link">Головна</router-link>
          <router-link to="/hostel/:id" class="nav_link">Обрати кімнату</router-link>
          <router-link to="/upload-document" class="nav_link">Завантаження документів</router-link>
        </Slide>
      </nav>
      <div class="header_wrapper">
        <div class="logo">
          <img src="../assets/logo.picture.png" alt="KNUTD Logotype"/>
        </div>
        <nav class="navigation">
          <router-link to="/" class="nav_link">Головна</router-link>
          <router-link to="/hostel/:id" class="nav_link">Обрати кімнату</router-link>
          <router-link to="/upload-document" class="nav_link">Завантаження документів</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
  import  { ref, onMounted, onUnmounted } from 'vue';
  import { useFixedHeader } from "vue-use-fixed-header";

  const headerRef = ref(null);
  const { styles } = useFixedHeader(headerRef)

  const screenWidth = ref(window.innerWidth)

  function updateWidth() {
   screenWidth.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })
</script>

<script>
  import { Slide } from 'vue3-burger-menu';

  export default {
    name: "HeaderComponent",
    components: {
      Slide
    }
  };
</script>
  
<style lang="scss" scoped>
  .header_space-top {
    width: 100vw;
    height: 100px;
  }

  .header {
    z-index: 10;
    width: 100vw;
    position: fixed;
    top: 0;
  }

  .header_inner {
    background-color: $background-white;
    padding: 35px 90px 39px;
    @include shadow-light;

  }
  .header_wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    @include locked-image;
  }
  
  .navigation {
    display: flex;
    gap: 65px;
  }
  
  .nav_link {
    @include poppins-bold;
    @include responsive-font(15, 10, 1440);
    text-decoration: none;
    color: $text-light-gray;
    transition: color 0.3s;
    &.active {
      color: $text-dark-blue;
    }
    &:hover {
      color: $text-dark-blue;
    }
  }

  .burger-menu-navigation {
    position: absolute;
    height: 100%;
    width: max-content;
    display: none;
  }

  ::v-deep(.bm-menu) {
    background-color: $background-white;
    height: 100vh;
    padding-top: 59px;
  }

  ::v-deep(nav.bm-item-list) {
    background-color: $background-gray;
    margin: 0;
    padding: 20px;
    height: calc(100% - 59px);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  ::v-deep(nav.bm-item-list a.nav_link) {
    padding: 10px 20px;
    background-color: $background-white;
    color: $text-light-gray;
    border-radius: 5px;
    transition: all ease 0.5s;
  }

  ::v-deep(nav.bm-item-list a.nav_link:hover),
  ::v-deep(nav.bm-item-list a.nav_link:focus),
  ::v-deep(nav.bm-item-list a.nav_link:focus-visible) {
    background-color: $bright-blue;
    color: $text-white;
  }

  ::v-deep(.bm-burger-button) {
    position: relative;
    width: 33px;
    height: 20px;
    top: 2px;
    left: 0;
  }

  ::v-deep(.bm-burger-bars) {
    background-color: $dark-blue;
  }

  ::v-deep(.line-style) {
    border-radius: 3px;
    height: 3px;
  }

  ::v-deep(.bm-cross-button) {
    width: 39px;
    height: 39px;
  }

  ::v-deep(.cross-style) {
    top: 10px;
    left: 20px;
  }

  ::v-deep(.bm-cross) {
    width: 3px !important;
    height: 24px !important;
    border-radius: 3px !important;
    background-color: $dark-blue;
    top: 8px;
    left: 18px;
  }

  @media (max-width: 920px) {
    .navigation {
      gap: 4vw;
    }
  }

  @media (max-width: 768px) {
    .header_space-top {
      height: 50px;
    }
    .header_inner {
      padding: 17px 19px;
      position: relative;
    }
    .header_wrapper {
      justify-content: center;
    }
    .navigation {
      display: none;
    }
    .logo img {
      max-width: 70px;
    }
    .burger-menu-navigation {
      display: block;
    }
  }
</style>
