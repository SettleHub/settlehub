<template>
  <div  class="header_space-top" />
  <header class="header" ref="headerRef" :style="styles">
    <div class="header_inner">
      <div class="header_wrapper">
        <div class="logo">
          <img src="../assets/logo.picture.png" alt="KNUTD Logotype"/>
        </div>
  
        <nav class="navigation">
        <router-link to="/" class="nav_link ">Головна</router-link>
        <router-link to="/hostels" class="nav_link">Обрати кімнату</router-link>
        <router-link to="/upload-document" class="nav_link">Завантаження документів</router-link>
      </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
  import  { ref } from 'vue';
  import { useFixedHeader } from "vue-use-fixed-header";

  const headerRef = ref(null);
  const { styles } = useFixedHeader(headerRef)
</script>

<script>
  export default {
    name: "HeaderComponent",
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
</style>
