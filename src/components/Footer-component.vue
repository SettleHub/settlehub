<template>
  <div class="footer">
    <div class="footer-container">
      <div class="logo">KNUTD</div>
      <nav class="navigation-footer">
        <a href="#" class="nav-link active">Головна</a>
        <a href="#" class="nav-link">Обрати кімнату</a>
        <a href="#" class="nav-link">Завантаження документів</a>
      </nav>
    </div>
    <div class="contact">
      <p>Контакти</p>
      <p>Телефон: +38 (044) 123-45-67</p>
      <p>Телефон: +38 (050) 123-45-67</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style>
.footer {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: white;
  border-top: 1px solid #ccc;
  margin-top: 60px;
  width: 100%; /* Залишаємо футер на всю ширину */
  box-sizing: border-box; /* Враховуємо паддінги */
}

.footer-container {
  display: flex;
  justify-content: flex-start; /* Прижимаємо навігацію до лівого краю */
  flex-direction: column;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #2b2b5e;
  display: flex;
  justify-content: row;
}

.contact p {
  font-size: 14px;
  color: #555;
  display: flex;
}

::v-deep(.contact > p:first-of-type) {
  color: #2b2b5e;
}

.navigation-footer {
  display: flex;
  flex-direction: column; /* Вертикальне розташування елементів */
  gap: 10px; /* Відстань між посиланнями */
  text-align: left; /* Вирівнюємо по лівому краю */
  padding: 20px 0px 0px 0px;
}
.navigation-footer a {
  padding: 10px 0px 0px 0px;
}
.nav-link {
  display: block; /* Забезпечує, що посилання займають весь рядок */
  font-size: 16px;
  text-decoration: none;
  color: #7a7a7a;
  transition: color 0.3s;
  padding-left: 5px; /* Додаємо невеликий відступ, щоб не було зливань */
}

.nav-link.active {
  color: #2b2b5e;
  font-weight: bold;
}

.nav-link:hover {
  color: #2b2b5e;
}
</style>
