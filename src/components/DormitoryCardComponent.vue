<template>
    <div class="card">
      <h3 class="title">{{ dormitory.title }}</h3>
      <p class="description">{{ dormitory.description }}</p>
      <div class="contact">
        <p><strong>Адреса:</strong> {{ dormitory.address }}</p>
        <p><strong>Телефон:</strong> {{ dormitory.phone }}</p>
      </div>
      <button class="select-button">Обрати</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "DormitoryCardComponent",
    props: {
      dormitory: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .title {
    font-size: 20px;
    color: #2b2b5e;
    margin-bottom: 10px;
  }
  .description {
    font-size: 14px;
    color: #555;
    margin-bottom: 15px;
  }
  .contact p {
    margin: 5px 0;
    font-size: 14px;
    color: #555;
  }
  .select-button {
    background-color: #2b2b5e;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .select-button:hover {
    background-color: #4444aa;
  }
  </style>
  