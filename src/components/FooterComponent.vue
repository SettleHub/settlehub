<template>
  <footer class="footer">
    <div class="footer_inner">
      <div class="footer_wrapper">
        <div class="navigation_block">
          <div class="logo">
            <img src="../assets/logo.blue-with-name.png" alt="SettleHub Logo" />
          </div>
          <nav class="navigation">
            <router-link to="/" class="nav_link">Головна</router-link>
            <!-- <button v-if="hasJwt"
                    @click="onChooseRoom"
                    class="nav_link"
            >
              Обрати кімнату
            </button>
            <router-link v-if="hasJwt" to="/upload-document" class="nav_link">Завантаження документів</router-link> -->
            <router-link v-if="hasJwt" to="/housekeeping" class="nav_link">Прибирання</router-link>
            <router-link v-if="hasJwt" to="/profile" class="nav_link">Профіль</router-link>
            <button v-if="!hasJwt" @click="toAuthWindow" class="nav_link">Авторизуватись</button>
          </nav>
        </div>
        <div class="contacts_block">
          <p class="contacts_title">Контакти</p>
          <ul class="contacts_list">
            <!-- <li>
              <a class="link-phone" href="tel: +380442885132">
                <img src="../assets/phone.icon.svg" alt="phone" />
                <p>+380442885132</p>
              </a>
            </li> -->
            <li>
              <a class="link-email" href="mailto: hitechnic00074220@gmail.com">
                <img src="../assets/email.icon.svg" alt="email" />
                <p>hitechnic00074220@gmail.com</p>
              </a>
            </li>
            <li>
              <a class="link-email" href="mailto: karakai.vv@knutd.edu.ua">
                <img src="../assets/email.icon.svg" alt="email" />
                <p>karakai.vv@knutd.edu.ua</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
  
<script>
import {getHostelFloor, getHostelNumber} from "@/services/selectStorage";

export default {
    name: "FooterComponent",
    data() {
      return {
        auth: false,
        hasJwt: !!localStorage.getItem('jwt'),
      };
    },
    mounted() {
      this.$watch(
          () => this.$route.fullPath,
          () => {
            this.checkJwt();
          },
          { immediate: true }
      );

      window.addEventListener('storage', this.checkJwt);
    },
    unmounted() {
      window.removeEventListener('storage', this.checkJwt);
    },
    methods: {
        checkJwt() {
          this.hasJwt = !!localStorage.getItem('jwt');
        },
        onChooseRoom() {
          const id = getHostelNumber();
          const floorNumber = getHostelFloor();
          this.$router.push({ name: 'HostelFloorsView', params: { id: id, floorNumber: floorNumber } });
        },
      toAuthWindow() {
        this.$router.replace({
          query: { ...this.$route.query, auth: true, method: 'login' }
        });
      },
    }
  };
</script>
  
<style lang="scss" scoped>
  .footer {
    @include shadow-light;
  }

  .footer_inner {
    background-color: $background-white;
    padding: 60px 90px 86px;
  }

  .footer_wrapper {
    display: flex;
    justify-content: space-between;
  }

  .navigation {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: start;
  }

  .nav_link {
    @include poppins-bold;
    @include responsive-font(15, 8, 1440);
    padding: 5px 0;
    color: $text-light-gray;
    text-decoration: none;
    transition: color 0.3s;
    background: transparent;
    cursor: pointer;
    border: none;
    text-align: left;

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

  .logo {
    @include locked-image;
    width: 200px;
    img {
        width: 100%;
    }
  }

  .contacts_title {
    @include poppins-bold;
    @include responsive-font(20, 10, 1440);
    color: $text-dark-blue;
    text-align: start;
  }

  .contacts_list {
    margin-top: 10px;
    list-style: none;
    li {
      margin-top: 20px;
    }
  }

  .link-phone, .link-email {
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      @include locked-image;
      margin-right: 10px;
    }
    p {
      @include poppins-medium;
      @include responsive-font(15, 8, 1440);
      color: $text-light-gray;
    }
  }

  @media (max-width: 768px) {
    .footer_inner {
      padding: 20px;
    }

    .footer_wrapper {
      flex-direction: column;
      gap: 80px;
      .navigation_block {
        align-self: flex-start;
      }
      .contacts_block {
        align-self: flex-end;
      }
    }

    .navigation {
      margin-top: 20px;
      gap: 10px;
    }

    .link-phone, .link-email {
      img {
        width: 15px;
      }
    }
  }
</style>
 
