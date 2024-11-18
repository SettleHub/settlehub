<template>
    <div class="header-container">
      <div class="logo">KNUTD</div>
      <nav class="navigation">
        <a href="#" class="nav-link active">Головна</a>
        <a href="#" class="nav-link">Обрати кімнату</a>
        <a href="#" class="nav-link">Завантаження документів</a>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: "HeaderBar",
  };
  </script>
  
  <style scoped>
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 100px 20px 10px;
    background-color: #ffffff;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #2b2b5e;
  }
  
  .navigation {
    display: flex;
    gap: 20px;
  }
  
  .nav-link {
    font-size: 16px;
    text-decoration: none;
    color: #7a7a7a;
    transition: color 0.3s;
  }
  
  .nav-link.active {
    color: #2b2b5e;
    font-weight: bold;
  }
  
  .nav-link:hover {
    color: #2b2b5e;
  }
  .login{
    font-size: 16px;
    text-decoration: none;
    color: #7a7a7a;
    transition: color 0.3s;
  }
  .register{
    font-size: 16px;
    text-decoration: none;
    color: #7a7a7a;
    transition: color 0.3s;
  }
  </style>
  