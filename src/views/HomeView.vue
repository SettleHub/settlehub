<template>
  <div class="home-container">
    <header class="home-header">
      <h1 class="home-title">
        Ласкаво просимо до системи управління гуртожитками!
      </h1>
      <p class="home-description">
        Оберіть гуртожиток, перегляньте деталі, та легко знайдіть потрібну
        інформацію.
      </p>
    </header>

    <div class="home-actions">
      <router-link to="/hostels" class="action-button">Переглянути гуртожитки</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",

};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: #f9fbff;
}

.home-header {
  margin-bottom: 40px;
}

.home-title {
  font-size: 2.5rem;
  color: #323a56;
  margin-bottom: 20px;
}

.home-description {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
}

.home-actions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.action-button {
  padding: 15px 30px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  color: #fff;
  background-color: #5a5eff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #4848e5;
}

.action-button.secondary {
  background-color: #6c757d;
}

.action-button.secondary:hover {
  background-color: #5a6268;
}

@media (max-width: 768px) {
  .home-title {
    font-size: 2rem;
  }

  .home-description {
    font-size: 1rem;
  }

  .action-button {
    width: 100%;
    max-width: 300px;
  }
}
</style>
