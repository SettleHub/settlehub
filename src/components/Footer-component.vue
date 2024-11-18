<template>
    <div class="footer">
      <div class="logo">KNUTD</div>
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
  
  <style scoped>
  .footer {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: white;
    border-top: 1px solid #ccc;
  }
  .logo {
    font-size: 20px;
    font-weight: bold;
    color: #2b2b5e;
  }
  .contact p {
    margin: 5px 0;
    font-size: 14px;
    color: #555;
  }
  </style>
  
  