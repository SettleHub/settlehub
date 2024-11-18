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
    margin: 60px 0px 0px 0px;
  }
  .logo {
    font-size: 20px;
    font-weight: bold;
    color: #2b2b5e;
  }
  .contact p {
    font-size: 14px;
    color: #555;
  }
  </style>
  
  