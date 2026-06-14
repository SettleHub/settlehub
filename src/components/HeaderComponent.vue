<template>
  <div class="header_space-top" />
  <div v-if="auth" @click="hidePopup($event)" class="popup-inner">
    <div class="popup-wrapper">
      <AuthForm :hidePopup="hidePopup"
          :jwtCheck="checkJwt"
          v-model:method="method"
          v-model:forgotPassword="forgotPassword"/>
    </div>
  </div>
  <header class="header" ref="headerRef" :style="styles">
    <div class="header_inner">
      <nav class="burger-menu-navigation">
        <Slide disableOutsideClick closeOnNavigation noOverlay :width="screenWidth">
            <router-link to="/" class="nav_link">Головна</router-link>
            <!-- <button v-if="hasJwt"
                    @click="onChooseRoom"
                    class="nav_link"
            >
                Обрати кімнату
            </button> -->
            <!-- <router-link v-if="hasJwt" to="/upload-document" class="nav_link">Завантаження документів</router-link> -->
            <router-link v-if="hasJwt" to="/housekeeping" class="nav_link">Прибирання</router-link>
            <router-link v-if="hasJwt" to="/profile" class="nav_link">Профіль</router-link>
            <button v-if="!hasJwt" @click="showPopup($event)" class="nav_link">Авторизуватись</button>
            <button v-if="hasJwt" @click="handleLogout()" class="nav_link">Вийти</button>
        </Slide>
      </nav>
      <div class="header_wrapper">
        <router-link to="/">
            <div class="logo">
                <img src="../assets/logo.blue-transparent.png" alt="SettleHub Logo"/>
            </div>
        </router-link>
        <nav class="navigation">
            <router-link to="/" class="nav_link">Головна</router-link>
            <!-- <button v-if="hasJwt"
                    @click="onChooseRoom"
                    class="nav_link"
            >
                Обрати кімнату
            </button> -->
            <!-- <router-link v-if="hasJwt" to="/upload-document" class="nav_link">Завантаження документів</router-link> -->
            <router-link v-if="hasJwt" to="/housekeeping" class="nav_link">Прибирання</router-link>
            <router-link v-if="hasJwt" to="/profile" class="nav_link">Профіль</router-link>
            <button v-if="!hasJwt" @click="showPopup($event)" class="nav_link">Авторизуватись</button>
            <button v-if="hasJwt" @click="handleLogout()" class="nav_link">Вийти</button>
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
  import { Slide } from 'vue3-burger-menu';
  import AuthForm from "@/components/AuthForm.vue";
  import { getHostelNumber, getHostelFloor } from "@/services/selectStorage";
  import { logout } from "@/services/auth";

  export default {
    name: "HeaderComponent",
    components: {
      Slide,
      AuthForm
    },
    data() {
      return {
        auth: false,
        method: this.$route.query.method || 'login',
        forgotPassword: false,
        screenWidth: window.innerWidth,
        hasJwt: !!localStorage.getItem('jwt'),
      };
    },
    methods: {
      showPopup(event) {
        event.preventDefault();
        document.documentElement.classList.add('scroll-hidden');
        document.body.classList.add('scroll-hidden');
        this.auth = true;
        const currentQuery = this.$route.query;
        if (currentQuery.auth !== 'true') {
          this.$router.push({
            query: {
              ...currentQuery,
              auth: 'true',
              method: currentQuery.method || this.method || 'login'
            }
          });
        }
      },
      hidePopup(event) {
        event.preventDefault();
        const target = event?.target;
        if (
            target && (
                target.classList?.contains('popup-inner') ||
                target.classList?.contains('button-close')
            ) || this.hasJwt
        ) {
          document.documentElement.classList.remove('scroll-hidden');
          document.body.classList.remove('scroll-hidden');
          this.auth = false;
          const rest = { ...this.$route.query };
          delete rest.auth;
          delete rest.method;
          delete rest.forgotPassword;
          this.$router.replace({ query: rest });
        }
      },
      async handleLogout() {
        const response = await logout();
        if (response) {
            if (response.status == 200) {
                this.$router.replace({ path: this.$route.path, query: { auth: 'true', method: 'login' } })
                    .then(() => {
                        this.$router.go(0);
                    });
            } else {
                this.$notify({
                    title: "Сталася помилка!",
                    text: `response.data`,
                    type: "error"
                });
            }
        } else {
            this.$router.push({path: '/internal-error'});
        }
      },
      updateWidth() {
        this.screenWidth = window.innerWidth;
      },
      checkJwt() {
        this.hasJwt = !!localStorage.getItem('jwt');
      },
      onChooseRoom() {
        const id = getHostelNumber();
        const floorNumber = getHostelFloor();
        this.$router.push({ name: 'HostelFloorsView', params: { id: id, floorNumber: floorNumber } });
      },
    },
    watch: {
      method (newVal) {
        const newQuery = {
          ...this.$route.query,
          method: newVal
        };
        this.$router.replace({ query: newQuery });
      },
    },
    mounted() {
      this.$watch(
        () => this.$route.query.auth,
        (auth) => {
          if (auth === 'true') {
            this.showPopup(new Event('watch trigger'));
          }
        },
        { immediate: true }
      );

      this.$watch(
        () => this.$route.fullPath,
        () => {
          this.checkJwt();
        },
        { immediate: true }
      );

      window.addEventListener('resize', this.updateWidth);
      window.addEventListener('storage', this.checkJwt);

    },
    unmounted() {
      window.removeEventListener('resize', this.updateWidth);
      window.removeEventListener('storage', this.checkJwt);
    }
  };
</script>
  
<style lang="scss" scoped>
.scroll-hidden {
  overflow: hidden;
  height: 100%;
}

.popup-inner {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  padding: 8% 6% 8%;
  background-color: $background-black-30;
}
.popup-wrapper {
  max-width: 1250px;
  width: 86%;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .popup-inner {
    padding: 60px 10px 290px;
  }
  .popup-wrapper {
    width: 100%;
    padding: 20px 15px 30px;
  }
}

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
    padding: 20px 90px 24px;
    @include shadow-light;

  }
  .header_wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    @include locked-image;
    width: 50px;
    img {
        width: 100%;
    }
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
    background: transparent;
    cursor: pointer;
    border: none;
    &.active {
      color: $text-dark-blue;
    }
    &:hover {
      color: $text-dark-blue;
    }
    &:focus, &:focus-visible {
      outline: none;
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

  ::v-deep(nav.bm-item-list .nav_link) {
    padding: 10px 20px;
    background-color: $background-white;
    color: $text-light-gray;
    border-radius: 5px;
    transition: all ease 0.5s;
  }

  ::v-deep(nav.bm-item-list .nav_link:hover),
  ::v-deep(nav.bm-item-list .nav_link:focus),
  ::v-deep(nav.bm-item-list .nav_link:focus-visible) {
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
