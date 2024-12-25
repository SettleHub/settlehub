<template>
  <footer class="footer">
    <div class="footer_inner">
      <div class="footer_wrapper">
        <div class="navigation_block">
          <div class="logo">
            <img src="../assets/logo.picture.png" alt="KNUTD Logotype" />
          </div>
          <nav class="navigation">
        <router-link to="/" class="nav_link">Головна</router-link>
        <router-link to="/room-select" class="nav_link">Обрати кімнату</router-link>
        <router-link to="/upload-document" class="nav_link">Завантаження документів</router-link>
      </nav>
        </div>
        <div class="contacts_block">
          <p class="contacts_title">Контакти</p>
          <ul class="contacts_list">
            <li>
              <a class="link-phone" href="tel: +380441234567">
                <img src="../assets/phone.icon.svg" alt="phone" />
                <p>+380441234567</p>
              </a>
            </li>
            <li>
              <a class="link-phone" href="tel: +380501234567">
                <img src="../assets/phone.icon.svg" alt="phone" />
                <p>+380501234567</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
  
<script>
  export default {
    name: "FooterComponent",
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
  }

  .logo {
    @include locked-image;
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

  .link-phone {
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
</style>
  
  